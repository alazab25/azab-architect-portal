
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from 'lucide-react';

interface InformationStepProps {
  formData: {
    branch: string;
    serviceType: string;
    title: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  goToNextStep: () => void;
  serviceTypes: string[];
  branches: string[];
}

const InformationStep: React.FC<InformationStepProps> = ({ 
  formData, 
  handleChange, 
  handleSelectChange, 
  goToNextStep,
  serviceTypes,
  branches
}) => {
  return (
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
  );
};

export default InformationStep;
