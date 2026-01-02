// api/articles.js
// Vercel Serverless Function - Replicates your Express backend exactly
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, query } = req;
  const { slug } = query;

  try {
    // Route: GET /api/articles/featured/list
    if (slug === 'featured' && query.list === undefined) {
      // This handles /api/articles/featured/list
      const limit = parseInt(query.limit) || 5;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('featured', true)
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      
      console.log(`Found ${data.length} featured articles`);
      return res.status(200).json(data);
    }

    // Route: GET /api/articles (all articles)
    if (method === 'GET' && !slug) {
      const {
        page = 1,
        limit = 10,
        search,
        category,
        type,
        year,
        featured
      } = query;

      let queryBuilder = supabase
        .from('articles')
        .select('*', { count: 'exact' })
        .eq('published', true)
        .order('published_at', { ascending: false });

      // Add filters
      if (search) {
        queryBuilder = queryBuilder.or(
          `title.ilike.%${search}%,abstract.ilike.%${search}%,tags.cs.{${search}}`
        );
      }

      if (category) {
        queryBuilder = queryBuilder.contains('categories', [category]);
      }

      if (type) {
        queryBuilder = queryBuilder.eq('type', type);
      }

      if (year) {
        queryBuilder = queryBuilder.eq('publication->>year', year);
      }

      if (featured === 'true') {
        queryBuilder = queryBuilder.eq('featured', true);
      }

      // Pagination
      const limitNum = parseInt(limit);
      const offset = (parseInt(page) - 1) * limitNum;
      
      queryBuilder = queryBuilder.range(offset, offset + limitNum - 1);

      const { data, error, count } = await queryBuilder;

      if (error) throw error;

      console.log(`Found ${data.length} articles (${count} total)`);
      
      // Return just the articles array (matching Express behavior)
      return res.status(200).json(data);
    }

    // Route: GET /api/articles/:slug (single article by slug or ID)
    if (method === 'GET' && slug) {
      console.log('Fetching article:', slug);

      let article;

      // Try to find by slug first
      const { data: slugData, error: slugError } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (slugData) {
        article = slugData;
      } else {
        // Try to find by UUID (in case someone uses ID)
        const { data: idData, error: idError } = await supabase
          .from('articles')
          .select('*')
          .eq('id', slug)
          .eq('published', true)
          .single();

        if (idData) {
          article = idData;
        }
      }

      if (!article) {
        return res.status(404).json({
          success: false,
          error: 'Article not found'
        });
      }

      // Increment view count (using Supabase function)
      try {
        await supabase.rpc('increment_views', { article_id: article.id });
        console.log('View count incremented');
      } catch (err) {
        console.warn('Could not increment view count:', err.message);
      }

      console.log(`Article found: ${article.title}`);
      return res.status(200).json(article);
    }

    // Method not allowed
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ 
      error: `Method ${method} Not Allowed` 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to process request',
      message: error.message 
    });
  }
}
