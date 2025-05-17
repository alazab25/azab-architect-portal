
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface TechnicalDetail {
  id: string;
  key: string;
  value: string;
}

interface ProjectTechnicalDetailsProps {
  details: Array<{ key: string; value: string }>;
  editable?: boolean;
  onUpdate?: (details: Array<{ key: string; value: string }>) => void;
}

const ProjectTechnicalDetails = ({
  details = [],
  editable = false,
  onUpdate
}: ProjectTechnicalDetailsProps) => {
  const [technicalDetails, setTechnicalDetails] = useState<TechnicalDetail[]>(
    details.map((detail, index) => ({
      id: `detail-${index}`,
      key: detail.key,
      value: detail.value
    }))
  );

  const addTechnicalDetail = () => {
    const newDetails = [
      ...technicalDetails,
      { id: `detail-${Date.now()}`, key: '', value: '' }
    ];
    setTechnicalDetails(newDetails);
    
    if (onUpdate) {
      onUpdate(newDetails.map(({ key, value }) => ({ key, value })));
    }
  };

  const removeTechnicalDetail = (id: string) => {
    const newDetails = technicalDetails.filter(detail => detail.id !== id);
    setTechnicalDetails(newDetails);
    
    if (onUpdate) {
      onUpdate(newDetails.map(({ key, value }) => ({ key, value })));
    }
  };

  const updateTechnicalDetail = (id: string, field: 'key' | 'value', value: string) => {
    const newDetails = technicalDetails.map(detail =>
      detail.id === id ? { ...detail, [field]: value } : detail
    );
    setTechnicalDetails(newDetails);
    
    if (onUpdate) {
      onUpdate(newDetails.map(({ key, value }) => ({ key, value })));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <span>التفاصيل الفنية</span>
          {editable && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addTechnicalDetail}
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              إضافة تفاصيل
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {technicalDetails.length > 0 ? (
          <div className="space-y-4">
            {technicalDetails.map((detail) => (
              <div key={detail.id} className={`${editable ? 'flex items-center gap-2 p-4 border rounded-lg' : 'pb-3'}`}>
                {editable ? (
                  <>
                    <div className="flex-1">
                      <Input 
                        placeholder="اسم التفصيلة"
                        value={detail.key}
                        onChange={(e) => updateTechnicalDetail(detail.id, 'key', e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        placeholder="قيمة التفصيلة"
                        value={detail.value}
                        onChange={(e) => updateTechnicalDetail(detail.id, 'value', e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeTechnicalDetail(detail.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </>
                ) : (
                  <div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-700">{detail.key}</dt>
                      <dd className="text-sm text-gray-900">{detail.value}</dd>
                    </div>
                    <Separator className="mt-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {editable 
                ? 'لم يتم إضافة تفاصيل فنية بعد. اضغط على "إضافة تفاصيل" لإضافة معلومات فنية للمشروع.' 
                : 'لا توجد تفاصيل فنية متاحة لهذا المشروع.'}
            </p>
            {editable && (
              <Button 
                type="button" 
                variant="outline"
                onClick={addTechnicalDetail}
                className="mt-4 flex items-center gap-1"
              >
                <Plus size={16} />
                إضافة تفاصيل
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectTechnicalDetails;
