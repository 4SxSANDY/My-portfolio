import React from 'react'
import myPhoto from './image/IMG20240922123246-min-removebg-preview-removebg-preview (1).png'
import './portfolio.css'

export default function Portfolio() {
  return (
    <div className="portfolio" id="portfolio">
      <aside className="pf-social" aria-label="Social links">
        <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className="ico">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.85 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05 .9 1.58 2.37 1.12 2.95.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .85-.28 2.8 1.05a9.37 9.37 0 0 1 5.1 0c1.95-1.33 2.8-1.05 2.8-1.05 .55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.67.95.67 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.68.49A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className="ico">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.94 3.5A2.44 2.44 0 1 1 2.06 3.5a2.44 2.44 0 0 1 4.88 0ZM2.5 8h4.98v13.5H2.5V8Zm7.52 0H15v1.85h.07c.63-1.2 2.17-2.46 4.46-2.46 4.77 0 5.65 3.14 5.65 7.22V21.5h-5V15.2c0-1.5-.03-3.42-2.09-3.42-2.1 0-2.42 1.64-2.42 3.33v8.39h-5V8Z"/></svg>
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram" className="ico">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.66.51a5.16 5.16 0 0 1 1.86 1.21 5.16 5.16 0 0 1 1.21 1.86c.27.7.46 1.49.51 2.66.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.51 2.66a5.16 5.16 0 0 1-1.21 1.86 5.16 5.16 0 0 1-1.86 1.21c-.7.27-1.49.46-2.66.51-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.24-2.66-.51a5.16 5.16 0 0 1-1.86-1.21 5.16 5.16 0 0 1-1.21-1.86c-.27-.7-.46-1.49-.51-2.66C2.2 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.96.51-2.66a5.16 5.16 0 0 1 1.21-1.86 5.16 5.16 0 0 1 1.86-1.21c.7-.27 1.49-.46 2.66-.51C8.42 2.21 8.8 2.2 12 2.2m0-2.2C8.76 0 8.35.02 7.07.08 5.79.14 4.86.35 4.03.67a7.36 7.36 0 0 0-2.67 1.74A7.36 7.36 0 0 0 .67 5.08c-.32.83-.53 1.76-.59 3.04C.02 9.4 0 9.82 0 13.06s.02 3.66.08 4.94c.06 1.28.27 2.21.59 3.04.32.83.78 1.55 1.44 2.21.66.66 1.38 1.12 2.21 1.44.83.32 1.76.53 3.04.59 1.28.06 1.7.08 4.94.08s3.66-.02 4.94-.08c1.28-.06 2.21-.27 3.04-.59a7.36 7.36 0 0 0 2.21-1.44 7.36 7.36 0 0 0 1.44-2.21c.32-.83.53-1.76.59-3.04.06-1.28.08-1.7.08-4.94s-.02-3.66-.08-4.94c-.06-1.28-.27-2.21-.59-3.04A7.36 7.36 0 0 0 21.97.67 7.36 7.36 0 0 0 19.76-.77c-.83-.32-1.76-.53-3.04-.59C15.44-.02 15.02 0 11.78 0H12Z"/><circle cx="12" cy="12" r="3.2" fill="currentColor"/></svg>
        </a>
      </aside>
      <div className="pf-container">
        <header className="pf-hero">
          <div className="pf-intro">
            <h1 className="pf-title">
              <span className="muted">Sandhanam is a</span>
              <br />
              <span className="accent">Full-stack developer</span>
            </h1>
            <p className="pf-sub">He crafts responsive websites with attention to detail and accessibility.</p>
            <div className="pf-actions">
              <a className="btn" href="#contacts">Contact me</a>
            </div>
          </div>
          <figure className="pf-photo">
            <img src={myPhoto} alt="Portrait" />
            <figcaption className="pf-status"><span className="dot" />Currently Studying in Kalvium</figcaption>
          </figure>
        </header>

        <section className="pf-quote">
          <blockquote>
            <p>
              "Access to computers and the Internet has become a basic need for education in our society."
            </p>
            <footer><span className="author">- Kent Conrad</span></footer>
          </blockquote>
        </section>

        <section id="projects" className="pf-section">
          <div className="pf-sec-head">
            <h2>#projects</h2>
            <a className="view-all" href="#">View all →</a>
          </div>
          <div className="pf-grid pf-projects">
            {[1,2,3].map((n) => (
              <article key={n} className="card">
                <div className="thumb" />
                <h3 className="card-title">Project {n}</h3>
                <p className="card-desc">Short project description goes here.</p>
                <div className="card-tags">
                  <span>Live</span>
                  <span>Code</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="pf-section">
          <h2>#skills</h2>
          <div className="pf-skills">
            <div className="skill-col">
              <h4>Languages</h4>
              <ul>
                <li>TypeScript, JavaScript</li>
                <li>Python (Basics)</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Other</h4>
              <ul>
                <li>HTML, CSS, CSS Grid/Flex</li>
                <li>REST APIs</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Tools</h4>
              <ul>
                <li>VSCode, Figma</li>
                <li>Git, GitHub</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="about-me" className="pf-section">
          <h2>#about-me</h2>
          <p className="pf-about">
            Hi, I'm Sandy! I'm a self‑taught front‑end developer based in India. I love turning concepts into
            delightful, accessible web experiences.
          </p>
        </section>

        <section id="contacts" className="pf-section">
          <h2>#contacts</h2>
          <p>I'm open to freelance opportunities. If you have a request or question, don't hesitate to reach out.</p>
          <p><a className="btn" href="mailto:sandhanam.k@example.com">SANDHANAM.K@EXAMPLE.COM</a></p>
        </section>
      </div>
    </div>
  )
}