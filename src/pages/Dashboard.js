// frontend/src/pages/Dashboards.js
import React from 'react';
import './Dashboards.css';

const dashboards = [
  {
    id: 1,
    icon: '🐪',
    title: 'Kenya Livestock Market Prices',
    description:
      'Interactive price monitoring dashboard for camel, cattle and goat markets across Northern Kenya. Filter by market, cluster, body condition and date range to track price trends over time.',
    tags: ['Kenya', 'Livestock', 'R Shiny', 'FRED'],
    locations: 'Korr · Merile · Illaut · Latakweny · Kurugu',
    updated: 'April 2025',
    url: 'https://vhalulu-2020.shinyapps.io/kenya-livestock-prices/',
    status: 'live',
  },
  {
    id: 2,
    icon: '📊',
    title: 'U.S. Macroeconomic Explorer',
    description:
      'Explore key U.S. macroeconomic indicators including GDP, inflation, unemployment, and wage growth. Switch between level and log scales, filter by date range and compare series.',
    tags: ['USA', 'Macroeconomics', 'R Shiny', 'FRED'],
    locations: 'FRED · BLS · BEA',
    updated: 'April 2025',
    url: '',  // add ShinyApps URL when deployed
    status: 'coming-soon',
  },
  {
    id: 3,
    icon: '🌿',
    title: 'Household Affordability Squeeze',
    description:
      'Policy-facing dashboard showing how rising energy costs, food price inflation and stagnant wages disproportionately affect low-income U.S. households.',
    tags: ['USA', 'Policy', 'R Shiny', 'BLS'],
    locations: 'FRED · BLS · EIA',
    updated: 'Coming Soon',
    url: '',
    status: 'coming-soon',
  },
];

export default function Dashboards() {
  return (
    <div className="dashboards-page">
      <div className="dashboards-header">
        <h1>Interactive Dashboards</h1>
        <p>
          Data products built in R Shiny for policy audiences, NGOs, and
          researchers. Each dashboard transforms raw public data into
          actionable insights.
        </p>
      </div>

      <div className="dashboards-grid">
        {dashboards.map((d) => (
          <div key={d.id} className={`dashboard-card ${d.status}`}>
            <div className="card-top">
              <span className="card-icon">{d.icon}</span>
              {d.status === 'live' ? (
                <span className="badge live">● Live</span>
              ) : (
                <span className="badge coming-soon">Coming Soon</span>
              )}
            </div>

            <h3>{d.title}</h3>
            <p className="card-description">{d.description}</p>

            <div className="card-tags">
              {d.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div className="card-meta">
              <span>📍 {d.locations}</span>
              <span>🗓 {d.updated}</span>
            </div>

            {d.status === 'live' ? (
              
                href={d.url}
                target="_blank"
                rel="noreferrer"
                className="card-button">
                Open Dashboard →
              </a>
            ) : (
              <button className="card-button disabled" disabled>
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}