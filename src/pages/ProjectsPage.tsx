
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  const projectCategories = [
    { id: 'all', name: 'الكل' },
    { id: 'residential', name: 'سكني' },
    { id: 'commercial', name: 'تجاري' },
    { id: 'industrial', name: 'صناعي' },
  ];

  const projects = [
    {
      id: 1,
      title: 'فيلا سكنية فاخرة',
      category: 'residential',
      location: 'الرياض، السعودية',
      description: 'تصميم وبناء فيلا سكنية فاخرة على مساحة 750 متر مربع، تجمع بين الطراز المعماري الحديث والتقليدي.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 2,
      title: 'مجمع تجاري متكامل',
      category: 'commercial',
      location: 'جدة، السعودية',
      description: 'تصميم وتنفيذ مجمع تجاري يضم محلات ومكاتب على مساحة 5000 متر مربع، مع تصميم معاصر وبنية تحتية متطورة.',
      image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 3,
      title: 'مصنع حديث',
      category: 'industrial',
      location: 'الدمام، السعودية',
      description: 'إنشاء مصنع متطور على مساحة 8000 متر مربع، مع مراعاة أعلى معايير السلامة والاستدامة.',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 4,
      title: 'مبنى إداري متميز',
      category: 'commercial',
      location: 'الرياض، السعودية',
      description: 'تصميم وبناء مقر إداري لشركة رائدة، يتميز بواجهة زجاجية حديثة وتصميم داخلي مريح وعملي.',
      image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 5,
      title: 'فيلا مودرن',
      category: 'residential',
      location: 'الطائف، السعودية',
      description: 'تصميم وتنفيذ فيلا سكنية بطراز معماري حديث، مع التركيز على استغلال الإضاءة الطبيعية والمساحات المفتوحة.',
      image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 6,
      title: 'مستودع صناعي',
      category: 'industrial',
      location: 'ينبع، السعودية',
      description: 'إنشاء مستودع صناعي متطور بمساحة 12000 متر مربع، مع أنظمة تخزين حديثة وتهوية متطورة.',
      image: 'https://images.unsplash.com/photo-1486672578061-9ea86bfdd566?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 7,
      title: 'مجمع سكني',
      category: 'residential',
      location: 'المدينة المنورة، السعودية',
      description: 'تصميم وبناء مجمع سكني يضم 12 وحدة سكنية فاخرة، مع مرافق مشتركة ومساحات خضراء.',
      image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 8,
      title: 'مول تجاري',
      category: 'commercial',
      location: 'أبها، السعودية',
      description: 'تصميم وتنفيذ مول تجاري على مساحة 15000 متر مربع، يضم محلات ومطاعم ومنطقة ترفيهية.',
      image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 9,
      title: 'مصنع للصناعات الغذائية',
      category: 'industrial',
      location: 'القصيم، السعودية',
      description: 'إنشاء مصنع متخصص في الصناعات الغذائية، مع الالتزام بأعلى معايير السلامة الغذائية.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    },
  ];

  useEffect(() => {
    document.title = 'مشاريعنا | شركة العزب للإنشاءات';

    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Page Header */}
      <div className="relative bg-primary py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Projects Header"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">مشاريعنا</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            استعرض مجموعة من المشاريع المتميزة التي قمنا بتنفيذها في مختلف المجالات
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="mb-12 reveal">
            <p className="text-secondary max-w-3xl">
              على مدار أكثر من 15 عامًا، قمنا بتنفيذ العديد من المشاريع المتنوعة في مجالات الإنشاءات والتصميم المعماري، بدءًا من الفلل السكنية الفاخرة وصولًا إلى المجمعات التجارية والمنشآت الصناعية. فيما يلي مجموعة مختارة من مشاريعنا.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 reveal">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden group h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={`/projects/${project.id}`} 
                      className="bg-white text-primary font-medium py-2 px-4 rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-all"
                    >
                      عرض التفاصيل
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-sm text-secondary mb-3">{project.location}</p>
                  <p className="text-secondary line-clamp-3">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary text-lg">لا توجد مشاريع في هذه الفئة حاليًا.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '150+', label: 'مشروع منجز' },
              { value: '95%', label: 'عملاء راضون' },
              { value: '15+', label: 'سنوات من الخبرة' },
              { value: '50+', label: 'خبير متخصص' },
            ].map((stat, index) => (
              <div key={index} className="text-center reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-5xl font-bold mb-2 text-accent">{stat.value}</div>
                <div className="text-lg text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">هل لديك مشروع في المستقبل؟</h2>
            <p className="text-secondary mb-8">
              سواء كنت تخطط لبناء منزل أحلامك، أو مشروع تجاري طموح، أو منشأة صناعية متطورة، فنحن هنا للمساعدة. تواصل معنا اليوم لمناقشة أفكارك والحصول على استشارة مجانية.
            </p>
            <a 
              href="/contact" 
              className="bg-primary hover:bg-primary-light text-white transition-colors px-8 py-3 rounded-md font-bold inline-block"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;
