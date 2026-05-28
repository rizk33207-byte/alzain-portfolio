import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const whatsappUrl = "https://wa.me/966563765946?text=السلام عليكم، أود الاستفسار عن خدماتكم في الزين للديكورات"

  const navItems = [
    { label: 'الرئيسية', path: '/' },
    { label: 'خدماتنا', path: '/services' },
    { label: 'أعمالنا', path: '/portfolio' }
  ]

  const handleContactClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const contactSection = document.getElementById('contact-cta')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Allow standard link behavior (or redirect to home then scroll, let's keep it simple)
      window.location.href = '/#contact-cta'
    }
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: scrolled ? 'rgba(245, 240, 232, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      transition: 'var(--transition-smooth)',
      height: '80px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        {/* Logo */}
        <NavLink to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none'
        }}>
          <span className="material-symbols-outlined" style={{
            fontSize: '32px',
            color: 'var(--gold-accent)'
          }}>
            architecture
          </span>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: 'var(--text-color)',
            letterSpacing: '-0.03em'
          }}>
            الزين <span style={{ color: 'var(--gold-accent)' }}>للديكورات</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '32px'
        }} className="desktop-menu-container">
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            gap: '24px'
          }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: isActive ? 'var(--gold-accent)' : 'var(--text-color)',
                    position: 'relative',
                    paddingBottom: '4px'
                  })}
                  className={({ isActive }) => isActive ? 'active-nav-link' : ''}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a 
                href="#contact-cta" 
                onClick={handleContactClick}
                style={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'var(--text-color)'
                }}
              >
                تواصل معنا
              </a>
            </li>
          </ul>

          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.9rem' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chat</span>
            احجز استشارة
          </a>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            border: 'none',
            outline: 'none',
            background: 'none',
            padding: '4px',
            color: 'var(--text-color)'
          }}
          className="mobile-menu-toggle"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--bg-color)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 16px',
          gap: '24px',
          borderTop: '1px solid var(--border-color)',
          animation: 'fadeInUp 0.3s ease-out forwards'
        }}>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '1.2rem',
            fontWeight: 600
          }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--gold-accent)' : 'var(--text-color)',
                    display: 'block',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.05)'
                  })}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a 
                href="#contact-cta" 
                onClick={(e) => {
                  setIsOpen(false);
                  handleContactClick(e);
                }}
                style={{
                  color: 'var(--text-color)',
                  display: 'block',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                تواصل معنا
              </a>
            </li>
          </ul>

          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ 
              width: '100%', 
              justifyContent: 'center', 
              marginTop: '16px',
              padding: '14px' 
            }}
          >
            <span className="material-symbols-outlined">chat</span>
            احجز استشارة مجانية
          </a>
        </div>
      )}

      {/* Dynamic styles to inject */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-menu-container {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-menu-container {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
        .active-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--gold-accent);
        }
      `}</style>
    </nav>
  )
}

export default Navbar
