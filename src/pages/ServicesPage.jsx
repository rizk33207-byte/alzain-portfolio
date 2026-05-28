import React from 'react'

const ServicesPage = () => {
  const whatsappUrl = "https://wa.me/966563765946?text=السلام عليكم، أود الاستفسار عن خدماتكم في الزين للديكورات"

  const detailedServices = [
    {
      title: 'أعمال السيراميك والرخام الطبيعي',
      subtitle: 'أناقة تدوم طويلاً ودقة متناهية في التنفيذ',
      desc: 'نوفر خدمة تركيب كافة أنواع السيراميك والبورسلان والرخام للفلل والمكاتب والواجهات. نحرص على تسوية الأرضيات بشكل كامل واستخدام أفضل الغراء والمواد المالئة للفواصل لضمان تماسك دائم وخلو تام من التعرجات.',
      features: [
        'تركيب بورسلان المقاسات الكبيرة بدقة عالية',
        'قص وتركيب رخام الدرج والمداخل والواجهات الخارجية',
        'تنعيم وتلميع الرخام بأحدث ماكينات الكريستال والماس',
        'معالجة الفواصل بمواد إيبوكسية تطابق لون الرخام'
      ],
      image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600',
      icon: 'grid_view'
    },
    {
      title: 'تركيب بديل الرخام وبديل شكورد',
      subtitle: 'الفخامة الرخامية بتكلفة اقتصادية ووزن خفيف',
      desc: 'ألواح بديل الرخام (PVC Marble Sheets) هي الحل المثالي للحصول على مظهر الرخام الفاخر للأسقف والجدران وخلفيات التلفزيون. تتميز بمقاومتها للماء والرطوبة وعزلها للحرارة وسهولة تنظيفها.',
      features: [
        'تنزيل وتشكيل تصاميم عصرية خلف التلفزيون وبالممرات',
        'مقاوم كامل للمياه، النمل الأبيض، والرطوبة بنسبة 100%',
        'دمج بديل الرخام مع الإضاءات المخفية والليد والمرايا',
        'سهولة الفك والصيانة دون الإضرار بالجدران الأصلية'
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      icon: 'layers'
    },
    {
      title: 'ألواح وديكورات بديل الخشب',
      subtitle: 'لمسة دافئة وطبيعية للمساحات الداخلية والخارجية',
      desc: 'نعيد تعريف المساحات باستخدام بديل الخشب (WPC Panels) المطور. يعطي مظهر الخشب الطبيعي وجاذبيته دون مشاكله المعتادة كالتشقق أو التأثر بالرطوبة وعوامل الطقس.',
      features: [
        'تغطية الجدران والأسقف الداخلية ببديل خشب عمودي',
        'تركيب كلادينج بديل الخشب الخارجي المقاوم للشمس والأمطار',
        'تشكيلات مميزة لداخل الفيلل بتدرجات لونية خشبية دافئة',
        'صديق للبيئة وسهل التنظيف والمسح ولا يحتاج لصيانة دورية'
      ],
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600',
      icon: 'splitscreen'
    },
    {
      title: 'توريد وتركيب العشب الحائطي والأرضي',
      subtitle: 'طبيعة خضراء دائمة في منزلك دون ري أو قص',
      desc: 'نصمم حدائقك المنزلية وشرفاتك بأفضل أنواع العشب الصناعي الأرضي بكثافات مختلفة، بالإضافة لتنفيذ ديكورات العشب الجداري ثلاثي الأبعاد المدمج مع الإضاءة وتنسيقات بديل الخشب.',
      features: [
        'عشب أرضي كثيف وناعم مقاوم للأشعة فوق البنفسجية ومناسب للأطفال',
        'تصميم جداريات عشبية ممزوجة بزهور ونباتات صناعية فاخرة',
        'تصريف ممتاز لمياه الأمطار وسهولة في التنظيف والغسيل',
        'تجهيز وتسطيح التربة التحتية لمنع ظهور الأعشاب الضارة والروائح'
      ],
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600',
      icon: 'grass'
    },
    {
      title: 'تصميم وتنفيذ الديكورات الداخلية',
      subtitle: 'لمسات فنية راقية تضفي جمالاً على تفاصيل منزلك',
      desc: 'نقوم بتنفيذ كافة أعمال الديكور الداخلي من أسقف جبسية بورد، جدران مضيئة، مرايا جدارية فخمة، وتنسيق ألوان الدهانات بما يحقق التناغم الكامل داخل مسكنك.',
      features: [
        'تركيب جبس بورد بتصاميم كلاسيكية ومودرن',
        'تصميم وتركيب مرايا جدارية معينات وبراويز فخمة',
        'أعمال الدهانات الداخلية الممتازة وورق الحائط الحديث',
        'توزيع هندسي للإضاءة والمفاتيح بما يخدم الجانب الجمالي'
      ],
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
      icon: 'home'
    },
    {
      title: 'تنسيق وتجهيز الجلسات الخارجية',
      subtitle: 'مساحات مريحة تجمع العائلة في الهواء الطلق',
      desc: 'نقوم بتصميم وتنفيذ المظلات والبرجولات والحدائق الخارجية وتنسيقها لتكون الملاذ الهادئ لعائلتك وضيوفك، مع دمج العشب الصناعي والجداريات الخشبية والإضاءة المتميزة.',
      features: [
        'تركيب برجولات ومظلات حديدية وخشبية مقاومة للصدأ وعوامل الطقس',
        'تصميم ممرات حجرية منسقة مع العشب الأخضر الأرضي',
        'إضاءات حدائق خارجية ومظاهر مائية تجميلية وشلالات منزلية',
        'أثاث جلسات خارجية متكامل مقاوم للرطوبة والمياه'
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
      icon: 'deck'
    }
  ]


  return (
    <div style={{ paddingTop: '80px' }} className="animate-fade-in-up">
      {/* Header Section */}
      <section style={{
        backgroundColor: 'var(--dark-container)',
        color: '#FFFFFF',
        padding: '60px 0',
        textAlign: 'center',
        borderBottom: '2px solid var(--gold-accent)'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>خدماتنا التفصيلية</h1>
          <p style={{ color: 'var(--gold-accent)', fontSize: '1.1rem', fontWeight: 500 }}>
            شغفنا هو تحويل رغباتكم إلى تحف معمارية تنبض بالحياة
          </p>
        </div>
      </section>

      {/* Detailed services list */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px'
          }}>
            {detailedServices.map((srv, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    gap: '40px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}
                  className="service-detail-row"
                >
                  {/* Service Image */}
                  <div style={{
                    flex: '1 1 400px',
                    position: 'relative'
                  }}>
                    {/* Decorative gold background block */}
                    <div style={{
                      position: 'absolute',
                      top: '-15px',
                      right: isEven ? '-15px' : 'auto',
                      left: !isEven ? '-15px' : 'auto',
                      width: '100%',
                      height: '100%',
                      border: '2px solid var(--gold-accent)',
                      zIndex: -1,
                      pointerEvents: 'none'
                    }}></div>
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      style={{
                        width: '100%',
                        height: '380px',
                        objectFit: 'cover',
                        border: '1px solid var(--border-color)',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Service Details */}
                  <div style={{
                    flex: '1 1 450px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'var(--text-color)',
                        color: 'var(--gold-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                          {srv.icon}
                        </span>
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{srv.title}</h2>
                        <h4 style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: '0.95rem' }}>{srv.subtitle}</h4>
                      </div>
                    </div>

                    <p style={{
                      color: '#444444',
                      lineHeight: '1.8',
                      fontSize: '1rem',
                      marginTop: '8px'
                    }}>
                      {srv.desc}
                    </p>

                    <ul style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginTop: '8px'
                    }}>
                      {srv.features.map((feat, fIdx) => (
                        <li key={fIdx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.95rem',
                          color: '#333333'
                        }}>
                          <span className="material-symbols-outlined" style={{
                            color: 'var(--gold-accent)',
                            fontSize: '20px',
                            fontWeight: 'bold'
                          }}>
                            check_circle
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <div style={{ marginTop: '24px' }}>
                      <a 
                        href={`${whatsappUrl} بخصوص ${srv.title}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <span className="material-symbols-outlined">chat</span>
                        طلب عرض سعر / معاينة
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Dynamic responsive CSS for layout rows */}
      <style>{`
        @media (max-width: 900px) {
          .service-detail-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ServicesPage
