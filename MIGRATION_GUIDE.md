# Academic Portfolio Migration Guide
## MongoDB to Supabase + Vercel Deployment

This guide will help you migrate your academic portfolio from a MongoDB + Express backend to Supabase (PostgreSQL) with Vercel deployment.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Restructuring Steps](#project-restructuring-steps)
3. [Supabase Setup](#supabase-setup)
4. [Data Migration](#data-migration)
5. [Code Updates](#code-updates)
6. [Deployment to Vercel](#deployment-to-vercel)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (free tier available)
- Vercel account (free tier available)
- Git installed

---

## Project Restructuring Steps

### Step 1: Backup Your Current Project
```bash
# Create a backup of your current project
cp -r academic-portfolio academic-portfolio-backup
```

### Step 2: Create New Project Structure

```bash
cd academic-portfolio

# Create new directory structure
mkdir -p src/lib api scripts

# Move frontend files to root
mv frontend/src/* src/
mv frontend/public/* public/
mv frontend/package.json package-temp.json

# Clean up old structure (after verifying everything is moved)
# Don't delete yet - we'll need backend models for migration
```

### Step 3: Install New Dependencies

```bash
# Remove old package.json and node_modules
rm -rf node_modules package-lock.json

# Install dependencies
npm install @supabase/supabase-js react react-dom react-router-dom react-scripts

# Install dev dependencies for migration
npm install --save-dev dotenv mongoose
```

---

## Supabase Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Name: academic-portfolio
   - Database Password: (save this securely)
   - Region: Choose closest to your users
   - Pricing: Free tier is fine

### Step 2: Create Database Tables

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Run this SQL:

```sql
-- Create articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  category TEXT,
  tags TEXT[],
  published_date TIMESTAMP DEFAULT NOW(),
  updated_date TIMESTAMP DEFAULT NOW(),
  image_url TEXT,
  slug TEXT UNIQUE,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create users table (if you need it)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published_date ON articles(published_date DESC);
CREATE INDEX idx_articles_category ON articles(category);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Articles are viewable by everyone"
  ON articles FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users are viewable by everyone"
  ON users FOR SELECT
  USING (true);

-- Optional: Create policies for authenticated writes
-- Uncomment if you plan to add authentication later
-- CREATE POLICY "Authenticated users can insert articles"
--   ON articles FOR INSERT
--   WITH CHECK (auth.role() = 'authenticated');
-- 
-- CREATE POLICY "Authenticated users can update their articles"
--   ON articles FOR UPDATE
--   USING (auth.uid() = author_id);
```

### Step 3: Get Supabase Credentials

1. Go to Project Settings → API
2. Copy these values:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### Step 4: Create Environment File

Create `.env.local` in your project root:

```env
# Frontend variables (exposed to browser)
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# Backend variables (for serverless functions)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Old MongoDB URI (for migration only)
MONGODB_URI=mongodb://localhost:27017/academic-portfolio
```

---

## Data Migration

### Step 1: Review Migration Script

The migration script (`scripts/migrateToSupabase.js`) will:
- Connect to your MongoDB database
- Fetch all articles
- Transform them to match Supabase schema
- Insert them into Supabase

### Step 2: Customize Migration (if needed)

Edit `scripts/migrateToSupabase.js` to match your MongoDB schema:

```javascript
// Adjust this transformation based on your MongoDB model
const supabaseArticle = {
  title: article.title,
  content: article.content,
  author: article.author,
  // Add/modify fields as needed
};
```

### Step 3: Run Migration

```bash
# Make sure your MongoDB server is running
# Then run the migration
npm run migrate
```

Expected output:
```
Connecting to MongoDB...
Fetching articles from MongoDB...
Found 15 articles to migrate
Migrating to Supabase...
✓ Migrated: Introduction to Machine Learning
✓ Migrated: Data Science Best Practices
...
=== Migration Summary ===
Total articles: 15
Successfully migrated: 15
Errors: 0
```

### Step 4: Verify Migration

1. Go to Supabase dashboard → Table Editor
2. Check the `articles` table
3. Verify all your data is there

---

## Code Updates

### Step 1: Add Supabase Client Files

Copy the provided files to your project:
- `src/lib/supabase.js` - Supabase client configuration
- `api/articles.js` - Serverless API function

### Step 2: Update React Components

Update your components to use the new Supabase client:

**Old approach (using fetch to Express backend):**
```javascript
const response = await fetch('http://localhost:5000/api/articles');
const articles = await response.json();
```

**New approach (using Supabase client):**
```javascript
import { articlesAPI } from '../lib/supabase';
const articles = await articlesAPI.getAll();
```

### Step 3: Update All Components

Replace all API calls in these files:
- `src/pages/Articles.js` → Use provided example
- `src/pages/ArticleDetail.js` → Use provided example
- Any other components that fetch article data

### Step 4: Remove Backend Dependencies

After confirming everything works:

```bash
# Remove old backend folder
rm -rf backend

# Update .gitignore
echo "# Environment variables" >> .gitignore
echo ".env.local" >> .gitignore
echo "
# Vercel" >> .gitignore
echo ".vercel" >> .gitignore
```

---

## Deployment to Vercel

### Step 1: Prepare for Deployment

```bash
# Test local build
npm run build

# Make sure build succeeds
```

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and login
2. Click "Add New Project"
3. Import your Git repository (or connect GitHub)

### Step 3: Configure Environment Variables

In Vercel project settings → Environment Variables, add:

```
REACT_APP_SUPABASE_URL = https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY = your-anon-key
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_SERVICE_KEY = your-service-role-key
```

Make sure to add them for all environments (Production, Preview, Development).

### Step 4: Deploy

```bash
# Install Vercel CLI (optional but recommended)
npm install -g vercel

# Deploy from command line
vercel

# Or push to your main branch if connected to Git
git add .
git commit -m "Migrate to Supabase and Vercel"
git push origin main
```

### Step 5: Verify Deployment

1. Vercel will provide a deployment URL
2. Visit the URL and test all features:
   - Homepage loads
   - Articles page displays all articles
   - Individual article pages work
   - Navigation works
   - Filters work (if applicable)

---

## Testing

### Local Testing Checklist

- [ ] Articles page loads and displays all articles
- [ ] Article detail pages load correctly
- [ ] Filtering by category works
- [ ] Filtering by tag works
- [ ] Images display correctly
- [ ] Navigation between pages works
- [ ] Responsive design works on mobile

### Production Testing Checklist

- [ ] All local tests pass on production URL
- [ ] No console errors
- [ ] API routes work (`/api/articles`)
- [ ] Static assets load correctly
- [ ] Site is accessible from different devices

---

## Troubleshooting

### Common Issues

#### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

#### "Articles not loading"
1. Check browser console for errors
2. Verify environment variables in `.env.local`
3. Check Supabase RLS policies
4. Verify data exists in Supabase table

#### "Vercel build fails"
1. Check that all environment variables are set in Vercel
2. Verify `vercel.json` configuration
3. Check build logs in Vercel dashboard

#### "API routes not working on Vercel"
1. Verify `api/` folder exists in root
2. Check `vercel.json` routes configuration
3. Ensure environment variables include `SUPABASE_SERVICE_KEY`

#### "Images not loading"
1. Verify images are in `public/images/`
2. Update image paths to use relative URLs
3. Check if Supabase Storage is needed for user-uploaded images

### Getting Help

If you encounter issues:
1. Check Supabase logs: Dashboard → Logs
2. Check Vercel logs: Project → Deployments → View logs
3. Review browser console errors
4. Check Network tab for failed requests

---

## Next Steps

After successful migration:

1. **Add Authentication** (optional)
   - Set up Supabase Auth
   - Add login/register pages
   - Protect article creation/editing

2. **Optimize Performance**
   - Add caching with React Query or SWR
   - Implement pagination for articles
   - Add image optimization

3. **Enhance Features**
   - Add search functionality
   - Implement comments system
   - Add analytics

4. **Monitor and Maintain**
   - Set up Vercel Analytics
   - Monitor Supabase usage
   - Regular backups of database

---

## Cost Considerations

**Supabase Free Tier:**
- 500MB database space
- 1GB file storage
- 50MB bandwidth

**Vercel Free Tier:**
- 100GB bandwidth
- Unlimited deployments
- Automatic HTTPS

Both are sufficient for personal academic portfolios. Monitor usage and upgrade if needed.

---

## Rollback Plan

If you need to rollback:

1. You still have `academic-portfolio-backup` folder
2. MongoDB data is unchanged (migration only reads, doesn't delete)
3. Can redeploy old backend on other platforms (Railway, Render, etc.)

---

## Summary

You've successfully:
✅ Migrated from MongoDB to Supabase
✅ Consolidated backend and frontend into one project
✅ Replaced Express server with Vercel Serverless Functions
✅ Deployed to Vercel with automatic HTTPS
✅ Set up a modern, scalable architecture

Your portfolio is now:
- Faster (Supabase is optimized for reads)
- Cheaper (both free tiers are generous)
- Easier to maintain (one codebase)
- More scalable (serverless auto-scales)
- More secure (Supabase RLS + Vercel security)

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Supabase + React Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
