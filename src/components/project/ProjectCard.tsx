import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Pencil,
  Trash,
  ExternalLink,
  Eye,
  FileText,
  Image,
} from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  progress: number;
  completed: boolean;
  image: string;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  location,
  category,
  description,
  progress,
  completed,
  image,
  onDelete
}) => {
  // Get category color
  const getCategoryColor = () => {
    if (category.includes('المحلات التجارية')) return 'bg-blue-500';
    if (category.includes('المباني التجارية')) return 'bg-green-500';
    if (category.includes('المكاتبية')) return 'bg-purple-500';
    if (category.includes('المباني السكنية')) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image}
          alt={title} 
          className="w-full h-full object-cover"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className={`${getCategoryColor()} text-white`}>
            {category.replace('الفئة: ', '')}
          </Badge>
        </div>
        
        {/* Status Badge */}
        {completed ? (
          <Badge variant="secondary" className="absolute top-3 left-3 bg-green-500 text-white">
            مكتمل
          </Badge>
        ) : (
          <Badge variant="secondary" className="absolute top-3 left-3 bg-blue-500 text-white">
            قيد التنفيذ
          </Badge>
        )}
      </div>

      <CardContent className="p-5">
        <div className="flex justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 truncate">{title}</h3>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
                <span className="sr-only">القائمة</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem asChild>
                <Link to={`/projects/${id}`} className="flex items-center cursor-pointer">
                  <Eye size={16} className="ml-2" />
                  <span>عرض التفاصيل</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/projects/edit/${id}`} className="flex items-center cursor-pointer">
                  <Pencil size={16} className="ml-2" />
                  <span>تعديل</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/projects/${id}/files`} className="flex items-center cursor-pointer">
                  <FileText size={16} className="ml-2" />
                  <span>الملفات</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/projects/${id}/gallery`} className="flex items-center cursor-pointer">
                  <Image size={16} className="ml-2" />
                  <span>معرض الصور</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-500 focus:text-red-500"
                onClick={() => onDelete(id)}
              >
                <Trash size={16} className="ml-2" />
                <span>حذف</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-sm text-gray-500 mb-3">{location}</p>
        
        <p className="text-sm text-gray-700 mb-5 line-clamp-2">
          {description}
        </p>
        
        <div className="mb-1 flex justify-between">
          <span className="text-xs text-gray-500">نسبة الإنجاز</span>
          <span className="text-xs font-medium">{progress}%</span>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="mt-5 flex justify-between">
          <Link to={`/projects/${id}`}>
            <Button variant="outline" size="sm">
              التفاصيل
              <ExternalLink size={14} className="mr-1" />
            </Button>
          </Link>
          
          <span className="text-xs text-gray-500 flex items-center">
            {completed ? 'تم الإنتهاء' : 'قيد التنفيذ'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
