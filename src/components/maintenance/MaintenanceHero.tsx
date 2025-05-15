
import React from 'react';
import { Heart } from 'lucide-react';

const MaintenanceHero: React.FC = () => {
  return (
    <div className="relative bg-primary pt-28 pb-16 px-4">
      <div className="container mx-auto relative z-10 text-center">
        <div className="mb-4 flex justify-center">
          <Heart className="text-white h-12 w-12" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">نظام طلبات الصيانة</h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          أدخل بيانات طلب الصيانة الخاص بك بالخطوات
        </p>
      </div>
    </div>
  );
};

export default MaintenanceHero;
