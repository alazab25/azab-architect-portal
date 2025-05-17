
import { supabase } from '@/integrations/supabase/client';

// واجهة بيانات المشروع
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

// واجهة بيانات ملف المشروع
export interface ProjectFile {
  id: string;
  project_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size?: number;
  created_at?: string;
}

// الحصول على جميع المشاريع
export const getAllProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('خطأ في جلب المشاريع:', error);
    throw error;
  }

  return data || [];
};

// الحصول على مشروع محدد
export const getProject = async (id: string | number): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`خطأ في جلب المشروع رقم ${id}:`, error);
    return null;
  }

  return data;
};

// إضافة مشروع جديد
export const addProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) {
    console.error('خطأ في إضافة المشروع:', error);
    throw error;
  }

  return data;
};

// تحديث مشروع
export const updateProject = async (id: string | number, project: Partial<Project>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`خطأ في تحديث المشروع رقم ${id}:`, error);
    throw error;
  }

  return data;
};

// حذف مشروع
export const deleteProject = async (id: string | number): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`خطأ في حذف المشروع رقم ${id}:`, error);
    throw error;
  }
};

// رفع صورة للمشروع
export const uploadProjectImage = async (file: File, projectId: string): Promise<string> => {
  // إنشاء اسم فريد للملف
  const fileExt = file.name.split('.').pop();
  const fileName = `${projectId}/image_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('project-files')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error('خطأ في رفع صورة المشروع:', error);
    throw error;
  }

  // الحصول على الرابط العام للصورة
  const { data: { publicUrl } } = supabase.storage
    .from('project-files')
    .getPublicUrl(data.path);

  return publicUrl;
};

// رفع ملف متعلق بالمشروع
export const uploadProjectFile = async (
  file: File,
  projectId: string,
  fileName?: string
): Promise<ProjectFile> => {
  // إنشاء اسم فريد للملف
  const fileExt = file.name.split('.').pop();
  const storageName = `${projectId}/${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

  // رفع الملف
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('project-files')
    .upload(storageName, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    console.error('خطأ في رفع ملف المشروع:', uploadError);
    throw uploadError;
  }

  // إضافة سجل في قاعدة البيانات
  const { data: fileData, error: dbError } = await supabase
    .from('project_files')
    .insert({
      project_id: projectId,
      name: fileName || file.name,
      file_path: uploadData.path,
      file_type: file.type,
      file_size: file.size
    })
    .select()
    .single();

  if (dbError) {
    console.error('خطأ في حفظ بيانات الملف:', dbError);
    throw dbError;
  }

  return fileData;
};

// الحصول على ملفات المشروع
export const getProjectFiles = async (projectId: string | number): Promise<ProjectFile[]> => {
  const { data, error } = await supabase
    .from('project_files')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`خطأ في جلب ملفات المشروع رقم ${projectId}:`, error);
    throw error;
  }

  return data || [];
};

// حذف ملف المشروع
export const deleteProjectFile = async (fileId: string): Promise<void> => {
  // الحصول على معلومات الملف
  const { data: fileData, error: fetchError } = await supabase
    .from('project_files')
    .select('file_path')
    .eq('id', fileId)
    .single();

  if (fetchError) {
    console.error(`خطأ في جلب معلومات الملف رقم ${fileId}:`, fetchError);
    throw fetchError;
  }

  // حذف الملف من المخزن
  if (fileData?.file_path) {
    const { error: storageError } = await supabase.storage
      .from('project-files')
      .remove([fileData.file_path]);

    if (storageError) {
      console.error(`خطأ في حذف الملف من المخزن:`, storageError);
      // نستمر حتى لو فشل الحذف من المخزن
    }
  }

  // حذف سجل الملف من قاعدة البيانات
  const { error: dbError } = await supabase
    .from('project_files')
    .delete()
    .eq('id', fileId);

  if (dbError) {
    console.error(`خطأ في حذف سجل الملف رقم ${fileId}:`, dbError);
    throw dbError;
  }
};
