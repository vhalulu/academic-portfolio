import React from 'react';
import { Code, Database, BarChart3, FileCode } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: 'Economic Data Analysis with Stata',
      description: 'Comprehensive analysis of agricultural productivity using panel data methods and spatial econometrics.',
      tech: ['Stata', 'Econometrics', 'Panel Data'],
      icon: BarChart3,
      category: 'Data Analysis'
    },
    {
      title: 'R Statistical Modeling',
      description: 'Advanced statistical modeling for development economics research using R and various machine learning techniques.',
      tech: ['R', 'ggplot2', 'dplyr', 'Machine Learning'],
      icon: Database,
      category: 'Statistical Analysis'
    },
    {
      title: 'Python Data Science Pipeline',
      description: 'End-to-end data science pipeline for economic forecasting using Python and scikit-learn.',
      tech: ['Python', 'pandas', 'scikit-learn', 'matplotlib'],
      icon: Code,
      category: 'Data Science'
    },
    {
      title: 'Academic Portfolio Website',
      description: 'Full-stack web application built with React and Node.js for showcasing academic work and research.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      icon: FileCode,
      category: 'Web Development'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem 0', background: 'white', borderRadius: '12px', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#2c3e50', marginBottom: '0.5rem' }}>Programming Portfolio</h1>
          <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Showcase of my programming skills in Stata, R, Python, and web development
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div 
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '2rem',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                  border: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ background: '#667eea', color: 'white', padding: '0.75rem', borderRadius: '10px' }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0', color: '#2c3e50', fontSize: '1.2rem' }}>{project.title}</h3>
                    <span style={{ color: '#667eea', fontSize: '0.9rem', fontWeight: '600' }}>{project.category}</span>
                  </div>
                </div>
                
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {project.description}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tech.map(tech => (
                    <span 
                      key={tech}
                      style={{
                        background: '#e8f4f8',
                        color: '#667eea',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '1rem' }}>More Projects Coming Soon</h2>
          <p style={{ color: '#666' }}>I'm continuously working on new projects and will be adding detailed case studies, code repositories, and live demos.</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;