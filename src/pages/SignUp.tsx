import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface SignUpFormData {
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
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    console.log('Sign up data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSignupComplete(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate('/chat');
    }, 1000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Header with back button */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            size="icon"
            className="text-slate-600 hover:bg-slate-100 transition-colors duration-200 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="ml-3 text-lg font-semibold text-slate-800">Back</h2>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg border border-slate-200">
            <CardHeader className="text-center space-y-2 pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800">
                Create your account
              </CardTitle>
              <CardDescription className="text-slate-600">
                Join our legal platform to get started
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className={`pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
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
                    <p className="text-sm text-red-600">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
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
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className={`pl-10 pr-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
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
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
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
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Sign Up Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || isSignupComplete}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors duration-200 mt-6"
                >
                  {isSubmitting ? 'Creating Account...' : isSignupComplete ? 'Success!' : 'Sign Up'}
                </Button>

                {/* Sign In Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-slate-600">
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
      </div>
    </div>
  );
};

export default SignUp;
