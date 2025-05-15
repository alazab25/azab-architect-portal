
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

interface ConfirmationStepProps {
  resetForm: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ resetForm }) => {
  return (
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
  );
};

export default ConfirmationStep;
