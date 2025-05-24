
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.05),rgba(147,51,234,0.05),rgba(59,130,246,0.05))]"></div>
      
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(147,51,234,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>
      
      {/* Dynamic Light Rays */}
      <motion.div
        className="absolute inset-0 z-5"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      </motion.div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 z-15">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: i % 3 === 0 ? 'rgba(59, 130, 246, 0.4)' : i % 3 === 1 ? 'rgba(147, 51, 234, 0.4)' : 'rgba(168, 85, 247, 0.4)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Additional Ambient Effects */}
      <motion.div
        className="absolute inset-0 z-5 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
      </motion.div>

      {/* Header with back button */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4 relative z-20">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            size="icon"
            className="text-white/80 hover:bg-white/20 transition-colors duration-200 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="ml-3 text-lg font-semibold text-white">Back</h2>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md">
            <CardHeader className="text-center space-y-2 pb-6">
              <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                Create your account
              </CardTitle>
              <CardDescription className="text-white/70">
                Join our legal platform to get started
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-white/90">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className={`pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm ${
                        errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-400/50' : ''
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
                    <p className="text-sm text-red-400">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-white/90">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm ${
                        errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/50' : ''
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
                    <p className="text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-white/90">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className={`pl-10 pr-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm ${
                        errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-400/50' : ''
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
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-white/60 hover:text-white/90 hover:bg-white/20"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-white/90">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className={`pl-10 pr-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/50 backdrop-blur-sm ${
                        errors.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-400/50' : ''
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
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-white/60 hover:text-white/90 hover:bg-white/20"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Sign Up Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || isSignupComplete}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-500/25 mt-6"
                >
                  {isSubmitting ? 'Creating Account...' : isSignupComplete ? 'Success!' : 'Sign Up'}
                </Button>

                {/* Sign In Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-white/70">
                    Already have an account?{' '}
                    <Link 
                      to="/signin" 
                      className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
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
