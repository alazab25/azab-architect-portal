
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Fullscreen, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  Download,
  Eye
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Project3DViewerProps {
  projectId: number | string;
  modelUrl: string;
  title?: string;
}

const Project3DViewer: React.FC<Project3DViewerProps> = ({ 
  projectId, 
  modelUrl,
  title = "عرض ثلاثي الأبعاد للمشروع" 
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (iframeRef.current?.parentElement?.requestFullscreen) {
        iframeRef.current.parentElement.requestFullscreen();
        setIsFullScreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-accent text-primary hover:bg-accent/90 font-medium w-full">
            عرض المشروع ثلاثي الأبعاد
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl w-full h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-lg">{title}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-primary">جاري تحميل النموذج...</p>
                </div>
              </div>
            )}
            <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
              <h3 className="font-medium text-sm">{title}</h3>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white" onClick={toggleFullScreen}>
                  <Fullscreen size={16} />
                </Button>
              </div>
            </div>
            <div className="h-[calc(100%-48px)] w-full">
              <iframe 
                ref={iframeRef}
                src={modelUrl}
                onLoad={handleIframeLoad}
                className="w-full h-full border-0"
                title={title}
                allowFullScreen
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Project3DViewer;
