
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Eye, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProjectManagementPage = () => {
  useEffect(() => {
    document.title = 'إدارة المشاريع | شركة العزب للإنشاءات';
  }, []);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'المنصورة',
      location: 'المنصورة',
      category: 'الفئة: المباني التجارية',
      description: 'مشروع إنشاء داخلي كامل يشمل تشطيبات وأبواب وكهرباء',
      progress: 65,
      image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 2,
      title: 'التجمع الخامس',
      location: 'التجمع الخامس',
      category: 'الفئة: المباني التجارية',
      description: 'كافة المعلومات والتفاصيل المتعلقة بالمشروع ومعلومات المشروع واسم المشروع والمنطقة المطلوبة للمباني التجارية',
      progress: 10,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 3,
      title: 'المنصورة',
      location: 'المنصورة',
      category: 'الفئة: المباني التجارية',
      description: 'مشروع إنشاء داخلي كامل يشمل تشطيبات وأبواب وكهرباء',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 4,
      title: 'أرشيف القطامية',
      location: 'القطامية',
      category: 'الفئة: المكاتبية',
      description: 'تنظيم أرشيف وإنشاء رفوف داخل المخزن',
      progress: 35,
      image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 5,
      title: 'فرع طنطا الاستاد',
      location: 'طنطا - منطقة الاستاد',
      category: 'الفئة: المباني التجارية',
      description: 'مشروع إنشاء داخلي كامل يشمل تشطيبات وأبواب وكهرباء',
      progress: 20,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 6,
      title: 'فرع دمنهور',
      location: 'دمنهور - وسط البلد',
      category: 'الفئة: المباني التجارية',
      description: 'إنشاء كامل من الصفر مع بناء داخلي وخارجي',
      progress: 5,
      image: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 7,
      title: 'فرع بورتو السخنة',
      location: 'بورتو السخنة',
      category: 'الفئة: المباني التجارية',
      description: 'أعمال تأسيس وتخطيط خارجي لموقع جديد',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 8,
      title: 'فرع بنها',
      location: 'بنها - شارع فريد ندا',
      category: 'الفئة: المباني التجارية',
      description: 'تشطيبات داخلي وديكور الواجهات',
      progress: 10,
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    }
  ]);

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-primary pt-28 pb-16 px-4">
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">إدارة المشاريع</h1>
        </div>
      </div>

      {/* Projects Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-primary">المشاريع الحديثة</h2>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="flex items-center gap-2 bg-primary hover:bg-primary-light">
                  <Plus size={18} />
                  إضافة مشروع جديد
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem>
                  <span>مشروع سكني</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>مشروع تجاري</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>مشروع صناعي</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>مشروع مكاتب</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 left-3 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                    جديد
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-primary">{project.location}</h3>
                    <span className="text-gray-600 text-sm">{project.title}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{project.category}</p>
                  <p className="text-sm text-gray-800 mb-4 line-clamp-2">{project.description}</p>
                  
                  {project.progress > 0 && (
                    <div className="mt-4 mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>نسبة الإنجاز</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-teal-500" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="space-x-2 flex">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center"
                          >
                            <Eye size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                          <DropdownMenuItem>
                            <span>عرض التفاصيل</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span>تحرير المشروع</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span>تحديث الحالة</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex items-center"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty project placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={`empty-${index}`} 
                className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center h-64"
              >
                <Button variant="ghost" className="text-gray-500">
                  <Plus className="mr-2 h-5 w-5" />
                  إضافة مشروع جديد
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectManagementPage;
