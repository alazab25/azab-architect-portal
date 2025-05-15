
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Link as LinkIcon, Calendar, Building } from 'lucide-react';
import ProjectImageSlider from '../components/project/ProjectImageSlider';
import ProjectTechnologies from '../components/project/ProjectTechnologies';
import { getAllProjects } from '../utils/projectsData';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [nextProject, setNextProject] = useState<any>(null);
  
  useEffect(() => {
    document.title = 'تفاصيل المشروع | شركة العزب للإنشاءات';
    
    // Fetch project data based on ID
    const projects = getAllProjects();
    const currentProject = projects.find(p => p.id === Number(id));
    
    if (currentProject) {
      setProject(currentProject);
      
      // Find next project
      const currentIndex = projects.findIndex(p => p.id === Number(id));
      const nextIndex = (currentIndex + 1) % projects.length;
      setNextProject(projects[nextIndex]);
    } else {
      // Project not found, redirect to projects page
      navigate('/projects');
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">جاري تحميل المشروع...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-primary pt-28 pb-16 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={project.gallery[0]}
            alt={project.title}
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              {project.description}
            </p>
          </div>
          
          <div className="flex items-center justify-center text-white/80 text-sm">
            <Link to="/" className="hover:text-white">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link to="/projects" className="hover:text-white">المشاريع</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{project.title}</span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Image Slider */}
            <div className="lg:col-span-2">
              <ProjectImageSlider images={project.gallery} title={project.title} />
            </div>
            
            {/* Project Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Badge className="mb-4 bg-accent text-primary">{project.category}</Badge>
              <h2 className="text-2xl font-bold text-primary mb-4">{project.title}</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-accent" />
                  <div>
                    <p className="text-sm text-gray-500">سنة الإنجاز</p>
                    <p className="font-medium">{project.year}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building size={18} className="text-accent" />
                  <div>
                    <p className="text-sm text-gray-500">الموقع</p>
                    <p className="font-medium">{project.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <LinkIcon size={18} className="text-accent" />
                  <div>
                    <p className="text-sm text-gray-500">رابط المشروع</p>
                    <a href="#" className="font-medium text-primary hover:underline">عرض المشروع</a>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-accent text-primary hover:bg-accent/90 font-medium">
                عرض المشروع مباشرة
              </Button>
            </div>
          </div>
          
          {/* Project Overview */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <span className="bg-accent/20 w-10 h-10 rounded-full flex items-center justify-center text-accent mr-3">1</span>
                  نظرة عامة عن المشروع
                </h3>
                <p className="text-secondary leading-relaxed">
                  {project.description} {project.description}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <span className="bg-accent/20 w-10 h-10 rounded-full flex items-center justify-center text-accent mr-3">2</span>
                  التحديات
                </h3>
                <p className="text-secondary leading-relaxed">
                  واجهنا العديد من التحديات خلال تنفيذ هذا المشروع، منها ضيق المساحة وتعقيد التصميم الهندسي، بالإضافة إلى الحاجة لدمج التقنيات الحديثة مع الطابع التقليدي للمبنى، وقد تمكن فريقنا من تجاوز هذه التحديات بفضل خبرتنا الطويلة والتخطيط الدقيق.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <span className="bg-accent/20 w-10 h-10 rounded-full flex items-center justify-center text-accent mr-3">3</span>
                  الحلول
                </h3>
                <p className="text-secondary leading-relaxed mb-6">
                  قدمنا حلولاً مبتكرة للتغلب على التحديات، حيث استخدمنا تقنيات البناء الحديثة والمواد عالية الجودة لضمان متانة المبنى وجماليته في آن واحد، كما اعتمدنا على تصميم ذكي يستغل المساحة بأقصى كفاءة ممكنة.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="border border-gray-200 rounded-lg p-4 flex items-start">
                      <div className="bg-accent/10 rounded-full p-2 text-accent mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-primary mb-1">استخدام مواد صديقة للبيئة</h4>
                        <p className="text-sm text-secondary">حرصنا على استخدام مواد بناء صديقة للبيئة ومستدامة لتقليل التأثير البيئي للمشروع.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              {/* Key Features */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-xl font-bold text-primary mb-4">المميزات الرئيسية</h3>
                <ul className="space-y-4">
                  {['تصميم معماري فريد', 'نظام إضاءة موفر للطاقة', 'مواد بناء عالية الجودة', 'مساحات مفتوحة واسعة'].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="text-accent mr-3" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Technologies Used */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-4">التقنيات المستخدمة</h3>
                <ProjectTechnologies />
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <Button 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent hover:text-primary"
              onClick={() => window.history.back()}
            >
              العودة للمشاريع
            </Button>
            
            {nextProject && (
              <Link to={`/projects/${nextProject.id}`}>
                <Button className="bg-primary hover:bg-primary-light flex items-center gap-2">
                  المشروع التالي
                  <ArrowRight size={16} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetailsPage;
