import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Store, Building, Home, Upload, Plus, FileText, Link as LinkIcon, Save } from 'lucide-react';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

interface ProjectFile {
  name: string;
  size: string;
  type: string;
  file: File;
}

interface TechnicalDetail {
  id: string;
  key: string;
  value: string;
}

interface ProjectFormProps {
  initialData?: {
    id?: number | string;
    title: string;
    location: string;
    category: string;
    description: string;
    progress: number;
    completed: boolean;
    image: string;
    model_url?: string;
    technical_details?: Array<{ key: string; value: string }>;
  };
  onSubmit: (data: any) => void;
  isEditing?: boolean;
  onCancel?: () => void; // Added onCancel prop to handle form cancellation
}

const ProjectForm = ({ 
  initialData, 
  onSubmit, 
  isEditing = false,
  onCancel // New prop for handling cancellation
}: ProjectFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [activeTab, setActiveTab] = useState('general');
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [technicalDetails, setTechnicalDetails] = useState<TechnicalDetail[]>(
    initialData?.technical_details 
      ? initialData.technical_details.map((detail, index) => ({ 
          id: `detail-${index}`, 
          key: detail.key, 
          value: detail.value 
        })) 
      : []
  );
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
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
        form.setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: ProjectFile[] = [];
    
    Array.from(files).forEach(file => {
      let fileType = 'other';
      if (file.type.includes('image')) {
        fileType = 'image';
      } else if (file.type.includes('pdf')) {
        fileType = 'pdf';
      } else if (file.type.includes('excel') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        fileType = 'excel';
      }
      
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

  const addTechnicalDetail = () => {
    setTechnicalDetails([...technicalDetails, { id: `detail-${Date.now()}`, key: '', value: '' }]);
  };

  const removeTechnicalDetail = (id: string) => {
    setTechnicalDetails(technicalDetails.filter(detail => detail.id !== id));
  };

  const updateTechnicalDetail = (id: string, field: 'key' | 'value', value: string) => {
    setTechnicalDetails(
      technicalDetails.map(detail => 
        detail.id === id ? { ...detail, [field]: value } : detail
      )
    );
  };

  const getProjectCategoryIcon = (category: string) => {
    switch (category) {
      case 'retail':
        return <Store className="h-4 w-4 ml-2" />;
      case 'commercial':
        return <Building className="h-4 w-4 ml-2" />;
      case 'residential':
        return <Home className="h-4 w-4 ml-2" />;
      default:
        return <Building className="h-4 w-4 ml-2" />;
    }
  };

  const submitHandler = async (data: any) => {
    setIsUploading(true);
    let finalData = { 
      ...data, 
      progress: parseInt(data.progress),
      completed: parseInt(data.progress) === 100,
      files: projectFiles,
      technical_details: technicalDetails.map(({ key, value }) => ({ key, value }))
    };
    
    try {
      await onSubmit(finalData);
      
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-gray-100 mb-6">
            <TabsTrigger value="general" className="flex-1">معلومات المشروع</TabsTrigger>
            <TabsTrigger value="files" className="flex-1">ملفات المشروع</TabsTrigger>
            <TabsTrigger value="technical" className="flex-1">التفاصيل الفنية</TabsTrigger>
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
                        <FormField
                          control={form.control}
                          name="title"
                          rules={{ required: "اسم المشروع مطلوب" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>اسم المشروع</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل اسم المشروع" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="location"
                          rules={{ required: "موقع المشروع مطلوب" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>موقع المشروع</FormLabel>
                              <FormControl>
                                <Input placeholder="أدخل موقع المشروع" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="category"
                          rules={{ required: "فئة المشروع مطلوبة" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>فئة المشروع</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر فئة المشروع" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent position="popper" className="bg-white">
                                  <SelectItem value="retail">المحلات التجارية</SelectItem>
                                  <SelectItem value="commercial">المباني التجارية</SelectItem>
                                  <SelectItem value="office">المكاتب</SelectItem>
                                  <SelectItem value="residential">المباني السكنية</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="progress"
                          rules={{ 
                            required: "نسبة الإنجاز مطلوبة",
                            min: { value: 0, message: "الحد الأدنى هو 0" },
                            max: { value: 100, message: "الحد الأقصى هو 100" }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نسبة الإنجاز</FormLabel>
                              <div className="flex gap-2">
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min="0" 
                                    max="100"
                                    placeholder="أدخل نسبة الإنجاز" 
                                    {...field}
                                    value={field.value?.toString() || "0"}
                                    onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : '')}
                                  />
                                </FormControl>
                                <span className="flex items-center">%</span>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="description"
                        rules={{ required: "وصف المشروع مطلوب" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>وصف المشروع</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={4}
                                placeholder="أدخل وصف المشروع"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                              form.setValue('image', '');
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
                            <p className="text-xs text-gray-400">PNG، JPG، GIF حتى 5MB</p>
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

                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <LinkIcon className="h-5 w-5 ml-2 text-blue-500" />
                      <span>رابط النموذج ثلاثي الأبعاد</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="model_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="أدخل رابط النموذج ثلاثي الأبعاد"
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs text-gray-500 mt-1">أدخل رابط النموذج ثلاثي الأبعاد إذا كان متاحًا</p>
                        </FormItem>
                      )}
                    />
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
          
          {/* التفاصيل الفنية */}
          <TabsContent value="technical" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>التفاصيل الفنية</span>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addTechnicalDetail}
                    className="flex items-center gap-1"
                  >
                    <Plus size={16} />
                    إضافة تفاصيل
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {technicalDetails.length > 0 ? (
                  <div className="space-y-4">
                    {technicalDetails.map((detail) => (
                      <div key={detail.id} className="flex items-center gap-2 p-4 border rounded-lg">
                        <div className="flex-1">
                          <Input 
                            placeholder="اسم التفصيلة"
                            value={detail.key}
                            onChange={(e) => updateTechnicalDetail(detail.id, 'key', e.target.value)}
                            className="mb-2"
                          />
                        </div>
                        <div className="flex-1">
                          <Input 
                            placeholder="قيمة التفصيلة"
                            value={detail.value}
                            onChange={(e) => updateTechnicalDetail(detail.id, 'value', e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeTechnicalDetail(detail.id)}
                        >
                          حذف
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed rounded-lg">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600">لم يتم إضافة تفاصيل فنية بعد</p>
                    <p className="text-sm text-gray-500 mb-4">قم بإضافة التفاصيل الفنية للمشروع باستخدام زر "إضافة تفاصيل"</p>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={addTechnicalDetail}
                      className="flex items-center gap-1"
                    >
                      <Plus size={16} />
                      إضافة تفاصيل
                    </Button>
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
                  <FormField
                    control={form.control}
                    name="model_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رابط النموذج ثلاثي الأبعاد</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="أدخل رابط النموذج ثلاثي الأبعاد"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-gray-500">أدخل رابط النموذج ثلاثي الأبعاد إذا كان متاحًا</p>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button type="submit" disabled={isUploading} className="flex items-center gap-2">
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save size={18} />
                {isEditing ? 'تحديث المشروع' : 'إضافة المشروع'}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
