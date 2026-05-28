import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

const HomePage = () => {
  const [projects, setProjects] = useState([])
  const [activeTab, setActiveTab] = useState('الكل')
  const [loading, setLoading] = useState(true)

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
        // Fallback to default mock data if table is empty
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

  const services = [
    {
      title: 'سيراميك ورخام',
      desc: 'تركيب السيراميك والرخام الفاخر للصالات والمطابخ والواجهات بأعلى دقة.',
      icon: 'grid_view'
    },
    {
      title: 'بديل الرخام',
      desc: 'تركيب ألواح بديل الرخام المقاومة للرطوبة والحرارة لإضفاء لمسة فخامة عصرية.',
      icon: 'layers'
    },
    {
      title: 'بديل شكورد',
      desc: 'ديكورات وتشكيلات بديل الشكورد الفاخر للمكاتب والمجالس والخلفيات الرائعة.',
      icon: 'dashboard_customize'
    },
    {
      title: 'بديل الخشب',
      desc: 'تركيب بديل الخشب المعالج داخلياً وخارجياً المقاوم للمياه والرمة بألوان دافئة.',
      icon: 'splitscreen'
    },
    {
      title: 'عشب حائطي وأرضي',
      desc: 'تنسيق وتوريد العشب الصناعي الحائطي والأرضي عالي الجودة للحدائق والأسطح.',
      icon: 'grass'
    },
    {
      title: 'ديكورات وجلسات',
      desc: 'تصميم وتنفيذ الديكورات الداخلية المتكاملة والجلسات الخارجية للمنازل والمزارع.',
      icon: 'deck'
    }
  ]

  const categories = ['الكل', 'سيراميك ورخام', 'بديل الرخام والخشب', 'عشب حائطي وأرضي', 'ديكورات وجلسات']

  return (
    <div style={{ paddingTop: '80px' }} className="animate-fade-in-up">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: 'calc(100vh - 80px)',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF'
      }}>
        {/* Decorative Golden Corner */}
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          width: '80px',
          height: '80px',
          borderTop: '3px solid var(--gold-accent)',
          borderRight: '3px solid var(--gold-accent)',
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '650px' }}>
            <span style={{
              color: 'var(--gold-accent)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 700,
              fontSize: '1.1rem',
              display: 'block',
              marginBottom: '16px'
            }}>
              مؤسسة الزين للديكورات والتشطيبات
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.2',
              fontWeight: 900,
              marginBottom: '24px'
            }}>
              نصنع الجمال في تفاصيل مسكنك
            </h1>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              color: '#E0E0E0',
              marginBottom: '40px',
              fontWeight: 400
            }}>
              متخصصون في توريد وتركيب السيراميك، الرخام، بديل الرخام والخشب، وتنسيق الجلسات الخارجية وأعمال الديكور بأسعار منافسة وجودة لا تضاهى.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a 
                href="https://wa.me/966563765946?text=السلام عليكم، أود الاستفسار عن خدماتكم في الزين للديكورات" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ padding: '14px 32px', fontSize: '1.05rem' }}
              >
                <span className="material-symbols-outlined">chat</span>
                تواصل معنا الآن
              </a>
              <Link 
                to="/portfolio" 
                className="btn-secondary" 
                style={{ 
                  color: '#FFFFFF', 
                  borderColor: '#FFFFFF',
                  padding: '14px 32px', 
                  fontSize: '1.05rem' 
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#FFFFFF'
                  e.target.style.color = '#000000'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#FFFFFF'
                }}
              >
                تصفح أعمالنا
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Golden Corner Bottom */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          width: '80px',
          height: '80px',
          borderBottom: '3px solid var(--gold-accent)',
          borderLeft: '3px solid var(--gold-accent)',
          pointerEvents: 'none'
        }}></div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '80px 0', backgroundColor: '#F9F6F0' }}>
        <div className="container">
          <h2 className="section-title">خدماتنا المتميزة</h2>
          <p style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '-1.5rem auto 3.5rem auto',
            color: '#666666'
          }}>
            نقدم باقة متكاملة من خدمات الديكور والتشطيب الداخلي والخارجي، بلمسة جمالية واحترافية تلبي جميع الأذواق.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {services.map((srv, idx) => (
              <div 
                key={idx} 
                className="card-shadow-hover"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'var(--bg-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-color)',
                  color: 'var(--gold-accent)'
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                    {srv.icon}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{srv.title}</h3>
                <p style={{ color: '#555555', fontSize: '0.95rem', flexGrow: 1 }}>{srv.desc}</p>
                <Link to="/services" style={{
                  color: 'var(--gold-accent)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '12px'
                }}>
                  عرض المزيد
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_left</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="section-title">من أعمالنا</h2>
          <p style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '-1.5rem auto 3rem auto',
            color: '#666666'
          }}>
            شاهد مقتطفات من المشاريع المنفذة لعملائنا في مختلف التخصصات.
          </p>

          {/* Tabs Filter */}
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
                  padding: '8px 24px',
                  backgroundColor: activeTab === cat ? 'var(--gold-accent)' : '#FFFFFF',
                  color: activeTab === cat ? '#FFFFFF' : 'var(--text-color)',
                  border: activeTab === cat ? '1px solid var(--gold-accent)' : '1px solid var(--border-color)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Portfolio Gallery */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '40px', animation: 'spin 2s linear infinite', color: 'var(--gold-accent)' }}>
                progress_activity
              </span>
              <p style={{ marginTop: '12px', fontWeight: 600 }}>جاري تحميل المعرض...</p>
            </div>
          ) : (
            <div>
              <div className="masonry-grid">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="masonry-item">
                    <div style={{ overflow: 'hidden', position: 'relative' }} className="image-container">
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
                      
                      {/* Image Overlay */}
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

              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link to="/portfolio" className="btn-primary">
                  عرض كامل المعرض
                  <span className="material-symbols-outlined">collections</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        <style>{`
          .image-container:hover .overlay {
            opacity: 1 !important;
          }
          .image-container:hover .hover-grayscale {
            transform: scale(1.05);
            filter: grayscale(0%);
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </section>

      {/* Contact CTA Section */}
      <section id="contact-cta" style={{
        backgroundColor: 'var(--dark-container)',
        color: '#FFFFFF',
        padding: '80px 0',
        borderTop: '2px solid var(--gold-accent)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Golden line details */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: '10%',
          width: '2px',
          height: '100%',
          backgroundColor: 'rgba(201, 168, 76, 0.1)',
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: '48px',
              color: 'var(--gold-accent)',
              marginBottom: '16px'
            }}>
              chat_bubble
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              marginBottom: '20px',
              lineHeight: '1.3'
            }}>
              هل لديك مشروع في مخيلتك؟
            </h2>
            <p style={{
              color: '#A0A0A0',
              fontSize: '1.1rem',
              marginBottom: '40px'
            }}>
              تواصل معنا مباشرة للحصول على معاينة واستشارة مجانية لموقعك، ومناقشة تفاصيل الديكور والمقايسات المناسبة مجاناً.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%'
            }}>
              <a 
                href="https://wa.me/966563765946?text=السلام عليكم، أود الاستفسار عن خدماتكم في الزين للديكورات"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ padding: '14px 40px', fontSize: '1.1rem' }}
              >
                <span className="material-symbols-outlined">chat</span>
                واتسـاب: 0563765946
              </a>
              <a 
                href="tel:+966563765946"
                className="btn-secondary"
                style={{ 
                  color: '#FFFFFF', 
                  borderColor: '#FFFFFF',
                  padding: '14px 40px',
                  fontSize: '1.1rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#FFFFFF'
                  e.target.style.color = '#000000'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#FFFFFF'
                }}
              >
                <span className="material-symbols-outlined">call</span>
                اتصال مباشر
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
