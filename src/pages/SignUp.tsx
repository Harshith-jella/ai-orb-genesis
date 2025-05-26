
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthLayout from '@/components/layout/AuthLayout';

interface SignUpFormData {
  role: 'user' | 'lawyer';
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignupComplete, setIsSignupComplete] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'user' | 'lawyer'>('user');
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    defaultValues: {
      role: 'user'
    }
  });

  const password = watch('password');

  const handleRoleChange = (role: 'user' | 'lawyer') => {
    setSelectedRole(role);
    setValue('role', role);
  };

  const onSubmit = async (data: SignUpFormData) => {
    console.log('Sign up data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSignupComplete(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate('/chat');
    }, 1000);
  };

  return (
    <AuthLayout
      title="Join the Legal Community"
      subtitle="Create your account to access expert legal services, manage your cases, and connect with legal professionals."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-2xl border border-white/40 bg-white/95 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">
              {selectedRole === 'user' ? 'Sign Up as User' : 'Sign Up as Lawyer'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              Join our legal platform to get started
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

              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className={`pl-10 bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                      errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''
                    }`}
                    {...register('fullName', {
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Full name must be at least 2 characters'
                      }
                    })}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
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
                    placeholder="Create a password"
                    className={`pl-10 pr-10 bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                      errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''
                    }`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className={`pl-10 pr-10 bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 ${
                      errors.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''
                    }`}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => value === password || 'Passwords do not match'
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={isSubmitting || isSignupComplete}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-500/25 mt-6"
              >
                {isSubmitting ? 'Creating Account...' : isSignupComplete ? 'Success!' : 'Sign Up'}
              </Button>

              {/* Sign In Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link 
                    to="/signin" 
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
                  >
                    Sign in
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

export default SignUp;
