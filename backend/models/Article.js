const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Article title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  
  // Content
  abstract: {
    type: String,
    required: [true, 'Abstract is required'],
    maxlength: [2000, 'Abstract cannot be more than 2000 characters']
  },
  
  content: {
    type: String,
    required: false, // Optional full text
    maxlength: [50000, 'Content cannot be more than 50000 characters']
  },
  
  // Authors (simplified - you can be primary author)
  authors: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    affiliation: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    isMainAuthor: {
      type: Boolean,
      default: false
    }
  }],
  
  // Publication Details
  publication: {
    journal: {
      type: String,
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'Publication year is required'],
      min: [2000, 'Year must be after 2000'],
      max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future']
    },
    volume: String,
    pages: String,
    doi: String,
    url: String
  },
  
  // Classification
  type: {
    type: String,
    required: true,
    enum: {
      values: ['journal_article', 'conference_paper', 'working_paper', 'blog_post', 'research_note', 'academic_work'],
      message: 'Invalid article type'
    }
  },
  
  status: {
    type: String,
    required: true,
    enum: {
      values: ['published', 'under_review', 'working_paper', 'draft'],
      message: 'Invalid status'
    },
    default: 'draft'
  },
  
  // Categories and Tags
  categories: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Research Fields
  researchFields: [{
    type: String,
    enum: ['economics', 'statistics', 'data_science', 'econometrics', 'policy_analysis', 'development', 'other'],
    lowercase: true
  }],
  
  // Files (PDFs, datasets, etc.)
  files: [{
    filename: String,
    originalName: String,
    fileType: {
      type: String,
      enum: ['pdf', 'doc', 'docx', 'csv', 'xlsx']
    },
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    description: String
  }],
  
  // Links (journal, data repository, code, etc.)
  links: [{
    url: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['journal', 'preprint', 'data', 'code', 'slides', 'other'],
      default: 'other'
    }
  }],
  
  // Analytics
  views: {
    type: Number,
    default: 0
  },
  
  downloads: {
    type: Number,
    default: 0
  },
  
  // Content Management
  featured: {
    type: Boolean,
    default: false
  },
  
  published: {
    type: Boolean,
    default: true
  },
  
  publishedAt: {
    type: Date,
    default: Date.now
  },
  
  // SEO
  metaDescription: String,
  
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  }
  
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Create search index
articleSchema.index({ title: 'text', abstract: 'text', tags: 'text' });
articleSchema.index({ 'publication.year': -1 });
articleSchema.index({ published: 1, publishedAt: -1 });

// Generate slug before saving
articleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 100);
  }
  next();
});

// Virtual for formatted citation
articleSchema.virtual('citation').get(function() {
  const authors = this.authors.map(author => author.name).join(', ');
  return `${authors} (${this.publication.year}). "${this.title}"${this.publication.journal ? `. ${this.publication.journal}` : ''}`;
});

// Static method for search
articleSchema.statics.search = function(query) {
  return this.find({
    published: true,
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { abstract: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } },
      { 'authors.name': { $regex: query, $options: 'i' } }
    ]
  }).sort({ publishedAt: -1 });
};

// Method to increment views
articleSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;