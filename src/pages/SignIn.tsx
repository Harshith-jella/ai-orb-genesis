
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthLayout from '@/components/layout/AuthLayout';

interface SignInFormData {
  role: 'user' | 'lawyer';
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'user' | 'lawyer'>('user');
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    defaultValues: {
      role: 'user'
    }
  });

  const handleRoleChange = (role: 'user' | 'lawyer') => {
    setSelectedRole(role);
    setValue('role', role);
  };

  const onSubmit = async (data: SignInFormData) => {
    console.log('Sign in data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/chat');
  };

  return (
    <AuthLayout
      title="Access Your Legal Dashboard"
      subtitle="Sign in to manage your legal matters, connect with professionals, and access powerful legal tools."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-xl border border-gray-200/60 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">
              {selectedRole === 'user' ? 'Login as User' : 'Login as Lawyer'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Access your legal platform dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  I am a
                </Label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('user')}
                    className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedRole === 'user'
                        ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    User
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('lawyer')}
                    className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedRole === 'lawyer'
                        ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Lawyer
                  </button>
                </div>
                <input type="hidden" {...register('role')} />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                      errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''
                    }`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                      errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''
                    }`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Login Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-500/20 mt-6 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10">
                    {isSubmitting ? 'Signing in...' : 'Login'}
                  </span>
                </Button>
              </motion.div>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  New here?{' '}
                  <Link 
                    to="/signup" 
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </AuthLayout>
  );
};

export default SignIn;
