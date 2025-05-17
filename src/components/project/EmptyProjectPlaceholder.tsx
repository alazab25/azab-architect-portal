
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface EmptyProjectPlaceholderProps {
  onClick: () => void;
  index?: number;
}

const EmptyProjectPlaceholder = ({ onClick, index = 0 }: EmptyProjectPlaceholderProps) => {
  return (
    <div 
      className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-64 transition-all hover:bg-gray-200"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Plus className="h-12 w-12 text-gray-400 mb-2" />
      <Button 
        variant="ghost" 
        className="text-gray-500 hover:text-primary"
        onClick={onClick}
      >
        إضافة مشروع جديد
      </Button>
    </div>
  );
};

export default EmptyProjectPlaceholder;
