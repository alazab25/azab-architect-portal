
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from '@/components/ui/use-toast';
import { Building, UserCheck, CreditCard, CheckCircle, Loader2 } from 'lucide-react';

type MaintenanceStep = 'information' | 'service' | 'payment' | 'confirmation';

const MaintenanceRequestPage = () => {
  const [currentStep, setCurrentStep] = useState<MaintenanceStep>('information');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    urgency: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
    paymentMethod: 'credit',
  });
  
  useEffect(() => {
    document.title = 'طلب خدمة صيانة | شركة العزب للإنشاءات';
    
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: MaintenanceStep): boolean => {
    switch(step) {
      case 'information':
        if (!formData.name || !formData.phone || !formData.email || !formData.address) {
          toast({
            title: "خطأ في البيانات",
            description: "يرجى ملء جميع الحقول المطلوبة",
            duration: 3000,
          });
          return false;
        }
        return true;
      case 'service':
        if (!formData.serviceType || !formData.urgency || !formData.description) {
          toast({
            title: "خطأ في البيانات",
            description: "يرجى ملء جميع الحقول المطلوبة",
            duration: 3000,
          });
          return false;
        }
        return true;
      case 'payment':
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
        setCurrentStep('payment');
        break;
      case 'payment':
        handleSubmit();
        break;
    }
  };

  const goToPreviousStep = () => {
    switch(currentStep) {
      case 'service':
        setCurrentStep('information');
        break;
      case 'payment':
        setCurrentStep('service');
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
      name: '',
      phone: '',
      email: '',
      address: '',
      serviceType: '',
      urgency: '',
      description: '',
      preferredDate: '',
      preferredTime: '',
      paymentMethod: 'credit',
    });
    setCurrentStep('information');
  };

  const steps = [
    { id: 'information', title: 'المعلومات الشخصية', icon: <UserCheck /> },
    { id: 'service', title: 'تفاصيل الخدمة', icon: <Building /> },
    { id: 'payment', title: 'الدفع', icon: <CreditCard /> },
    { id: 'confirmation', title: 'التأكيد', icon: <CheckCircle /> },
  ];

  const serviceTypes = [
    'صيانة الكهرباء',
    'صيانة السباكة',
    'صيانة التكييف',
    'أعمال البناء',
    'صيانة الأرضيات',
    'صيانة الأسقف',
    'صيانة الواجهات',
    'أخرى'
  ];

  const urgencyLevels = [
    'عاجل (خلال 24 ساعة)',
    'قريب (خلال 3 أيام)',
    'عادي (خلال أسبوع)',
    'مخطط (تحديد موعد)'
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-primary py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="طلب صيانة"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">طلب خدمة صيانة</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            نقدم خدمات صيانة احترافية وسريعة لمختلف المنشآت السكنية والتجارية والصناعية
          </p>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex flex-col items-center ${currentStep === step.id ? 'text-primary' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${currentStep === step.id ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    {step.icon}
                  </div>
                  <span className="text-sm hidden md:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 md:w-20 h-[2px] mx-1 bg-gray-200">
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
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 reveal">
            {currentStep === 'information' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-6">المعلومات الشخصية</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="أدخل اسمك الكامل"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">العنوان</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="أدخل عنوانك بالتفصيل"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 'service' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-6">تفاصيل الخدمة</h2>
                
                <div>
                  <Label htmlFor="serviceType">نوع الخدمة</Label>
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
                  <Label htmlFor="urgency">مستوى الأولوية</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => handleSelectChange('urgency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="حدد مستوى الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">وصف المشكلة</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="صف المشكلة بالتفصيل"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredDate">التاريخ المفضل</Label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredTime">الوقت المفضل</Label>
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) => handleSelectChange('preferredTime', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الوقت المفضل" />
                      </SelectTrigger>
                      <SelectContent>
                        {['صباحاً (8-12)', 'ظهراً (12-4)', 'مساءً (4-8)'].map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'payment' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary mb-6">طريقة الدفع</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handleChange}
                      className="ml-2"
                    />
                    <Label htmlFor="credit">بطاقة ائتمان</Label>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="ml-2"
                    />
                    <Label htmlFor="cash">الدفع عند الزيارة</Label>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-8">
                  <h3 className="text-lg font-bold mb-4">تفاصيل الطلب</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">الخدمة</span>
                      <span className="font-medium">{formData.serviceType || 'غير محدد'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الأولوية</span>
                      <span className="font-medium">{formData.urgency || 'غير محدد'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">رسوم الكشف</span>
                      <span className="font-medium">150 ريال</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold">
                      <span>الإجمالي</span>
                      <span>150 ريال</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      * سيتم تحديد التكلفة النهائية بعد الكشف على الموقع وتحديد نطاق العمل المطلوب
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'confirmation' && (
              <div className="text-center py-8 space-y-6">
                <div className="bg-green-100 text-green-600 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
                  <CheckCircle size={48} />
                </div>
                
                <h2 className="text-2xl font-bold text-primary">تم استلام طلبك بنجاح!</h2>
                
                <p className="text-gray-600 max-w-md mx-auto">
                  شكراً لك! لقد تم استلام طلب الصيانة الخاص بك وسيقوم فريقنا بالتواصل معك قريباً لتأكيد التفاصيل وتحديد موعد الزيارة.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                  <h3 className="text-lg font-medium mb-4">ملخص الطلب</h3>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-right">
                    <span className="text-gray-500">نوع الخدمة:</span>
                    <span>{formData.serviceType}</span>
                    
                    <span className="text-gray-500">الأولوية:</span>
                    <span>{formData.urgency}</span>
                    
                    <span className="text-gray-500">التاريخ المفضل:</span>
                    <span>{formData.preferredDate || 'غير محدد'}</span>
                    
                    <span className="text-gray-500">الوقت المفضل:</span>
                    <span>{formData.preferredTime || 'غير محدد'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep !== 'confirmation' && (
              <div className="flex justify-between mt-10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousStep}
                  disabled={currentStep === 'information'}
                >
                  السابق
                </Button>
                <Button
                  type="button"
                  onClick={goToNextStep}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري المعالجة...
                    </>
                  ) : currentStep === 'payment' ? 'إرسال الطلب' : 'التالي'}
                </Button>
              </div>
            )}

            {currentStep === 'confirmation' && (
              <div className="mt-8">
                <Button 
                  className="w-full"
                  onClick={resetForm}
                >
                  طلب خدمة أخرى
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      {currentStep !== 'confirmation' && (
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">خدمات الصيانة</h2>
              <p className="text-secondary max-w-2xl mx-auto">
                نقدم مجموعة متكاملة من خدمات الصيانة بأعلى معايير الجودة وبأسعار تنافسية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "صيانة المنشآت السكنية",
                  description: "خدمات صيانة شاملة للفلل والشقق والمجمعات السكنية تشمل أعمال الكهرباء والسباكة والتكييف وغيرها."
                },
                {
                  title: "صيانة المنشآت التجارية",
                  description: "خدمات صيانة احترافية للمكاتب والمحلات التجارية والمولات لضمان استمرارية العمل بدون انقطاع."
                },
                {
                  title: "صيانة المنشآت الصناعية",
                  description: "خدمات صيانة متخصصة للمصانع والمستودعات والمنشآت الصناعية بمختلف أنواعها."
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-md reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="font-bold text-xl mb-3 text-primary">{service.title}</h3>
                  <p className="text-secondary">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default MaintenanceRequestPage;
