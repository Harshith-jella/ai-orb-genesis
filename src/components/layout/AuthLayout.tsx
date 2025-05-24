
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Shield, Users, Award } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const benefits = [
    {
      icon: Shield,
      title: "Secure & Confidential",
      description: "Bank-level security for all your legal documents and communications"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with verified legal professionals and specialists"
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description: "Used by thousands of legal professionals nationwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.08),transparent_50%)]"></div>
      
      <div className="relative z-10 flex min-h-screen">
        {/* Left Column - Welcome Content */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
          
          {/* Floating Legal Icons */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
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
                <Scale className="w-4 h-4 text-white/20" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-20 flex flex-col justify-center px-12 xl:px-16 text-white">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center mb-12"
            >
              <Scale className="w-8 h-8 mr-3" />
              <span className="text-2xl font-bold">LegalPortal</span>
            </motion.div>

            {/* Welcome Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
                {title || "Welcome to Your Legal Platform"}
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                {subtitle || "Access powerful legal tools, connect with experts, and manage your legal matters with confidence."}
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex-1 lg:w-1/2 xl:w-3/5 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Logo */}
      <div className="lg:hidden absolute top-6 left-6 z-30">
        <div className="flex items-center text-gray-700">
          <Scale className="w-7 h-7 mr-2 text-blue-600" />
          <span className="text-xl font-bold">LegalPortal</span>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
