
import React from 'react';

interface Step {
  id: string;
  title: string;
  number: number;
}

interface MaintenanceStepsIndicatorProps {
  steps: Step[];
  currentStep: string;
}

const MaintenanceStepsIndicator: React.FC<MaintenanceStepsIndicatorProps> = ({ steps, currentStep }) => {
  return (
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
  );
};

export default MaintenanceStepsIndicator;
