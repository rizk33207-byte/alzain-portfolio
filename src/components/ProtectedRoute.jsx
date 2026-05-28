import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        gap: '16px'
      }}>
        <span className="material-symbols-outlined" style={{
          fontSize: '48px',
          animation: 'spin 2s linear infinite',
          color: 'var(--gold-accent)'
        }}>
          progress_activity
        </span>
        <p style={{ fontWeight: 600, fontSize: '1.2rem' }}>جاري التحميل...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
