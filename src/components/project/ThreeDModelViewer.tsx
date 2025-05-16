
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Fullscreen, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Move
} from 'lucide-react';

interface ThreeDModelViewerProps {
  modelUrl?: string;
  modelId?: string;
  title: string;
}

const ThreeDModelViewer: React.FC<ThreeDModelViewerProps> = ({ 
  modelUrl, 
  modelId, 
  title 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for the actual 3D model integration
    // In a real implementation, you would initialize the 3D viewer here
    const initializeViewer = () => {
      console.log("3D viewer initialized with model:", modelUrl || modelId);
    };

    if (containerRef.current) {
      initializeViewer();
    }

    return () => {
      // Cleanup function for the 3D viewer
    };
  }, [modelUrl, modelId]);

  return (
    <div className="w-full">
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
          <h3 className="font-medium text-sm">{title}</h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
              <ZoomIn size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
              <ZoomOut size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
              <RotateCw size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
              <Move size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white">
              <Fullscreen size={16} />
            </Button>
          </div>
        </div>
        <div 
          ref={containerRef}
          className="h-[400px] flex items-center justify-center bg-gray-200"
        >
          <p className="text-gray-500 text-center p-4">
            {modelUrl || modelId ? 
              "جاري تحميل النموذج ثلاثي الأبعاد..." : 
              "لم يتم تحديد نموذج ثلاثي الأبعاد"}
          </p>
        </div>
        <div className="bg-white p-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            يمكنك التكبير والتصغير والتدوير باستخدام أزرار التحكم أو الماوس
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThreeDModelViewer;
