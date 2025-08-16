import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Contact form submission coming soon! For now, please email directly.');
    console.log('Form data:', formData);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#2c3e50', marginBottom: '0.5rem' }}>Get In Touch</h1>
          <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Interested in collaboration, consulting, or discussing research? I'd love to hear from you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Contact Information */}
          <div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2c3e50', marginBottom: '1.5rem' }}>Contact Information</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#667eea', color: 'white', padding: '0.75rem', borderRadius: '10px' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#2c3e50' }}>Email</h3>
                    <p style={{ margin: '0', color: '#666' }}>valulue@ucsd.edu</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#667eea', color: 'white', padding: '0.75rem', borderRadius: '10px' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#2c3e50' }}>Phone</h3>
                    <p style={{ margin: '0', color: '#666' }}>+1 (858) 241-4795</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#667eea', color: 'white', padding: '0.75rem', borderRadius: '10px' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#2c3e50' }}>Location</h3>
                    <p style={{ margin: '0', color: '#666' }}>La Jolla, California, USA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2c3e50', marginBottom: '1.5rem' }}>Connect Online</h2>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a 
                  href="https://www.linkedin.com/in/vincent-alulu-14979275/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '50px', 
                    height: '50px', 
                    background: '#0077B5', 
                    color: 'white', 
                    borderRadius: '10px', 
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Linkedin size={24} />
                </a>
                
                <a 
                  href="https://github.com/vhalulu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '50px', 
                    height: '50px', 
                    background: '#333', 
                    color: 'white', 
                    borderRadius: '10px', 
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2c3e50', marginBottom: '1.5rem' }}>Send a Message</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2c3e50' }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2c3e50' }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2c3e50' }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2c3e50' }}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'background 0.3s ease'
                }}
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;