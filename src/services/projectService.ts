
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export interface Project {
  id: string | number;
  title: string;
  description?: string;
  location?: string;
  category?: string;
  progress: number;
  completed: boolean;
  image_url?: string;
  model_url?: string;
  technical_details?: Array<{ key: string; value: string }>;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  project_id: string;
  created_at?: string;
}

/**
 * الحصول على قائمة المشاريع
 */
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return data;
};

/**
 * الحصول على مشروع بواسطة المعرف
 */
export const getProjectById = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    throw error;
  }

  return data;
};

/**
 * إنشاء مشروع جديد
 */
export const createProject = async (project: Omit<Project, 'id'>) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return data[0];
};

/**
 * تحديث مشروع
 */
export const updateProject = async (id: string, project: Partial<Project>) => {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  return data[0];
};

/**
 * حذف مشروع
 */
export const deleteProject = async (id: string) => {
  // حذف ملفات المشروع من التخزين أولاً
  const { data: files } = await supabase
    .from('project_files')
    .select('file_path')
    .eq('project_id', id);

  if (files && files.length > 0) {
    for (const file of files) {
      await supabase
        .storage
        .from('project-files')
        .remove([file.file_path]);
    }
  }

  // حذف ملفات المشروع من قاعدة البيانات
  await supabase
    .from('project_files')
    .delete()
    .eq('project_id', id);

  // حذف المشروع
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }

  return true;
};

/**
 * الحصول على ملفات المشروع
 */
export const getProjectFiles = async (projectId: string) => {
  const { data, error } = await supabase
    .from('project_files')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching project files:', error);
    throw error;
  }

  return data;
};

/**
 * رفع ملف للمشروع
 */
export const uploadProjectFile = async (
  projectId: string,
  file: File,
  onProgress?: (progress: number) => void
) => {
  try {
    const timestamp = new Date().getTime();
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = `files/${projectId}/${fileName}`;
    
    // رفع الملف إلى التخزين
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('project-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) {
      throw uploadError;
    }
    
    // الحصول على الرابط العام للملف
    const { data: { publicUrl } } = supabase
      .storage
      .from('project-files')
      .getPublicUrl(filePath);
      
    // إضافة معلومات الملف إلى جدول project_files
    const fileInfo = {
      id: uuidv4(),
      project_id: projectId,
      name: file.name,
      file_path: filePath,
      file_type: file.type,
      file_size: file.size
    };
    
    const { data, error } = await supabase
      .from('project_files')
      .insert([fileInfo])
      .select();
      
    if (error) {
      throw error;
    }
    
    return { ...data[0], publicUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * حذف ملف من المشروع
 */
export const deleteProjectFile = async (fileId: string, filePath: string) => {
  try {
    // حذف الملف من التخزين
    const { error: storageError } = await supabase
      .storage
      .from('project-files')
      .remove([filePath]);
      
    if (storageError) {
      throw storageError;
    }
    
    // حذف معلومات الملف من قاعدة البيانات
    const { error } = await supabase
      .from('project_files')
      .delete()
      .eq('id', fileId);
      
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * الحصول على رابط التنزيل للملف
 */
export const getFileDownloadUrl = async (filePath: string) => {
  const { data } = supabase
    .storage
    .from('project-files')
    .getPublicUrl(filePath);
    
  return data.publicUrl;
};
