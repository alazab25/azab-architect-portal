
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface ReviewStepProps {
  formData: {
    branch: string;
    serviceType: string;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    estimatedCost: string;
    attachments: { name: string, size: string }[];
  };
  isSubmitting: boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  isSubmitting,
  goToNextStep,
  goToPreviousStep
}) => {
  return (
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
  );
};

export default ReviewStep;
