
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';

interface AttachmentsStepProps {
  formData: {
    attachments: { name: string, size: string }[];
  };
  handleFileUpload: () => void;
  removeAttachment: (index: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const AttachmentsStep: React.FC<AttachmentsStepProps> = ({ 
  formData, 
  handleFileUpload, 
  removeAttachment, 
  goToNextStep, 
  goToPreviousStep 
}) => {
  return (
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
  );
};

export default AttachmentsStep;
