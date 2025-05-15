
import React from 'react';

const MaintenanceFormTabs: React.FC = () => {
  return (
    <div className="bg-gray-50 border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-center gap-2 my-2">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md">نموذج سريع</button>
          <button className="bg-white text-gray-800 px-6 py-2 rounded-md shadow-sm">نموذج تفصيلي</button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceFormTabs;
