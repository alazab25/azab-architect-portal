
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Store, Building, Home, Upload, Plus, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
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
import { supabase } from "@/integrations/supabase/client"; // استيراد عميل Supabase

interface ProjectFile {
  name: string;
  size: string;
  type: string;
  file: File;
}

interface ProjectFormProps {
  initialData?: {
    id?: number;
    title: string;
    location: string;
    category: string;
    description: string;
    progress: number;
    completed: boolean;
    image: string;
    model_url?: string;
  };
  onSubmit: (data: any) => void;
  isEditing?: boolean;
}

const ProjectForm = ({ 
  initialData, 
  onSubmit, 
  isEditing = false 
}: ProjectFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [activeTab, setActiveTab] = useState('general');
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: initialData || {
      title: '',
      location: '',
      category: '',
      description: '',
      progress: 0,
      completed: false,
      image: '',
      model_url: '',
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // إضافة الملفات المحددة إلى القائمة
    const newFiles: ProjectFile[] = [];
    
    Array.from(files).forEach(file => {
      // تحديد نوع الملف
      let fileType = 'other';
      if (file.type.includes('image')) {
        fileType = 'image';
      } else if (file.type.includes('pdf')) {
        fileType = 'pdf';
      } else if (file.type.includes('excel') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        fileType = 'excel';
      }
      
      // تحويل حجم الملف إلى صيغة مقروءة
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      
      newFiles.push({
        name: file.name,
        size: fileSize,
        type: fileType,
        file: file
      });
    });
    
    setProjectFiles([...projectFiles, ...newFiles]);
    toast({
      title: "تمت إضافة الملفات",
      description: `تم إضافة ${newFiles.length} ملف جديد`,
    });
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...projectFiles];
    updatedFiles.splice(index, 1);
    setProjectFiles(updatedFiles);
  };

  const getProjectCategoryIcon = (category: string) => {
    switch (category) {
      case 'retail':
        return <Store size={16} />;
      case 'commercial':
        return <Building size={16} />;
      case 'residential':
        return <Home size={16} />;
      default:
        return <Building size={16} />;
    }
  };

  const submitHandler = async (data: any) => {
    setIsUploading(true);
    let finalData = { 
      ...data, 
      progress: parseInt(data.progress),
      completed: data.progress === '100'
    };
    
    try {
      // في الإنتاج: تحميل الصورة إلى Supabase Storage
      if (imagePreview && !imagePreview.startsWith('http')) {
        // مثال على تحميل الصورة (تعليق لعدم وجود خدمة Storage نشطة)
        /*
        const base64Data = imagePreview.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        
        const { data: uploadData, error } = await supabase.storage
          .from('projects')
          .upload(`project-${Date.now()}.jpg`, blob);
          
        if (error) throw error;
        
        // استخدام URL الصورة المرفوعة
        const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/projects/${uploadData.path}`;
        finalData.image = imageUrl;
        */
      }
      
      // تحميل ملفات المشروع (تعليق لعدم وجود خدمة Storage نشطة)
      if (projectFiles.length > 0) {
        // مثال على تحميل الملفات
        /*
        const uploadPromises = projectFiles.map(async (fileItem) => {
          const { data: fileData, error } = await supabase.storage
            .from('project-files')
            .upload(`project-${data.title}/${fileItem.name}`, fileItem.file);
            
          if (error) throw error;
          return fileData;
        });
        
        await Promise.all(uploadPromises);
        */
        
        // إضافة معلومات الملفات
        finalData.files = projectFiles.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type
        }));
      }
      
      // في حالة التعديل تحديث المشروع في قاعدة البيانات
      /*
      if (isEditing && initialData?.id) {
        const { error } = await supabase
          .from('projects')
          .update(finalData)
          .eq('id', initialData.id);
          
        if (error) throw error;
      } 
      // في حالة الإضافة إنشاء مشروع جديد
      else {
        const { error } = await supabase
          .from('projects')
          .insert(finalData);
          
        if (error) throw error;
      }
      */
      
      // استدعاء دالة الاستجابة
      onSubmit(finalData);
      
      toast({
        title: isEditing ? "تم تحديث المشروع" : "تمت إضافة المشروع",
        description: isEditing 
          ? `تم تحديث مشروع "${data.title}" بنجاح`
          : `تم إضافة مشروع "${data.title}" بنجاح`,
      });
    } catch (error) {
      console.error("خطأ أثناء حفظ المشروع:", error);
      toast({
        title: "حدث خطأ",
        description: "تعذر حفظ بيانات المشروع، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-gray-100 mb-6">
          <TabsTrigger value="general" className="flex-1">معلومات المشروع</TabsTrigger>
          <TabsTrigger value="files" className="flex-1">ملفات المشروع</TabsTrigger>
          <TabsTrigger value="advanced" className="flex-1">إعدادات متقدمة</TabsTrigger>
        </TabsList>
        
        {/* معلومات المشروع */}
        <TabsContent value="general" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات المشروع</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">اسم المشروع</Label>
                      <Input
                        id="title"
                        placeholder="أدخل اسم المشروع"
                        {...register('title', { required: "اسم المشروع مطلوب" })}
                      />
                      {errors.title && <p className="text-sm text-red-500">{errors.title.message as string}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">موقع المشروع</Label>
                      <Input
                        id="location"
                        placeholder="أدخل موقع المشروع"
                        {...register('location', { required: "موقع المشروع مطلوب" })}
                      />
                      {errors.location && <p className="text-sm text-red-500">{errors.location.message as string}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">فئة المشروع</Label>
                      <Select 
                        defaultValue={initialData?.category || ""}
                        onValueChange={(value) => setValue('category', value)}
                      >
                        <SelectTrigger id="category" className="w-full">
                          <SelectValue placeholder="اختر فئة المشروع" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="bg-white">
                          <SelectItem value="retail">المحلات التجارية</SelectItem>
                          <SelectItem value="commercial">المباني التجارية</SelectItem>
                          <SelectItem value="office">المكاتب</SelectItem>
                          <SelectItem value="residential">المباني السكنية</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" {...register('category', { required: "فئة المشروع مطلوبة" })} />
                      {errors.category && <p className="text-sm text-red-500">{errors.category.message as string}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="progress">نسبة الإنجاز</Label>
                      <div className="flex gap-2">
                        <Input
                          id="progress"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="أدخل نسبة الإنجاز"
                          {...register('progress', { 
                            required: "نسبة الإنجاز مطلوبة",
                            min: { value: 0, message: "الحد الأدنى هو 0" },
                            max: { value: 100, message: "الحد الأقصى هو 100" }
                          })}
                        />
                        <span className="flex items-center">%</span>
                      </div>
                      {errors.progress && <p className="text-sm text-red-500">{errors.progress.message as string}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">وصف المشروع</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      placeholder="أدخل وصف المشروع"
                      {...register('description', { required: "وصف المشروع مطلوب" })}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message as string}</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>صورة المشروع</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="معاينة الصورة" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute bottom-2 right-2 bg-white"
                          onClick={() => {
                            setImagePreview(null);
                            setValue('image', '');
                          }}
                        >
                          تغيير الصورة
                        </Button>
                      </div>
                    ) : (
                      <div className="py-8">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">اضغط لتحميل صورة</p>
                          <p className="text-xs text-gray-400">PNG, JPG، GIF حتى 5MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* ملفات المشروع */}
        <TabsContent value="files" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>ملفات المشروع</span>
                <div>
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Upload size={16} />
                    <span>إضافة ملفات</span>
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.dwg"
                    />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {projectFiles.length > 0 ? (
                <div className="space-y-3">
                  {projectFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center">
                        <FileText className="h-6 w-6 text-primary mr-3" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeFile(index)}
                      >
                        حذف
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed rounded-lg">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600">لم يتم إضافة ملفات بعد</p>
                  <p className="text-sm text-gray-500">قم بإضافة ملفات للمشروع باستخدام زر "إضافة ملفات"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* إعدادات متقدمة */}
        <TabsContent value="advanced" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات متقدمة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model_url">رابط النموذج ثلاثي الأبعاد</Label>
                <Input
                  id="model_url"
                  placeholder="أدخل رابط النموذج ثلاثي الأبعاد"
                  {...register('model_url')}
                />
                <p className="text-xs text-gray-500">أدخل رابط النموذج ثلاثي الأبعاد إذا كان متاحًا</p>
              </div>
              
              {/* يمكن إضافة المزيد من الإعدادات المتقدمة هنا */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-between">
        <Button type="button" variant="outline">
          إلغاء
        </Button>
        <Button type="submit" disabled={isUploading}>
          {isUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري الحفظ...
            </>
          ) : (
            isEditing ? 'تحديث المشروع' : 'إضافة المشروع'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
