
import { useState } from 'react';
import { File, FileText, FileImage, Download, Eye, Upload } from 'lucide-react';
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

interface ProjectFile {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'excel' | 'other';
  size: string;
  lastModified: string;
  url: string;
}

interface ProjectFilesProps {
  projectId: number | string;
}

const ProjectFiles = ({ projectId }: ProjectFilesProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { toast } = useToast();
  
  // وضع بيانات تجريبية للملفات
  const [files, setFiles] = useState<ProjectFile[]>([
    {
      id: '1',
      name: 'مخطط-المشروع.pdf',
      type: 'pdf',
      size: '2.4 MB',
      lastModified: '2023-07-15',
      url: 'https://example.com/files/blueprint.pdf'
    },
    {
      id: '2',
      name: 'واجهة-المبنى.jpg',
      type: 'image',
      size: '1.7 MB',
      lastModified: '2023-08-20',
      url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e'
    },
    {
      id: '3',
      name: 'جدول-التكاليف.xlsx',
      type: 'excel',
      size: '0.5 MB',
      lastModified: '2023-09-05',
      url: 'https://example.com/files/costs.xlsx'
    },
    {
      id: '4',
      name: 'الصورة-الداخلية.jpg',
      type: 'image',
      size: '2.1 MB',
      lastModified: '2023-09-10',
      url: 'https://images.unsplash.com/photo-1481253127861-534498168948'
    },
    {
      id: '5',
      name: 'خطة-العمل.pdf',
      type: 'pdf',
      size: '1.2 MB',
      lastModified: '2023-10-01',
      url: 'https://example.com/files/workplan.pdf'
    },
  ]);
  
  // تصفية الملفات حسب النوع المحدد
  const filteredFiles = activeTab === "all" 
    ? files 
    : files.filter(file => file.type === activeTab);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    // معالجة نوع الملف
    let fileType: 'image' | 'pdf' | 'excel' | 'other' = 'other';
    if (uploadedFile.type.includes('image')) {
      fileType = 'image';
    } else if (uploadedFile.type.includes('pdf')) {
      fileType = 'pdf';
    } else if (uploadedFile.type.includes('excel') || uploadedFile.type.includes('sheet') || uploadedFile.name.endsWith('.xlsx') || uploadedFile.name.endsWith('.xls')) {
      fileType = 'excel';
    }

    // تحويل حجم الملف إلى صيغة مقروءة
    const fileSize = (uploadedFile.size / (1024 * 1024)).toFixed(1) + ' MB';

    // إنشاء كائن الملف الجديد
    const newFile: ProjectFile = {
      id: Date.now().toString(),
      name: uploadedFile.name,
      type: fileType,
      size: fileSize,
      lastModified: new Date().toISOString().split('T')[0],
      // في الإنتاج: استخدم عنوان URL الفعلي بعد رفع الملف
      url: URL.createObjectURL(uploadedFile),
    };

    // إضافة الملف الجديد إلى القائمة
    setFiles([newFile, ...files]);

    // إظهار رسالة نجاح
    toast({
      title: "تم رفع الملف بنجاح",
      description: `تم إضافة "${uploadedFile.name}" إلى المشروع`,
    });
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

  const handleDownload = (file: ProjectFile) => {
    // في الإنتاج، استبدل هذا بالرابط الفعلي للملف
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "جاري التحميل",
      description: `بدأ تحميل "${file.name}"`,
    });
  };

  const handlePreview = (file: ProjectFile) => {
    if (file.type === 'image') {
      // فتح صورة في نافذة جديدة
      window.open(file.url, '_blank');
    } else {
      // فتح الملف في نافذة جديدة (في الإنتاج، استخدم عارض مناسب)
      window.open(file.url, '_blank');
    }
  };

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
            <Button className="bg-primary hover:bg-blue-700 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>رفع ملف</span>
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileUpload}
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
            {filteredFiles.length > 0 ? (
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
                          <span>آخر تحديث: {file.lastModified}</span>
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
