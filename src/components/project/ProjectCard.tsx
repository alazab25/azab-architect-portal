
import { useState } from 'react';
import { 
  Eye, Pencil, Trash2, Store, CheckCircle, AlertTriangle, Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

export interface ProjectCardProps {
  id: number;
  title: string;
  location: string;
  category: string;
  description: string;
  progress: number;
  completed: boolean;
  image: string;
  onDelete: (id: number) => void;
}

const ProjectCard = ({ 
  id, 
  title, 
  location, 
  category, 
  description, 
  progress, 
  completed, 
  image,
  onDelete
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getProgressColorClass = () => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 70) return 'bg-teal-500';
    if (progress > 30) return 'bg-blue-500';
    return 'bg-amber-500';
  };

  const getStatusIcon = () => {
    if (completed) return <CheckCircle size={14} className="text-green-500" />;
    if (progress < 20) return <Clock size={14} className="text-amber-500" />;
    return <AlertTriangle size={14} className="text-blue-500" />;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        {completed ? (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
            مكتمل
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
            جديد
          </div>
        )}
        {title.includes('أبو عوف') && (
          <div className="absolute top-3 right-3 bg-white text-primary text-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Store size={14} />
            <span className="text-xs">متجر تجزئة</span>
          </div>
        )}
        
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity">
            <div className="space-x-2 rtl:space-x-reverse">
              <Button 
                variant="default" 
                size="sm"
                className="bg-white text-primary hover:bg-gray-100"
                as={Link}
                to={`/projects/${id}`}
              >
                <Eye size={16} className="mr-1" /> عرض التفاصيل
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-primary">{location}</h3>
          <span className="text-gray-600 text-sm">{title}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{category}</p>
        <p className="text-sm text-gray-800 mb-4 line-clamp-2">{description}</p>
        
        {progress > 0 && (
          <div className="mt-4 mb-2">
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center">
                {getStatusIcon()}
                <span className="mr-1 rtl:ml-1">نسبة الإنجاز</span>
              </div>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressColorClass()}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4">
          <div className="space-x-2 rtl:space-x-reverse flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                >
                  <Eye size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem as={Link} to={`/projects/${id}`}>
                  <span>عرض التفاصيل</span>
                </DropdownMenuItem>
                <DropdownMenuItem as={Link} to={`/projects/${id}/edit`}>
                  <span>تحرير المشروع</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>تحديث الحالة</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
              as={Link}
              to={`/projects/${id}/edit`}
            >
              <Pencil size={16} />
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(id)}
              className="flex items-center"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
