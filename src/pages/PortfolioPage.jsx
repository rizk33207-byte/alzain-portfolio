import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

// Mock default projects to show if Supabase is empty/unconfigured
const DEFAULT_PROJECTS = [
  {
    id: 'demo1',
    title: 'ديكور حائط داخلي',
    category: 'سيراميك ورخام',
    media_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    media_type: 'image'
  },
  {
    id: 'demo2',
    title: 'جلسة خارجية',
    category: 'ديكورات وجلسات',
    media_url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
    media_type: 'image'
  },
  {
    id: 'demo3',
    title: 'عشب صناعي ملعب',
    category: 'عشب حائطي وأرضي',
    media_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    media_type: 'image'
  },
  {
    id: 'demo4',
    title: 'بديل رخام حديث',
    category: 'بديل الرخام والخشب',
    media_url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
    media_type: 'image'
  }
]

const PortfolioPage = () => {
  const [projects, setProjects] = useState([])
  const [activeTab, setActiveTab] = useState('الكل')
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    // 1. Check if credentials are set up properly
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    const isConfigured = url && url !== '' && !url.includes('your-supabase-url') && key && key !== '' && !key.includes('your-supabase-anon-key')

    if (!isConfigured) {
      console.log('Supabase not configured or uses default placeholders. Showing demo projects immediately.')
      setProjects(DEFAULT_PROJECTS)
      setLoading(false)
      return
    }

    try {
      // 2. Fetch from Supabase with a 3-second timeout
      const fetchPromise = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Supabase fetch timed out after 3 seconds')), 3000)
      )

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise])
      
      if (error) throw error
      
      if (data && data.length > 0) {
        setProjects(data)
      } else {
        console.log('Projects table is empty. Showing demo projects immediately.')
        setProjects(DEFAULT_PROJECTS)
      }
    } catch (e) {
      console.warn('Failed to load projects from Supabase. Using demo data instead:', e.message)
      setProjects(DEFAULT_PROJECTS)
    } finally {
      setLoading(false)
    }
  }


  const handleTabChange = (tabName) => {
    setActiveTab(tabName)
  }

  const filteredProjects = activeTab === 'الكل'
    ? projects
    : projects.filter(p => p.category === activeTab)

  const categories = ['الكل', 'سيراميك ورخام', 'بديل الرخام والخشب', 'عشب حائطي وأرضي', 'ديكورات وجلسات']

  const openLightbox = (project) => {
    setSelectedProject(project)
  }

  const closeLightbox = () => {
    setSelectedProject(null)
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '80vh' }} className="animate-fade-in-up">
      {/* Page Header */}
      <section style={{
        backgroundColor: 'var(--dark-container)',
        color: '#FFFFFF',
        padding: '60px 0',
        textAlign: 'center',
        borderBottom: '2px solid var(--gold-accent)'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>معرض أعمالنا</h1>
          <p style={{ color: 'var(--gold-accent)', fontSize: '1.1rem', fontWeight: 500 }}>
            رؤيتنا تتجسد في مشاريعنا المنفذة بدقة وإتقان
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          {/* Category tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '40px'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleTabChange(cat)}
                style={{
                  padding: '10px 28px',
                  backgroundColor: activeTab === cat ? 'var(--gold-accent)' : '#FFFFFF',
                  color: activeTab === cat ? '#FFFFFF' : 'var(--text-color)',
                  border: activeTab === cat ? '1px solid var(--gold-accent)' : '1px solid var(--border-color)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Layout */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', animation: 'spin 2s linear infinite', color: 'var(--gold-accent)' }}>
                progress_activity
              </span>
              <p style={{ marginTop: '12px', fontWeight: 600 }}>جاري تحميل المعرض الفني...</p>
            </div>
          ) : (
            <div>
              {filteredProjects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed var(--border-color)', backgroundColor: '#FFFFFF' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#888888' }}>
                    photo_library
                  </span>
                  <p style={{ marginTop: '16px', fontWeight: 600, color: '#555555' }}>لا توجد مشاريع في هذا القسم حالياً.</p>
                </div>
              ) : (
                <div className="masonry-grid">
                  {filteredProjects.map((project) => (
                    <div 
                      key={project.id} 
                      className="masonry-item" 
                      onClick={() => openLightbox(project)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div style={{ overflow: 'hidden', position: 'relative' }} className="image-container">
                        {project.media_type === 'video' ? (
                          <div style={{ position: 'relative' }}>
                            <video 
                              src={project.media_url} 
                              style={{ width: '100%', display: 'block' }}
                            />
                            {/* Video Play Badge overlay */}
                            <div style={{
                              position: 'absolute',
                              top: '16px',
                              left: '16px',
                              backgroundColor: 'rgba(0,0,0,0.6)',
                              color: '#FFFFFF',
                              padding: '6px 12px',
                              fontSize: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>play_circle</span>
                              فيديو
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={project.media_url} 
                            alt={project.title}
                            className="hover-grayscale"
                            style={{
                              width: '100%',
                              display: 'block',
                              transition: 'var(--transition-smooth)'
                            }}
                          />
                        )}
                        
                        {/* Title Overlay */}
                        <div className="overlay" style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          left: 0,
                          background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.85))',
                          color: '#FFFFFF',
                          padding: '24px',
                          opacity: 0,
                          transition: 'var(--transition-smooth)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          height: '60%'
                        }}>
                          <span style={{
                            color: 'var(--gold-accent)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            marginBottom: '4px'
                          }}>
                            {project.category}
                          </span>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{project.title}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 99999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }} onClick={closeLightbox}>
          {/* Close button */}
          <button style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            color: '#FFFFFF',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            zIndex: 100000
          }} onClick={closeLightbox}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>close</span>
          </button>

          {/* Modal Container */}
          <div style={{
            maxWidth: '900px',
            maxHeight: '90vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }} onClick={e => e.stopPropagation()}>
            {selectedProject.media_type === 'video' ? (
              <video 
                src={selectedProject.media_url} 
                controls 
                autoPlay
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  border: '1px solid var(--gold-accent)'
                }}
              />
            ) : (
              <img 
                src={selectedProject.media_url} 
                alt={selectedProject.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  border: '1px solid var(--gold-accent)'
                }}
              />
            )}
            
            {/* Project Details */}
            <div style={{
              color: '#FFFFFF',
              textAlign: 'center',
              width: '100%',
              padding: '16px 0'
            }}>
              <span style={{
                color: 'var(--gold-accent)',
                fontSize: '0.9rem',
                fontWeight: 700
              }}>
                {selectedProject.category}
              </span>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                marginTop: '6px'
              }}>
                {selectedProject.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .image-container:hover .overlay {
          opacity: 1 !important;
        }
        .image-container:hover .hover-grayscale {
          transform: scale(1.03);
          filter: grayscale(0%);
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default PortfolioPage
