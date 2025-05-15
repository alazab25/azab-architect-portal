
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProjectImageSliderProps {
  images: string[];
  title: string;
}

const ProjectImageSlider = ({ images, title }: ProjectImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
        <AspectRatio ratio={16/9}>
          <img
            src={images[currentIndex]}
            alt={`${title} - صورة ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      
      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button 
          size="icon"
          variant="outline" 
          className="bg-white/80 hover:bg-white text-primary rounded-full w-10 h-10"
          onClick={goToPrevious}
        >
          <ChevronRight size={20} />
        </Button>
        
        <Button 
          size="icon"
          variant="outline" 
          className="bg-white/80 hover:bg-white text-primary rounded-full w-10 h-10"
          onClick={goToNext}
        >
          <ChevronLeft size={20} />
        </Button>
      </div>
      
      {/* Thumbnail navigation */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, slideIndex) => (
          <button
            key={slideIndex}
            className={`w-3 h-3 rounded-full ${
              currentIndex === slideIndex ? 'bg-accent' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectImageSlider;
