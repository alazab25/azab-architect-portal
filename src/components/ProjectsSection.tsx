
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LayoutGrid, Smartphone, Code, Camera, TrendingUp } from 'lucide-react';

// Category filters with icons
const projectCategories = [
  { id: 'all', name: 'الكل', icon: LayoutGrid },
  { id: 'residential', name: 'سكني', icon: Code },
  { id: 'commercial', name: 'تجاري', icon: Smartphone },
  { id: 'industrial', name: 'صناعي', icon: TrendingUp },
];

const projects = [
  {
    id: 1,
    title: 'فيلا سكنية فاخرة',
    category: 'residential',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 2,
    title: 'مجمع تجاري متكامل',
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 3,
    title: 'مصنع حديث',
    category: 'industrial',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 4,
    title: 'مبنى إداري متميز',
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 5,
    title: 'فيلا مودرن',
    category: 'residential',
    image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    id: 6,
    title: 'مستودع صناعي',
    category: 'industrial',
    image: 'https://images.unsplash.com/photo-1486672578061-9ea86bfdd566?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const navigate = useNavigate();
  
  useEffect(() => {
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
    <section className="section-padding bg-gray-50" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <div className="mb-2 inline-block">
            <span className="bg-accent/90 text-primary px-4 py-1 rounded-full text-sm font-medium">معرض الأعمال</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">أحدث الأعمال المنجزة</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            نفخر بتقديم مجموعة متنوعة من المشاريع التي قمنا بتنفيذها بجودة عالية وإتقان، والتي تعكس خبرتنا وقدراتنا في مجال الإنشاءات والخدمات المعمارية.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 reveal">
          {projectCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-accent text-primary'
                    : 'bg-gray-800/10 hover:bg-gray-800/20 text-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon size={18} />
                {category.name}
              </button>
            );
          })}
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
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    className="bg-white text-primary font-medium py-2 px-4 rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-all"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    عرض التفاصيل
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                <p className="text-sm text-secondary capitalize">
                  {projectCategories.find(c => c.id === project.category)?.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Button
            className="bg-primary hover:bg-primary-light text-white"
            onClick={() => navigate('/projects')}
          >
            عرض جميع المشاريع
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
