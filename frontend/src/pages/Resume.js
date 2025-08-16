import React from 'react';
import { Download, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import './Resume.css';

const Resume = () => {
  return (
    <div className="resume-page">
      <div className="resume-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Resume & CV</h1>
          <p className="page-subtitle">Academic and professional experience</p>
        </div>

        {/* Resume Content */}
        <div className="resume-content">
          
          {/* Personal Info */}
          <div className="personal-info">
            <h1 className="full-name">Vincent Alulu</h1>
            <h2 className="professional-title">Economist & Data Scientist</h2>
            
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>valulu@ucsd.edu</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (858) 241-4795</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>La Jolla, California, USA</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <section className="resume-section">
            <h3 className="section-title">Education</h3>
            
            <div className="education-item">
              <div className="education-header">
                <div className="education-details">
                  <h4 className="degree-title">Master of Public Policy</h4>
                  <p className="institution">University of California, San Diego, USA</p>
                </div>
                <span className="date-range">
                  <Calendar size={14} />
                  2024 - Present
                </span>
              </div>
              <p className="specialization">Specialization: Program Design and Evaluation</p>
            </div>

            <div className="education-item">
              <div className="education-header">
                <div className="education-details">
                  <h4 className="degree-title">MicroMasters in Data, Economics and Design of Policy</h4>
                  <p className="institution">Massachusetts Institute of Technology, USA, Virtual</p>
                </div>
                <span className="date-range">
                  <Calendar size={14} />
                  2019 - 2021
                </span>
              </div>
              <p className="specialization">Specialization: Econometrics and Statistics</p>
            </div>

            <div className="education-item">
              <div className="education-header">
                <div className="education-details">
                  <h4 className="degree-title">Master of Science in Applied Statistics</h4>
                  <p className="institution">Jomo Kenyatta University of Agriculture and Technology, Kenya</p>
                </div>
                <span className="date-range">
                  <Calendar size={14} />
                  2015 - 2017
                </span>
              </div>
              <p className="specialization">Specialization: Applied Statistics</p>
            </div>

            <div className="education-item">
              <div className="education-header">
                <div className="education-details">
                  <h4 className="degree-title">Bachelor of Science in Applied Statistics</h4>
                  <p className="institution">Jomo Kenyatta University of Agriculture and Technology, Kenya</p>
                </div>
                <span className="date-range">
                  <Calendar size={14} />
                  2008 - 2012
                </span>
              </div>
              <p className="specialization">Specialization: Applied Statistics</p>
            </div>
          </section>

          {/* Experience */}
          <section className="resume-section">
            <h3 className="section-title">Professional Experience</h3>
            
            <div className="experience-item">
              <div className="experience-header">
                <div className="experience-details">
                  <h4 className="position-title">Research Assistant, School of Global Policy and Strategy</h4>
                  <p className="company">University of California San Diego, USA</p>
                </div>
                <span className="date-range">
                  <Calendar size={14} />
                  Jul 2025 - Present
                </span>
              </div>
              <div className="job-description">
                <ul className="job-responsibilities">
                  <li>
                    <strong>Research & Analysis:</strong> Conduct development economics research using advanced statistical methods in Stata, 
                    including modifying scripts and analyzing complex datasets to support policy initiatives.
                  </li>
                  <li>
                    <strong>Publication & Documentation:</strong> Review academic manuscripts, address reviewer feedback, and organize/edit 
                    LaTeX files to ensure compliance with publication standards.
                  </li>
                </ul>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div className="experience-details">
                  <h4 className="position-title">Senior Research Officer, Index Based Livestock Insurance (IBLI)</h4>
                  <p className="company">International Livestock Research Institute, Kenya</p>
                </div>
                <span className="date-range">
                  <Calendar size={14} />
                  Apr 2018 - Aug 2024
                </span>
              </div>
              <div className="job-description">
                <ul className="job-responsibilities">
                  <li>
                    <strong>Project Coordination:</strong> Coordinated the implementation of the Drought Index-insurance for Resilience in the Sahel 
                    and Horn of Africa (DIRISHA) project in Ethiopia and Kenya by identifying research questions, 
                    leading the development of research design and tools, engaging in field research, managing and 
                    analyzing data as well as drawing insights from the data while expanding implementing sites by 300%.
                  </li>
                  <li>
                    <strong>Capacity Building:</strong> Identified capacity building gaps among project staff, engaged those with limited capacity in 
                    statistical package STATA, and trained them while increasing STATA use among project team by 25%.
                  </li>
                  <li>
                    <strong>Application Development:</strong> Collaborated with a team of 4 developers to successfully develop a crowdsourcing high frequency 
                    data gathering application named Kaznet that is now available on Google Play Store and can be used 
                    by implementing partners and pastoralists to collect information in hard-to-reach dryland locations.
                  </li>
                  <li>
                    <strong>Data Management:</strong> Managed data in STATA by cleaning datasets such as the National Drought Management Authority (NDMA) 
                    and high frequency data from Kaznet by identifying and removing duplicates, identifying and resolving 
                    outliers, renaming various indicators for consistency, merging extensive files and archiving them for future use.
                  </li>
                  <li>
                    <strong>Routine Analysis:</strong> Developed and ran ad hoc data analysis scripts in STATA & R, producing insights on 
                    impact of drought on various household welfare indicators like number of animals owned, food security, 
                    productivity indicators like milk production and coping mechanisms. These informed project leadership 
                    on progress on various interventions; for instance, does purchase of livestock insurance increase livestock 
                    ownership among poor households?
                  </li>
                  <li>
                    <strong>Research Writing:</strong> Authored project research manuscripts by conducting literature reviews, identifying research questions, 
                    stating research problems, expounding on methodology and conducting data analysis.
                  </li>
                </ul>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div className="experience-details">
                  <h4 className="position-title">Data Manager, Afya Halisi Project</h4>
                  <p className="company">Jhpiego, Kenya</p>
                </div>
                <span className="date-range">
                  <Calendar size={14} />
                  Jan 2018 - Apr 2018
                </span>
              </div>
              <div className="job-description">
                <ul className="job-responsibilities">
                  <li>
                    Developed project databases in Excel for gathering data from 100 health facilities in 10 counties
                    in Nyanza and Eastern regions of Kenya.
                  </li>
                  <li>
                    Developed data collection tools in REDCap, data management protocols, data visualizations in Excel 
                    as well as data analysis plans.
                  </li>
                </ul>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div className="experience-details">
                  <h4 className="position-title">Data Manager, Mentorship Program</h4>
                  <p className="company">Kenya Medical Research Institute, Kenya</p>
                </div>
                <span className="date-range">
                  <Calendar size={14} />
                  Sept 2015 - Dec 2017
                </span>
              </div>
              <div className="job-description">
                <ul className="job-responsibilities">
                  <li>
                    Developed project databases in Excel and SPSS for gathering data from 100 health facilities in 10 counties
                    in Nyanza and Eastern regions of Kenya.
                  </li>
                  <li>
                    Developed data collection tools in REDCap, data management protocols, data visualizations in Excel 
                    as well as a web-based data program mentorship system.
                  </li>
                </ul>
              </div>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div className="experience-details">
                  <h4 className="position-title">Field Manager, WASH</h4>
                  <p className="company">Innovations for Poverty Action, Kenya</p>
                </div>
                <span className="date-range">
                  <Calendar size={14} />
                  Mar 2015 - Aug 2015
                </span>
              </div>
              <div className="job-description">
                <ul className="job-responsibilities">
                  <li>
                    Performed internet troubleshooting, networking, and server maintenance; designed surveys using CSPro 
                    and Survey CTO; and managed, documented, and cleaned data in STATA.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="resume-section">
            <h3 className="section-title">Technical Skills</h3>
            
            <div className="skills-grid">
              <div className="skill-category">
                <h4 className="skill-category-title">Programming Languages</h4>
                <p className="skill-list">Stata, R, Python, JavaScript, SQL</p>
              </div>
              <div className="skill-category">
                <h4 className="skill-category-title">Statistical Analysis</h4>
                <p className="skill-list">Econometrics, Panel Data Analysis, Machine Learning, Causal Inference</p>
              </div>
              <div className="skill-category">
                <h4 className="skill-category-title">Data Collection & Management</h4>
                <p className="skill-list">REDCap, Survey CTO, CSPro, SPSS, Excel</p>
              </div>
              <div className="skill-category">
                <h4 className="skill-category-title">Tools & Software</h4>
                <p className="skill-list">Git, LaTeX, Tableau, MongoDB, Node.js</p>
              </div>
              <div className="skill-category">
                <h4 className="skill-category-title">Research Methods</h4>
                <p className="skill-list">Experimental Design, Survey Methods, Policy Evaluation, Literature Reviews</p>
              </div>
              <div className="skill-category">
                <h4 className="skill-category-title">Data Visualization</h4>
                <p className="skill-list">ggplot2 (R), matplotlib (Python), Stata graphics, Excel charts</p>
              </div>
            </div>
          </section>

          {/* Research Interests */}
          <section className="resume-section">
            <h3 className="section-title">Research Interests</h3>
            <div className="research-interests">
              <span className="research-tag">Development Economics</span>
              <span className="research-tag">Food Security</span>
              <span className="research-tag">Livestock Insurance</span>
              <span className="research-tag">Agricultural Data Systems</span>
              <span className="research-tag">Data Science</span>
              <span className="research-tag">Program Evaluation</span>
              <span className="research-tag">Applied Statistics</span>
              <span className="research-tag">Policy Analysis</span>
              <span className="research-tag">Econometrics</span>
              <span className="research-tag">Crowdsourcing</span>
            </div>
          </section>

          {/* Publications */}
          <section className="resume-section">
            <h3 className="section-title">Publications & Research</h3>
            <p className="publications-note">
              See the <a href="/articles" className="articles-link">Articles</a> section for a complete list of my research publications, working papers, and ongoing projects.
            </p>
          </section>
        </div>

        {/* Download Button */}
        <div className="download-section">
          <button 
            className="download-btn"
            onClick={() => alert('CV download functionality coming soon!')}
          >
            <Download size={20} />
            Download Full CV (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;