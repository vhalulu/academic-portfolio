// src/pages/Home.js
// UPDATED: Supabase integration for featured articles
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code, TrendingUp, Users, Download, Eye } from 'lucide-react';
import { articlesAPI } from '../lib/supabase';
import './Home.css';

const Home = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeaturedArticles();
  }, []);

  const loadFeaturedArticles = async () => {
    try {
      setLoading(true);
      
      // Fetch featured articles from Supabase
      const data = await articlesAPI.getFeatured(3); // Get 3 featured articles
      
      console.log('Featured articles data:', data);
      
      // Ensure we have an array
      const articlesArray = Array.isArray(data) ? data : [];
      setFeaturedArticles(articlesArray);
      setError(null);
    } catch (err) {
      console.error('Error loading featured articles:', err);
      setError(err.message);
      setFeaturedArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    { name: 'Stata', level: 95, color: '#1f4788' },
    { name: 'R', level: 90, color: '#276dc3' },
    { name: 'Python', level: 85, color: '#3776ab' },
    { name: 'Econometrics', level: 92, color: '#e74c3c' },
    { name: 'Data Analysis', level: 94, color: '#27ae60' },
    { name: 'JavaScript', level: 80, color: '#f39c12' }
  ];

  const stats = [
    { label: 'Research Articles', value: '4+', icon: BookOpen },
    { label: 'Programming Projects', value: '25+', icon: Code },
    { label: 'Collaborations', value: '8+', icon: Users },
    { label: 'Citations', value: '150+', icon: TrendingUp }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-photo-section">
              <div className="profile-photo">
                <img 
                  src="/images/profile.jpg" 
                  alt="Vincent Alulu - Economist & Data Scientist"
                  className="profile-image"
                  onError={(e) => {
                    // Hide image if not found
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
            
            <div className="hero-text-section">
              <div className="hero-text">
                <h1 className="hero-title">
                  <span className="hero-greeting">Hello, I'm</span>
                  <span className="hero-name">Vincent Alulu</span>
                  <span className="hero-role">Economist & Data Scientist</span>
                </h1>
                <p className="hero-description">
                  Specializing in development economics, agricultural data systems, and policy analysis. 
                  I use statistical programming languages like Stata, R, and Python to uncover 
                  insights from complex economic data and inform evidence-based policy decisions.
                </p>
                <div className="hero-actions">
                  <Link to="/articles" className="btn btn-primary">
                    <BookOpen size={20} />
                    View Research
                  </Link>
                  <Link to="/resume" className="btn btn-secondary">
                    <Code size={20} />
                    See Experience
                  </Link>
                </div>
              </div>
              
              <div className="hero-stats">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="stat-item" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Proficient in statistical programming and econometric analysis
          </p>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-fill" 
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: skill.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="featured-articles">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Research</h2>
            <p className="section-subtitle">
              Recent publications and working papers in economics and data science
            </p>
            <Link to="/articles" className="view-all-link">
              View All Articles <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading featured articles...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Unable to load articles: {error}</p>
              <button onClick={loadFeaturedArticles} className="retry-btn">
                Try Again
              </button>
            </div>
          ) : (
            <div className="articles-grid">
              {featuredArticles.length > 0 ? featuredArticles.map((article) => (
                <article key={article.id} className="article-card">
                  <div className="article-header">
                    <div className="article-meta">
                      <span className="article-type">{(article.type || 'article').replace('_', ' ')}</span>
                      <span className="article-year">{article.publication?.year || 'No date'}</span>
                    </div>
                    <div className="article-stats">
                      <span className="stat">
                        <Eye size={14} />
                        {article.views || 0}
                      </span>
                      <span className="stat">
                        <Download size={14} />
                        {article.downloads || 0}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="article-title">
                    {article.publication?.url ? (
                      <a 
                        href={article.publication.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {article.title || 'Untitled Article'}
                      </a>
                    ) : (
                      <span>{article.title || 'Untitled Article'}</span>
                    )}
                  </h3>
                  
                  <p className="article-abstract">
                    {(article.abstract || 'No abstract available').substring(0, 150)}...
                  </p>
                  
                  <div className="article-footer">
                    <div className="article-tags">
                      {(article.tags || []).slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                    {article.publication?.url && (
                      <a 
                        href={article.publication.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="read-more"
                      >
                        Read Article <ArrowRight size={14} />
                      </a>
                    )}
                    {article.publication?.doi && (
                      <a 
                        href={`https://doi.org/${article.publication.doi}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="read-more doi-link"
                      >
                        DOI <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                </article>
              )) : (
                <div className="no-articles">
                  <p>No featured articles available.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Let's Collaborate</h2>
            <p className="cta-description">
              Interested in research collaboration, consulting, or discussing economic data analysis? 
              I'd love to hear from you.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary">
                Get In Touch
              </Link>
              <Link to="/resume" className="btn btn-outline">
                Download CV
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
