import React from 'react';
import { Github, Linkedin, Mail, BookOpen } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:your.email@university.edu',
      color: '#EA4335'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/yourprofile',
      color: '#0077B5'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/yourusername',
      color: '#333'
    },
    {
      name: 'Google Scholar',
      icon: BookOpen,
      href: 'https://scholar.google.com/citations?user=yourid',
      color: '#4285F4'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-title">About</h3>
            <p className="footer-text">
              Economist and data scientist specializing in development economics, 
              econometrics, and statistical analysis using R, Stata, and Python.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/articles">Research Articles</a></li>
              <li><a href="/portfolio">Programming Portfolio</a></li>
              <li><a href="/resume">Resume & CV</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Research Interests */}
          <div className="footer-section">
            <h3 className="footer-title">Research Interests</h3>
            <ul className="footer-links">
              <li>Development Economics</li>
              <li>Data Science</li>
              <li>Econometrics</li>
              <li>Statistical Analysis</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <div className="social-links">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="social-link"
                    aria-label={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--hover-color': link.color }}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-copyright">
            <p>© {currentYear} Vincent Alulu. All rights reserved.</p>
            <p className="footer-built">
              Built with React & Node.js | Academic Portfolio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;