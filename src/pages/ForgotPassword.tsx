import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { resetPassword } from '@/lib/auth';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      toast({
        title: "Reset email sent!",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reset email",
        variant: "destructive",
      });
    }
  };

  const handleGoBack = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50 relative overflow-hidden">
      {/* Soft Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-slate-100/20 to-gray-100/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(148,163,184,0.06),transparent_50%)]"></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      </div>

      {/* Floating Legal Elements */}
      <div className="absolute inset-0 z-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 3, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            <Scale className="w-3 h-3 text-blue-500/30" />
          </motion.div>
        ))}
      </div>

      {/* Header with back button */}
      <div className="bg-white/40 backdrop-blur-sm border-b border-gray-200/30 px-4 py-4 relative z-20">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:bg-white/40 transition-colors duration-200 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="ml-3 text-lg font-medium text-gray-600">Back to Sign In</h2>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border border-gray-200/50 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-3 pb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center mb-4"
              >
                <Scale className="w-7 h-7 text-blue-500 mr-3" />
                <span className="text-xl font-bold text-gray-700">LegalPortal</span>
              </motion.div>
              
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">
                Reset your password
              </CardTitle>
              <CardDescription className="text-gray-500 text-base">
                We'll send a reset link to your email.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className={`pl-10 bg-white/90 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/30 ${
                        errors.email ? 'border-red-300 focus:border-red-300 focus:ring-red-300/30' : ''
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

                {/* Reset Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-500/25 group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="relative z-10">
                      {isSubmitting ? 'Sending...' : 'Send reset link'}
                    </span>
                  </Button>
                </motion.div>

                {/* Info text */}
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                  </p>
                </div>

                {/* Back to Sign In Link */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Remember your password?{' '}
                    <Link 
                      to="/signin" 
                      className="text-blue-500 hover:text-blue-600 font-medium hover:underline transition-colors duration-200"
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

export default ForgotPassword;
