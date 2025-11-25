import React, { useMemo, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './portfolio.css'
import './projectPage.css'

export default function ProjectsPage() {
  const projects = useMemo(() => ([
    {
      id: 'oopsart',
      title: 'OopsArt – Art Marketplace & Social Platform',
      date: 'March 2025 (Ongoing)',
      summary: 'A vibrant platform connecting artists and collectors with AI-powered recommendations.',
      features: [
        '🎨 Dynamic art feed with likes, comments, and social engagement',
        '💳 Secure payment integration with Stripe/PayPal',
        '🔔 Real-time notifications using Socket.io',
        '🤖 AI-based art recommendations and content moderation'
      ],
      tech: {
        Frontend: 'React (Vite), React Native, Modern CSS',
        Backend: 'Node.js, Express.js, MongoDB',
        Services: 'Cloudinary, Socket.io, Stripe/PayPal',
        Deployment: 'Render, Netlify'
      },
      links: [
        { label: 'Live', href: '#' },
        { label: 'Code', href: '#' }
      ]
    },
    {
      id: 'battery-gourd',
      title: 'Battery Gourd – Smart Battery Health Monitor',
      date: '2025',
      summary: 'Monitor battery in real-time with alerts, charts, and PWA support.',
      features: [
        '⚡ Real-time battery monitoring with visual indicators',
        '🔔 Sound alerts for full charge notifications',
        '📊 Historical data visualization with charts and filters'
      ],
      tech: {
        Frontend: 'React, Tailwind CSS',
        Features: 'Battery Status API, Chart.js, PWA capabilities',
        Deployment: 'Netlify'
      },
      links: [
        { label: 'Live', href: '#' },
        { label: 'Code', href: '#' }
      ]
    }
  ]), [])

  const cursorRef = useRef(null)
  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className="projects-page">
      <section className="pf-section pf-projects-page">
        <div className="pf-container">
          <div className="pf-sec-head">
            <h2 className="pf-section-title">#all-projects</h2>
            <Link className="view-all" to="/">Back ←</Link>
          </div>
          <div className="pf-grid pf-projects pf-projects-12 pf-three">
            {[...Array(12)].map((_, i) => {
              const base = projects[i] || { id: `p-${i}`, title: `Project ${i+1}`, summary: 'Project description coming soon.' }
              return (
                <article key={base.id} className="card" onClick={() => setSelectedProject(base)} style={{ cursor: 'pointer' }}>
                  <div className="thumb" />
                  <h3 className="card-title">{base.title}</h3>
                  <p className="card-desc">{base.summary}</p>
                  <div className="card-actions">
                    {(base.links || [
                      { label: 'Live', href: '#' },
                      { label: 'Code', href: '#' }
                    ]).map((l, j) => (
                      <a key={j} className="btn" href={l.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>{l.label}</a>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      {/* Cursor on projects page */}
      <div className="pf-cursor" ref={cursorRef} />

      {/* Modal */}
      {selectedProject && (
        <div className="pf-modal-overlay" role="dialog" aria-modal="true" onClick={() => setSelectedProject(null)}>
          <div className="pf-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pf-modal-close" aria-label="Close" onClick={() => setSelectedProject(null)}>✕</button>
            <h3 className="pf-modal-title">{selectedProject.title}</h3>
            {selectedProject.date ? <div className="pf-modal-date">{selectedProject.date}</div> : null}
            {selectedProject.summary ? <p className="pf-modal-summary">{selectedProject.summary}</p> : null}
            {selectedProject.features ? (
              <>
                <div className="pf-modal-subhead">Key Features:</div>
                <ul className="pf-modal-list">
                  {selectedProject.features.map((f, i) => (<li key={i}>{f}</li>))}
                </ul>
              </>
            ) : null}
            {selectedProject.tech ? (
              <>
                <div className="pf-modal-subhead">Tech Stack:</div>
                <ul className="pf-modal-tech">
                  {Object.entries(selectedProject.tech).map(([k,v]) => (
                    <li key={k}><strong>{k}:</strong> {v}</li>
                  ))}
                </ul>
              </>
            ) : null}
            <div className="pf-modal-links">
              {(selectedProject.links || []).map((l, i) => (
                <a key={i} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


