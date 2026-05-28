import React from 'react'

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/966563765946?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B2%D9%8A%D9%86%20%D9%84%D9%84%D8%AF%D9%8A%D9%83%D9%88%D8%B1%D8%A7%D8%AA"

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        zIndex: 9999,
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s',
        cursor: 'pointer'
      }}
      className="whatsapp-float-btn"
      title="تواصل معنا عبر واتساب"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {/* WhatsApp SVG Icon */}
      <svg
        style={{ width: '32px', height: '32px', fill: '#FFFFFF' }}
        viewBox="0 0 24 24"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.42 9.86-9.86.001-2.636-1.02-5.115-2.875-6.973-1.857-1.859-4.335-2.88-6.97-2.88-5.441 0-9.863 4.42-9.865 9.861-.001 1.776.478 3.51 1.388 5.034L2.016 22.03l6.236-1.636zM18.806 15.385c-.372-.187-2.202-1.085-2.543-1.21-.343-.124-.593-.187-.841.187-.249.373-.965 1.21-1.183 1.459-.219.249-.438.28-.81.093-1.615-.806-2.733-1.41-3.82-3.27-.288-.492-.288-.804.093-1.183.187-.186.373-.436.56-.653.187-.218.249-.373.373-.622.124-.25.063-.467-.03-.654-.093-.187-.842-2.022-1.153-2.77-.303-.73-.61-.63-.84-.642-.218-.012-.468-.014-.718-.014-.25 0-.655.093-.997.467-.343.374-1.31 1.277-1.31 3.115 0 1.838 1.34 3.61 1.527 3.86.188.25 2.637 4.027 6.388 5.646.892.385 1.589.615 2.133.788.897.285 1.714.245 2.36.149.72-.107 2.202-.902 2.513-1.773.31-.87.31-1.617.217-1.773-.093-.156-.342-.25-.714-.436z" />
      </svg>
      {/* Floating pulse circle */}
      <span style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '3px solid #25D366',
        top: 0,
        left: 0,
        zIndex: -1,
        animation: 'pulse 2s infinite',
        opacity: 0.6
      }}></span>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </a>
  )
}

export default WhatsAppButton
