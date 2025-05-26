
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Briefcase, 
  DollarSign, 
  MessageSquare, 
  Check, 
  X, 
  Clock,
  Users,
  TrendingUp
} from "lucide-react";

const LawyerDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);

  // Mock data for case requests
  const newRequests = [
    {
      id: 1,
      title: "Employment Contract Review",
      client: "John Smith",
      description: "Need help reviewing employment contract terms and conditions",
      urgency: "medium",
      estimatedValue: "$150",
      submittedAt: "2 hours ago"
    },
    {
      id: 2,
      title: "Property Dispute Consultation",
      client: "Sarah Johnson",
      description: "Neighbor dispute regarding property boundaries",
      urgency: "high",
      estimatedValue: "$250",
      submittedAt: "4 hours ago"
    }
  ];

  // Mock data for active cases
  const activeCases = [
    {
      id: 3,
      title: "Small Claims Court Guidance",
      client: "Mike Davis",
      lastMessage: "Thank you for the advice!",
      lastActivity: "1 hour ago"
    },
    {
      id: 4,
      title: "Business Formation Questions",
      client: "Lisa Chen",
      lastMessage: "When can we schedule the call?",
      lastActivity: "3 hours ago"
    }
  ];

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <DashboardLayout title="Lawyer Console" userType="lawyer">
      <div className="space-y-6">
        {/* Status Bar */}
        <Card className={isOnline ? "border-green-200 bg-green-50" : "border-gray-200"}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                <div>
                  <h3 className="font-medium">Availability Status</h3>
                  <p className="text-sm text-gray-600">
                    {isOnline ? "You're online and available for new cases" : "You're offline - no new requests will be sent"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Offline</span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={setIsOnline}
                />
                <span className="text-sm font-medium">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Case Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              New Case Requests
            </CardTitle>
            <CardDescription>
              Review and respond to incoming legal consultation requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{request.title}</h4>
                        {getUrgencyBadge(request.urgency)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Client: {request.client}</p>
                      <p className="text-sm text-gray-700">{request.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{request.estimatedValue}</p>
                      <p className="text-xs text-gray-500">{request.submittedAt}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Check className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                      <X className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Cases & Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                Active Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeCases.map((case_) => (
                  <div key={case_.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{case_.title}</h5>
                        <p className="text-xs text-gray-600">Client: {case_.client}</p>
                        <p className="text-xs text-gray-500 mt-1">"{case_.lastMessage}"</p>
                      </div>
                      <div className="text-right">
                        <Button size="sm" variant="outline">
                          Open Chat
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">{case_.lastActivity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Earnings Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Today</span>
                  <span className="font-bold text-green-600">$320</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-bold text-green-600">$1,250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-bold text-green-600">$4,890</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Earned</span>
                    <span className="text-lg font-bold text-gray-900">$12,340</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-900">28</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Briefcase className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Cases Completed</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">2.3h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">96%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LawyerDashboard;
