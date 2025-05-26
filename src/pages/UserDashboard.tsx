
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Clock, CheckCircle, XCircle, Plus } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();

  // Mock data for recent cases
  const recentCases = [
    {
      id: 1,
      title: "Employment Contract Review",
      description: "Need help reviewing employment contract terms",
      status: "pending",
      date: "2024-01-15",
      lawyerStatus: "pending"
    },
    {
      id: 2,
      title: "Small Claims Court Guidance",
      description: "Seeking advice for small claims court procedure",
      status: "active",
      date: "2024-01-10",
      lawyerStatus: "accepted"
    },
    {
      id: 3,
      title: "Property Lease Agreement",
      description: "Questions about lease agreement clauses",
      status: "completed",
      date: "2024-01-05",
      lawyerStatus: "completed"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "accepted":
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Accepted</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case "completed":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout title="Your Legal Dashboard" userType="user">
      <div className="space-y-6">
        {/* Quick Action */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-blue-900">Need Legal Help?</h3>
                <p className="text-blue-700">Get connected with qualified lawyers instantly</p>
              </div>
              <Button 
                onClick={() => navigate('/chat')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ask a New Question
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              Recent Cases & Legal Questions
            </CardTitle>
            <CardDescription>
              Track your legal consultations and their progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <div key={case_.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{case_.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{case_.description}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-xs text-gray-500">Created: {case_.date}</span>
                        {getStatusBadge(case_.lawyerStatus)}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Active Cases</p>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Total Cases</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
