
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    console.log('Sign in data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/chat');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Light Legal Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-blue-100/30 to-indigo-100/40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]"></div>
      
      {/* Subtle Legal Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Floating Legal Elements */}
      <div className="absolute inset-0 z-5">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            <Scale className="w-4 h-4 text-blue-600/20" />
          </motion.div>
        ))}
      </div>

      {/* Header with back button */}
      <div className="bg-white/60 backdrop-blur-md border-b border-gray-200/50 px-4 py-4 relative z-20">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:bg-white/40 transition-colors duration-200 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="ml-3 text-lg font-semibold text-gray-700">Back</h2>
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
          <Card className="shadow-xl border border-gray-200/60 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2 pb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center mb-4"
              >
                <Scale className="w-8 h-8 text-blue-600 mr-3" />
                <span className="text-2xl font-bold text-gray-800">LegalPortal</span>
              </motion.div>
              
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">
                Sign in to your account
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access your legal platform dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
      </div>
    </div>
  );
};

export default SignIn;
