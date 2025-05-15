
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from '@/components/ui/use-toast';
import { Upload, ChevronLeft, ChevronRight, CheckCircle, Loader2, Heart } from 'lucide-react';

type MaintenanceStep = 'information' | 'service' | 'attachments' | 'review' | 'confirmation';

const MaintenanceRequestPage = () => {
  const [currentStep, setCurrentStep] = useState<MaintenanceStep>('information');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    branch: '',
    serviceType: '',
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    estimatedCost: '',
    attachments: [] as { name: string, size: string }[]
  });
  
  useEffect(() => {
    document.title = 'طلب خدمة صيانة | شركة العزب للإنشاءات';
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileUpload = () => {
    // Simulating file upload
    const mockFiles = [
      { name: 'HADEER SIGNS -1.jpg', size: '167.8 كيلوبايت' },
      { name: 'HADEER SIGNS -2.jpg', size: '133.8 كيلوبايت' },
      { name: 'HADEER SIGNS -3.jpg', size: '144.9 كيلوبايت' },
      { name: 'HADEER SIGNS -4.jpg', size: '152.2 كيلوبايت' }
    ];
    
    setFormData(prev => ({
      ...prev,
      attachments: [...mockFiles]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: MaintenanceStep): boolean => {
    switch(step) {
      case 'information':
        if (!formData.branch || !formData.serviceType || !formData.title) {
          toast({
            title: "خطأ في البيانات",
            description: "يرجى ملء جميع الحقول المطلوبة",
            duration: 3000,
          });
          return false;
        }
        return true;
      case 'service':
        if (!formData.description || !formData.priority || !formData.dueDate) {
          toast({
            title: "خطأ في البيانات",
            description: "يرجى ملء جميع الحقول المطلوبة",
            duration: 3000,
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const goToNextStep = () => {
    if (!validateStep(currentStep)) return;

    switch(currentStep) {
      case 'information':
        setCurrentStep('service');
        break;
      case 'service':
        setCurrentStep('attachments');
        break;
      case 'attachments':
        setCurrentStep('review');
        break;
      case 'review':
        handleSubmit();
        break;
    }
  };

  const goToPreviousStep = () => {
    switch(currentStep) {
      case 'service':
        setCurrentStep('information');
        break;
      case 'attachments':
        setCurrentStep('service');
        break;
      case 'review':
        setCurrentStep('attachments');
        break;
      case 'confirmation':
        resetForm();
        break;
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('confirmation');
      
      toast({
        title: "تم إرسال طلبك بنجاح",
        description: "سنقوم بالتواصل معك قريباً لتأكيد موعد الزيارة",
        duration: 5000,
      });
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      branch: '',
      serviceType: '',
      title: '',
      description: '',
      priority: '',
      dueDate: '',
      estimatedCost: '',
      attachments: []
    });
    setCurrentStep('information');
  };

  const steps = [
    { id: 'information', title: 'المعلومات الأساسية', number: 1 },
    { id: 'service', title: 'تفاصيل الطلب', number: 2 },
    { id: 'attachments', title: 'المرفقات', number: 3 },
    { id: 'review', title: 'المراجعة', number: 4 },
    { id: 'confirmation', title: 'الإرسال', number: 5 },
  ];

  const serviceTypes = [
    'صيانة الكهرباء',
    'صيانة السباكة',
    'صيانة التكييف',
    'تركيبات',
    'تشطيبات داخلية',
    'أخرى'
  ];
  
  const branches = [
    'أجورا مول',
    'فرع طنطا',
    'فرع دمنهور',
    'التجمع الخامس',
    'المنصورة',
  ];

  const priorityLevels = [
    'عاجل',
    'متوسطة',
    'عادية'
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-primary pt-28 pb-16 px-4">
        <div className="container mx-auto relative z-10 text-center">
          <div className="mb-4 flex justify-center">
            <Heart className="text-white h-12 w-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">نظام طلبات الصيانة</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            أدخل بيانات طلب الصيانة الخاص بك بالخطوات
          </p>
        </div>
      </div>

      {/* Form Type Tabs */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-center gap-2 my-2">
            <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md">نموذج سريع</button>
            <button className="bg-white text-gray-800 px-6 py-2 rounded-md shadow-sm">نموذج تفصيلي</button>
          </div>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative">
                <div 
                  className={`flex flex-col items-center z-10 ${currentStep === step.id ? 'text-white' : index < steps.findIndex(s => s.id === currentStep) ? 'text-white' : 'text-gray-400'}`}
                >
                  <div 
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-1 text-sm md:text-base
                      ${currentStep === step.id ? 'bg-primary' : 
                        index < steps.findIndex(s => s.id === currentStep) ? 'bg-primary/80' : 'bg-gray-200'}`}
                  >
                    {step.number}
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 hidden md:block">{step.title}</span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute top-4 left-10 right-10 h-[2px] bg-gray-200 -z-0">
                    <div 
                      className="h-full bg-primary transition-all duration-300" 
                      style={{ 
                        width: steps.findIndex(s => s.id === currentStep) > index ? '100%' : '0%' 
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
            {currentStep === 'information' && (
              <div className="space-y-6">
                <div className="border-r-4 border-primary pr-3">
                  <h2 className="text-2xl font-bold text-primary">المعلومات الأساسية</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                      نوع الخدمة <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => handleSelectChange('serviceType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
                      اختر الفرع <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.branch}
                      onValueChange={(value) => handleSelectChange('branch', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفرع المطلوب" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    عنوان طلب الصيانة <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="أدخل عنوان مختصر للطلب"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={goToNextStep}
                    className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700"
                  >
                    التالي
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'service' && (
              <div className="space-y-6">
                <div className="border-r-4 border-primary pr-3">
                  <h2 className="text-2xl font-bold text-primary">تفاصيل الطلب</h2>
                </div>
                
                <div>
                  <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    وصف المشكلة <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="اشرح المشكلة بالتفصيل"
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                      الأولوية <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => handleSelectChange('priority', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر أولوية الطلب" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                      التاريخ المطلوب <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700 mb-1">
                    التكلفة المتوقعة (اختياري)
                  </Label>
                  <Input
                    id="estimatedCost"
                    name="estimatedCost"
                    type="number"
                    placeholder="أدخل التكلفة المتوقعة"
                    value={formData.estimatedCost}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    onClick={goToPreviousStep}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <ChevronRight className="h-4 w-4" />
                    السابق
                  </Button>
                  <Button 
                    onClick={goToNextStep}
                    className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700"
                  >
                    التالي
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'attachments' && (
              <div className="space-y-6">
                <div className="border-r-4 border-primary pr-3">
                  <h2 className="text-2xl font-bold text-primary">المرفقات</h2>
                </div>
                
                <div className="text-center">
                  <p className="mb-4">إضافة صور أو ملفات</p>
                  
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-10 cursor-pointer hover:border-primary transition-colors"
                    onClick={handleFileUpload}
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="mb-1 font-medium">اسحب الملفات هنا أو انقر للاختيار</p>
                      <p className="text-sm text-gray-500">(يمكنك رفع ملفات بصيغة JPG, PNG, PDF (الحد الأقصى 5 ملفات)</p>
                    </div>
                  </div>
                  
                  {formData.attachments.length > 0 && (
                    <div className="mt-6">
                      <p className="text-right mb-4">الملفات المرفقة ({formData.attachments.length}/5)</p>
                      
                      <div className="space-y-4">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="flex justify-between items-center border rounded-md p-3">
                            <div className="flex items-center">
                              <button 
                                className="text-red-500 hover:bg-red-50 rounded-full p-1"
                                onClick={() => removeAttachment(index)}
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                              </button>
                            </div>
                            <div className="flex items-center">
                              <div>
                                <p>{file.name}</p>
                                <p className="text-gray-500 text-sm">{file.size}</p>
                              </div>
                              <div className="mx-4">
                                <img 
                                  src={`data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22%23eee%22%2F%3E%3C%2Fsvg%3E`} 
                                  alt="Preview" 
                                  className="w-8 h-8 object-cover rounded"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    onClick={goToPreviousStep}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <ChevronRight className="h-4 w-4" />
                    السابق
                  </Button>
                  <Button 
                    onClick={goToNextStep}
                    className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700"
                  >
                    التالي
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'review' && (
              <div className="space-y-6">
                <div className="border-r-4 border-primary pr-3">
                  <h2 className="text-2xl font-bold text-primary">مراجعة البيانات</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-primary mb-3 border-r-4 border-primary/50 pr-2">المعلومات الأساسية</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-right">
                      <span className="text-gray-500">نوع الخدمة:</span>
                      <span>{formData.serviceType || 'غير محدد'}</span>
                      
                      <span className="text-gray-500">الفرع:</span>
                      <span>{formData.branch || 'غير محدد'}</span>
                      
                      <span className="text-gray-500">العنوان:</span>
                      <span>{formData.title || 'غير محدد'}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-primary mb-3 border-r-4 border-primary/50 pr-2">تفاصيل الطلب</h3>
                    <div className="space-y-2 text-right">
                      <div>
                        <span className="text-gray-500 block">الوصف:</span>
                        <span className="block mt-1">{formData.description || 'غير محدد'}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-2 mt-3">
                        <span className="text-gray-500">التاريخ المطلوب:</span>
                        <span>{formData.dueDate || 'غير محدد'}</span>
                        
                        <span className="text-gray-500">الأولوية:</span>
                        <span>{formData.priority || 'غير محدد'}</span>
                        
                        <span className="text-gray-500">التكلفة المتوقعة:</span>
                        <span>{formData.estimatedCost ? `${formData.estimatedCost} ريال` : 'غير محدد'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-primary mb-3 border-r-4 border-primary/50 pr-2">المرفقات</h3>
                    {formData.attachments.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="text-center">
                            <div className="bg-gray-200 h-20 rounded flex items-center justify-center mb-1">
                              <img 
                                src={`data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2248%22%20height%3D%2248%22%20fill%3D%22%23eee%22%2F%3E%3C%2Fsvg%3E`} 
                                alt="Preview" 
                                className="w-8 h-8"
                              />
                            </div>
                            <p className="text-xs">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">لا توجد مرفقات</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    onClick={goToPreviousStep}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <ChevronRight className="h-4 w-4" />
                    السابق
                  </Button>
                  <Button 
                    onClick={goToNextStep}
                    disabled={isSubmitting}
                    className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        إرسال الطلب
                        <ChevronLeft className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'confirmation' && (
              <div className="text-center py-8 space-y-6">
                <div className="bg-green-100 text-green-600 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
                  <CheckCircle size={48} />
                </div>
                
                <h2 className="text-2xl font-bold text-primary">تم إرسال طلب الصيانة بنجاح</h2>
                
                <p className="text-gray-600 max-w-md mx-auto">
                  شكراً لك! تم استلام طلب الصيانة الخاص بك وسيتم التواصل معك قريباً
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                  <h3 className="text-lg font-medium mb-4">رقم الطلب</h3>
                  <p className="font-mono text-lg">
                    73aa8223-09f6-474b-979f-bf5bb17855b7
                  </p>
                </div>
                
                <div className="flex gap-4 justify-center mt-6">
                  <Button 
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    العودة للرئيسية
                  </Button>
                  <Button 
                    onClick={resetForm}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
                  >
                    طلب صيانة جديد
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MaintenanceRequestPage;
