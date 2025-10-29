import React, { useEffect, useMemo, useRef, useState } from 'react'
import Portfolio from './Portfolio.jsx'
import myPhoto from './image/IMG20240922123246-min-removebg-preview-removebg-preview (1).png'
import './landing.css'
import img1 from './landing page image/WhatsApp Image 2025-10-18 at 18.26.21_59e938dc.jpg'
import img2 from './landing page image/WhatsApp Image 2025-10-18 at 18.26.21_82845270.jpg'
import img3 from './landing page image/WhatsApp Image 2025-10-18 at 18.26.22_3d3cb.jpg'
import img4 from './landing page image/WhatsApp Image 2025-10-18 at 18.26.22_3d3cb1ac.jpg'
import img5 from './landing page image/WhatsApp Image 2025-10-18 at 18.26.23_b4eb2019.jpg'
import img6 from './landing page image/WhatsApp Image 2025-10-18 at 18.28.43_fef51432.jpg'
import img7 from './landing page image/WhatsApp Image 2025-10-18 at 18.28.44_40c1752b.jpg'

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

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0)
  const theme = useMemo(() => THEMES[themeIndex], [themeIndex])
  const [menuOpen, setMenuOpen] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(true)
  const [showOverlayName, setShowOverlayName] = useState(false)
  const [showLogoName, setShowLogoName] = useState(false)
  const [showBottomName, setShowBottomName] = useState(false)

  const images = useMemo(
    () =>
      [img1, img2, img3, img4, img5, img6, img7]
        .slice(0, 6)
        .sort(() => Math.random() - 0.5),
    []
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [assembled, setAssembled] = useState(false)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const galleryRef = useRef(null)
  const [galleryRow, setGalleryRow] = useState(0) // 0,1,2
  const [galleryDir, setGalleryDir] = useState('') // 'up' | 'down'
  const cursorRef = useRef(null)
  const lastPos = useRef({ x: 0, y: 0 })
  const accDist = useRef(0)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const cx = rect.width / 2
      const cy = rect.height / 2
      const dx = (x - cx) / cx
      const dy = (y - cy) / cy

      el.style.setProperty('--dx', dx.toFixed(3))
      el.style.setProperty('--dy', dy.toFixed(3))

      // Switch images based on cursor distance moved
      const lp = lastPos.current
      if (lp.x || lp.y) {
        const d = Math.hypot(x - lp.x, y - lp.y)
        accDist.current += d
        if (accDist.current > 80) {
          setActiveIndex((i) => (i + 1) % images.length)
          accDist.current = 0
        }
      }
      lastPos.current = { x, y }

      // 🌊 Divider: straight line with a smooth curved bend only on the cursor side
      const svgPath = el.querySelector('.divider path')
      if (svgPath) {
        const baseline = 30
        const rawAmp = 26 + Math.abs(dy) * 320
        const amp = Math.min(30, rawAmp)
        const dir = Math.sign(dy) || 1
        const cursorX = Math.max(0, Math.min(100, (x / rect.width) * 100))
        const spread = 16
        const isLeftSide = x < rect.width / 2

        let path
        if (isLeftSide) {
          const x0 = Math.max(0, cursorX - spread)
          const x1 = cursorX
          const midx = x0 + (x1 - x0) * 0.5
          const peakY = baseline + amp * dir
          path = `M 0 ${baseline} L ${x0} ${baseline} Q ${midx} ${peakY} ${x1} ${baseline} L 100 ${baseline}`
        } else {
          const x0 = cursorX
          const x1 = Math.min(100, cursorX + spread)
          const midx = x0 + (x1 - x0) * 0.5
          const peakY = baseline + amp * dir
          path = `M 0 ${baseline} L ${x0} ${baseline} Q ${midx} ${peakY} ${x1} ${baseline} L 100 ${baseline}`
        }
        svgPath.setAttribute('d', path)
      }
    }

    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [images.length, showPortfolio])

  // About section circle follow cursor
  useEffect(() => {
    const sec = aboutRef.current
    if (!sec) return
    const onMove = (e) => {
      const rect = sec.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const dx = (x - rect.width / 2) / (rect.width / 2)
      const dy = (y - rect.height / 2) / (rect.height / 2)
      sec.style.setProperty('--ax', dx.toFixed(3))
      sec.style.setProperty('--ay', dy.toFixed(3))
    }
    sec.addEventListener('pointermove', onMove)
    return () => sec.removeEventListener('pointermove', onMove)
  }, [showPortfolio])

  // Scatter to assemble animation on first load
  const offsets = useMemo(() => {
    return images.map((_, i) => {
      if (i === 0) return { x: 0, y: 0, s: 1, r: 0 }
      const angle = Math.random() * Math.PI * 2
      const distVw = 20 + Math.random() * 30
      const distVh = 10 + Math.random() * 20
      return {
        x: Math.cos(angle) * distVw,
        y: Math.sin(angle) * distVh,
        s: 0.8 + Math.random() * 0.4,
        r: (Math.random() - 0.5) * 20
      }
    })
  }, [images.length])

  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), 1300)
    return () => clearTimeout(t)
  }, [])

  // Drawing images will be loaded dynamically
  // State for image popup
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to get image URL
  const getImageUrl = (name) => {
    return new URL(`./drawing image/${name}`, import.meta.url).href;
  };

  // 3x3 scroll gallery images
  const galleryImages = useMemo(() => ([
    getImageUrl('WhatsApp Image 2025-10-23 at 09.34.49_1e119233.jpg'),
    getImageUrl('WhatsApp Image 2025-10-23 at 09.34.50_9579e426.jpg'),
    getImageUrl('WhatsApp Image 2025-10-23 at 09.34.51_85bdac32.jpg'),
    getImageUrl('WhatsApp Image 2025-10-23 at 09.34.51_8c62188a.jpg'),
    getImageUrl('WhatsApp Image 2025-10-23 at 09.34.51_8db63359.jpg'),
    getImageUrl('WhatsApp Image 2025-10-23 at 09.34.52_68048dbe.jpg'),
    getImageUrl('WhatsApp Image 2025-10-23 at 09.34.52_6a0f2112.jpg'),
    getImageUrl('WhatsApp Image 2025-10-23 at 09.34.52_a8232910.jpg'),
    getImageUrl('WhatsApp Image 2025-10-23 at 09.34.53_d911fe82.jpg')
  ]), [])

  // Wheel control for gallery: prevent page scroll inside area
  useEffect(() => {
    const el = galleryRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        setGalleryDir('down')
        setGalleryRow((r) => Math.min(2, r + 1))
      } else if (e.deltaY < 0) {
        setGalleryDir('up')
        setGalleryRow((r) => Math.max(0, r - 1))
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // Global cursor-follow circle
  useEffect(() => {
    const ring = cursorRef.current
    if (!ring) return
    const onMove = (e) => {
      ring.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      className={`app ${showPortfolio ? 'portfolio-mode' : ''}`}
      style={{
        ['--bg']: theme.bg,
        ['--fg']: theme.fg,
        ['--accent']: theme.accent,
        ['--line']: theme.line
      }}>
      <header className="top-bar">
        <button
          className="logo-small"
          onMouseEnter={() => setShowLogoName(true)}
          onMouseLeave={() => setShowLogoName(false)}
          onClick={() => setShowPortfolio(false)}
          title="Sandanam"
        >
          S{showLogoName ? <span className="logo-name">ANDHANAM.K</span> : null}
        </button>
        <div className="top-actions">
          <button 
            className="app-page-toggle"
            title={showPortfolio ? 'Open ART PORTFOLIO' : 'Open PROFESSIONAL PORTFOLIO'}
            aria-label={showPortfolio ? 'Open ART PORTFOLIO' : 'Open PROFESSIONAL PORTFOLIO'}
          >
            <label className="ui-toggle">
              <input 
                type="checkbox" 
                checked={!showPortfolio} 
                onChange={(e) => setShowPortfolio(!e.target.checked)}
              />
              <span className="slider" data-off="PRO" data-on="ART"></span>
            </label>
          </button>
        </div>
      </header>

      {!showPortfolio && (
      <main className="hero" ref={heroRef}>
        <div className="side left">
          <div className="monogram">
            S
          </div>
          <div className="tagline near-divider">
            GREAT WORK SPEAKS
            <br />
            WITH PURPOSE
          </div>
        </div>

        <div className="center">
          {/* ✅ SVG divider with taller viewBox to allow deeper bend */}
          <svg className="divider" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path d="M 0 30 L 100 30" stroke="var(--line)" strokeWidth="1.5" fill="none" />
          </svg>
          <div className={`image-stack ${assembled ? 'assembled' : 'scattering'}`} aria-label="Showcase images">
            {images.map((src, i) => (
              <img
                key={i}
                className={`stack-img ${i === 0 ? 'fixed' : ''} ${i === activeIndex ? 'active' : ''}`}
                src={src}
                alt={`Work sample ${i + 1}`}
                draggable={false}
                style={i > 0 ? { ['--x']: `${offsets[i].x}vw`, ['--y']: `${offsets[i].y}vh`, ['--s']: offsets[i].s, ['--r']: `${offsets[i].r}deg` } : undefined}
              />
            ))}
          </div>
        </div>

        <div className="side right">
          <div className="service">DRAWINGS THAT TELL STORIES BEYOND WORDS</div>
          <div className="k-wrap">
            <div
              className="monogram"
              onMouseEnter={() => setShowBottomName(true)}
              onMouseLeave={() => setShowBottomName(false)}
            >
              K
            </div>
            {showBottomName ? <div className="k-name">Sandanam.K</div> : null}
          </div>
        </div>
      </main>
      )}

      <ThemeSquares
        themeIndex={themeIndex}
        setThemeIndex={setThemeIndex}
        themeNames={THEMES.map((t) => t.name)}
      />

      {menuOpen && (
        <div className="overlay" role="dialog" aria-modal="true">
          <header className="overlay-bar">
            <button
              className="overlay-logo"
              onClick={() => setShowOverlayName((v) => !v)}
              title="Show name">
              S▢{showOverlayName ? <span className="overlay-name"> SANDHANAM.K</span> : null}
            </button>
            <button className="overlay-close" onClick={() => setMenuOpen(false)}>
              CLOSE
            </button>
          </header>
          <nav className="overlay-nav">
            <a href="#about" onClick={(e)=>{e.preventDefault(); setMenuOpen(false); window.location.hash='#about'}}>ABOUT</a>
            <a href="#work" onClick={(e)=>{e.preventDefault(); setMenuOpen(false); window.location.hash='#work'}}>WORK</a>
            <a href="#archive" onClick={(e)=>{e.preventDefault(); setMenuOpen(false); window.location.hash='#archive'}}>ARCHIVE</a>
            <a href="#contact" onClick={(e)=>{e.preventDefault(); setMenuOpen(false); window.location.hash='#contact'}}>CONTACT</a>
          </nav>
        </div>
      )}

      {/* -------- Scroll Sections or Portfolio -------- */}
      {showPortfolio ? (
        <Portfolio onBack={() => setShowPortfolio(false)} themeIndex={themeIndex} setThemeIndex={setThemeIndex} />
      ) : (
        <>
          <section className="section section--about" id="about" ref={aboutRef}>
            <div className="section-inner">
              <h2 className="section-title">DRAWN WITH INTENTION,<br />CRAFTED WITH PURPOSE</h2>
              <div className="about-ring" aria-hidden="true" />
              <div className="about-text">
                <p>
                  I approach every drawing with intention — balancing bold ideas with subtle details and bringing clarity and care to each commissioned piece. Whether it's a portrait, concept art, or a custom project, I treat every work as a collaboration built on trust, creativity, and purpose.
                </p>
                <p>
                 Art, for me, is not about noise. It's about meaning — quiet, focused, and deeply human. The best work doesn't have to shout; it listens, connects, and leaves a lasting impression.
That's the kind of art I create — drawings that speak with purpose.
                </p>
              </div>
              <div className="drawing-image">
                <img src={myPhoto} alt="Portrait drawing" />
              </div>
              <button className="portfolio-btn" onClick={() => setShowPortfolio(true)}>
                Visit my portfolio
              </button>
            </div>
          </section>

          <section className="section section--case" id="work">
            <div className="case-bg" />
            <div className="section-inner case-grid">
              <div className="case-left">
                <div className="eyebrow">MY CREATIVE STUDIO</div>
                <h3 className="case-title">AN EVOLUTION OF ARTISTRY SHAPED BY <br />PASSION, PATIENCE, AND PURPOSE.</h3>
              </div>
              <div className="case-mid">
                <ul className="services">
                  <li>PORTRAIT DRAWING</li>
                  <li>ANATOMY DESIGNING</li>
                  <li>GRAPHITE DRAWING</li>
                  <li>CHARCOAL DRAWING</li>
                  <li>WATERCOLOR PAINTING</li>
                  <li>ACRYLIC PAINTING</li>
                  <li>ILLUSTRATION</li>
                  <li>FABRIC DRAWING</li>
                  <li>WALL PAINTING & MURALS</li>
                  <li>MICRO CRAFT WITH INTRICATE DETAILING</li>
                  <li>FIGMA DESIGN DIGITAL VISUALS AND INTERFACE COMPOSITION</li>
                  <li>VIDEO EDITING</li>
                </ul>
              </div>
              <div className="case-right">
                <a className="view-project" href="#">VIEW DRAWINGS →</a>
              </div>
            </div>
          </section>

          <section className="section section--work" id="archive">
            <div className="section-inner work-grid">
              <h2 className="section-title">PAST WORK,<br />LASTING PRIDE</h2>
              <div className="work-note">Thoughtful design stands the test of time, no matter when or why it was made.</div>
              <div className="filmstrip">
                {[1,2,3,4,5].map((n) => (
                  <span key={n} className="frame" />
                ))}
              </div>
            </div>
          </section>

          {/* Scroll-controlled 3x3 gallery */}
          <section className="section section--gallery">
            <div className="section-inner">
              <div className={`scroll-gallery ${galleryDir}`} ref={galleryRef} aria-label="Scroll gallery (3 images per view)">
                <div className="sg-viewport">
                  <div className="sg-track" style={{ transform: `translateY(-${galleryRow * 100}%)` }}>
                    {[0,1,2].map((row) => (
                      <div className="sg-row" key={row}>
                        {galleryImages.slice(row*3, row*3 + 3).map((src, i) => (
                          <img 
                            className="sg-thumb" 
                            key={i} 
                            src={src} 
                            alt={`Gallery ${row*3 + i + 1}`} 
                            onClick={() => setSelectedImage(src)}
                            style={{ cursor: 'pointer' }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Image Popup */}
          {selectedImage && (
            <div 
              className="image-popup-overlay" 
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: '20px'
              }}
            >
              <div 
                className="image-popup-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: '90%',
                  maxHeight: '90%'
                }}
              >
                <img 
                  src={selectedImage} 
                  alt="Full size drawing" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                    border: '2px solid white'
                  }}
                />
                <button 
                  onClick={() => setSelectedImage(null)}
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '0',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <section className="section section--contact" id="contact">
            <div className="section-inner contact-grid">
              <div className="contact-eyebrow">LET’S START THE CONVERSATION</div>
              <div className="contact-title" role="heading" aria-level="2">
                <span className="line">GREAT DESIGN ISN’T JUST</span>
                <span className="line">ABOUT WHAT YOU MAKE IT’S</span>
                <span className="line">ABOUT WHO YOU MAKE IT WITH.</span>
              </div>
              <div className="contact-copy">
                <span className="line">I partner with those who value thoughtful,</span>
                <span className="line">intentional work that speaks with purpose. If</span>
                <span className="line">you’re ready to be heard, I’m ready to listen.</span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-left">
                <nav className="footer-links" aria-label="Footer">
                  <a href="#terms">TERMS</a>
                  <a href="#privacy">PRIVACY</a>
                  <a href="#siteby">SITE BY SANDANAM.K</a>
                </nav>
                <div className="copyright">© 2004—{new Date().getFullYear()} Sandanam.K</div>
                <div className="mini-dots" aria-hidden="true">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className="footer-right">
                <a className="footer-cta" href="mailto:santhanamk9604@gmail.com">
                  <span className="label">SANTHANAMK9604@GMAIL.COM</span>
                  <span className="external-icon" aria-hidden="true" />
                </a>
                <a className="footer-cta" href="#schedule">
                  <span className="label">SCHEDULE A CALL</span>
                  <span className="external-icon" aria-hidden="true" />
                </a>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* cursor ring */}
      <div className="cursor-ring" ref={cursorRef} />
    </div>
  )
}
