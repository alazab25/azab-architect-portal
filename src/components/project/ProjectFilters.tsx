
import { useState } from 'react';
import { Search, Filter, SortAsc, SortDesc, Grid2X2, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export interface ProjectFiltersProps {
  onFilterChange: (filters: any) => void;
  onViewChange: (view: 'grid' | 'list') => void;
  currentView: 'grid' | 'list';
}

const ProjectFilters = ({ 
  onFilterChange, 
  onViewChange,
  currentView 
}: ProjectFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ search: value });
  };
  
  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    onFilterChange({ sort: order });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
      <div className="relative flex-1 max-w-lg">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="ابحث عن اسم المشروع أو الموقع..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full py-2 pr-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter size={16} />
              <span>تصفية</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem onClick={() => onFilterChange({ status: 'all' })}>
              <span>جميع المشاريع</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange({ status: 'completed' })}>
              <span>المشاريع المكتملة</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange({ status: 'in-progress' })}>
              <span>المشاريع قيد التنفيذ</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onFilterChange({ category: 'retail' })}>
              <span>المحلات التجارية</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange({ category: 'commercial' })}>
              <span>المباني التجارية</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange({ category: 'office' })}>
              <span>المكاتب</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              {sortOrder === 'desc' ? <SortDesc size={16} /> : <SortAsc size={16} />}
              <span>ترتيب</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem onClick={() => handleSortChange('desc')}>
              <span>الأحدث أولاً</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange('asc')}>
              <span>الأقدم أولاً</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onFilterChange({ sort: 'progress-high' })}>
              <span>نسبة الإنجاز (من الأعلى للأقل)</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange({ sort: 'progress-low' })}>
              <span>نسبة الإنجاز (من الأقل للأعلى)</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex gap-1 border border-gray-300 rounded-lg p-1">
          <Button 
            variant={currentView === 'grid' ? 'subtle' : 'ghost'} 
            size="sm" 
            className={`px-2 ${currentView === 'grid' ? 'bg-gray-100' : ''}`}
            onClick={() => onViewChange('grid')}
          >
            <Grid2X2 size={16} />
          </Button>
          <Button 
            variant={currentView === 'list' ? 'subtle' : 'ghost'} 
            size="sm" 
            className={`px-2 ${currentView === 'list' ? 'bg-gray-100' : ''}`}
            onClick={() => onViewChange('list')}
          >
            <List size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
