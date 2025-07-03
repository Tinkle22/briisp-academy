/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Search,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Target,
  Lightbulb,
  Presentation,
  Shield,
  Code,
  BarChart3,
  Clock,
  Star,
  TrendingUp,
  UserCheck,
  Zap,
  Play,
  Quote,
  Sparkles,
  GraduationCap,
  Brain,
  Microscope
} from 'lucide-react';

// Enhanced Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100
    }
  }
};

const cardHoverVariants = {
  hover: {
    y: -12,
    scale: 1.03,
    rotateY: 5,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      type: "spring",
      stiffness: 300
    }
  }
};

const flipCardVariants = {
  initial: { rotateY: 0 },
  hover: {
    rotateY: 180,
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
      let start = 0;
      const increment = numericValue / (duration * 60);

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {value.includes('+') ? `${count}+` :
       value.includes('%') ? `${count}%` :
       value.includes('/') ? value.replace(/\d+/, count.toString()) :
       count.toString()}
    </span>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-400/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Statistics data
const statistics = [
  { value: '500+', label: 'Projects Completed', icon: Award },
  { value: '95%', label: 'Success Rate', icon: TrendingUp },
  { value: '50+', label: 'Expert Supervisors', icon: UserCheck },
  { value: '24/7', label: 'Support Available', icon: Clock }
];

// Services offered
const services = [
  {
    title: 'Topic Ideation & Proposal Writing',
    description: 'Get expert guidance in selecting compelling research topics and crafting winning project proposals.',
    icon: Lightbulb,
    color: 'bg-blue-500'
  },
  {
    title: 'Abstract, Poster & Report Writing',
    description: 'Professional assistance with academic writing, poster design, and comprehensive report structuring.',
    icon: FileText,
    color: 'bg-green-500'
  },
  {
    title: 'Research Papers (IEEE, Springer formats)',
    description: 'Expert help with formatting and writing research papers for top-tier academic publications.',
    icon: Search,
    color: 'bg-purple-500'
  },
  {
    title: 'Thesis & Dissertation Support',
    description: 'Comprehensive guidance through the entire thesis writing process from start to finish.',
    icon: BookOpen,
    color: 'bg-orange-500'
  },
  {
    title: 'Plagiarism Checks & Correction',
    description: 'Thorough plagiarism detection and professional assistance with content originality.',
    icon: Shield,
    color: 'bg-red-500'
  },
  {
    title: 'Presentation Slide Creation',
    description: 'Professional presentation design and content development for project defenses.',
    icon: Presentation,
    color: 'bg-indigo-500'
  }
];

// Additional benefits
const benefits = [
  {
    title: 'Access to Project Examples',
    description: 'Browse through our extensive library of successful project examples and templates.',
    icon: Target
  },
  {
    title: 'Supervision & Continuous Guidance',
    description: 'One-on-one mentorship with experienced supervisors throughout your project journey.',
    icon: Users
  },
  {
    title: 'Software Tools Support',
    description: 'Expert assistance with SPSS, MATLAB, Python, R, and other research software tools.',
    icon: Code
  }
];

// Process steps
const processSteps = [
  {
    step: 1,
    title: 'Initial Consultation',
    description: 'Discuss your project requirements and academic goals with our experts.'
  },
  {
    step: 2,
    title: 'Topic Selection',
    description: 'Collaborate on selecting the perfect research topic aligned with your interests.'
  },
  {
    step: 3,
    title: 'Research & Development',
    description: 'Receive ongoing support throughout your research and development phase.'
  },
  {
    step: 4,
    title: 'Documentation',
    description: 'Professional assistance with writing, formatting, and finalizing your project.'
  },
  {
    step: 5,
    title: 'Presentation Prep',
    description: 'Prepare for your final presentation with expert guidance and practice sessions.'
  }
];

export default function FinalYearProjectSupportPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Hero Section - Enhanced with Parallax */}
      <section ref={heroRef} className="relative py-20 overflow-hidden">
        {/* Enhanced Background with Gradient Overlay */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 -z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-blue-600/5 to-purple-600/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent" />

          {/* Geometric Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </motion.div>

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Enhanced Animated Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-400/30 to-orange-500/20 rounded-full blur-xl"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/30 to-purple-500/20 rounded-full blur-lg"
            animate={{
              y: [0, 25, 0],
              x: [0, -20, 0],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-16 h-16 bg-gradient-to-br from-green-400/20 to-teal-500/15 rounded-full blur-md"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Video Background Toggle */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-15"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/research-students.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Enhanced Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 hover:from-amber-200 hover:to-orange-200 px-4 py-2 text-sm font-semibold border border-amber-200">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Academic Excellence
                  </Badge>
                  <motion.button
                    onClick={() => setShowVideo(!showVideo)}
                    className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    <span className="text-sm font-medium">Watch Demo</span>
                  </motion.button>
                </motion.div>

                <motion.h1
                  className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Final Year
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                    Project Support
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg text-gray-600 leading-relaxed max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Transform your research journey with expert guidance. From topic selection to final presentation,
                  we provide comprehensive support tailored to meet university standards and exceed expectations.
                </motion.p>

                {/* Key Features Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-wrap gap-4 text-sm text-gray-600"
                >
                  {['Expert Supervision', '24/7 Support', 'Plagiarism-Free', 'University Standards'].map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white px-10 py-6 rounded-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 group text-lg font-semibold"
                    asChild
                  >
                    <Link href="/apply?course=final-year-project-support">
                      <GraduationCap className="mr-3 h-6 w-6" />
                      Start Your Journey
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-amber-600 text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 px-10 py-6 rounded-2xl text-lg font-semibold backdrop-blur-sm bg-white/80"
                  >
                    <Brain className="mr-3 h-6 w-6" />
                    Explore Services
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right side - Enhanced Statistics Cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
            >
              {statistics.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.15,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.08,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="group"
                  >
                    <Card className="relative p-6 text-center backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/20 shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 rounded-3xl overflow-hidden">
                      {/* Gradient Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Animated Icon */}
                      <motion.div
                        className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white mb-4 shadow-lg"
                        whileHover={{
                          rotate: [0, -10, 10, 0],
                          scale: 1.1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent className="h-6 w-6" />

                        {/* Pulse Effect */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      {/* Animated Counter */}
                      <motion.div
                        className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      >
                        <AnimatedCounter value={stat.value} duration={2 + index * 0.5} />
                      </motion.div>

                      <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                        {stat.label}
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full opacity-60" />
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-orange-400 rounded-full opacity-40" />
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Offered Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 dot-pattern" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-3 rounded-full mb-6"
            >
              <Microscope className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800 font-semibold">Research Excellence</span>
            </motion.div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Comprehensive Project
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Support Services
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From initial concept to final presentation, we provide end-to-end support
              for your academic journey with cutting-edge tools and expert guidance.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group h-72 md:h-80 lg:h-80"
                >
                  {/* Mobile/Tablet Version - Simple Card */}
                  <div className="block lg:hidden">
                    <Card className="w-full h-full p-6 backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/20 shadow-2xl rounded-3xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-2">
                      <div className="flex flex-col h-full">
                        <motion.div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl ${service.color} text-white mb-4 shadow-lg flex-shrink-0`}
                          whileHover={{
                            rotate: [0, -5, 5, 0],
                            scale: 1.1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className="h-8 w-8" />
                        </motion.div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight flex-shrink-0">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed flex-grow text-sm">
                          {service.description}
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Desktop Version - 3D Flip Card */}
                  <div className="hidden lg:block perspective-1000 w-full h-full">
                    <motion.div
                      className="relative w-full h-full preserve-3d transition-transform duration-700 group-hover:rotate-y-180"
                      whileHover={{ scale: 1.02 }}
                    >
                    {/* Front of Card */}
                    <Card className="absolute inset-0 w-full h-full p-6 backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/20 shadow-2xl rounded-3xl backface-hidden overflow-hidden">
                      <div className="flex flex-col h-full">
                        <motion.div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl ${service.color} text-white mb-4 shadow-lg flex-shrink-0`}
                          whileHover={{
                            rotate: [0, -5, 5, 0],
                            scale: 1.1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className="h-8 w-8" />
                        </motion.div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight flex-shrink-0">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed flex-grow text-sm">
                          {service.description}
                        </p>

                        {/* Hover Indicator */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Back of Card */}
                    <Card className="absolute inset-0 w-full h-full p-6 backdrop-blur-xl bg-gradient-to-br from-amber-500/90 to-orange-600/90 border border-amber-300/20 shadow-2xl rounded-3xl backface-hidden rotate-y-180 text-white overflow-hidden">
                      <div className="flex flex-col h-full justify-center items-center text-center">
                        <IconComponent className="h-12 w-12 mb-4 opacity-80 flex-shrink-0" />
                        <h3 className="text-lg font-bold mb-3 flex-shrink-0">
                          {service.title}
                        </h3>
                        <p className="text-amber-100 leading-relaxed text-sm mb-4 flex-grow">
                          Expert guidance with personalized attention to ensure your project meets the highest academic standards.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm flex-shrink-0"
                        >
                          Learn More
                        </Button>
                      </div>
                    </Card>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Process Flow Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                y: [0, -100, 0], 
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-amber-500/30"
            >
              <Target className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-semibold">Step-by-Step Process</span>
            </motion.div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Your Research
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Follow our proven methodology designed by academic experts to ensure
              your project's success from conception to completion.
            </p>
          </motion.div>

          <div className="relative">
            {/* Enhanced Connecting Path */}
            <svg className="absolute top-1/2 left-0 w-full h-2 transform -translate-y-1/2 hidden lg:block" viewBox="0 0 1200 8">
              <motion.path
                d="M0,4 Q300,0 600,4 T1200,4"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Step Number with Enhanced Design */}
                  <motion.div
                    className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xl font-bold mb-6 shadow-2xl group-hover:shadow-amber-500/50 transition-all duration-500"
                    whileHover={{
                      rotate: [0, -5, 5, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.step}

                    {/* Pulse Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-amber-400"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 0, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Progress Indicator */}
                  <motion.div
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 rounded-full mb-6"
            >
              <Star className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-semibold">Exclusive Advantages</span>
            </motion.div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Why Choose
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Our Platform
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Beyond our core services, enjoy these exclusive advantages that set us apart
              from traditional academic support services.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <motion.div
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Card className="h-full p-6 text-center backdrop-blur-xl bg-gradient-to-br from-white/90 to-white/70 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 rounded-3xl group-hover:bg-gradient-to-br group-hover:from-purple-50/90 group-hover:to-blue-50/70">
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-600 text-white mb-6 shadow-lg group-hover:shadow-purple-500/50 transition-all duration-500"
                        whileHover={{
                          rotate: [0, -10, 10, 0],
                          scale: 1.1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent className="h-8 w-8" />
                      </motion.div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {benefit.description}
                      </p>

                      {/* Feature List */}
                      <div className="space-y-3">
                        {index === 0 && (
                          <>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>500+ Successful Projects</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Multiple Formats Available</span>
                            </div>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>PhD-Level Supervisors</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Weekly Progress Reviews</span>
                            </div>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Latest Software Versions</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Video Tutorials Included</span>
                            </div>
                          </>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

     
      {/* Enhanced Call-to-Action Section */}
      <section className="py-32 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg"
            animate={{
              y: [0, 30, 0],
              x: [0, -30, 0],
              rotate: [0, -180, -360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-10 w-16 h-16 bg-white/5 rounded-full blur-md"
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Geometric Shapes */}
          <motion.div
            className="absolute top-32 right-20 w-4 h-4 bg-white/20 transform rotate-45"
            animate={{ rotate: [45, 405] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 left-20 w-6 h-6 border-2 border-white/20 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            {/* Main Heading */}
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Ready to Transform Your
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent">
                  Research Journey?
                </span>
              </h2>
              <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Join thousands of successful students who have achieved academic excellence
                with our comprehensive support system. Your success story starts here.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Button
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-gray-50 px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-white/25 transition-all duration-500 group"
                  asChild
                >
                  <Link href="/apply?course=final-year-project-support">
                    <GraduationCap className="mr-4 h-7 w-7" />
                    Start Your Success Story
                    <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-6 rounded-2xl text-xl font-bold"
                >
                  <Brain className="mr-4 h-7 w-7" />
                  View Sample Projects
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/90"
            >
              {[
                { icon: CheckCircle, text: "Expert Guidance" },
                { icon: Clock, text: "24/7 Support" },
                { icon: Award, text: "Proven Results" },
                { icon: Shield, text: "Quality Guaranteed" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center gap-3 group"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Final Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80 text-lg border-t border-white/20 pt-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-300 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">4.9/5 Student Rating</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">Instant Response Guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">5000+ Happy Students</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
