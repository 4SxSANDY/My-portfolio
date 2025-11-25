import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import myPhoto from './image/IMG20240922123246-min-removebg-preview-removebg-preview (1).png'
import aboutImage from './landing page image/WhatsApp Image 2025-10-18 at 18.26.21_59e938dc.jpg'
import './portfolio.css'
import BeeFloat from './components/BeeFloat.jsx'

const THEMES = [
  { name: 'Cocoa', bg: '#2b190f', fg: '#e7d6c9', accent: '#cdb2a9', line: 'rgba(231,214,201,0.25)' },
  { name: 'Ivory', bg: '#eee6db', fg: '#6b2d12', accent: '#b24e1d', line: 'rgba(107,45,18,0.35)' },
  { name: 'Olive', bg: '#585332', fg: '#e2dfcb', accent: '#bab493', line: 'rgba(226,223,203,0.35)' },
  { name: 'Deep Sea', bg: '#05323c', fg: '#e6d2df', accent: '#c89db5', line: 'rgba(230,210,223,0.35)' }
]

function ThemeSquares({ themeIndex, setThemeIndex, themeNames }) {
  const handleClick = () => setThemeIndex((i) => (i + 1) % themeNames.length)
  return (
    <button
      className="theme-squares"
      onClick={handleClick}
      aria-label={`Change theme. Current: ${themeNames[themeIndex]}`}
      title={`Theme: ${themeNames[themeIndex]} (click to change)`}>
      <div className="grid">
        {themeNames.map((_, i) => (
          <span key={i} className={`cell ${i === themeIndex ? 'active' : ''}`} />
        ))}
      </div>
      <span className="hint">See Things Differently </span>
    </button>
  )
}

export default function Portfolio({ onBack, themeIndex: propThemeIndex, setThemeIndex: propSetThemeIndex }) {
  // Use prop theme state if provided, otherwise use local state
  const [localThemeIndex, setLocalThemeIndex] = useState(0)
  const themeIndex = propThemeIndex !== undefined ? propThemeIndex : localThemeIndex
  const setThemeIndex = propSetThemeIndex || setLocalThemeIndex
  
  const [showLogoName, setShowLogoName] = useState(false)
  const theme = useMemo(() => THEMES[themeIndex], [themeIndex])
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const experienceRef = useRef(null)
  const contactRef = useRef(null)
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeSection, setActiveSection] = useState('hero')

  const projects = useMemo(() => ([
    {
      id: 'oopsart',
      title: 'OopsArt – Art Marketplace & Social Platform',
      date: 'March 2025 (Ongoing)',
      summary: 'A vibrant web and mobile platform connecting artists with collectors, featuring social interactions, secure transactions, and AI-powered recommendations.',
      features: [
        '🎨 Dynamic art feed with likes, comments, and social engagement',
        '💳 Secure payment integration with Stripe/PayPal',
        '🔔 Real-time notifications using Socket.io',
        '🤖 AI-based art recommendations and content moderation',
        '👥 Role-based access for Artists, Buyers, and Admins',
        '📊 Comprehensive seller dashboard with analytics'
      ],
      tech: {
        Frontend: 'React (Vite), React Native, Modern CSS',
        Backend: 'Node.js, Express.js, MongoDB',
        Services: 'Cloudinary (media), Socket.io (real-time), Stripe/PayPal (payments)',
        Deployment: 'Render, Netlify'
      },
      links: [
        { type: 'live', label: 'Live', href: '#' },
        { type: 'code', label: 'Code', href: '#' }
      ]
    },
    {
      id: 'battery-gourd',
      title: 'Battery Gourd – Smart Battery Health Monitor',
      date: '2025',
      summary: 'An intelligent, installable web app that helps users optimize their laptop battery life through real-time monitoring, smart alerts, and detailed usage analytics.',
      features: [
        '⚡ Real-time battery monitoring with visual indicators',
        '🔔 Sound alerts for full charge notifications',
        '🌡️ Battery temperature tracking (Windows)',
        '📊 Historical data visualization with charts and filters',
        '🌙 Dark mode support for comfortable viewing',
        '📥 Data export functionality',
        '📱 Responsive design for cross-device compatibility'
      ],
      tech: {
        Frontend: 'React, Tailwind CSS',
        Features: 'Battery Status API, Chart.js, PWA capabilities',
        Deployment: 'Netlify'
      },
      links: [
        { type: 'live', label: 'Live', href: '#' },
        { type: 'code', label: 'Code', href: '#' }
      ]
    },
    {
      id: 'portfolio-site',
      title: 'Developer Portfolio Website',
      date: '2025',
      summary: 'A responsive personal portfolio showcasing projects, skills, and experience with custom animations and theme switcher.',
      features: [
        'Responsive layout and dark theme',
        'Smooth scrolling and animations',
        'Accessible navigation and keyboard-friendly UI'
      ],
      tech: {
        Frontend: 'React (Vite), Modern CSS',
        Hosting: 'Netlify'
      },
      links: [
        { type: 'live', label: 'Live', href: '#' },
        { type: 'code', label: 'Code', href: '#' }
      ]
    }
  ]), [])

  // Smooth scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNavClick = (section) => {
    const refs = {
      'about-me': aboutRef,
      'skills': skillsRef,
      'projects': projectsRef,
      'experience': experienceRef,
      'contacts': contactRef
    }
    scrollToSection(refs[section])
  }

  // Cursor follow animation for hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = document.querySelector('.pf-cursor')
      if (cursor) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const sections = [
      { key: 'hero', ref: heroRef },
      { key: 'about', ref: aboutRef },
      { key: 'skills', ref: skillsRef },
      { key: 'projects', ref: projectsRef },
      { key: 'experience', ref: experienceRef },
      { key: 'contacts', ref: contactRef }
    ]

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (const section of sections) {
        const el = section.ref.current
        if (!el) continue
        const top = el.offsetTop
        const height = el.offsetHeight
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection((prev) => (prev === section.key ? prev : section.key))
          return
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const beeMode = useMemo(() => {
    if (activeSection === 'skills') return 'rightToLeft'
    if (activeSection === 'experience') return 'rightToCenter'
    if (activeSection === 'contacts') return 'left'
    return 'right'
  }, [activeSection])

  return (
    <div 
      className="portfolio" 
      id="portfolio"
      style={{
        ['--bg']: theme.bg,
        ['--fg']: theme.fg,
        ['--accent']: theme.accent,
        ['--line']: theme.line
      }}>
      {/* Theme Changer */}
      <ThemeSquares
        themeIndex={themeIndex}
        setThemeIndex={setThemeIndex}
        themeNames={THEMES.map((t) => t.name)}
      />

      <div className="pf-bee-container" aria-hidden="true">
        <BeeFloat accent={theme.accent} mode={beeMode} />
      </div>

      {/* Transparent Navbar */}
      <nav className="pf-navbar">
        <button
          className="logo-small pf-nav-logo"
          onMouseEnter={() => setShowLogoName(true)}
          onMouseLeave={() => setShowLogoName(false)}
          onClick={() => window.location.reload()}
          title="Sandanam"
        >
          <span className="pf-logo-char">S</span>
          {showLogoName ? <span className="logo-name">ANDHANAM.K</span> : null}
        </button>
        <div className="pf-nav-links">
          <a href="#about-me" onClick={(e) => { e.preventDefault(); handleNavClick('about-me') }}>About</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills') }}>Skills</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects') }}>Projects</a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience') }}>Experience</a>
          <a href="#contacts" onClick={(e) => { e.preventDefault(); handleNavClick('contacts') }}>Contact</a>
        </div>
        {/* Inline toggle on navbar (right side) */}
        <button 
          className="pf-page-toggle" 
          title="Open ART view"
          aria-label="Switch to art portfolio"
        >
          <label className="pf-toggle">
            <input type="checkbox" onChange={onBack} />
            <span className="slider" data-off="PRO" data-on="ART"></span>
          </label>
        </button>
      </nav>

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

      {/* Cursor Ring */}
      <div className="pf-cursor" />

      {/* Hero Section */}
      <section className="pf-hero-section" ref={heroRef}>
        <div className="pf-container">
          <header className="pf-hero">
            <div className="pf-intro">
              <h1 className="pf-title">
                <span className="muted-small">Hi, I'm Sandanam K</span>
                <br />
                <span className="accent-small">Full-Stack Developer, Startup Enthusiast, UI/UX Designer</span>
              </h1>
              <p className="pf-sub">I'm a passionate software developer specializing in building modern web applications and IoT solutions.</p>
              <div className="pf-actions">
                <a className="btn" href="#contacts" onClick={(e) => { e.preventDefault(); handleNavClick('contacts') }}>Contact me</a>
                <a className="btn" href="#resume">My Resume</a>
              </div>
            </div>
            <figure className="pf-photo">
              <img src={myPhoto} alt="Portrait" />
              <figcaption className="pf-status"><span className="dot" />Currently Studying in Kalvium</figcaption>
            </figure>
          </header>
        </div>
      </section>

      {/* About Section */}
      <section id="about-me" className="pf-section" ref={aboutRef}>
        <div className="pf-container">
          <h2 className="pf-section-title">#about-me</h2>
          <div className="pf-about-grid">
            <div className="pf-about-image">
              <img src={aboutImage} alt="About me" />
            </div>
            <div className="pf-about-content">
              <p className="pf-about-text">
                Hi, I'm Sandanam K! I'm a passionate software developer specializing in building modern web applications and IoT solutions.
              </p>
              <p className="pf-about-text">
                I love turning complex ideas into clean, efficient, and user-friendly digital experiences. Whether it's creating responsive web interfaces, developing scalable backend systems, or exploring innovative IoT solutions, I bring creativity and technical expertise to every project.
              </p>
              <p className="pf-about-text">
                Currently pursuing my studies at Kalvium, I'm constantly learning and staying updated with the latest technologies and best practices in software development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="pf-section pf-section-dark" ref={skillsRef}>
        <div className="pf-container">
          <h2 className="pf-section-title">#skills</h2>
          <div className="pf-skills">
            <div className="skill-col">
              <h4>Languages</h4>
              <ul>
                <li>Python (Advanced)</li>
                <li>C++ (Intermediate)</li>
                <li>JavaScript</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Frontend</h4>
              <ul>
                <li>HTML5, CSS3, JavaScript</li>
                <li>React.js</li>
                <li>Tailwind CSS</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Backend</h4>
              <ul>
                <li>Node.js, Express.js</li>
                <li>REST API Design</li>
                <li>JWT Authentication</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Databases</h4>
              <ul>
                <li>MongoDB (NoSQL)</li>
                <li>MySQL (SQL)</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Design</h4>
              <ul>
                <li>Figma</li>
                <li>UI/UX Design</li>
                <li>Prototyping</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>Cloud & Tools</h4>
              <ul>
                <li>Firebase</li>
                <li>Google Cloud Pub/Sub</li>
                <li>Git, Bruno, Netlify, Render</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>AI & APIs</h4>
              <ul>
                <li>OpenAI Integration</li>
                <li>RESTful APIs</li>
                <li>Third-party API Integration</li>
              </ul>
            </div>
            <div className="skill-col">
              <h4>IoT & Hardware</h4>
              <ul>
                <li>Arduino, ESP32</li>
                <li>Circuit Design, Embedded Systems</li>
                <li>MATLAB, Multisim</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="pf-section" ref={projectsRef}>
        <div className="pf-container">
          <div className="pf-sec-head">
            <h2 className="pf-section-title">#projects</h2>
            <a className="view-all" href="#" onClick={(e) => { e.preventDefault(); navigate('/projects') }}>View all →</a>
          </div>
          <div className="pf-grid pf-projects">
            {projects.slice(0,3).map((p) => (
              <article key={p.id} className="card" onClick={() => setSelectedProject(p)} style={{ cursor: 'pointer' }}>
                <div className="thumb" />
                <h3 className="card-title">{p.title}</h3>
                <p className="card-desc">{p.summary}</p>
                <div className="card-actions">
                  {p.links?.map((l, i) => (
                    <a
                      key={i}
                      className="btn"
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >{l.label}</a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="pf-section pf-section-dark" ref={experienceRef}>
        <div className="pf-container">
          <h2 className="pf-section-title">#experience</h2>
          <div className="pf-experience-content">
            <div className="pf-timeline-item">
              <h3 className="pf-timeline-title">Achievements & Hackathons</h3>
              <p className="pf-timeline-desc">🥇 Won Intra-College Hackathon – Led frontend development for an Alcohol Awareness project</p>
              <p className="pf-timeline-desc">💻 GDG (Google Developer Group) Hackathon – Full Stack Developer for Code Learner project</p>
              <p className="pf-timeline-desc">⚡ Kalvium's Promprepo Hackathon – Backend Developer for Team Coders</p>
              <p className="pf-timeline-desc">🦊 Hack The Horizon 2.0 – Backend Developer for Team CodeFox</p>
              <p className="pf-timeline-desc"><strong>VERIFY</strong>: Participated in GDG Hackathon (24hr), won 1st prize in Inter‑College Hackathon (Alcohol Awareness), participated in Kalvium Labs Hackathon and Promtptrepo Hackathon.</p>
            </div>
            <div className="pf-timeline-item">
              <h3 className="pf-timeline-title">Badge</h3>
              <p className="pf-timeline-desc">🧪 Salters’ Chemistry Camp</p>
              <p className="pf-timeline-desc"><strong>VERIFY</strong>: Selected to participate in Salters’ Chemistry Camp at JRC Bangalore, Asia’s first chemistry museum, with students from across Karnataka.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="pf-section" ref={contactRef}>
        <div className="pf-container">
          <h2 className="pf-section-title">#contacts</h2>
          <div className="pf-contact-content">
            <p className="pf-contact-text">I'm open to freelance opportunities. If you have a request or question, don't hesitate to reach out.</p>
            <div className="pf-contact-links">
              <a className="btn btn-large" href="tel:+918122819604">Call: 8122819604</a>
              <a className="btn btn-large" href="mailto:santhanamk9604@gmail.com">Email: santhanamk9604@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Modal */}
      {selectedProject && (
        <div className="pf-modal-overlay" role="dialog" aria-modal="true" onClick={() => setSelectedProject(null)}>
          <div className="pf-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pf-modal-close" aria-label="Close" onClick={() => setSelectedProject(null)}>✕</button>
            <h3 className="pf-modal-title">{selectedProject.title}</h3>
            <div className="pf-modal-date">{selectedProject.date}</div>
            <p className="pf-modal-summary">{selectedProject.summary}</p>
            <div className="pf-modal-subhead">Key Features:</div>
            <ul className="pf-modal-list">
              {selectedProject.features.map((f, i) => (<li key={i}>{f}</li>))}
            </ul>
            <div className="pf-modal-subhead">Tech Stack:</div>
            <ul className="pf-modal-tech">
              {Object.entries(selectedProject.tech).map(([k,v]) => (
                <li key={k}><strong>{k}:</strong> {v}</li>
              ))}
            </ul>
            <div className="pf-modal-links">
              {selectedProject.links.map((l, i) => (
                <a key={i} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View All is handled by routing to /projects */}
    </div>
  )
}
