import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';

type MaintenanceRequestFormData = {
  branch: string;
  serviceType: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  estimatedCost?: string;
  attachments?: FileList;
};

const MaintenanceRequestPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const form = useForm<MaintenanceRequestFormData>({
    defaultValues: {
      branch: '',
      serviceType: '',
      title: '',
      description: '',
      priority: 'متوسط',
      dueDate: new Date().toISOString().split('T')[0],
      estimatedCost: '',
    }
  });

  const steps = [
    { id: 1, name: 'المعلومات الأساسية' },
    { id: 2, name: 'تفاصيل الطلب' },
    { id: 3, name: 'المرفقات' },
    { id: 4, name: 'المراجعة' },
    { id: 5, name: 'الإرسال' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const onSubmit = async (data: MaintenanceRequestFormData) => {
    setLoading(true);
    try {
      // First create the maintenance request in the database
      // Using type assertion to bypass TypeScript's type checking
      const { data: requestData, error: requestError } = await (supabase as any)
        .from('maintenance_requests')
        .insert([
          {
            title: data.title,
            description: data.description,
            service_type: data.serviceType,
            branch_id: data.branch,
            priority: data.priority,
            due_date: data.dueDate,
            estimated_cost: data.estimatedCost || null,
            status: 'pending',
          }
        ])
        .select();

      if (requestError) throw requestError;

      // Upload attachments if any
      if (attachments.length > 0 && requestData && requestData.length > 0) {
        const requestId = requestData[0].id;

        for (const file of attachments) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${requestId}/${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `maintenance-requests/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('attachments')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          // Add the attachment to the database
          // Using type assertion to bypass TypeScript's type checking
          const { error: attachmentError } = await (supabase as any)
            .from('attachments')
            .insert([
              {
                maintenance_request_id: requestId,
                file_path: filePath,
                file_name: file.name,
                file_size: file.size,
                file_type: file.type,
              }
            ]);

          if (attachmentError) throw attachmentError;
        }
      }

      toast.success("تم إرسال طلب الصيانة بنجاح");
      navigate('/maintenance-requests');
    } catch (error) {
      console.error("Error submitting maintenance request:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8 px-4" dir="rtl">
        <h1 className="text-3xl font-bold text-center mb-2">نظام طلبات الصيانة</h1>
        <p className="text-gray-600 text-center mb-8">أدخل بيانات طلب الصي��نة الخاص بك بالخطوات</p>

        {/* Step Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="text-center flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                    ${currentStep === step.id ? 'bg-primary text-white' : 
                      currentStep > step.id ? 'bg-primary/70 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {step.id}
                </div>
                <span className="text-sm">{step.name}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
            <div 
              className="absolute top-0 h-1 bg-primary transition-all duration-300" 
              style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
            ></div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate-fade-in">
                <h2 className="text-xl font-semibold mb-6 text-primary border-r-4 border-accent pr-3">المعلومات الأساسية</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">اختر الفرع <span className="text-red-500">*</span></FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          required
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="أجوا مول" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">أجوا مول</SelectItem>
                            <SelectItem value="2">سيتي ستارز</SelectItem>
                            <SelectItem value="3">مول مصر</SelectItem>
                            <SelectItem value="4">العرب مول</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">نوع الخدمة <span className="text-red-500">*</span></FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          required
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="تركيبات" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="تركيبات">تركيبات</SelectItem>
                            <SelectItem value="كهرباء">كهرباء</SelectItem>
                            <SelectItem value="سباكة">سباكة</SelectItem>
                            <SelectItem value="تكييف">تكييف</SelectItem>
                            <SelectItem value="ديكور">ديكور</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel className="text-right block">عنوان طلب الصيانة <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="تركيب لوحات اعلانية فرع أجوزا" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Request Details */}
            {currentStep === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate-fade-in">
                <h2 className="text-xl font-semibold mb-6 text-primary border-r-4 border-accent pr-3">تفاصيل الطلب</h2>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right block">وصف المشكلة <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="توريد وتركيب لوحات اعلانيه اعلي وحدات العرض عدد 30 (كوشي/6تاتش/8هوندرجرد/4سكتش/3تينش/4موشنار)" 
                          className="h-32 resize-none" 
                          {...field} 
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">الأولوية <span className="text-red-500">*</span></FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="متوسطة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="عاجل">عاجل</SelectItem>
                            <SelectItem value="مرتفع">مرتفع</SelectItem>
                            <SelectItem value="متوسط">متوسط</SelectItem>
                            <SelectItem value="منخفض">منخفض</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">التاريخ المطلوب <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Input type="date" {...field} required />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimatedCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-right block">التكلفة المتوقعة (اختياري)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="15000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Attachments */}
            {currentStep === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate-fade-in">
                <h2 className="text-xl font-semibold mb-6 text-primary border-r-4 border-accent pr-3">المرفقات</h2>
                
                <p className="text-gray-600 mb-4 text-center">إضافة صور أو ملفات</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors mb-6">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-1">اسحب الملفات هنا أو انقر للاختيار</p>
                    <p className="text-xs text-gray-500">يمكنك رفع ملفات بصيغة JPG, PNG, PDF (الحد الأقصى 5 ملفات)</p>
                    <input 
                      type="file" 
                      multiple 
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      disabled={attachments.length >= 5}
                    />
                  </div>
                </div>
                
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 mb-2">الملفات المرفقة ({attachments.length}/5)</p>
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center">
                            {file.type.includes('image') ? (
                              <AspectRatio ratio={1/1} className="bg-gray-100 rounded overflow-hidden">
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={file.name} 
                                  className="object-cover h-10 w-10"
                                />
                              </AspectRatio>
                            ) : (
                              <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-3 rtl:mr-3 rtl:ml-0">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[250px]">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} كيلوبايت</p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeFile(index)} 
                          className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate-fade-in">
                <h2 className="text-xl font-semibold mb-6 text-primary border-r-4 border-accent pr-3">مراجعة البيانات</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold text-lg mb-2 border-r-2 border-accent pr-2">المعلومات الأساسية</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-600">الفرع:</span>
                        <p className="font-medium">أجوا مول</p>
                      </div>
                      <div>
                        <span className="text-gray-600">نوع الخدمة:</span>
                        <p className="font-medium">تركيبات</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">العنوان:</span>
                        <p className="font-medium">{form.getValues().title || "تركيب لوحات اعلانية فرع أجوزا"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold text-lg mb-2 border-r-2 border-accent pr-2">تفاصيل الطلب</h3>
                    <div>
                      <span className="text-gray-600">الوصف:</span>
                      <p className="font-medium mt-1">{form.getValues().description || "توريد وتركيب لوحات اعلانيه اعلي وحدات العرض عدد 30 (كوشي/6تاتش/8هوندرجرد/4سكتش/3تينش/4موشنار)"}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3">
                      <div>
                        <span className="text-gray-600">الأولوية:</span>
                        <p className="font-medium">متوسطة</p>
                      </div>
                      <div>
                        <span className="text-gray-600">التاريخ المطلوب:</span>
                        <p className="font-medium">12 مايو 2025</p>
                      </div>
                      <div>
                        <span className="text-gray-600">التكلفة المتوقعة:</span>
                        <p className="font-medium">15000 ريال</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-semibold text-lg mb-2 border-r-2 border-accent pr-2">المرفقات</h3>
                    {attachments.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {attachments.map((file, index) => (
                          <div key={index} className="text-center">
                            {file.type.includes('image') ? (
                              <div className="bg-gray-100 rounded overflow-hidden mb-1 h-20">
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt={file.name} 
                                  className="object-cover h-full w-full"
                                />
                              </div>
                            ) : (
                              <div className="bg-primary/10 h-20 rounded flex items-center justify-center mb-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                            <p className="text-xs truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} كيلوبايت</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-3">لا توجد مرفقات</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Submit */}
            {currentStep === 5 && (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 animate-fade-in text-center">
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">تأكيد إرسال الطلب</h2>
                  <p className="text-gray-600 max-w-md mb-8">
                    هل أنت متأكد من إرسال طلب الصيانة؟ بعد الإرسال، سيتم مراجعة طلبك وإعلامك بالخطوات التالية.
                  </p>
                  
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full max-w-xs flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span>إرسال الطلب</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <span>السابق</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              )}
              
              {currentStep < steps.length && (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 mr-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>التالي</span>
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default MaintenanceRequestPage;
