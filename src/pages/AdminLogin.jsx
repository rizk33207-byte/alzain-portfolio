import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setIsLoading(true)

    try {
      const { data, error } = await signIn(email, password)
      if (error) {
        // Human readable error messages in Arabic
        if (error.message.includes('Invalid login credentials')) {
          setErrorMsg('خطأ في البريد الإلكتروني أو كلمة المرور. يرجى التحقق وإعادة المحاولة.')
        } else {
          setErrorMsg(error.message)
        }
      } else if (data?.user) {
        navigate('/admin/dashboard')
      }
    } catch (err) {
      setErrorMsg('حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      backgroundImage: 'linear-gradient(rgba(245, 240, 232, 0.85), rgba(245, 240, 232, 0.85)), url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Decorative Golden Accent Frame */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
        border: '1px solid rgba(201, 168, 76, 0.2)',
        pointerEvents: 'none',
        zIndex: 1
      }}></div>

      <div style={{
        maxWidth: '450px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        padding: '40px 32px',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)'
      }}>
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="material-symbols-outlined" style={{
            fontSize: '48px',
            color: 'var(--gold-accent)'
          }}>
            admin_panel_settings
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '12px' }}>
            تسجيل دخول المسؤول
          </h2>
          <p style={{ color: '#666666', fontSize: '0.9rem', marginTop: '6px' }}>
            الرجاء إدخال بيانات الاعتماد للوصول إلى لوحة التحكم
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div style={{
            backgroundColor: '#FFEEEE',
            borderRight: '4px solid #D32F2F',
            color: '#D32F2F',
            padding: '12px 16px',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email field */}
          <div>
            <label className="form-label" htmlFor="email">البريد الإلكتروني</label>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#888888',
                fontSize: '20px'
              }}>
                mail
              </span>
              <input
                id="email"
                type="email"
                required
                placeholder="admin@elzindecor.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  paddingRight: '40px'
                }}
                className="form-input"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="form-label" htmlFor="password">كلمة المرور</label>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#888888',
                fontSize: '20px'
              }}>
                lock
              </span>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  paddingRight: '40px'
                }}
                className="form-input"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '14px',
              marginTop: '10px'
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="material-symbols-outlined" style={{
                animation: 'spin 1.5s linear infinite'
              }}>
                autorenew
              </span>
            ) : (
              'تسجيل الدخول'
            )}
          </button>
        </form>

        {/* Back Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '28px',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '20px'
        }}>
          <Link to="/" style={{
            fontSize: '0.9rem',
            color: '#666666',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_right_alt</span>
            العودة للموقع الرئيسي
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AdminLogin
