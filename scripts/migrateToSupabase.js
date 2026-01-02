// scripts/migrateToSupabase.js
// Updated migration script for complete Article.js schema
// Run this script to migrate your MongoDB data to Supabase
// Usage: node scripts/migrateToSupabase.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { MongoClient } = require('mongodb');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function migrateArticles() {
  let mongoClient;
  
  try {
    console.log('=== Academic Portfolio Migration to Supabase ===\n');
    
    console.log('Connecting to MongoDB...');
    
    // Use MongoDB driver directly to avoid Mongoose timeout issues
    mongoClient = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 60000,
    });
    
    await mongoClient.connect();
    console.log('✓ Connected to MongoDB\n');
    
    console.log('Fetching articles from MongoDB...');
    const db = mongoClient.db('academic-portfolio');
    const articles = await db.collection('articles').find({}).toArray();
    console.log(`✓ Found ${articles.length} articles to migrate\n`);

    if (articles.length === 0) {
      console.log('No articles to migrate. Exiting...');
      return;
    }

    console.log('Starting migration to Supabase...\n');
    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (const article of articles) {
      try {
        // Transform MongoDB document to Supabase format
        const supabaseArticle = {
          // Basic Information
          title: article.title,
          abstract: article.abstract,
          content: article.content || null,
          
          // Authors - convert array to JSON
          authors: (article.authors || []).map(author => ({
            name: author.name,
            affiliation: author.affiliation || null,
            email: author.email || null,
            isMainAuthor: author.isMainAuthor || false
          })),
          
          // Publication Details - convert to JSON object
          publication: {
            journal: article.publication?.journal || null,
            year: article.publication?.year || new Date().getFullYear(),
            volume: article.publication?.volume || null,
            pages: article.publication?.pages || null,
            doi: article.publication?.doi || null,
            url: article.publication?.url || null
          },
          
          // Classification
          type: article.type,
          status: article.status,
          
          // Categories and Tags - convert to PostgreSQL arrays
          categories: article.categories || [],
          tags: article.tags || [],
          
          // Research Fields
          research_fields: article.researchFields || [],
          
          // Files - convert to JSON
          files: (article.files || []).map(file => ({
            filename: file.filename,
            originalName: file.originalName,
            fileType: file.fileType,
            size: file.size,
            uploadDate: file.uploadDate || new Date().toISOString(),
            description: file.description || null
          })),
          
          // Links - convert to JSON
          links: (article.links || []).map(link => ({
            url: link.url,
            description: link.description,
            type: link.type || 'other'
          })),
          
          // Analytics
          views: article.views || 0,
          downloads: article.downloads || 0,
          
          // Content Management
          featured: article.featured || false,
          published: article.published !== undefined ? article.published : true,
          published_at: article.publishedAt || article.createdAt || new Date().toISOString(),
          
          // SEO
          meta_description: article.metaDescription || null,
          slug: article.slug || generateSlug(article.title),
          
          // Timestamps
          created_at: article.createdAt || new Date().toISOString(),
          updated_at: article.updatedAt || new Date().toISOString()
        };

        // Insert into Supabase
        const { data, error } = await supabase
          .from('articles')
          .insert([supabaseArticle])
          .select();

        if (error) {
          console.error(`✗ Error migrating "${article.title}":`, error.message);
          errors.push({ title: article.title, error: error.message });
          errorCount++;
        } else {
          console.log(`✓ Migrated: ${article.title}`);
          console.log(`  - Type: ${article.type}`);
          console.log(`  - Status: ${article.status}`);
          console.log(`  - Authors: ${article.authors?.length || 0}`);
          console.log(`  - Year: ${article.publication?.year || 'N/A'}`);
          console.log(`  - Slug: ${supabaseArticle.slug}\n`);
          successCount++;
        }
      } catch (err) {
        console.error(`✗ Error processing article "${article.title}":`, err.message);
        errors.push({ title: article.title, error: err.message });
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total articles:         ${articles.length}`);
    console.log(`Successfully migrated:  ${successCount}`);
    console.log(`Errors:                 ${errorCount}`);
    console.log('='.repeat(60));

    if (errors.length > 0) {
      console.log('\n❌ ERRORS ENCOUNTERED:\n');
      errors.forEach(({ title, error }, index) => {
        console.log(`${index + 1}. ${title}`);
        console.log(`   Error: ${error}\n`);
      });
    }

    if (successCount > 0) {
      console.log('\n✅ Migration completed successfully!');
      console.log('\nNext steps:');
      console.log('1. Verify data in Supabase dashboard → Table Editor');
      console.log('2. Test your app locally: npm start');
      console.log('3. Deploy to Vercel when ready\n');
    }

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    console.error('\nTroubleshooting:');
    console.error('- Check MongoDB Atlas cluster is active (not paused)');
    console.error('- Verify MONGODB_URI in .env.local');
    console.error('- Ensure Supabase credentials are correct');
    console.error('- Check your network connection');
    console.error('- Verify IP address is whitelisted in MongoDB Atlas\n');
  } finally {
    if (mongoClient) {
      await mongoClient.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

// Run migration
console.log('Starting migration process...\n');
migrateArticles()
  .then(() => {
    console.log('Migration process completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });