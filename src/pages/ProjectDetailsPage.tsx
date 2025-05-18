
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProtectedProjectFiles from '@/components/project/ProtectedProjectFiles';
import ProjectTechnicalDetails from '@/components/project/ProjectTechnicalDetails';
import ProjectImageSlider from '@/components/project/ProjectImageSlider';
import Project3DViewer from '@/components/project/Project3DViewer';
import ProjectTechnologies from '@/components/project/ProjectTechnologies';
import { getProjectById } from '@/services/projectService';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import EmptyProjectPlaceholder from '@/components/project/EmptyProjectPlaceholder';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      const projectData = await getProjectById(projectId);
      setProject(projectData);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto pt-32 pb-20">
          <div className="flex justify-center">
            <div className="animate-pulse space-y-8 w-full">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <EmptyProjectPlaceholder
          title="لم يتم العثور على المشروع"
          description="المشروع الذي تبحث عنه غير موجود أو تم حذفه"
          showButton={true}
          buttonText="عرض كل المشاريع"
          buttonLink="/projects"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto pt-32 pb-20">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-gray-500 text-sm mb-8 rtl:space-x-reverse">
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>&lt;</span>
          <Link to="/projects" className="hover:text-primary transition-colors">المشاريع</Link>
          <span>&lt;</span>
          <span className="text-primary font-medium">{project.title}</span>
        </div>

        {/* Project Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              {project.location && (
                <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {project.location}
                </span>
              )}
              {project.category && (
                <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {project.category}
                </span>
              )}
              {project.status && (
                <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {project.completed ? 'مكتمل' : 'قيد التنفيذ'}
                </span>
              )}
            </div>
          </div>
          
          <Button asChild>
            <Link to="/projects">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة إلى المشاريع
            </Link>
          </Button>
        </div>

        {/* Project Gallery */}
        <div className="mb-12">
          <ProjectImageSlider 
            images={project.images || [project.image]} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Project Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">وصف المشروع</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed">{project.description || 'لا يوجد وصف متاح لهذا المشروع.'}</p>
              </div>
            </div>
            
            {/* Project Technical Details */}
            <div className="mb-12">
              <ProjectTechnicalDetails technicalDetails={project.technical_details || []} />
            </div>

            {/* 3D Model Viewer */}
            {project.model_url && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">النموذج ثلاثي الأبعاد</h2>
                <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px]">
                  <Project3DViewer modelUrl={project.model_url} />
                </div>
              </div>
            )}

            {/* Project Technologies */}
            <ProjectTechnologies />
          </div>

          <div className="lg:col-span-1">
            {/* Project Files - Protected by authentication */}
            <ProtectedProjectFiles projectId={project.id} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetailsPage;
