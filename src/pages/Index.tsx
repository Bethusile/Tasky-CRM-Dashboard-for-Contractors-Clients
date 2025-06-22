
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, CheckCircle, Calendar, Clock, BarChart3, Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'contractor' ? '/dashboard' : '/client-dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mb-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Tasky
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-teal-600 to-orange-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-2xl text-slate-700 mb-4 font-medium">
            Streamline Your Business Operations
          </p>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The complete task management solution for contractors and clients. 
            Track progress, manage deadlines, and deliver exceptional service with our powerful CRM system.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => navigate('/login')} 
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 text-lg"
            >
              Learn More
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-teal-600">100%</div>
              <div className="text-sm text-slate-600">Task Visibility</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-orange-500">24/7</div>
              <div className="text-sm text-slate-600">Access</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-teal-600">Real-time</div>
              <div className="text-sm text-slate-600">Updates</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800">Client Management</h3>
            <p className="text-slate-600 leading-relaxed">Keep all your client information organized and accessible. Track contact details, outstanding items, and communication history in one place.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800">Task Tracking</h3>
            <p className="text-slate-600 leading-relaxed">Monitor project progress with detailed task management, status updates, and time allocation tracking for maximum efficiency.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Calendar className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800">Schedule Management</h3>
            <p className="text-slate-600 leading-relaxed">Stay on top of deadlines and appointments with integrated scheduling and automated deadline tracking.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800">Time Allocation</h3>
            <p className="text-slate-600 leading-relaxed">Track time spent on each task and project. Monitor turn-around times and optimize your workflow for better productivity.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800">Progress Reports</h3>
            <p className="text-slate-600 leading-relaxed">Generate comprehensive reports on task completion, overdue items, and overall project health with visual dashboards.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800">Secure Access</h3>
            <p className="text-slate-600 leading-relaxed">Role-based access ensures contractors and clients see only what they need to, maintaining privacy and security.</p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-teal-600 to-orange-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of contractors who trust Tasky to manage their operations</p>
          <Button 
            onClick={() => navigate('/login')} 
            size="lg"
            className="bg-white text-teal-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold shadow-lg"
          >
            Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
