
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

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
      
      {/* First 3D Spline Model (Background) */}
      <div className="absolute inset-0 z-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Spline
            scene="https://prod.spline.design/awnppR7FHKyD4b5s/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Second 3D Spline Model (Foreground) */}
      <div className="absolute inset-0 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="w-full h-full"
        >
          <Spline
            scene="https://prod.spline.design/t9yrc3MKciefWvt1/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4 text-center pt-[50vh]">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center mb-6"
          >
            <Sparkles className="w-6 h-6 text-blue-400 mr-2" />
            <span className="text-blue-400 font-medium tracking-wide uppercase text-sm">
              AI-Powered Legal Solutions
            </span>
            <Sparkles className="w-6 h-6 text-blue-400 ml-2" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Legal Help.
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              AI Fast.
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Lawyer Secure.
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Our AI understands your issue, routes it to the right legal area, and connects you with a trusted lawyer — securely
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              onClick={() => navigate('/chat')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border-0 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
              <span className="relative z-10">Start My Case</span>
              <motion.div
                className="relative z-10 ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="flex flex-wrap justify-center gap-4 mt-16 max-w-2xl"
        >
          {[
            "Document Review",
            "Case Analysis", 
            "Legal Research",
            "Contract Drafting"
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2 + index * 0.1 }}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 cursor-pointer hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
      </div>

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
    </div>
  );
};

export default Index;
