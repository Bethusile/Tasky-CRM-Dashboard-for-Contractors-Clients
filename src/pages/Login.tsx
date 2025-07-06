
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Building2, User, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'contractor' | 'client'>('contractor');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const success = await login(email, password, role);
    
    if (success) {
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
      navigate(role === 'contractor' ? '/dashboard' : '/client-dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 p-4">
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mb-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
                  Tasky
                </h1>
                <div className="h-1 w-16 bg-gradient-to-r from-teal-600 to-orange-500 mx-auto rounded-full mt-2"></div>
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800">Welcome Back</CardTitle>
              <CardDescription>Sign in to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>I am a:</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as 'contractor' | 'client')}>
                    <div className="flex items-center space-x-2 p-4 border rounded-xl hover:bg-teal-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="contractor" id="contractor" />
                      <Building2 className="h-5 w-5 text-teal-600" />
                      <Label htmlFor="contractor" className="flex-1 cursor-pointer font-medium">Contractor</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-xl hover:bg-orange-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="client" id="client" />
                      <User className="h-5 w-5 text-orange-500" />
                      <Label htmlFor="client" className="flex-1 cursor-pointer font-medium">Client</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <div className="bg-gradient-to-r from-teal-50 to-orange-50 p-4 rounded-xl">
                  <p className="text-sm text-slate-700 font-medium mb-2">
                    Demo Access
                  </p>
                  <p className="text-xs text-slate-600">
                    Use any email and password combination to access the system
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
