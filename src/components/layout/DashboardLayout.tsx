
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, Settings, LogOut, Sparkles } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  userType: "user" | "lawyer";
}

export function DashboardLayout({ children, title, userType }: DashboardLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Sparkles className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">LegalAI</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => navigate(userType === 'user' ? '/user-dashboard' : '/lawyer-dashboard')}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-blue-600"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        {children}
      </main>
    </div>
  );
}
