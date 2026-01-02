// src/lib/supabase.js
// Updated Supabase client for complete Article schema
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for articles
export const articlesAPI = {
  /**
   * Get all articles with optional filters
   * @param {Object} filters - { type, status, category, tag, researchField, featured, year }
   * @param {Object} options - { limit, offset, sortBy, sortOrder }
   */
  async getAll(filters = {}, options = {}) {
    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('published', true);

    // Apply filters
    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.category) {
      query = query.contains('categories', [filters.category]);
    }

    if (filters.tag) {
      query = query.contains('tags', [filters.tag]);
    }

    if (filters.researchField) {
      query = query.contains('research_fields', [filters.researchField]);
    }

    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    if (filters.year) {
      query = query.eq('publication->>year', filters.year.toString());
    }

    // Apply sorting
    const sortBy = options.sortBy || 'published_at';
    const sortOrder = options.sortOrder || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error, count } = await query;
    
    if (error) throw error;
    return { articles: data, total: count };
  },

  /**
   * Get article by slug
   */
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    
    // Increment views
    if (data) {
      await this.incrementViews(data.id);
    }
    
    return data;
  },

  /**
   * Get article by ID
   */
  async getById(id) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Search articles by keyword
   */
  async search(query) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .or(`title.ilike.%${query}%,abstract.ilike.%${query}%,tags.cs.{${query}}`)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Get featured articles
   */
  async getFeatured(limit = 5) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  /**
   * Get recent articles
   */
  async getRecent(limit = 10) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  /**
   * Get articles by type
   */
  async getByType(type, limit = null) {
    let query = supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('type', type)
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  /**
   * Get articles by year
   */
  async getByYear(year) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('publication->>year', year.toString())
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Get unique categories
   */
  async getCategories() {
    const { data, error } = await supabase
      .from('articles')
      .select('categories')
      .eq('published', true);

    if (error) throw error;

    // Flatten and get unique categories
    const categories = new Set();
    data.forEach(article => {
      (article.categories || []).forEach(cat => categories.add(cat));
    });
    
    return Array.from(categories).sort();
  },

  /**
   * Get unique tags
   */
  async getTags() {
    const { data, error } = await supabase
      .from('articles')
      .select('tags')
      .eq('published', true);

    if (error) throw error;

    // Flatten and get unique tags
    const tags = new Set();
    data.forEach(article => {
      (article.tags || []).forEach(tag => tags.add(tag));
    });
    
    return Array.from(tags).sort();
  },

  /**
   * Get unique research fields
   */
  async getResearchFields() {
    const { data, error } = await supabase
      .from('articles')
      .select('research_fields')
      .eq('published', true);

    if (error) throw error;

    // Flatten and get unique fields
    const fields = new Set();
    data.forEach(article => {
      (article.research_fields || []).forEach(field => fields.add(field));
    });
    
    return Array.from(fields).sort();
  },

  /**
   * Increment article views
   */
  async incrementViews(id) {
    const { error } = await supabase.rpc('increment_views', { article_id: id });
    if (error) console.error('Error incrementing views:', error);
  },

  /**
   * Increment article downloads
   */
  async incrementDownloads(id) {
    const { error } = await supabase.rpc('increment_downloads', { article_id: id });
    if (error) console.error('Error incrementing downloads:', error);
  },

  // Admin functions (require authentication)
  /**
   * Create new article
   */
  async create(article) {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update article
   */
  async update(id, updates) {
    const { data, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete article
   */
  async delete(id) {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};

// Utility functions
export const utils = {
  /**
   * Format authors for display
   */
  formatAuthors(authors) {
    if (!authors || authors.length === 0) return 'Unknown Author';
    
    const authorNames = authors.map(a => a.name);
    if (authorNames.length === 1) return authorNames[0];
    if (authorNames.length === 2) return authorNames.join(' and ');
    
    const lastAuthor = authorNames.pop();
    return `${authorNames.join(', ')}, and ${lastAuthor}`;
  },

  /**
   * Format citation
   */
  formatCitation(article) {
    const authors = this.formatAuthors(article.authors);
    const year = article.publication?.year || 'n.d.';
    const journal = article.publication?.journal;
    
    let citation = `${authors} (${year}). "${article.title}"`;
    if (journal) citation += `. ${journal}`;
    if (article.publication?.doi) citation += `. doi:${article.publication.doi}`;
    
    return citation;
  },

  /**
   * Format publication year
   */
  formatYear(article) {
    return article.publication?.year || new Date(article.published_at).getFullYear();
  },

  /**
   * Get article type label
   */
  getTypeLabel(type) {
    const labels = {
      journal_article: 'Journal Article',
      conference_paper: 'Conference Paper',
      working_paper: 'Working Paper',
      blog_post: 'Blog Post',
      research_note: 'Research Note',
      academic_work: 'Academic Work'
    };
    return labels[type] || type;
  },

  /**
   * Get status label
   */
  getStatusLabel(status) {
    const labels = {
      published: 'Published',
      under_review: 'Under Review',
      working_paper: 'Working Paper',
      draft: 'Draft'
    };
    return labels[status] || status;
  }
};
