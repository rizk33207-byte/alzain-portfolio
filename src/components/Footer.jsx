import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      backgroundColor: 'var(--dark-container)',
      color: '#FFFFFF',
      padding: '64px 0 24px 0',
      borderTop: '3px solid var(--gold-accent)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* About Section */}
        <div>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '20px',
            fontWeight: 800,
            color: '#FFFFFF'
          }}>
            الزين <span style={{ color: 'var(--gold-accent)' }}>للديكورات</span>
          </h3>
          <p style={{
            color: '#A0A0A0',
            lineHeight: '1.8',
            fontSize: '0.95rem'
          }}>
            نحن في مؤسسة الزين للديكورات نسعى لتقديم أرقى خدمات الديكور الداخلي والخارجي، تركيب السيراميك والرخام، وبدائل الخشب والرخام بأعلى معايير الجودة والاحترافية في المملكة العربية السعودية.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            fontSize: '1.1rem',
            marginBottom: '20px',
            fontWeight: 700,
            color: 'var(--gold-accent)',
            position: 'relative',
            paddingBottom: '8px'
          }}>
            روابط سريعة
            <span style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '30px',
              height: '2px',
              backgroundColor: 'var(--gold-accent)'
            }}></span>
          </h4>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <li><Link to="/" style={{ color: '#D0D0D0' }} onMouseOver={e => e.target.style.color = 'var(--gold-accent)'} onMouseOut={e => e.target.style.color = '#D0D0D0'}>الرئيسية</Link></li>
            <li><Link to="/services" style={{ color: '#D0D0D0' }} onMouseOver={e => e.target.style.color = 'var(--gold-accent)'} onMouseOut={e => e.target.style.color = '#D0D0D0'}>خدماتنا</Link></li>
            <li><Link to="/portfolio" style={{ color: '#D0D0D0' }} onMouseOver={e => e.target.style.color = 'var(--gold-accent)'} onMouseOut={e => e.target.style.color = '#D0D0D0'}>أعمالنا</Link></li>
            <li><Link to="/admin/login" style={{ color: '#808080', fontSize: '0.9rem' }} onMouseOver={e => e.target.style.color = 'var(--gold-accent)'} onMouseOut={e => e.target.style.color = '#808080'}>تسجيل دخول الإدارة</Link></li>
          </ul>
        </div>

        {/* Services / Specializations */}
        <div>
          <h4 style={{
            fontSize: '1.1rem',
            marginBottom: '20px',
            fontWeight: 700,
            color: 'var(--gold-accent)',
            position: 'relative',
            paddingBottom: '8px'
          }}>
            تخصصاتنا
            <span style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '30px',
              height: '2px',
              backgroundColor: 'var(--gold-accent)'
            }}></span>
          </h4>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            color: '#D0D0D0',
            fontSize: '0.95rem'
          }}>
            <li>سيراميك ورخام</li>
            <li>بديل الرخام وبديل الخشب</li>
            <li>بديل شكورد وعشب حائطي</li>
            <li>عشب أرضي وجلسات خارجية</li>
            <li>ديكورات داخلية حديثة</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{
            fontSize: '1.1rem',
            marginBottom: '20px',
            fontWeight: 700,
            color: 'var(--gold-accent)',
            position: 'relative',
            paddingBottom: '8px'
          }}>
            معلومات الاتصال
            <span style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '30px',
              height: '2px',
              backgroundColor: 'var(--gold-accent)'
            }}></span>
          </h4>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            color: '#D0D0D0'
          }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--gold-accent)' }}>phone_in_talk</span>
              <a href="tel:+966563765946" style={{ direction: 'ltr' }}>+966 56 376 5946</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--gold-accent)' }}>mail</span>
              <span>info@elzindecor.com</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--gold-accent)' }}>location_on</span>
              <span>المملكة العربية السعودية</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{
        borderTop: '1px solid #2D2D2D',
        paddingTop: '24px',
        textAlign: 'center',
        color: '#808080',
        fontSize: '0.9rem'
      }}>
        <div className="container">
          <p>جميع الحقوق محفوظة &copy; {currentYear} مؤسسة الزين للديكورات.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
