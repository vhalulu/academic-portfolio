# Environment Variables for Academic Portfolio
# Copy this to .env.local and fill in your actual values

# Supabase Configuration (for frontend - React app)
REACT_APP_SUPABASE_URL=ucqnwflnfaumguasssqc
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcW53ZmxuZmF1bWd1YXNzc3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczODAyMjQsImV4cCI6MjA4Mjk1NjIyNH0.KF26nriqjkz1XphBxlnIkGT92ELMPZ33RQMb6xQpsok

# Supabase Configuration (for serverless functions)
SUPABASE_URL=ucqnwflnfaumguasssqc
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcW53ZmxuZmF1bWd1YXNzc3FjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzM4MDIyNCwiZXhwIjoyMDgyOTU2MjI0fQ.JG36EbNvTrUjV7IThuTFeuzGS86eGidoLXfKVYJYLLA

# Old MongoDB URI (only needed for migration)
MONGODB_URI=mongodb+srv://harryalulu:BIIk8U6TUTVRm38K@cluster0.6a4cxd4.mongodb.net/academic-portfolio?retryWrites=true&w=majority&appName=Cluster0

# Note: 
# - REACT_APP_* variables are exposed to the browser
# - Use SUPABASE_SERVICE_KEY only in serverless functions, never in frontend
# - Get these values from your Supabase project settings: 
#   https://app.supabase.com/project/YOUR_PROJECT/settings/api
