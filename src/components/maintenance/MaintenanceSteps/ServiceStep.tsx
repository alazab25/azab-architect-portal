
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceStepProps {
  formData: {
    description: string;
    priority: string;
    dueDate: string;
    estimatedCost: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  priorityLevels: string[];
}

const ServiceStep: React.FC<ServiceStepProps> = ({ 
  formData, 
  handleChange, 
  handleSelectChange, 
  goToNextStep, 
  goToPreviousStep,
  priorityLevels
}) => {
  return (
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
  );
};

export default ServiceStep;
