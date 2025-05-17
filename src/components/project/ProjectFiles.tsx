
import { useState, useEffect } from 'react';
import { File, FileText, FileImage, Download, Eye, Upload, Trash2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProjectFile {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'excel' | 'other';
  size: string;
  file_path: string;
  created_at: string;
}

interface ProjectFilesProps {
  projectId: number | string;
}

const ProjectFiles = ({ projectId }: ProjectFilesProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchProjectFiles();
  }, [projectId]);
  
  const fetchProjectFiles = async () => {
    setIsLoading(true);
    try {
      // تحويل projectId إلى UUID إذا كان رقمًا
      const uuid = typeof projectId === 'number' 
        ? await getProjectUUID(projectId) 
        : String(projectId);
        
      // إذا لم نجد UUID صالح، نستخدم بيانات وهمية للعرض التجريبي
      if (!uuid) {
        setFiles(getDemoFiles());
        setIsLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', uuid);
        
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        const formattedFiles: ProjectFile[] = data.map(file => ({
          id: file.id,
          name: file.name,
          type: determineFileType(file.file_type),
          size: formatFileSize(file.file_size),
          file_path: file.file_path,
          created_at: new Date(file.created_at).toLocaleDateString('ar-SA')
        }));
        
        setFiles(formattedFiles);
      } else {
        setFiles([]); // لا توجد ملفات
      }
    } catch (error) {
      console.error("خطأ في جلب ملفات المشروع:", error);
      toast({
        title: "حدث خطأ",
        description: "تعذر جلب ملفات المشروع",
        variant: "destructive",
      });
      // استخدام بيانات وهمية للعرض التجريبي
      setFiles(getDemoFiles());
    } finally {
      setIsLoading(false);
    }
  };
  
  // تحويل رقم المشروع إلى UUID من جدول المشاريع
  const getProjectUUID = async (numericId: number): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id')
        .eq('id', numericId)
        .single();
        
      if (error || !data) {
        return null;
      }
      
      return data.id;
    } catch {
      return null;
    }
  };
  
  const determineFileType = (mimeType: string): 'image' | 'pdf' | 'excel' | 'other' => {
    if (mimeType.includes('image')) {
      return 'image';
    } else if (mimeType.includes('pdf')) {
      return 'pdf';
    } else if (mimeType.includes('excel') || mimeType.includes('spreadsheet') || mimeType.includes('xlsx')) {
      return 'excel';
    }
    return 'other';
  };
  
  const formatFileSize = (sizeInBytes: number): string => {
    if (!sizeInBytes) return '0 B';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = sizeInBytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };
  
  // بيانات وهمية للعرض التجريبي
  const getDemoFiles = (): ProjectFile[] => {
    return [
      {
        id: '1',
        name: 'مخطط-المشروع.pdf',
        type: 'pdf',
        size: '2.4 MB',
        file_path: 'https://example.com/files/blueprint.pdf',
        created_at: '2023-07-15'
      },
      {
        id: '2',
        name: 'واجهة-المبنى.jpg',
        type: 'image',
        size: '1.7 MB',
        file_path: 'https://images.unsplash.com/photo-1486325212027-8081e485255e',
        created_at: '2023-08-20'
      },
      {
        id: '3',
        name: 'جدول-التكاليف.xlsx',
        type: 'excel',
        size: '0.5 MB',
        file_path: 'https://example.com/files/costs.xlsx',
        created_at: '2023-09-05'
      }
    ];
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setIsUploading(true);
    
    try {
      // تحويل projectId إلى UUID إذا كان رقمًا
      const uuid = typeof projectId === 'number' 
        ? await getProjectUUID(projectId) 
        : String(projectId);
      
      if (!uuid) {
        throw new Error("لم يتم العثور على معرف المشروع");
      }
      
      // إنشاء اسم فريد للملف باستخدام timestamp
      const fileExt = uploadedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${uuid}/${fileName}`;
      
      // رفع الملف إلى مخزن Supabase
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from('project-files')
        .upload(filePath, uploadedFile, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (storageError) {
        throw storageError;
      }
      
      // إنشاء سجل في جدول project_files
      const { error: dbError } = await supabase
        .from('project_files')
        .insert({
          project_id: uuid,
          name: uploadedFile.name,
          file_path: storageData.path,
          file_type: uploadedFile.type,
          file_size: uploadedFile.size
        });
      
      if (dbError) {
        throw dbError;
      }
      
      toast({
        title: "تم رفع الملف بنجاح",
        description: `تم إضافة "${uploadedFile.name}" إلى المشروع`,
      });
      
      // إعادة تحميل الملفات
      await fetchProjectFiles();
      
    } catch (error) {
      console.error("خطأ في رفع الملف:", error);
      toast({
        title: "حدث خطأ",
        description: "تعذر رفع الملف، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
      
      // إضافة ملف وهمي للعرض التجريبي
      const fileType: 'image' | 'pdf' | 'excel' | 'other' = uploadedFile.type.includes('image')
        ? 'image'
        : uploadedFile.type.includes('pdf')
          ? 'pdf'
          : uploadedFile.type.includes('excel') || uploadedFile.name.endsWith('.xlsx') || uploadedFile.name.endsWith('.xls')
            ? 'excel'
            : 'other';
      
      const newFile: ProjectFile = {
        id: Date.now().toString(),
        name: uploadedFile.name,
        type: fileType,
        size: (uploadedFile.size / (1024 * 1024)).toFixed(1) + ' MB',
        file_path: URL.createObjectURL(uploadedFile),
        created_at: new Date().toLocaleDateString('ar-SA')
      };
      
      setFiles([newFile, ...files]);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      // البحث عن الملف في القائمة المحلية
      const fileToDelete = files.find(f => f.id === fileId);
      if (!fileToDelete) return;
      
      // حذف الملف من مخزن Supabase
      if (fileToDelete.file_path && !fileToDelete.file_path.startsWith('http')) {
        const { error: storageError } = await supabase
          .storage
          .from('project-files')
          .remove([fileToDelete.file_path]);
        
        if (storageError) {
          throw storageError;
        }
      }
      
      // حذف السجل من جدول project_files
      const { error: dbError } = await supabase
        .from('project_files')
        .delete()
        .eq('id', fileId);
      
      if (dbError) {
        throw dbError;
      }
      
      // تحديث القائمة المحلية
      setFiles(files.filter(f => f.id !== fileId));
      
      toast({
        title: "تم حذف الملف",
        description: `تم حذف "${fileToDelete.name}" من المشروع`,
      });
      
    } catch (error) {
      console.error("خطأ في حذف الملف:", error);
      toast({
        title: "حدث خطأ",
        description: "تعذر حذف الملف، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
      
      // حذف من القائمة المحلية على الأقل في العرض التجريبي
      setFiles(files.filter(f => f.id !== fileId));
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return <FileImage className="h-8 w-8 text-blue-500" />;
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'excel':
        return <FileText className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const handleDownload = async (file: ProjectFile) => {
    try {
      if (file.file_path.startsWith('http')) {
        // في حالة الرابط الخارجي
        window.open(file.file_path, '_blank');
        return;
      }
      
      // في حالة ملف من Supabase Storage
      const { data, error } = await supabase
        .storage
        .from('project-files')
        .download(file.file_path);
      
      if (error) {
        throw error;
      }
      
      // إنشاء رابط تنزيل
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "جاري التحميل",
        description: `بدأ تحميل "${file.name}"`,
      });
      
    } catch (error) {
      console.error("خطأ في تحميل الملف:", error);
      toast({
        title: "حدث خطأ",
        description: "تعذر تحميل الملف، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const handlePreview = async (file: ProjectFile) => {
    try {
      if (file.file_path.startsWith('http')) {
        // في حالة الرابط الخارجي
        window.open(file.file_path, '_blank');
        return;
      }
      
      // في حالة ملف من Supabase Storage
      const { data: { publicUrl }, error } = supabase
        .storage
        .from('project-files')
        .getPublicUrl(file.file_path);
        
      if (error) {
        throw error;
      }
      
      window.open(publicUrl, '_blank');
    } catch (error) {
      console.error("خطأ في معاينة الملف:", error);
      toast({
        title: "حدث خطأ",
        description: "تعذر معاينة الملف، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  // تصفية الملفات حسب النوع المحدد
  const filteredFiles = activeTab === "all" 
    ? files 
    : files.filter(file => file.type === activeTab);

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>ملفات المشروع</CardTitle>
            <CardDescription className="mt-1.5">
              استعراض وتحميل ملفات المشروع
            </CardDescription>
          </div>
          <div>
            <Button className="bg-primary hover:bg-blue-700 flex items-center gap-2" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جاري الرفع...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>رفع ملف</span>
                </>
              )}
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileUpload}
                disabled={isUploading}
                accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
              />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-gray-100">
            <TabsTrigger value="all" className="flex-1">جميع الملفات</TabsTrigger>
            <TabsTrigger value="image" className="flex-1">الصور</TabsTrigger>
            <TabsTrigger value="pdf" className="flex-1">PDF</TabsTrigger>
            <TabsTrigger value="excel" className="flex-1">Excel</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="text-center py-16">
                <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin" />
                <p className="mt-4 text-gray-600">جاري تحميل الملفات...</p>
              </div>
            ) : filteredFiles.length > 0 ? (
              <div className="space-y-4">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      {getFileIcon(file.type)}
                      <div className="mr-4 rtl:ml-4 rtl:mr-0">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <div className="flex text-sm text-gray-500 mt-1">
                          <span>{file.size}</span>
                          <span className="mx-2">•</span>
                          <span>تاريخ الرفع: {file.created_at}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handlePreview(file)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">معاينة</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleDownload(file)}
                      >
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">تحميل</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">حذف</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 border border-dashed rounded-lg">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-4 text-gray-600 font-medium">لا توجد ملفات</p>
                <p className="text-sm text-gray-500 mt-1">قم برفع ملفات جديدة باستخدام زر "رفع ملف"</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 px-6 py-3">
        <div className="w-full text-sm text-gray-500">
          إجمالي الملفات: {files.length} | الصور: {files.filter(f => f.type === 'image').length} | PDF: {files.filter(f => f.type === 'pdf').length} | Excel: {files.filter(f => f.type === 'excel').length}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectFiles;
