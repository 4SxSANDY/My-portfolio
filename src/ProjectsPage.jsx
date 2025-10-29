import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import './portfolio.css'

export default function ProjectsPage() {
  const projects = useMemo(() => ([
    {
      id: 'oopsart',
      title: 'OopsArt – Art Marketplace & Social Platform',
      summary: 'A vibrant platform connecting artists and collectors with AI-powered recommendations.',
      links: [
        { label: 'Live', href: '#' },
        { label: 'Code', href: '#' }
      ]
    },
    {
      id: 'battery-gourd',
      title: 'Battery Gourd – Smart Battery Health Monitor',
      summary: 'Monitor battery in real-time with alerts, charts, and PWA support.',
      links: [
        { label: 'Live', href: '#' },
        { label: 'Code', href: '#' }
      ]
    }
  ]), [])

  return (
    <section className="pf-section pf-projects-page">
      <div className="pf-container">
        <div className="pf-sec-head">
          <h2 className="pf-section-title">#all-projects</h2>
          <Link className="view-all" to="/">Back ←</Link>
        </div>
        <div className="pf-grid pf-projects pf-projects-12">
          {[...Array(12)].map((_, i) => {
            const base = projects[i] || { id: `p-${i}`, title: `Project ${i+1}`, summary: 'Project description coming soon.' }
            return (
              <article key={base.id} className="card">
                <div className="thumb" />
                <h3 className="card-title">{base.title}</h3>
                <p className="card-desc">{base.summary}</p>
                <div className="card-actions">
                  {(base.links || [
                    { label: 'Live', href: '#' },
                    { label: 'Code', href: '#' }
                  ]).map((l, j) => (
                    <a key={j} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}


