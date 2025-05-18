
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// Define Project interface
export interface Project {
  id: string;
  title: string;
  location?: string;
  category?: string;
  description?: string;
  progress: number;
  completed: boolean;
  image_url?: string;
  model_url?: string;
  created_at?: string;
  updated_at?: string;
  technical_details?: Array<{ key: string; value: string }>;
}

// Define ProjectFile interface
export interface ProjectFile {
  id: string;
  project_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at?: string;
}

/**
 * Fetch all projects
 */
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
  
  return data;
};

/**
 * Fetch a single project by ID
 */
export const fetchProjectById = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
  
  return data;
};

/**
 * Create a new project
 */
export const createProject = async (project: Partial<Project>) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select();
    
  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }
  
  return data[0];
};

/**
 * Update an existing project
 */
export const updateProject = async (id: string, project: Partial<Project>) => {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select();
    
  if (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;
  }
  
  return data[0];
};

/**
 * Delete a project
 */
export const deleteProject = async (id: string) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
  
  return true;
};

/**
 * Fetch files for a project
 */
export const fetchProjectFiles = async (projectId: string) => {
  const { data, error } = await supabase
    .from('project_files')
    .select('*')
    .eq('project_id', projectId);
    
  if (error) {
    console.error(`Error fetching files for project with ID ${projectId}:`, error);
    throw error;
  }
  
  return data;
};

/**
 * Upload a file for a project
 */
export const uploadProjectFile = async (projectId: string, file: File) => {
  const timestamp = new Date().getTime();
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}-${timestamp}.${fileExtension}`;
  const filePath = `files/${projectId}/${fileName}`;
  
  // Upload the file to storage
  const { error: uploadError } = await supabase
    .storage
    .from('project-files')
    .upload(filePath, file);
    
  if (uploadError) {
    console.error(`Error uploading file for project with ID ${projectId}:`, uploadError);
    throw uploadError;
  }
  
  // Get the public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('project-files')
    .getPublicUrl(filePath);
  
  // Insert file record in the database
  const { data: fileData, error: fileError } = await supabase
    .from('project_files')
    .insert([
      {
        project_id: projectId,
        name: file.name,
        file_path: filePath,
        file_type: file.type,
        file_size: file.size
      }
    ])
    .select();
    
  if (fileError) {
    console.error(`Error saving file record for project with ID ${projectId}:`, fileError);
    throw fileError;
  }
  
  return { ...fileData[0], publicUrl };
};

/**
 * Delete a project file
 */
export const deleteProjectFile = async (fileId: string, filePath: string) => {
  // Delete file from storage
  const { error: storageError } = await supabase
    .storage
    .from('project-files')
    .remove([filePath]);
    
  if (storageError) {
    console.error(`Error deleting file with ID ${fileId} from storage:`, storageError);
    throw storageError;
  }
  
  // Delete file record from database
  const { error: dbError } = await supabase
    .from('project_files')
    .delete()
    .eq('id', fileId);
    
  if (dbError) {
    console.error(`Error deleting file record with ID ${fileId} from database:`, dbError);
    throw dbError;
  }
  
  return true;
};

/**
 * Get public URL for a file
 */
export const getFilePublicUrl = (filePath: string) => {
  const { data } = supabase
    .storage
    .from('project-files')
    .getPublicUrl(filePath);
    
  return data.publicUrl;
};

export default {
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject,
  fetchProjectFiles,
  uploadProjectFile,
  deleteProjectFile,
  getFilePublicUrl
};
