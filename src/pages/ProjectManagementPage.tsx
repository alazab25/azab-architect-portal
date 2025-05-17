
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import ProjectCard from '../components/project/ProjectCard';
import ProjectFilters from '../components/project/ProjectFilters';
import EmptyProjectPlaceholder from '../components/project/EmptyProjectPlaceholder';
import ProjectForm from '../components/project/ProjectForm';

const ProjectManagementPage = () => {
  // Set the page title
  useEffect(() => {
    document.title = 'إدارة المشاريع | شركة العزب للإنشاءات';
  }, []);

  // State
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'محلات أبو عوف',
      location: 'مول أركان - القاهرة',
      category: 'الفئة: المحلات التجارية',
      description: 'تصميم وتنفيذ محل لبيع المكسرات والبن بمساحة 85 متر مربع',
      progress: 100,
      completed: true,
      image: 'https://images.unsplash.com/photo-1604044923071-5210adda0efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 2,
      title: 'أبو عوف',
      location: 'نادي وادي دجلة - المعادي',
      category: 'الفئة: المحلات التجارية',
      description: 'تصميم وتنفيذ محل أبو عوف للمكسرات والبن بمساحة 65 متر مربع',
      progress: 100,
      completed: true,
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 3,
      title: 'المنصورة',
      location: 'المنصورة',
      category: 'الفئة: المباني التجارية',
      description: 'مشروع إنشاء داخلي كامل يشمل تشطيبات وأبواب وكهرباء',
      progress: 65,
      completed: false,
      image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 4,
      title: 'التجمع الخامس',
      location: 'التجمع الخامس',
      category: 'الفئة: المباني التجارية',
      description: 'كافة المعلومات والتفاصيل المتعلقة بالمشروع ومعلومات المشروع واسم المشروع والمنطقة المطلوبة للمباني التجارية',
      progress: 10,
      completed: false,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 5,
      title: 'أبو عوف',
      location: 'مول مصر - 6 أكتوبر',
      category: 'الفئة: المحلات التجارية',
      description: 'تنفيذ وتجهيز محل أبو عوف بمساحة 100 متر مربع مع نظام تخزين متطور',
      progress: 100,
      completed: true,
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 6,
      title: 'أرشيف القطامية',
      location: 'القطامية',
      category: 'الفئة: المكاتبية',
      description: 'تنظيم أرشيف وإنشاء رفوف داخل المخزن',
      progress: 35,
      completed: false,
      image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 7,
      title: 'أبو عوف',
      location: 'سيتي ستارز - مدينة نصر',
      category: 'الفئة: المحلات التجارية',
      description: 'تصميم وتنفيذ محل أبو عوف للمكسرات والبن بمساحة 90 متر مربع',
      progress: 100,
      completed: true,
      image: 'https://images.unsplash.com/photo-1604669699786-58955622e53a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 8,
      title: 'فرع طنطا الاستاد',
      location: 'طنطا - منطقة الاستاد',
      category: 'الفئة: المباني التجارية',
      description: 'مشروع إنشاء داخلي كامل يشمل تشطيبات وأبواب وكهرباء',
      progress: 20,
      completed: false,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
  ]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { toast } = useToast();

  // Handler functions
  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "تم حذف المشروع بنجاح",
      description: "تم حذف المشروع من قائمة المشاريع",
    });
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...projects];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm) || 
        project.location.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.status === 'completed') {
      filtered = filtered.filter(project => project.completed);
    } else if (filters.status === 'in-progress') {
      filtered = filtered.filter(project => !project.completed);
    }
    
    if (filters.category === 'retail') {
      filtered = filtered.filter(project => project.category.includes('المحلات التجارية'));
    } else if (filters.category === 'commercial') {
      filtered = filtered.filter(project => project.category.includes('المباني التجارية'));
    } else if (filters.category === 'office') {
      filtered = filtered.filter(project => project.category.includes('المكاتبية'));
    }
    
    if (filters.sort === 'asc') {
      filtered = filtered.sort((a, b) => a.id - b.id);
    } else if (filters.sort === 'desc') {
      filtered = filtered.sort((a, b) => b.id - a.id);
    } else if (filters.sort === 'progress-high') {
      filtered = filtered.sort((a, b) => b.progress - a.progress);
    } else if (filters.sort === 'progress-low') {
      filtered = filtered.sort((a, b) => a.progress - b.progress);
    }
    
    setActiveFilter(filters.status || activeFilter);
    setFilteredProjects(filtered);
  };

  const handleAddProject = (projectData: any) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData,
    };
    
    setProjects([newProject, ...projects]);
    setShowNewProjectForm(false);
    
    toast({
      title: "تم إضافة المشروع بنجاح",
      description: `تم إضافة مشروع "${projectData.title}" بنجاح`,
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-primary pt-28 pb-16 px-4">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Projects Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">إدارة المشاريع</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            إدارة وتنظيم جميع مشاريع الشركة ومتابعة سير العمل
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <h2 className="text-2xl font-bold text-primary">المشاريع الحديثة</h2>
              <div className="flex gap-2 overflow-x-auto py-1 scrollbar-hide">
                <Button
                  variant={activeFilter === 'all' ? "default" : "outline"}
                  size="sm"
                  className={activeFilter === 'all' ? "bg-primary" : ""}
                  onClick={() => handleFilterChange({ status: 'all' })}
                >
                  الكل
                </Button>
                <Button
                  variant={activeFilter === 'completed' ? "default" : "outline"}
                  size="sm"
                  className={activeFilter === 'completed' ? "bg-green-600" : ""}
                  onClick={() => handleFilterChange({ status: 'completed' })}
                >
                  مكتمل
                </Button>
                <Button
                  variant={activeFilter === 'in-progress' ? "default" : "outline"}
                  size="sm"
                  className={activeFilter === 'in-progress' ? "bg-blue-600" : ""}
                  onClick={() => handleFilterChange({ status: 'in-progress' })}
                >
                  قيد التنفيذ
                </Button>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="flex items-center gap-2 bg-primary hover:bg-blue-700">
                  <Plus size={18} />
                  إضافة مشروع جديد
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem onClick={() => setShowNewProjectForm(true)}>
                  <span>مشروع محل تجاري</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowNewProjectForm(true)}>
                  <span>مشروع مبنى تجاري</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowNewProjectForm(true)}>
                  <span>مشروع مكاتب</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowNewProjectForm(true)}>
                  <span>مشروع سكني</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Project Filters */}
          <ProjectFilters 
            onFilterChange={handleFilterChange}
            onViewChange={setView}
            currentView={view}
          />

          {/* New Project Form */}
          {showNewProjectForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-primary">إضافة مشروع جديد</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewProjectForm(false)}
                >
                  إلغاء
                </Button>
              </div>
              <ProjectForm onSubmit={handleAddProject} />
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                {...project}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>

          {/* Empty project placeholders */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 mb-4">لا توجد مشاريع مطابقة للبحث</h3>
              <p className="text-gray-500 mb-8">جرب تغيير معايير البحث أو أضف مشروعاً جديداً</p>
              <Button 
                onClick={() => setShowNewProjectForm(true)}
                className="bg-primary hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" /> إضافة مشروع جديد
              </Button>
            </div>
          )}

          {filteredProjects.length > 0 && filteredProjects.length < 9 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {[...Array(Math.min(3, 9 - filteredProjects.length))].map((_, index) => (
                <EmptyProjectPlaceholder
                  key={`empty-${index}`}
                  index={index}
                  onClick={() => setShowNewProjectForm(true)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProjectManagementPage;
