const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// GET featured articles (public) - MUST BE BEFORE /:slug route
router.get('/featured/list', async (req, res) => {
  try {
    console.log('⭐ Fetching featured articles...');
    
    const limit = parseInt(req.query.limit) || 5;
    
    const articles = await Article.find({ 
      featured: true, 
      published: true 
    })
    .sort({ publishedAt: -1 })
    .limit(limit);
    
    console.log(`✅ Found ${articles.length} featured articles`);
    
    // Return just the articles array (not wrapped in an object)
    res.json(articles);
    
  } catch (error) {
    console.error('❌ Error fetching featured articles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured articles',
      message: error.message
    });
  }
});

// GET article statistics (admin) - Also before /:slug
router.get('/admin/stats', async (req, res) => {
  try {
    console.log('📊 Fetching article statistics...');
    
    const stats = await Article.aggregate([
      {
        $group: {
          _id: null,
          totalArticles: { $sum: 1 },
          publishedArticles: {
            $sum: { $cond: [{ $eq: ['$published', true] }, 1, 0] }
          },
          draftArticles: {
            $sum: { $cond: [{ $eq: ['$published', false] }, 1, 0] }
          },
          featuredArticles: {
            $sum: { $cond: [{ $eq: ['$featured', true] }, 1, 0] }
          },
          totalViews: { $sum: '$views' },
          totalDownloads: { $sum: '$downloads' }
        }
      }
    ]);
    
    const result = stats[0] || {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      featuredArticles: 0,
      totalViews: 0,
      totalDownloads: 0
    };
    
    console.log('✅ Article statistics calculated');
    
    res.json({
      success: true,
      stats: result
    });
    
  } catch (error) {
    console.error('❌ Error fetching article stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
      message: error.message
    });
  }
});

// GET all articles (public)
router.get('/', async (req, res) => {
  try {
    console.log('📄 Fetching all articles...');
    
    const {
      page = 1,
      limit = 10,
      search,
      category,
      type,
      year,
      featured
    } = req.query;
    
    // Build query
    let query = { published: true };
    
    // Add search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { abstract: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
        { 'authors.name': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add filters
    if (category) query.categories = category;
    if (type) query.type = type;
    if (year) query['publication.year'] = parseInt(year);
    if (featured === 'true') query.featured = true;
    
    // Execute query
    const articles = await Article.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');
    
    // Get total count for pagination
    const total = await Article.countDocuments(query);
    
    console.log(`✅ Found ${articles.length} articles (${total} total)`);
    
    // Return just the articles array for frontend compatibility
    res.json(articles);
    
  } catch (error) {
    console.error('❌ Error fetching articles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles',
      message: error.message
    });
  }
});

// GET single article by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    console.log('📄 Fetching article:', req.params.slug);
    
    const article = await Article.findOne({ 
      slug: req.params.slug, 
      published: true 
    });
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }
    
    // Increment view count safely
    try {
      article.views = (article.views || 0) + 1;
      await article.save();
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

// POST new article (admin only - we'll add auth later)
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new article...');
    
    const articleData = req.body;
    
    // Basic validation
    if (!articleData.title || !articleData.abstract) {
      return res.status(400).json({
        success: false,
        error: 'Title and abstract are required'
      });
    }
    
    // Create article
    const article = new Article(articleData);
    await article.save();
    
    console.log(`✅ Article created: ${article.title}`);
    
    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      article
    });
    
  } catch (error) {
    console.error('❌ Error creating article:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Article with this title already exists'
      });
    }
    
    res.status(400).json({
      success: false,
      error: 'Failed to create article',
      message: error.message
    });
  }
});

// PUT update article (admin only)
router.put('/:id', async (req, res) => {
  try {
    console.log('📝 Updating article:', req.params.id);
    
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }
    
    console.log(`✅ Article updated: ${article.title}`);
    
    res.json({
      success: true,
      message: 'Article updated successfully',
      article
    });
    
  } catch (error) {
    console.error('❌ Error updating article:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to update article',
      message: error.message
    });
  }
});

// DELETE article (admin only)
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ Deleting article:', req.params.id);
    
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Article not found'
      });
    }
    
    console.log(`✅ Article deleted: ${article.title}`);
    
    res.json({
      success: true,
      message: 'Article deleted successfully'
    });
    
  } catch (error) {
    console.error('❌ Error deleting article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete article',
      message: error.message
    });
  }
});

module.exports = router;