
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from 'lucide-react';
import { LayoutGrid, Smartphone, Code, Camera, TrendingUp } from 'lucide-react';
import { getAllProjects } from '../utils/projectsData';

// Category filters with icons
const categories = [
  { id: 'all', name: 'الكل', icon: LayoutGrid },
  { id: 'ui-ux', name: 'واجهات المستخدم', icon: Smartphone },
  { id: 'development', name: 'البناء والتطوير', icon: Code },
  { id: 'photography', name: 'التصوير الفوتوغرافي', icon: Camera },
  { id: 'marketing', name: 'التسويق', icon: TrendingUp },
];

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'مشاريعنا | شركة العزب للإنشاءات';
    
    // Fetch projects data
    const fetchedProjects = getAllProjects();
    setProjects(fetchedProjects);
    setFilteredProjects(fetchedProjects);
    setIsLoading(false);
    
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
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      // Map our filter categories to the actual category values in projects
      const categoryMapping = {
        'ui-ux': 'مباني تجارية',
        'development': 'مباني سكنية',
        'photography': 'مباني صحية',
        'marketing': 'مباني سياحية'
      };
      
      const selectedCategory = categoryMapping[filter] || filter;
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [filter, projects]);

  const openProjectDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
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
          <div className="mb-2 inline-block">
            <span className="bg-accent/90 text-primary px-4 py-1 rounded-full text-sm font-medium">معرض الأعمال</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">مشاريعنا المتميزة</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            نفخر بمجموعة المشاريع المتميزة التي قمنا بتنفيذها، والتي تعكس التزامنا بالجودة والابتكار
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Categories Filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-3 reveal">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button 
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`rounded-full px-6 flex items-center gap-2 ${
                    filter === category.id 
                      ? 'bg-accent text-primary' 
                      : 'bg-gray-800/10 text-gray-700 hover:bg-gray-800/20'
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <Card key={index} className="rounded-lg overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-300 animate-pulse h-56"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-300 animate-pulse mb-2 w-2/3 rounded"></div>
                    <div className="h-4 bg-gray-300 animate-pulse w-1/2 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className="overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all cursor-pointer reveal bg-white"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => openProjectDetails(project.id)}
                >
                  <div className="relative group h-56">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        className="bg-white text-primary hover:bg-white/90 flex items-center gap-2 transform -translate-y-4 group-hover:translate-y-0 transition-all"
                        size="sm"
                      >
                        <Eye size={16} />
                        عرض المشروع
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-primary">{project.title}</h3>
                      <span className="bg-accent/20 text-accent px-2 py-0.5 text-xs rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.location}, {project.year}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProjects.length === 0 && (
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
    </Layout>
  );
};

export default ProjectsPage;
