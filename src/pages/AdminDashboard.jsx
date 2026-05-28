import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

const INITIAL_CATEGORIES = ['سيراميك ورخام', 'بديل الرخام والخشب', 'عشب حائطي وأرضي', 'ديكورات وجلسات']

const AdminDashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // State Management
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('projects') // overview, projects, settings
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  // Form State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(INITIAL_CATEGORIES[0])
  const [mediaType, setMediaType] = useState('image')
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)

  // Feedback notifications
  const [notice, setNotice] = useState({ text: '', type: '' }) // success, error

  // References
  const fileInputRef = useRef(null)

  // Detect if Supabase is fully configured
  const isSupabaseConfigured = 
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_URL !== 'https://your-supabase-url.supabase.co'

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects()
  }, [])

  const showNotice = (text, type = 'success') => {
    setNotice({ text, type })
    setTimeout(() => setNotice({ text: '', type: '' }), 5000)
  }

  const fetchProjects = async () => {
    setLoading(true)
    if (!isSupabaseConfigured) {
      // Load mock items
      const localData = localStorage.getItem('elzin_mock_projects')
      if (localData) {
        setProjects(JSON.parse(localData))
      } else {
        const demoData = [
          {
            id: 'demo1',
            title: 'تركيب سيراميك صالة فاخرة',
            category: 'سيراميك ورخام',
            media_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            media_type: 'image',
            created_at: new Date(Date.now() - 86400000 * 3).toISOString()
          },
          {
            id: 'demo2',
            title: 'بديل رخام خلف التلفزيون بديكور إضاءة مخفية',
            category: 'بديل الرخام والخشب',
            media_url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
            media_type: 'image',
            created_at: new Date(Date.now() - 86400000 * 2).toISOString()
          },
          {
            id: 'demo3',
            title: 'تنسيق عشب حائطي مع خشب جداري',
            category: 'عشب حائطي وأرضي',
            media_url: 'https://images.unsplash.com/photo-1530731141654-5961adca3598?auto=format&fit=crop&w=800&q=80',
            media_type: 'image',
            created_at: new Date(Date.now() - 86400000).toISOString()
          }
        ]
        setProjects(demoData)
        localStorage.setItem('elzin_mock_projects', JSON.stringify(demoData))
      }
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setProjects(data || [])
    } catch (e) {
      console.error('Error fetching projects:', e.message)
      showNotice('حدث خطأ أثناء تحميل المشاريع من قاعدة البيانات.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setFilePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  // Handle Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      showNotice('الرجاء إدخال عنوان المشروع', 'error')
      return
    }
    if (!selectedFile) {
      showNotice('الرجاء اختيار ملف صورة أو فيديو للمشروع', 'error')
      return
    }

    setUploading(true)
    setProgress(15)

    // Mode A: Unconfigured Supabase (Mock upload simulation)
    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setProgress(60)
        setTimeout(() => {
          setProgress(100)
          const newProject = {
            id: 'mock_' + Date.now(),
            title,
            category,
            media_url: filePreview || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            media_type: mediaType,
            created_at: new Date().toISOString()
          }
          const updated = [newProject, ...projects]
          setProjects(updated)
          localStorage.setItem('elzin_mock_projects', JSON.stringify(updated))
          
          // Reset Form
          setTitle('')
          setSelectedFile(null)
          setFilePreview(null)
          setUploading(false)
          setProgress(0)
          showNotice('تمت إضافة المشروع بنجاح (وضع محاكاة محلي)')
        }, 800)
      }, 500)
      return
    }

    // Mode B: Real Supabase upload
    try {
      setProgress(30)
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `${fileName}`

      // Upload file to Supabase storage bucket "project-media"
      const { error: uploadError } = await supabase.storage
        .from('project-media')
        .upload(filePath, selectedFile)

      if (uploadError) throw uploadError

      setProgress(70)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-media')
        .getPublicUrl(filePath)

      // Insert row in table
      const { error: dbError } = await supabase
        .from('projects')
        .insert([
          {
            title,
            category,
            media_url: publicUrl,
            media_type: mediaType
          }
        ])

      if (dbError) throw dbError

      setProgress(100)
      showNotice('تم رفع وإضافة المشروع الجديد بنجاح!')
      
      // Reset Form
      setTitle('')
      setSelectedFile(null)
      setFilePreview(null)
      fetchProjects()
    } catch (err) {
      console.error('Upload error:', err)
      showNotice(`فشل رفع المشروع: ${err.message}`, 'error')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDeleteProject = async (id, mediaUrl) => {
    const confirmDelete = window.confirm('هل أنت متأكد من رغبتك في حذف هذا المشروع نهائياً؟')
    if (!confirmDelete) return

    setLoading(true)

    if (!isSupabaseConfigured) {
      // Mock Delete
      const updated = projects.filter(p => p.id !== id)
      setProjects(updated)
      localStorage.setItem('elzin_mock_projects', JSON.stringify(updated))
      showNotice('تم حذف المشروع بنجاح (وضع محاكاة محلي)')
      setLoading(false)
      return
    }

    try {
      // If real Supabase, attempt to delete from storage bucket first
      if (mediaUrl && mediaUrl.includes('project-media')) {
        const urlParts = mediaUrl.split('/')
        const fileName = urlParts[urlParts.length - 1]
        
        const { error: storageError } = await supabase.storage
          .from('project-media')
          .remove([fileName])

        if (storageError) {
          console.warn('Could not delete file from storage bucket:', storageError.message)
        }
      }

      // Delete from DB table
      const { error: dbError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (dbError) throw dbError

      showNotice('تم حذف المشروع بنجاح من قاعدة البيانات والاستوديو.')
      fetchProjects()
    } catch (err) {
      console.error('Delete error:', err.message)
      showNotice(`فشل عملية الحذف: ${err.message}`, 'error')
      setLoading(false)
    }
  }

  // Count items for statistics cards
  const stats = {
    total: projects.length,
    images: projects.filter(p => p.media_type === 'image').length,
    videos: projects.filter(p => p.media_type === 'video').length,
    categories: [...new Set(projects.map(p => p.category))].length
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#F3ECE0',
      direction: 'rtl'
    }}>
      {/* Sidebar Panel */}
      <aside style={{
        width: '260px',
        backgroundColor: 'var(--dark-container)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid var(--border-color)',
        padding: '30px 20px',
        zIndex: 50
      }} className="admin-sidebar">
        {/* Profile info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '40px',
          borderBottom: '1px solid #2D2D2D',
          paddingBottom: '20px'
        }}>
          <div style={{
            width: '45px',
            height: '45px',
            backgroundColor: 'var(--gold-accent)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.2rem'
          }}>
            أ
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>مسؤول لوحة التحكم</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-accent)' }}>الزين للديكورات</span>
          </div>
        </div>

        {/* Navigation items */}
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flexGrow: 1
        }}>
          <li>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                width: '100%',
                textAlign: 'right',
                padding: '12px 16px',
                color: activeTab === 'overview' ? 'var(--gold-accent)' : '#C0C0C0',
                backgroundColor: activeTab === 'overview' ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: 'none',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span className="material-symbols-outlined">dashboard</span>
              نظرة عامة
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('projects')}
              style={{
                width: '100%',
                textAlign: 'right',
                padding: '12px 16px',
                color: activeTab === 'projects' ? 'var(--gold-accent)' : '#C0C0C0',
                backgroundColor: activeTab === 'projects' ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: 'none',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span className="material-symbols-outlined">photo_library</span>
              إدارة المشاريع
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('settings')}
              style={{
                width: '100%',
                textAlign: 'right',
                padding: '12px 16px',
                color: activeTab === 'settings' ? 'var(--gold-accent)' : '#C0C0C0',
                backgroundColor: activeTab === 'settings' ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: 'none',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span className="material-symbols-outlined">settings</span>
              الإعدادات
            </button>
          </li>
        </ul>

        {/* Exit link */}
        <div style={{ borderTop: '1px solid #2D2D2D', paddingTop: '20px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              textAlign: 'right',
              padding: '12px 16px',
              color: '#FF7070',
              border: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span className="material-symbols-outlined">logout</span>
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main dashboard content */}
      <main style={{
        flexGrow: 1,
        padding: '40px'
      }}>
        {/* Header toolbar */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>لوحة تحكم المشاريع</h1>
            <p style={{ color: '#666666', fontSize: '0.95rem' }}>إدارة وتحديث معرض الأعمال المعروض على الموقع الإلكتروني</p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="btn-secondary"
            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
          >
            <span className="material-symbols-outlined">language</span>
            زيارة الموقع الرئيسي
          </button>
        </header>

        {/* Database setup notice if unconfigured */}
        {!isSupabaseConfigured && (
          <div style={{
            backgroundColor: '#FFF8E1',
            borderRight: '4px solid #FFB300',
            color: '#755B00',
            padding: '16px',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <span className="material-symbols-outlined" style={{ color: '#FFB300', marginTop: '3px' }}>warning</span>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>تنبيه: لم يتم ربط Supabase بشكل كامل بعد</h4>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.5' }}>
                يعمل النظام حالياً في <strong>وضع المحاكاة المحلي (LocalStorage)</strong>. 
                سيتم حفظ وحذف المشاريع محلياً في متصفحك. لتفعيل الرفع الفعلي بقاعدة البيانات، يرجى ملء بيانات الاتصال في ملف <code>.env</code> بالقيم الصحيحة لـ <code>VITE_SUPABASE_URL</code> و <code>VITE_SUPABASE_ANON_KEY</code>.
              </p>
            </div>
          </div>
        )}

        {/* Action feedback banners */}
        {notice.text && (
          <div style={{
            backgroundColor: notice.type === 'error' ? '#FFEEEE' : '#E8F5E9',
            borderRight: `4px solid ${notice.type === 'error' ? '#D32F2F' : '#388E3C'}`,
            color: notice.type === 'error' ? '#D32F2F' : '#388E3C',
            padding: '16px',
            fontWeight: 600,
            marginBottom: '30px',
            fontSize: '0.95rem'
          }}>
            {notice.text}
          </div>
        )}

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in-up">
            {/* Stat Counters Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '30px 24px', border: '1px solid var(--border-color)' }}>
                <span style={{ color: '#888888', fontSize: '0.85rem', fontWeight: 600 }}>إجمالي المشاريع</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '8px' }}>{stats.total}</h3>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '30px 24px', border: '1px solid var(--border-color)' }}>
                <span style={{ color: '#888888', fontSize: '0.85rem', fontWeight: 600 }}>عدد الأقسام النشطة</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '8px' }}>{stats.categories}</h3>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '30px 24px', border: '1px solid var(--border-color)' }}>
                <span style={{ color: '#888888', fontSize: '0.85rem', fontWeight: 600 }}>الصور المرفوعة</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '8px' }}>{stats.images}</h3>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '30px 24px', border: '1px solid var(--border-color)' }}>
                <span style={{ color: '#888888', fontSize: '0.85rem', fontWeight: 600 }}>الفيديوهات المرفوعة</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '8px' }}>{stats.videos}</h3>
              </div>
            </div>

            {/* Quick manual tips */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              padding: '30px'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>إعدادات قاعدة البيانات والتخزين (Supabase)</h3>
              <p style={{ color: '#555555', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.7' }}>
                لضمان عمل الموقع بشكل كامل وتخزين الصور والفيديوهات بشكل دائم، يرجى نسخ وتنفيذ الأوامر التالية في نافذة SQL Editor الخاصة بموقع Supabase:
              </p>
              <pre style={{
                backgroundColor: '#1E1E1E',
                color: '#A9B7C6',
                padding: '16px',
                fontSize: '0.85rem',
                overflowX: 'auto',
                direction: 'ltr',
                textAlign: 'left',
                marginBottom: '20px'
              }}>
{`-- 1. إنشاء جدول المشاريع
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT DEFAULT 'image',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. تفعيل الوصول العام للقراءة (SELECT)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select" ON projects 
  FOR SELECT USING (true);

-- 3. تفعيل الوصول للمسؤولين للإدخال والحذف (INSERT, DELETE)
CREATE POLICY "Allow auth insert" ON projects 
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow auth delete" ON projects 
  FOR DELETE USING (auth.role() = 'authenticated');`}
              </pre>
              <p style={{ color: '#555555', fontSize: '0.95rem', lineHeight: '1.7' }}>
                كما يجب إنشاء حافظة تخزين (Bucket) باسم <code>project-media</code> في قسم الـ Storage وجعلها <strong>Public</strong> وتفعيل سياسات الإدخال والحذف (RLS policies) للمستخدمين المصرح لهم (Authenticated).
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div style={{
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap'
          }} className="animate-fade-in-up">
            
            {/* Add Project Form Card */}
            <div style={{
              flex: '1 1 400px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              padding: '30px',
              height: 'fit-content'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                إضافة مشروع جديد للمعرض
              </h3>

              <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Title */}
                <div>
                  <label className="form-label" htmlFor="proj-title">عنوان المشروع</label>
                  <input
                    id="proj-title"
                    type="text"
                    className="form-input"
                    placeholder="مثال: تركيب بديل خشب صالة مودرن"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={uploading}
                  />
                </div>

                {/* Category select */}
                <div>
                  <label className="form-label" htmlFor="proj-category">القسم الرئيسي</label>
                  <select
                    id="proj-category"
                    className="form-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={uploading}
                  >
                    {INITIAL_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Media type toggle */}
                <div>
                  <label className="form-label">نوع الوسائط</label>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="mediaType"
                        value="image"
                        checked={mediaType === 'image'}
                        onChange={() => setMediaType('image')}
                        disabled={uploading}
                      />
                      صورة فوتوغرافية
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="mediaType"
                        value="video"
                        checked={mediaType === 'video'}
                        onChange={() => setMediaType('video')}
                        disabled={uploading}
                      />
                      مقطع فيديو
                    </label>
                  </div>
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="form-label">ملف الميديا (صورة / فيديو)</label>
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => !uploading && fileInputRef.current?.click()}
                    style={{
                      border: '2px dashed var(--border-color)',
                      padding: '30px',
                      textAlign: 'center',
                      backgroundColor: 'var(--bg-color)',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                    
                    {filePreview ? (
                      <div>
                        {mediaType === 'image' ? (
                          <img 
                            src={filePreview} 
                            alt="preview" 
                            style={{ maxHeight: '160px', maxWidth: '100%', objectFit: 'contain' }}
                          />
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--gold-accent)' }}>videocam</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>تم اختيار مقطع الفيديو</span>
                          </div>
                        )}
                        <p style={{ fontSize: '0.8rem', color: '#666666', marginTop: '8px' }}>
                          انقر هنا لتغيير الملف المحدد
                        </p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#666666' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--gold-accent)' }}>
                          cloud_upload
                        </span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                          اسحب الملف وأفلته هنا أو اضغط للاستعراض
                        </span>
                        <span style={{ fontSize: '0.75rem' }}>
                          {mediaType === 'image' ? 'يدعم صيغ JPG, PNG, WEBP' : 'يدعم صيغ MP4, MOV'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                {uploading && (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}>
                      <span>جاري الرفع وإعداد البيانات...</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-color)' }}>
                      <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--gold-accent)', transition: 'width 0.3s' }}></div>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px'
                  }}
                  disabled={uploading}
                >
                  <span className="material-symbols-outlined">publish</span>
                  رفع ونشر المشروع
                </button>
              </form>
            </div>

            {/* Existing Projects List Card */}
            <div style={{
              flex: '2 1 500px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              padding: '30px'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                قائمة المشاريع الحالية ({projects.length})
              </h3>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '40px', animation: 'spin 2s linear infinite', color: 'var(--gold-accent)' }}>
                    progress_activity
                  </span>
                  <p style={{ marginTop: '12px', fontWeight: 600 }}>جاري استرجاع المشاريع...</p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '20px'
                }}>
                  {projects.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', border: '1px dashed var(--border-color)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#888888' }}>
                        folder_open
                      </span>
                      <p style={{ marginTop: '12px', fontWeight: 600, color: '#666666' }}>لا توجد مشاريع مضافة حالياً.</p>
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div key={project.id} style={{
                        border: '1px solid var(--border-color)',
                        backgroundColor: '#FFFFFF',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        {/* Media preview */}
                        <div style={{ height: '140px', width: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#F0F0F0' }}>
                          {project.media_type === 'video' ? (
                            <video 
                              src={project.media_url} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <img 
                              src={project.media_url} 
                              alt={project.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          )}
                          <span style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: '#FFFFFF',
                            fontSize: '0.7rem',
                            padding: '4px 8px',
                            fontWeight: 600
                          }}>
                            {project.category}
                          </span>
                        </div>

                        {/* Details */}
                        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                          <h4 style={{
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            lineHeight: '1.4',
                            height: '40px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {project.title}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: '#888888', display: 'block' }}>
                            تاريخ النشر: {new Date(project.created_at).toLocaleDateString('ar-SA')}
                          </span>
                        </div>

                        {/* Actions */}
                        <div style={{
                          borderTop: '1px solid var(--border-color)',
                          display: 'flex',
                          backgroundColor: 'var(--bg-color)'
                        }}>
                          <button
                            onClick={() => handleDeleteProject(project.id, project.media_url)}
                            style={{
                              flex: 1,
                              padding: '10px',
                              border: 'none',
                              color: '#D32F2F',
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FFEBEE'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                            حذف
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in-up" style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            padding: '30px'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>بيانات المؤسسة العامة</h3>
            <p style={{ color: '#666666', fontSize: '0.95rem', marginBottom: '24px' }}>هذه المعلومات يتم ربطها تلقائياً بالصفحات وروابط التواصل.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label className="form-label">اسم المؤسسة</label>
                <input type="text" className="form-input" value="الزين للديكورات والتشطيبات" disabled />
              </div>
              <div>
                <label className="form-label">رقم الواتساب للاتصال</label>
                <input type="text" className="form-input" value="+966 56 376 5946" disabled />
              </div>
              <div>
                <label className="form-label">ريد الاتصال الرسمي</label>
                <input type="text" className="form-input" value="info@elzindecor.com" disabled />
              </div>
              <div>
                <label className="form-label">الموقع الجغرافي / المقر</label>
                <input type="text" className="form-input" value="المملكة العربية السعودية" disabled />
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 768px) {
          flex-direction: column !important;
          .admin-sidebar {
            width: 100% !important;
            border-left: none !important;
            border-bottom: 1px solid var(--border-color);
            padding: 20px !important;
          }
          .admin-sidebar > div {
            margin-bottom: 20px !important;
          }
          main {
            padding: 20px !important;
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
