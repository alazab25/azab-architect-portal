
import { supabase } from "../integrations/supabase/client";

export interface ProjectData {
  id?: number;
  title: string;
  location: string;
  category: string;
  description: string;
  progress: number;
  completed: boolean;
  image: string;
  model_url?: string;
  files?: any[];
  year?: string;
  gallery?: string[];
}

/**
 * الحصول على جميع المشاريع
 */
export const getProjects = async (): Promise<ProjectData[]> => {
  try {
    // عند تفعيل Supabase، استخدم هذا الكود للحصول على المشاريع من قاعدة البيانات
    // const { data, error } = await supabase
    //   .from('projects')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    
    // if (error) throw error;
    // return data;
    
    // استخدام بيانات تجريبية
    return [
      {
        id: 1,
        title: 'محلات أبو عوف',
        location: 'مول أركان - القاهرة',
        category: 'الفئة: المحلات التجارية',
        description: 'تصميم وتنفيذ محل لبيع المكسرات والبن بمساحة 85 متر مربع',
        progress: 100,
        completed: true,
        image: 'https://images.unsplash.com/photo-1604044923071-5210adda0efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        year: '2023',
        gallery: [
          'https://images.unsplash.com/photo-1604044923071-5210adda0efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          'https://images.unsplash.com/photo-1604669699786-58955622e53a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        ]
      },
      {
        id: 2,
        title: 'أبو عوف',
        location: 'نادي وادي دجلة - المعادي',
        category: 'الفئة: المحلات التجارية',
        description: 'تصميم وتنفيذ محل أبو عوف للمكسرات والبن بمساحة 65 متر مربع',
        progress: 100,
        completed: true,
        image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        year: '2022',
        gallery: [
          'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          'https://images.unsplash.com/photo-1604044923071-5210adda0efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          'https://images.unsplash.com/photo-1604669699786-58955622e53a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        ]
      },
      {
        id: 3,
        title: 'المنصورة',
        location: 'المنصورة',
        category: 'الفئة: المباني التجارية',
        description: 'مشروع إنشاء داخلي كامل يشمل تشطيبات وأبواب وكهرباء',
        progress: 65,
        completed: false,
        image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        year: '2023',
        gallery: [
          'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
          'https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
        ]
      },
    ];
  } catch (error) {
    console.error("خطأ في الحصول على المشاريع:", error);
    return [];
  }
};

/**
 * الحصول على مشروع محدد بواسطة المعرف
 */
export const getProjectById = async (id: number): Promise<ProjectData | null> => {
  try {
    // عند تفعيل Supabase، استخدم هذا الكود
    // const { data, error } = await supabase
    //   .from('projects')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    // استخدام بيانات تجريبية
    const projects = await getProjects();
    return projects.find(project => project.id === id) || null;
  } catch (error) {
    console.error(`خطأ في الحصول على المشروع رقم ${id}:`, error);
    return null;
  }
};

/**
 * إضافة مشروع جديد
 */
export const addProject = async (projectData: ProjectData): Promise<ProjectData | null> => {
  try {
    // عند تفعيل Supabase، استخدم هذا الكود
    // const { data, error } = await supabase
    //   .from('projects')
    //   .insert(projectData)
    //   .select('*')
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    // محاكاة الإضافة بدون قاعدة البيانات
    const newProject: ProjectData = {
      ...projectData,
      id: Date.now(),  // استخدام الوقت الحالي كمعرف مؤقت
    };
    
    return newProject;
  } catch (error) {
    console.error("خطأ في إضافة المشروع:", error);
    return null;
  }
};

/**
 * تحديث مشروع موجود
 */
export const updateProject = async (id: number, projectData: ProjectData): Promise<ProjectData | null> => {
  try {
    // عند تفعيل Supabase، استخدم هذا الكود
    // const { data, error } = await supabase
    //   .from('projects')
    //   .update(projectData)
    //   .eq('id', id)
    //   .select('*')
    //   .single();
    
    // if (error) throw error;
    // return data;
    
    // محاكاة التحديث بدون قاعدة البيانات
    const updatedProject: ProjectData = {
      ...projectData,
      id: id,
    };
    
    return updatedProject;
  } catch (error) {
    console.error(`خطأ في تحديث المشروع رقم ${id}:`, error);
    return null;
  }
};

/**
 * حذف مشروع
 */
export const deleteProject = async (id: number): Promise<boolean> => {
  try {
    // عند تفعيل Supabase، استخدم هذا الكود
    // const { error } = await supabase
    //   .from('projects')
    //   .delete()
    //   .eq('id', id);
    
    // if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`خطأ في حذف المشروع رقم ${id}:`, error);
    return false;
  }
};

/**
 * تحميل ملفات المشروع
 */
export const uploadProjectFiles = async (projectId: number, files: File[]): Promise<any[]> => {
  try {
    const uploadedFiles = [];
    
    // عند تفعيل Supabase Storage، استخدم هذا الكود
    // for (const file of files) {
    //   const filePath = `projects/${projectId}/${file.name}`;
    //   const { data, error } = await supabase.storage
    //     .from('project-files')
    //     .upload(filePath, file);
      
    //   if (error) throw error;
      
    //   // الحصول على عنوان URL العام للملف
    //   const { data: publicUrl } = supabase.storage
    //     .from('project-files')
    //     .getPublicUrl(filePath);
      
    //   uploadedFiles.push({
    //     name: file.name,
    //     size: file.size,
    //     type: file.type,
    //     url: publicUrl.publicUrl
    //   });
    // }
    
    // محاكاة رفع الملفات
    for (const file of files) {
      uploadedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file) // في الإنتاج، سيكون هذا URL حقيقيًا من تخزين Supabase
      });
    }
    
    return uploadedFiles;
  } catch (error) {
    console.error("خطأ في رفع ملفات المشروع:", error);
    return [];
  }
};

/**
 * الحصول على ملفات المشروع
 */
export const getProjectFiles = async (projectId: number): Promise<any[]> => {
  try {
    // عند تفعيل Supabase، استخدم هذا الكود
    // const { data, error } = await supabase.storage
    //   .from('project-files')
    //   .list(`projects/${projectId}`);
    
    // if (error) throw error;
    
    // const filesWithUrls = data.map(item => {
    //   const { data: publicUrl } = supabase.storage
    //     .from('project-files')
    //     .getPublicUrl(`projects/${projectId}/${item.name}`);
      
    //   return {
    //     name: item.name,
    //     size: item.metadata.size,
    //     type: item.metadata.mimetype,
    //     url: publicUrl.publicUrl
    //   };
    // });
    
    // return filesWithUrls;
    
    // بيانات تجريبية للملفات
    return [
      {
        name: 'مخطط-المشروع.pdf',
        size: '2.4 MB',
        type: 'application/pdf',
        url: 'https://example.com/files/blueprint.pdf'
      },
      {
        name: 'واجهة-المبنى.jpg',
        size: '1.7 MB',
        type: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e'
      },
      {
        name: 'جدول-التكاليف.xlsx',
        size: '0.5 MB',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        url: 'https://example.com/files/costs.xlsx'
      }
    ];
  } catch (error) {
    console.error(`خطأ في الحصول على ملفات المشروع رقم ${projectId}:`, error);
    return [];
  }
};
