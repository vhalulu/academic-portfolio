const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || true 
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Import Models
const Article = require('./models/Article');

// Simple API Routes
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'Backend is working!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find({ published: true })
      .sort({ publishedAt: -1 });
    
    console.log(`Found ${articles.length} articles`);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.get('/api/articles/featured/list', async (req, res) => {
  try {
    const articles = await Article.find({ 
      published: true, 
      featured: true 
    })
    .sort({ publishedAt: -1 })
    .limit(5);
    
    console.log(`Found ${articles.length} featured articles`);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    res.status(500).json({ error: 'Failed to fetch featured articles' });
  }
});

// GET individual article by slug or ID
app.get('/api/articles/:identifier', async (req, res) => {
  try {
    console.log('📄 Fetching article:', req.params.identifier);
    
    const { identifier } = req.params;
    let article;
    
    // Try to find by MongoDB ObjectId first
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('🔍 Searching by ID...');
      article = await Article.findOne({ 
        _id: identifier, 
        published: true 
      });
    } else {
      console.log('🔍 Searching by slug...');
      // Try to find by slug
      article = await Article.findOne({ 
        slug: identifier, 
        published: true 
      });
    }
    
    if (!article) {
      console.log('❌ Article not found');
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }
    
    // Increment view count safely
    try {
      article.views = (article.views || 0) + 1;
      await article.save();
      console.log('👁️ View count incremented');
    } catch (err) {
      console.warn('⚠️ Could not increment view count:', err.message);
    }
    
    console.log(`✅ Article found: ${article.title}`);
    
    res.json(article);
    
  } catch (error) {
    console.error('❌ Error fetching article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch article',
      message: error.message
    });
  }
});

// Serve static files from React build (PRODUCTION ONLY)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app build directory
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Handle React routing - return all requests to React app
  // This must be AFTER all API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📄 Articles: http://localhost:${PORT}/api/articles`);
  console.log(`⭐ Featured: http://localhost:${PORT}/api/articles/featured/list`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📂 Serving static files: ${process.env.NODE_ENV === 'production' ? 'YES' : 'NO'}`);
});