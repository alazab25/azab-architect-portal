
import React from 'react';
import InformationStep from './MaintenanceSteps/InformationStep';
import ServiceStep from './MaintenanceSteps/ServiceStep';
import AttachmentsStep from './MaintenanceSteps/AttachmentsStep';
import ReviewStep from './MaintenanceSteps/ReviewStep';
import ConfirmationStep from './MaintenanceSteps/ConfirmationStep';

export type MaintenanceStep = 'information' | 'service' | 'attachments' | 'review' | 'confirmation';

interface MaintenanceFormProps {
  currentStep: MaintenanceStep;
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
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleFileUpload: () => void;
  removeAttachment: (index: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetForm: () => void;
  serviceTypes: string[];
  branches: string[];
  priorityLevels: string[];
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({
  currentStep,
  formData,
  isSubmitting,
  handleChange,
  handleSelectChange,
  handleFileUpload,
  removeAttachment,
  goToNextStep,
  goToPreviousStep,
  resetForm,
  serviceTypes,
  branches,
  priorityLevels
}) => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
          {currentStep === 'information' && (
            <InformationStep 
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              goToNextStep={goToNextStep}
              serviceTypes={serviceTypes}
              branches={branches}
            />
          )}

          {currentStep === 'service' && (
            <ServiceStep 
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
              priorityLevels={priorityLevels}
            />
          )}

          {currentStep === 'attachments' && (
            <AttachmentsStep 
              formData={formData}
              handleFileUpload={handleFileUpload}
              removeAttachment={removeAttachment}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
            />
          )}

          {currentStep === 'review' && (
            <ReviewStep 
              formData={formData}
              isSubmitting={isSubmitting}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
            />
          )}

          {currentStep === 'confirmation' && (
            <ConfirmationStep resetForm={resetForm} />
          )}
        </div>
      </div>
    </section>
  );
};

export default MaintenanceForm;
