
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: 'برج السلام التجاري',
    category: 'مباني تجارية',
    location: 'الرياض، المملكة العربية السعودية',
    year: '2023',
    description: 'برج مكتبي حديث يتألف من 25 طابقاً، صمم وفقاً لأحدث معايير الاستدامة والكفاءة الطاقية.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1481253127861-534498168948?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1492455417212-e162ed4446e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 2,
    title: 'مجمع الواحة السكني',
    category: 'مباني سكنية',
    location: 'جدة، المملكة العربية السعودية',
    year: '2022',
    description: 'مجمع سكني فاخر يضم 120 وحدة سكنية متنوعة، مع خدمات ومرافق متكاملة تلبي احتياجات السكان.',
    image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 3,
    title: 'مستشفى الرحمة',
    category: 'مباني صحية',
    location: 'الدمام، المملكة العربية السعودية',
    year: '2022',
    description: 'مستشفى حديث يضم 250 سريراً، مجهز بأحدث التقنيات الطبية والتصميم الذي يراعي راحة المرضى والكادر الطبي.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 4,
    title: 'مول الأندلس',
    category: 'مباني تجارية',
    location: 'الرياض، المملكة العربية السعودية',
    year: '2021',
    description: 'مركز تسوق عصري يمتد على مساحة 85,000 متر مربع، يضم أكثر من 200 متجر ومطعم ومرافق ترفيهية متنوعة.',
    image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 5,
    title: 'فندق القمة',
    category: 'مباني سياحية',
    location: 'مكة المكرمة، المملكة العربية السعودية',
    year: '2021',
    description: 'فندق فخم يضم 350 غرفة وجناحاً، مع مرافق متعددة ومطاعم عالمية وقاعات مؤتمرات مجهزة بأحدث التقنيات.',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1551632436-cbf726cbfb8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 6,
    title: 'مدرسة المستقبل الدولية',
    category: 'مباني تعليمية',
    location: 'جدة، المملكة العربية السعودية',
    year: '2020',
    description: 'مجمع تعليمي متكامل يضم مراحل تعليمية مختلفة، مع مرافق رياضية وترفيهية ومختبرات علمية متطورة.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 7,
    title: 'مصنع النور',
    category: 'مباني صناعية',
    location: 'الدمام، المملكة العربية السعودية',
    year: '2020',
    description: 'منشأة صناعية حديثة تمتد على مساحة 12,000 متر مربع، مصممة وفق أحدث معايير السلامة والكفاءة الإنتاجية.',
    image: 'https://images.unsplash.com/photo-1518866958548-51a748102f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518866958548-51a748102f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1565861748877-7194b889b660?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 8,
    title: 'حديقة الأمير محمد',
    category: 'مساحات عامة',
    location: 'الرياض، المملكة العربية السعودية',
    year: '2019',
    description: 'حديقة عامة تمتد على مساحة 25 هكتاراً، تضم مسطحات خضراء ومناطق ترفيهية ومسارات للمشي وبحيرة اصطناعية.',
    image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1497035111255-8294324af5bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1527561010307-3d8a5d024b4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
];

const categories = ['الكل', 'مباني تجارية', 'مباني سكنية', 'مباني صحية', 'مباني سياحية', 'مباني تعليمية', 'مباني صناعية', 'مساحات عامة'];

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);
  const [filter, setFilter] = useState('الكل');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    document.title = 'مشاريعنا | شركة العزب للإنشاءات';
    
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

  useEffect(() => {
    if (filter === 'الكل') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);

  const openProjectDetails = (project: typeof projects[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-primary py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="مشاريعنا"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">مشاريعنا</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            نفخر بمجموعة المشاريع المتميزة التي قمنا بتنفيذها، والتي تعكس التزامنا بالجودة والابتكار
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          {/* Categories Filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-3 reveal">
            {categories.map((category, index) => (
              <Button 
                key={index}
                onClick={() => setFilter(category)}
                className={`rounded-full px-6 ${
                  filter === category 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openProjectDetails(project)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-primary">{project.title}</h3>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  <p className="text-secondary line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 mb-2">لا توجد مشاريع في هذه الفئة حالياً</h3>
              <p className="text-gray-500">يرجى اختيار فئة أخرى لعرض المشاريع المتاحة</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center reveal">
            {[
              { number: '300+', label: 'مشروع منجز' },
              { number: '15+', label: 'سنوات خبرة' },
              { number: '50+', label: 'شريك نجاح' },
              { number: '98%', label: 'عملاء راضون' },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <h3 className="text-4xl font-bold mb-2 text-accent">{stat.number}</h3>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="max-w-4xl w-full bg-white rounded-lg max-h-[90vh] overflow-y-auto">
            {/* Gallery */}
            <div className="relative h-80">
              {selectedProject.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedProject.title} - صورة ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                />
              ))}
              <Button 
                className="absolute top-4 left-4 bg-white/80 text-primary hover:bg-white rounded-full w-10 h-10 p-0"
                onClick={closeProjectDetails}
              >
                &times;
              </Button>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-primary">{selectedProject.title}</h2>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  {selectedProject.category}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">الموقع</p>
                  <p className="font-medium">{selectedProject.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">سنة الإنجاز</p>
                  <p className="font-medium">{selectedProject.year}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">وصف المشروع</h3>
                <p className="text-secondary">{selectedProject.description}</p>
              </div>
              
              <Button 
                className="w-full btn-primary"
                onClick={closeProjectDetails}
              >
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProjectsPage;
