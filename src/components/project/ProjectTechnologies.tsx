
import { Badge } from "@/components/ui/badge";

const technologies = [
  { name: 'الخرسانة المسلحة', color: 'bg-blue-100 text-blue-800' },
  { name: 'الزجاج المزدوج', color: 'bg-green-100 text-green-800' },
  { name: 'العزل الحراري', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'الطاقة الشمسية', color: 'bg-red-100 text-red-800' },
  { name: 'أنظمة التهوية الذكية', color: 'bg-purple-100 text-purple-800' },
  { name: 'إضاءة LED', color: 'bg-cyan-100 text-cyan-800' },
];

const ProjectTechnologies = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <Badge 
          key={index} 
          className={`rounded-full font-normal text-sm py-1 px-3 ${tech.color}`}
          variant="outline"
        >
          {tech.name}
        </Badge>
      ))}
    </div>
  );
};

export default ProjectTechnologies;
