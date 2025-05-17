
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Store, Building, Home, Upload, Plus } from 'lucide-react';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: initialData || {
      title: '',
      location: '',
      category: '',
      description: '',
      progress: 0,
      completed: false,
      image: '',
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

  const submitHandler = (data: any) => {
    onSubmit({ 
      ...data, 
      progress: parseInt(data.progress),
      completed: data.progress === '100'
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
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
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">إلغاء</Button>
              <Button type="submit">
                {isEditing ? 'تحديث المشروع' : 'إضافة المشروع'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
