
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProjectFiles from "./ProjectFiles";
import { Button } from "@/components/ui/button";
import AuthDialog from "../auth/AuthDialog";
import { Shield, Lock } from "lucide-react";

interface ProtectedProjectFilesProps {
  projectId: string | number;
}

const ProtectedProjectFiles = ({ projectId }: ProtectedProjectFilesProps) => {
  const { user } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  if (user) {
    return <ProjectFiles projectId={projectId} />;
  }

  return (
    <div className="border rounded-xl p-8 bg-gray-50 text-center space-y-6">
      <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
        <Lock className="h-10 w-10 text-gray-500" />
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-bold">ملفات المشروع محمية</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          يجب تسجيل الدخول للوصول إلى ملفات المشروع. قم بتسجيل الدخول أو إنشاء حساب جديد للوصول.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setAuthDialogOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Shield className="ml-2 h-4 w-4" /> تسجيل الدخول للوصول
        </Button>
      </div>

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultTab="login"
      />
    </div>
  );
};

export default ProtectedProjectFiles;
