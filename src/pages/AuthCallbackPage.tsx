
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Process the OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        // If successful, redirect to the dashboard
        navigate("/project-management");
      } catch (err: any) {
        console.error("Auth callback error:", err);
        setError(err.message || "حدث خطأ أثناء تسجيل الدخول");
        
        // Redirect to home page after a delay if there's an error
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      {error ? (
        <div className="rounded-lg bg-white p-8 shadow-md text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-medium text-red-600">حدث خطأ</h3>
          <p className="mt-2 text-gray-600">{error}</p>
          <p className="mt-2 text-gray-500 text-sm">جاري إعادة توجيهك...</p>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-8 shadow-md text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <h3 className="mt-4 text-xl font-medium">جاري تسجيل الدخول...</h3>
          <p className="mt-2 text-gray-500">يرجى الانتظار بينما نقوم بتسجيل دخولك.</p>
        </div>
      )}
    </div>
  );
};

export default AuthCallbackPage;
