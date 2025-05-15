
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { toast } from '@/components/ui/use-toast';
import MaintenanceHero from '../components/maintenance/MaintenanceHero';
import MaintenanceFormTabs from '../components/maintenance/MaintenanceFormTabs';
import MaintenanceStepsIndicator from '../components/maintenance/MaintenanceStepsIndicator';
import MaintenanceForm, { MaintenanceStep } from '../components/maintenance/MaintenanceForm';

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
      <MaintenanceHero />
      <MaintenanceFormTabs />
      <MaintenanceStepsIndicator steps={steps} currentStep={currentStep} />
      <MaintenanceForm
        currentStep={currentStep}
        formData={formData}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleFileUpload={handleFileUpload}
        removeAttachment={removeAttachment}
        goToNextStep={goToNextStep}
        goToPreviousStep={goToPreviousStep}
        resetForm={resetForm}
        serviceTypes={serviceTypes}
        branches={branches}
        priorityLevels={priorityLevels}
      />
    </Layout>
  );
};

export default MaintenanceRequestPage;
