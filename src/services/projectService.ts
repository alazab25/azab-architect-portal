
import { supabase } from "../integrations/supabase/client";

export interface Project {
  id: string;
  title: string;
  description?: string;
  location?: string;
  category?: string;
  progress?: number;
  completed?: boolean;
  image_url?: string;
  model_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size?: number;
  created_at?: string;
}

/**
 * جلب جميع المشاريع
 */
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
  
  return data || [];
};

/**
 * جلب مشروع بواسطة المعرف
 */
export const getProjectById = async (projectId: string | number): Promise<Project | null> => {
  // تحويل المعرف إلى سلسلة نصية إذا كان رقمًا
  const id = String(projectId);
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    if (error.code === 'PGRST116') {
      // المشروع غير موجود
      return null;
    }
    console.error("Error fetching project:", error);
    throw error;
  }
  
  return data;
};

/**
 * إنشاء مشروع جديد
 */
export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();
    
  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }
  
  return data;
};

/**
 * تحديث مشروع موجود
 */
export const updateProject = async (projectId: string | number, project: Partial<Project>): Promise<Project> => {
  // تحويل المعرف إلى سلسلة نصية إذا كان رقمًا
  const id = String(projectId);
  
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error("Error updating project:", error);
    throw error;
  }
  
  return data;
};

/**
 * حذف مشروع
 */
export const deleteProject = async (projectId: string | number): Promise<void> => {
  // تحويل المعرف إلى سلسلة نصية إذا كان رقمًا
  const id = String(projectId);
  
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

/**
 * جلب ملفات المشروع
 */
export const getProjectFiles = async (projectId: string | number): Promise<ProjectFile[]> => {
  // تحويل المعرف إلى سلسلة نصية إذا كان رقمًا
  const id = String(projectId);
  
  const { data, error } = await supabase
    .from('project_files')
    .select('*')
    .eq('project_id', id)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Error fetching project files:", error);
    throw error;
  }
  
  return data || [];
};

/**
 * إضافة ملف للمشروع
 */
export const addProjectFile = async (file: Omit<ProjectFile, 'id' | 'created_at'>): Promise<ProjectFile> => {
  const { data, error } = await supabase
    .from('project_files')
    .insert(file)
    .select()
    .single();
    
  if (error) {
    console.error("Error adding project file:", error);
    throw error;
  }
  
  return data;
};

/**
 * حذف ملف المشروع
 */
export const deleteProjectFile = async (fileId: string): Promise<void> => {
  const { error } = await supabase
    .from('project_files')
    .delete()
    .eq('id', fileId);
    
  if (error) {
    console.error("Error deleting project file:", error);
    throw error;
  }
};

/**
 * تحميل ملف إلى Supabase Storage
 */
export const uploadProjectFile = async (
  projectId: string | number,
  file: File
): Promise<{ path: string; size: number }> => {
  // تحويل المعرف إلى سلسلة نصية إذا كان رقمًا
  const id = String(projectId);
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${id}/${fileName}`;
  
  const { data, error } = await supabase
    .storage
    .from('project-files')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });
    
  if (error) {
    console.error("Error uploading file to storage:", error);
    throw error;
  }
  
  return {
    path: data.path,
    size: file.size
  };
};

/**
 * حذف ملف من Supabase Storage
 */
export const deleteStorageFile = async (filePath: string): Promise<void> => {
  const { error } = await supabase
    .storage
    .from('project-files')
    .remove([filePath]);
    
  if (error) {
    console.error("Error deleting file from storage:", error);
    throw error;
  }
};

/**
 * الحصول على URL عام للملف
 */
export const getPublicFileUrl = (filePath: string): string => {
  const { data } = supabase
    .storage
    .from('project-files')
    .getPublicUrl(filePath);
    
  return data.publicUrl;
};
