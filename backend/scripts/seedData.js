const mongoose = require('mongoose');
const Article = require('../models/Article');
const User = require('../models/User');
require('dotenv').config();

async function seedData() {
  try {
    console.log('🌱 Starting to seed database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    await Article.deleteMany({});
    await User.deleteMany({});
    console.log('🧹 Cleared existing data');
    
    // Create admin user
    const adminUser = new User({
      name: 'Vincent Alulu',
      email: process.env.ADMIN_EMAIL || 'valulu@ucsd.edu',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('👤 Admin user created');
    
    // Vincent's Real Publications
    const articlesData = [
      {
        title: 'The impact of forage condition on household food security in northern Kenya and southern Ethiopia',
        slug: 'forage-condition-food-security-kenya-ethiopia',
        abstract: 'This study examines the relationship between forage conditions and household food security in the arid and semi-arid lands of northern Kenya and southern Ethiopia. Using comprehensive household survey data, we analyze how variations in forage availability and quality affect food security outcomes among pastoralist communities. The research provides crucial insights for policy interventions aimed at improving food security in dryland regions.',
        content: 'Full content available via DOI link...',
        authors: [
          {
            name: 'Vincent H. Alulu',
            affiliation: 'University of California, San Diego',
            email: 'valulu@ucsd.edu',
            isMainAuthor: true
          },
          {
            name: 'Kelvin M. Shikuku',
            affiliation: 'International Livestock Research Institute',
            email: 'k.shikuku@cgiar.org',
            isMainAuthor: false
          },
          {
            name: 'Watson Lepariyo',
            affiliation: 'International Livestock Research Institute',
            email: 'w.lepariyo@cgiar.org',
            isMainAuthor: false
          }
        ],
        publication: {
          journal: 'Food Security',
          year: 2024,
          doi: '10.1007/s12571-024-01473-w',
          url: 'https://doi.org/10.1007/s12571-024-01473-w'
        },
        type: 'journal_article',
        status: 'published',
        categories: ['food-security', 'development-economics'],
        tags: ['household food security', 'forage', 'Kenya', 'Ethiopia', 'pastoralism', 'arid lands'],
        researchFields: ['economics', 'data_science', 'development'],
        featured: true,
        published: true,
        metaDescription: 'Examining the relationship between forage conditions and household food security in East Africa.',
        views: 145,
        downloads: 34
      },
      
      {
        title: 'Leveraging browse and grazing forage estimates to optimize index-based livestock insurance',
        slug: 'browse-grazing-forage-livestock-insurance-optimization',
        abstract: 'This research develops innovative approaches to optimize index-based livestock insurance using remote sensing data for browse and grazing forage estimates. We demonstrate how improved forage monitoring can enhance insurance product design and reduce basis risk for pastoralist communities. The study combines satellite data analysis with ground-truth validation to create more accurate insurance indices.',
        content: 'Full content available via DOI link...',
        authors: [
          {
            name: 'Nathan Kahiu',
            affiliation: 'University of Oklahoma',
            email: 'nkahiu@ou.edu',
            isMainAuthor: true
          },
          {
            name: 'Julius Anchang',
            affiliation: 'University of Oklahoma',
            email: 'janchang@ou.edu',
            isMainAuthor: false
          },
          {
            name: 'Vincent Alulu',
            affiliation: 'University of California, San Diego',
            email: 'valulu@ucsd.edu',
            isMainAuthor: false
          },
          {
            name: 'Francesco P. Fava',
            affiliation: 'University of Oklahoma',
            email: 'ffava@ou.edu',
            isMainAuthor: false
          },
          {
            name: 'Nathaniel Jensen',
            affiliation: 'International Livestock Research Institute',
            email: 'n.jensen@cgiar.org',
            isMainAuthor: false
          },
          {
            name: 'Niall P. Hanan',
            affiliation: 'University of Oklahoma',
            email: 'nhanan@ou.edu',
            isMainAuthor: false
          }
        ],
        publication: {
          journal: 'Scientific Reports',
          year: 2024,
          volume: '14',
          issue: '1',
          pages: '14834',
          doi: '10.1038/s41598-024-62893-4',
          url: 'https://doi.org/10.1038/s41598-024-62893-4'
        },
        type: 'journal_article',
        status: 'published',
        categories: ['livestock-insurance', 'remote-sensing'],
        tags: ['livestock insurance', 'index insurance', 'remote sensing', 'forage monitoring', 'pastoralism'],
        researchFields: ['economics', 'data_science'],
        featured: true,
        published: true,
        metaDescription: 'Using remote sensing data to improve index-based livestock insurance design.',
        views: 98,
        downloads: 28
      },
      
      {
        title: 'Autocracies are less likely to receive Chinese aid: Evidence from Chinese aid data, 2019-2021',
        slug: 'autocracies-chinese-aid-evidence-2019-2021',
        abstract: 'This study challenges the prevailing narrative that Chinese foreign aid systematically favors authoritarian regimes by analyzing AidData\'s Global Chinese Development Finance Dataset (2019–2021). Using cross-country regression models, we find that autocracies are *less* likely to receive Chinese aid during this period, contradicting assumptions of ideological alignment. However, path dependency plays a critical role: autocracies with established aid relationships (2013–2018) continue receiving preferential treatment, revealing a hybrid allocation strategy blending historical ties with selective pragmatism. Controls for governance (corruption index), development (extreme poverty, GDP/capita), and regional fixed effects demonstrate that baseline aid commitments are the strongest predictor of future flows (β = 0.808, p < 0.001), while regime type alone shows no significant direct effect. Interaction effects reveal autocracies benefit disproportionately from prior aid relationships (p < 0.05), suggesting China prioritizes strategic continuity over ideological consistency. The findings underscore the complexity of Chinese aid allocation, where institutional inertia and bilateral history outweigh simplistic regime-based explanations.',
        content: 'Academic research project examining Chinese foreign aid allocation patterns using comprehensive econometric analysis. This study provides empirical evidence challenging conventional wisdom about Chinese aid preferences, demonstrating the critical role of path dependency in aid allocation decisions. Full paper available via GitHub repository.',
        authors: [
          {
            name: 'Vincent Alulu',
            affiliation: 'University of California, San Diego',
            email: 'valulu@ucsd.edu',
            isMainAuthor: true
          }
        ],
        publication: {
          journal: 'UCSD Economics Department - Academic Research',
          year: 2024,
          url: 'https://github.com/vhalulu/academic-outputs/blob/master/Autocracies%20are%20less%20likely%20to%20receive%20Chinese%20aid-Evidence%20from%20Chinese%20aid%20data%2C%202019-2021.pdf'
        },
        type: 'academic_work',
        status: 'working_paper',
        categories: ['development-economics', 'international-relations', 'china-studies'],
        tags: ['chinese aid', 'foreign aid allocation', 'autocracy', 'development finance', 'aiddata', 'regime type', 'path dependency', 'econometric analysis'],
        researchFields: ['economics', 'econometrics', 'policy_analysis'],
        files: [{
          filename: 'autocracies-chinese-aid-2019-2021.pdf',
          originalName: 'Autocracies are less likely to receive Chinese aid-Evidence from Chinese aid data, 2019-2021.pdf',
          fileType: 'pdf',
          description: 'Full research paper with econometric analysis and findings',
          uploadDate: new Date()
        }],
        links: [{
          url: 'https://github.com/vhalulu/academic-outputs/blob/master/Autocracies%20are%20less%20likely%20to%20receive%20Chinese%20aid-Evidence%20from%20Chinese%20aid%20data%2C%202019-2021.pdf',
          description: 'View complete research paper on GitHub',
          type: 'other'
        }],
        featured: true,
        published: true,
        publishedAt: new Date('2024-08-15'),
        metaDescription: 'Academic research challenging assumptions about Chinese aid allocation to autocratic regimes using econometric analysis of AidData 2019-2021.',
        views: 0,
        downloads: 0
      },
      {
  title: 'The Impact of Primary School Enrollment on GDP per Capita in Developing Countries',
  slug: 'primary-school-enrollment-gdp-developing-countries',
  abstract: 'This study investigates the causal relationship between primary school enrollment rates and GDP per capita across 54 African countries from 1960 to 2023, using data from the World Bank\'s World Development Indicators. Employing multiple regression models with controls for adult literacy, government education expenditure, inflation, and population growth, we find that a 1% increase in primary school enrollment is associated with a **1.7% rise in GDP per capita** (*p* < 0.001), robust to imputation for missing data and exclusion of outliers. The results align with human capital theory (Becker, 1993), demonstrating that education investments yield significant economic returns. However, the effect diminishes when accounting for regional and decadal fixed effects, suggesting contextual nuances in education-growth dynamics. Key limitations include omitted variable bias and data gaps in governance metrics. **Policy implications**: Governments should prioritize universal primary education as a catalyst for economic growth, ensuring equitable resource allocation and addressing systemic barriers to enrollment. Future research should explore nonlinear effects and quality-adjusted education metrics.',
  content: 'Academic research project examining the causal relationship between primary school enrollment and economic growth across African countries. This comprehensive econometric analysis demonstrates significant positive returns to education investment using 63 years of World Bank data. Full paper available via GitHub repository.',
  authors: [
    {
      name: 'Vincent Alulu',
      affiliation: 'University of California, San Diego',
      email: 'valulu@ucsd.edu',
      isMainAuthor: true
    }
  ],
  publication: {
    journal: 'UCSD Economics Department - Academic Research',
    year: 2024,
    url: 'https://github.com/vhalulu/academic-outputs/blob/master/The%20Impact%20of%20Primary%20School%20Enrollment%20on%20GDP%20per%20Capita%20in%20Developing%20Countries.pdf'
  },
  type: 'academic_work',
  status: 'working_paper',
  categories: ['development-economics', 'education-economics', 'human-capital'],
  tags: ['primary education', 'gdp per capita', 'economic growth', 'human capital theory', 'african economies', 'education investment', 'development policy', 'econometric analysis'],
  researchFields: ['economics', 'econometrics', 'development'],
  files: [{
    filename: 'primary-school-enrollment-gdp-developing-countries.pdf',
    originalName: 'The Impact of Primary School Enrollment on GDP per Capita in Developing Countries.pdf',
    fileType: 'pdf',
    description: 'Full research paper with econometric analysis and policy implications',
    uploadDate: new Date()
  }],
  links: [{
    url: 'https://github.com/vhalulu/academic-outputs/blob/master/The%20Impact%20of%20Primary%20School%20Enrollment%20on%20GDP%20per%20Capita%20in%20Developing%20Countries.pdf',
    description: 'View complete research paper on GitHub',
    type: 'other'
  }],
  featured: true,
  published: true,
  publishedAt: new Date('2024-08-15'),
  metaDescription: 'Econometric analysis demonstrating that 1% increase in primary school enrollment leads to 1.7% rise in GDP per capita across 54 African countries (1960-2023).',
  views: 0,
  downloads: 0
},
{
  title: 'Do Anti-Texting Laws Work? Evidence from the US Traffic Fatality Data',
  slug: 'anti-texting-laws-us-traffic-fatality-evidence',
  abstract: 'Distracted driving kills over 3,200 Americans annually, with cellphones involved in 14% of fatal crashes. Young drivers are disproportionately affected, accounting for more than half of these incidents. Since 2007, 49 states and U.S. territories have adopted texting-while-driving bans, creating a natural experiment with staggered implementation and varying enforcement. This study evaluates the effectiveness of these laws in reducing traffic fatalities using a two-way fixed effects (TWFE) regression model on panel data from all 50 U.S. states plus D.C., covering 1983–2012 (1,530 state-year observations). The identification strategy exploits variation in the timing of policy adoption while controlling for unobserved state-specific and time-varying factors. Fixed effects were preferred over random effects, supported by a Hausman test (χ² = 58.075, p < 0.001), indicating non-random policy adoption. Our outcome is log-transformed traffic fatalities per 100,000 population. Controls include demographic characteristics, per capita income, road and alcohol laws, and crime rates. Results show a consistent 5.3–6.5% reduction in fatalities associated with texting bans across all model specifications. Event study analysis confirms the causal interpretation, with no evidence of pre-trends. Speed limits above 70 mph are associated with 12–14% higher fatality rates, while BAC limits below 0.08 show no significant effect. These findings offer robust evidence that texting bans are effective, cost-efficient tools for improving traffic safety. Policymakers should strengthen enforcement and consider adopting or reinforcing bans in remaining jurisdictions.',
  content: 'Research poster analyzing the effectiveness of anti-texting laws in reducing traffic fatalities using two-way fixed effects regression on 30 years of U.S. state-level data. Demonstrates significant 5.3-6.5% reduction in fatalities following implementation of texting-while-driving bans. Full poster available via GitHub repository.',
  authors: [
    {
      name: 'Vincent Alulu',
      affiliation: 'University of California, San Diego',
      email: 'valulu@ucsd.edu',
      isMainAuthor: true
    }
  ],
  publication: {
    journal: 'UCSD Economics Department - Research Poster',
    year: 2024,
    url: 'https://github.com/vhalulu/academic-outputs/blob/master/Do%20Anti-Texting%20Laws%20Work-%20Evidence%20from%20the%20US%20Traffic%20Fatality%20Data.pdf'
  },
  type: 'academic_work',
  status: 'working_paper',
  categories: ['policy-analysis', 'transportation-economics', 'public-safety'],
  tags: ['traffic safety', 'anti-texting laws', 'distracted driving', 'policy evaluation', 'fixed effects regression', 'natural experiment', 'traffic fatalities', 'public policy'],
  researchFields: ['economics', 'econometrics', 'policy_analysis'],
  files: [{
    filename: 'anti-texting-laws-us-traffic-fatality-evidence.pdf',
    originalName: 'Do Anti-Texting Laws Work- Evidence from the US Traffic Fatality Data.pdf',
    fileType: 'pdf',
    description: 'Research poster with econometric analysis and policy recommendations',
    uploadDate: new Date()
  }],
  links: [{
    url: 'https://github.com/vhalulu/academic-outputs/blob/master/Do%20Anti-Texting%20Laws%20Work-%20Evidence%20from%20the%20US%20Traffic%20Fatality%20Data.pdf',
    description: 'View complete research poster on GitHub',
    type: 'other'
  }],
  featured: true,
  published: true,
  publishedAt: new Date('2024-08-15'),
  metaDescription: 'Econometric analysis demonstrating 5.3-6.5% reduction in traffic fatalities following implementation of anti-texting laws using 30 years of U.S. state data.',
  views: 0,
  downloads: 0
},
      {
        title: 'Extrinsic incentives, expectations, and engagement in agricultural information crowdsourcing initiatives',
        slug: 'extrinsic-incentives-agricultural-crowdsourcing-engagement',
        abstract: 'This study investigates the role of extrinsic incentives in motivating participation in agricultural information crowdsourcing platforms. Using data from pastoralist communities in Kenya, we examine how different incentive structures affect user engagement and data quality. The research provides insights into designing effective crowdsourcing systems for agricultural data collection in developing countries.',
        content: 'Manuscript under review...',
        authors: [
          {
            name: 'Kelvin M. Shikuku',
            affiliation: 'International Livestock Research Institute',
            email: 'k.shikuku@cgiar.org',
            isMainAuthor: true
          },
          {
            name: 'Vincent Harry Alulu',
            affiliation: 'University of California, San Diego',
            email: 'valulu@ucsd.edu',
            isMainAuthor: false
          },
          {
            name: 'Philemon Chelang\'a',
            affiliation: 'International Livestock Research Institute',
            email: 'p.chelanga@cgiar.org',
            isMainAuthor: false
          },
          {
            name: 'Diba Galgallo',
            affiliation: 'International Livestock Research Institute',
            email: 'd.galgallo@cgiar.org',
            isMainAuthor: false
          },
          {
            name: 'Watson Lepariyo',
            affiliation: 'International Livestock Research Institute',
            email: 'w.lepariyo@cgiar.org',
            isMainAuthor: false
          },
          {
            name: 'Wako Gobu',
            affiliation: 'International Livestock Research Institute',
            email: 'w.gobu@cgiar.org',
            isMainAuthor: false
          }
        ],
        publication: {
          journal: 'World Development',
          year: 2023,
          url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4234567'
        },
        type: 'journal_article',
        status: 'under_review',
        categories: ['agricultural-information', 'crowdsourcing'],
        tags: ['crowdsourcing', 'agricultural information', 'incentives', 'engagement', 'mobile technology'],
        researchFields: ['economics', 'data_science'],
        featured: false,
        published: true,
        metaDescription: 'Analyzing incentive structures in agricultural crowdsourcing platforms.',
        views: 67,
        downloads: 15
      },
      
      {
        title: 'Improving nutrition and health data to and from remote regions',
        slug: 'improving-nutrition-health-data-remote-regions',
        abstract: 'This paper addresses the challenges of collecting and disseminating nutrition and health data in remote and hard-to-reach regions. We present innovative approaches using mobile technology and community-based data collection methods to improve data availability and quality. The research highlights the importance of two-way information flows between remote communities and health systems.',
        content: 'Open access publication...',
        authors: [
          {
            name: 'Nathaniel Jensen',
            affiliation: 'International Livestock Research Institute',
            email: 'n.jensen@cgiar.org',
            isMainAuthor: true
          },
          {
            name: 'Vincent Alulu',
            affiliation: 'International Livestock Research Institute',
            email: 'valulu@ucsd.edu',
            isMainAuthor: false
          },
          {
            name: 'Watson Lepariyo',
            affiliation: 'International Livestock Research Institute',
            email: 'w.lepariyo@cgiar.org',
            isMainAuthor: false
          },
          {
            name: 'Tshilidzi Madzivhandila',
            affiliation: 'University of Venda',
            email: 't.madzivhandila@univen.ac.za',
            isMainAuthor: false
          },
          {
            name: 'Bertha Mkandawire-Munthali',
            affiliation: 'University of Malawi',
            email: 'bmkandawire@unima.mw',
            isMainAuthor: false
          },
          {
            name: 'Simbarashe Sibanda',
            affiliation: 'International Livestock Research Institute',
            email: 's.sibanda@cgiar.org',
            isMainAuthor: false
          }
        ],
        publication: {
          journal: 'United Nations System Standing Committee on Nutrition (UNSCN) Nutrition',
          year: 2020,
          volume: '45',
          pages: '96-102',
          url: 'https://www.unscn.org/en/news-events/recent-news?idnews=2059'
        },
        type: 'journal_article',
        status: 'published',
        categories: ['nutrition', 'health-data'],
        tags: ['nutrition data', 'health data', 'remote regions', 'mobile technology', 'community-based data'],
        researchFields: ['economics', 'data_science'],
        featured: false,
        published: true,
        metaDescription: 'Innovative approaches to nutrition and health data collection in remote regions.',
        views: 156,
        downloads: 42
      }
    ];
    
    // Insert articles
    const articles = await Article.insertMany(articlesData);
    console.log(`📄 Created ${articles.length} real publications`);
    
    // Display created articles
    articles.forEach(article => {
      console.log(`   ✅ ${article.title.substring(0, 60)}... (${article.status})`);
    });
    
    console.log('');
    console.log('🎉 Database seeded successfully with Vincent\'s real publications!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   👤 Admin user: ${adminUser.email}`);
    console.log(`   📄 Publications: ${articles.length}`);
    console.log(`   ⭐ Featured articles: ${articles.filter(a => a.featured).length}`);
    console.log(`   📚 Published: ${articles.filter(a => a.status === 'published').length}`);
    console.log(`   📝 Under review: ${articles.filter(a => a.status === 'under_review').length}`);
    console.log(`   🎓 Academic work: ${articles.filter(a => a.type === 'academic_work').length}`);
    console.log('');
    console.log('🔗 Research Areas:');
    console.log('   🌾 Food Security & Pastoralism');
    console.log('   📊 Agricultural Data Systems');
    console.log('   🛡️ Livestock Insurance');
    console.log('   🏥 Health & Nutrition Data');
    console.log('   🇨🇳 Chinese Aid & Development Finance');
    console.log('');
    console.log('🔗 You can now test the API:');
    console.log('   GET /api/articles - Get all articles');
    console.log('   GET /api/articles/featured/list - Get featured articles');
    console.log('   GET /api/health - Check API health');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔴 Database connection closed');
  }
}

// Run the seed function
seedData();