import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, Github, Database, FileText, Eye, Download } from 'lucide-react';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterYear, setFilterYear] = useState('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, filterType, filterYear]);

  const fetchArticles = async () => {
    try {
      console.log('Fetching articles...');
      const response = await fetch('/api/articles');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Articles response:', data);
      
      // Ensure data is an array
      const articlesArray = Array.isArray(data) ? data : [];
      setArticles(articlesArray);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err.message);
      setArticles([]); // Set empty array on error
      setLoading(false);
    }
  };

  const filterArticles = () => {
    if (!Array.isArray(articles)) {
      setFilteredArticles([]);
      return;
    }
    
    let filtered = articles.filter(article => {
      const matchesSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.abstract?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesType = filterType === 'all' || article.type === filterType;
      const matchesYear = filterYear === 'all' || article.publication?.year?.toString() === filterYear;
      
      return matchesSearch && matchesType && matchesYear;
    });
    
    setFilteredArticles(filtered);
  };

  const getAvailableYears = () => {
    if (!Array.isArray(articles) || articles.length === 0) {
      return [];
    }
    const years = [...new Set(articles.map(article => article.publication?.year).filter(year => year))];
    return years.sort((a, b) => b - a);
  };

  const getLinkIcon = (type) => {
    switch(type) {
      case 'code': return <Github size={16} />;
      case 'data': return <Database size={16} />;
      case 'preprint': return <FileText size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  const getStatusBadgeClass = (status) => {
    if (!status) return 'status-default';
    switch(status) {
      case 'published': return 'status-published';
      case 'under_review': return 'status-under-review';
      case 'working_paper': return 'status-working-paper';
      default: return 'status-default';
    }
  };

  const formatStatus = (status) => {
    if (!status) return 'Unknown';
    switch(status) {
      case 'under_review': return 'Under Review';
      case 'working_paper': return 'Working Paper';
      case 'published': return 'Published';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  if (loading) {
    return (
      <div className="articles-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-page">
        <div className="container">
          <div className="error-state">
            <h2>Error Loading Articles</h2>
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchArticles}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="articles-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Research & Publications</h1>
          <p className="page-subtitle">
            Exploring development economics, data science, and policy analysis
          </p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters">
            <div className="filter-group">
              <Filter size={16} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                <option value="journal_article">Journal Articles</option>
                <option value="working_paper">Working Papers</option>
                <option value="blog_post">Blog Posts</option>
                <option value="conference_paper">Conference Papers</option>
                <option value="academic_work">Academic Work</option>
              </select>
            </div>
            
            <div className="filter-group">
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Years</option>
                {getAvailableYears().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="results-summary">
          <p>Showing {filteredArticles?.length || 0} of {articles?.length || 0} articles</p>
        </div>

        {/* Articles List */}
        <div className="articles-list">
          {!Array.isArray(filteredArticles) || filteredArticles.length === 0 ? (
            <div className="no-results">
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            filteredArticles.map(article => (
              <article key={article._id} className="article-card">
                {/* Article Header */}
                <div className="article-header">
                  <div className="article-meta">
                    <span className={`article-status ${getStatusBadgeClass(article.status)}`}>
                      {formatStatus(article.status)}
                    </span>
                    <span className="article-year">{article.publication?.year || 'N/A'}</span>
                    {article.featured && <span className="featured-badge">Featured</span>}
                  </div>
                  
                  <div className="article-stats">
                    <span className="stat">
                      <Eye size={16} />
                      {article.views || 0}
                    </span>
                    <span className="stat">
                      <Download size={16} />
                      {article.downloads || 0}
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <h2 className="article-title">
                  <a href={`/articles/${article.slug || article._id}`}>
                    {article.title}
                  </a>
                </h2>

                {/* Authors */}
                <div className="article-authors">
                  {article.authors?.map((author, index) => (
                    <span key={index} className="author">
                      {author.name}
                      {author.isMainAuthor && <span className="main-author-indicator">*</span>}
                      {index < article.authors.length - 1 && ', '}
                    </span>
                  ))}
                </div>

                {/* Publication Info */}
                {article.publication?.journal && (
                  <div className="publication-info">
                    <strong>{article.publication.journal}</strong>
                    {article.publication.volume && (
                      <span>, Vol. {article.publication.volume}</span>
                    )}
                    {article.publication.pages && (
                      <span>, pp. {article.publication.pages}</span>
                    )}
                    <span> ({article.publication.year})</span>
                  </div>
                )}

                {/* Abstract */}
                <p className="article-abstract">
                  {article.abstract}
                </p>

                {/* Links Section */}
                <div className="article-links">
                  {/* Main Publication Link */}
                  {article.publication?.url && (
                    <a 
                      href={article.publication.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="article-link main-link"
                    >
                      <ExternalLink size={16} />
                      View Article
                    </a>
                  )}
                  
                  {/* DOI Link */}
                  {article.publication?.doi && (
                    <a 
                      href={`https://doi.org/${article.publication.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="article-link doi-link"
                    >
                      <ExternalLink size={16} />
                      DOI: {article.publication.doi}
                    </a>
                  )}

                  {/* Additional Links */}
                  {article.links && article.links.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`article-link ${link.type}-link`}
                      title={link.description}
                    >
                      {getLinkIcon(link.type)}
                      {link.description}
                    </a>
                  ))}
                </div>

                {/* Tags */}
                <div className="article-footer">
                  <div className="article-tags">
                    {article.tags?.slice(0, 5).map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                    {article.tags && article.tags.length > 5 && (
                      <span className="tag more-tags">
                        +{article.tags.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;