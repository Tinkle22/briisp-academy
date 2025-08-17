'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Users,
  Calendar,
  Award,
  BookOpen,
  Target,

  Star,
  CheckCircle,
  GraduationCap,
  TrendingUp,
  UserCheck,
  FileText,
  ArrowRight,
  Building,
  Zap,
  Brain,
  Code,
  Shield,
  Network,
  Smartphone,
  Cloud
} from 'lucide-react';

interface RefresherCourse {
  course_id: number;
  title: string;
  description: string;
  duration_months: number;
  price: number;
  department: string;
  category: 'adults' | 'kids';
  image_url: string;
  program_type: string;
  num_lectures: number;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  languages: string;
  class_days: string;
  course_code: string;
  total_enrollments?: number;
  gallery_images?: string;
}

const RefresherCoursesPage = () => {
  const [courses, setCourses] = useState<RefresherCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRefresherCourses();
  }, []);

  const fetchRefresherCourses = async () => {
    try {
      const response = await fetch('/api/courses/refresher');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Error fetching refresher courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get course images based on title/category
  const getCourseImage = (title: string) => {
    const imageMap: { [key: string]: string } = {
      "Data Science Bootcamp": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      "Cybersecurity Fundamentals": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
      "Networking Essentials": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      "Web & Mobile App Development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      "Machine Learning & AI": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80",
      "Cloud Computing & DevOps": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
    };

    // Find matching course by checking if title contains key words
    for (const [key, image] of Object.entries(imageMap)) {
      if (title.toLowerCase().includes(key.toLowerCase().split(' ')[0])) {
        return image;
      }
    }
    return "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80";
  };

  // Helper function to get course icon based on title
  const getCourseIcon = (title: string) => {
    if (title.toLowerCase().includes('data')) return Brain;
    if (title.toLowerCase().includes('cyber')) return Shield;
    if (title.toLowerCase().includes('network')) return Network;
    if (title.toLowerCase().includes('web') || title.toLowerCase().includes('mobile')) return Code;
    if (title.toLowerCase().includes('machine') || title.toLowerCase().includes('ai')) return Zap;
    if (title.toLowerCase().includes('cloud')) return Cloud;
    return BookOpen;
  };

  // Helper function to get feature images
  const getFeatureImage = (featureTitle: string) => {
    const imageMap: { [key: string]: string } = {
      "Flexible Schedules": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
      "Hands-on Projects": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
      "Mentor-Guided Labs": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      "Progress Tracking": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
    };
    return imageMap[featureTitle] || "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80";
  };

  const features = [
    {
      icon: Calendar,
      title: "Flexible Schedules",
      description: "Evening and weekend classes to fit your busy lifestyle"
    },
    {
      icon: Award,
      title: "Hands-on Projects",
      description: "Real-world projects and certification upon completion"
    },
    {
      icon: Users,
      title: "Mentor-Guided Labs",
      description: "Expert mentors to guide you through practical exercises"
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Assessment and progress tracking throughout your journey"
    }
  ];

  const stats = [
    { icon: GraduationCap, label: "Professionals Trained", value: "500+", color: "text-amber-600" },
    { icon: Award, label: "Certifications Issued", value: "450+", color: "text-blue-600" },
    { icon: Building, label: "Industry Partners", value: "50+", color: "text-green-600" },
    { icon: TrendingUp, label: "Success Rate", value: "92%", color: "text-purple-600" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const availableCourses = [
    "Data Science Bootcamp",
    "Cybersecurity Fundamentals & Practice", 
    "Networking Essentials (Cisco-based)",
    "Web & Mobile App Development (Frontend & Backend)",
    "Machine Learning & AI for Beginners",
    "Cloud Computing & DevOps Intro"
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading refresher courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-purple-950/50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex items-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-full mr-4">
                  <GraduationCap className="h-8 w-8 text-amber-600" />
                </div>
                <span className="text-amber-600 font-semibold text-lg">Professional Development</span>
              </motion.div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Refresher Course Platform
              </h1>
              <p className="text-xl leading-8 text-muted-foreground mb-8">
                Designed for graduates and professionals who wish to sharpen or update their
                ICT-related skills through practical, hands-on training and expert mentorship.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link href="#courses">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 shadow-lg">
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#apply">
                  <Button variant="outline" size="lg" className="border-2">
                    Apply Now
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Main Hero Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    alt="Professionals in refresher training"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Statistics Cards */}
                <motion.div
                  className="absolute -top-6 -left-6 bg-white dark:bg-gray-800/80 rounded-xl shadow-lg p-4 border dark:border-gray-700"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">500+ Professionals</p>
                      <p className="text-xs text-muted-foreground">Successfully Trained</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800/80 rounded-xl shadow-lg p-4 border dark:border-gray-700"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">92% Success Rate</p>
                      <p className="text-xs text-muted-foreground">Course Completion</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-xl"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-20 blur-xl"
            animate={{
              rotate: [0, -180, -360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-muted rounded-full">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              🛠 Platform Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to refresh and advance your ICT skills with comprehensive
              support and hands-on learning experiences.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getFeatureImage(feature.title)}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                      <div className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg">
                        <feature.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Process Flow */}
          <motion.div
            className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-3xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Your Learning Journey</h3>
              <p className="text-muted-foreground">From enrollment to certification - we support you every step</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Enroll",
                  description: "Choose your refresher course and start learning",
                  image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80"
                },
                {
                  step: "2",
                  title: "Learn",
                  description: "Hands-on training with expert mentors",
                  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
                },
                {
                  step: "3",
                  title: "Practice",
                  description: "Apply skills through real-world projects",
                  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
                },
                {
                  step: "4",
                  title: "Certify",
                  description: "Earn certification and advance your career",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden shadow-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Offered Section */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Courses Offered</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive programs designed to update your skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{course}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Hands-on training with industry-relevant projects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Courses */}
      <section id="courses" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-full">
                <BookOpen className="h-8 w-8 text-amber-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Available Refresher Courses
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive programs designed to update your skills with hands-on projects,
              expert mentorship, and industry certification.
            </p>
          </motion.div>

          {courses.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {courses.map((course) => {
                const CourseIcon = getCourseIcon(course.title);
                return (
                  <motion.div key={course.course_id} variants={itemVariants}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 shadow-lg bg-white dark:bg-gray-800">
                      {/* Course Header with Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getCourseImage(course.title)}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                        {/* Course Icon and Badge */}
                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                          <div className="w-10 h-10 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 flex items-center justify-center">
                            <CourseIcon className="h-5 w-5 text-amber-600" />
                          </div>
                        </div>

                        <div className="absolute top-4 right-4">
                          <Badge
                            variant="outline"
                            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-white/20 dark:border-gray-600/20 text-gray-900 dark:text-gray-100"
                          >
                            {course.skill_level}
                          </Badge>
                        </div>

                        {/* Course Title */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                            {course.title}
                          </h3>
                          <div className="flex items-center text-white/90 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.duration_months} months • {course.num_lectures} lectures
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                          {course.description}
                        </p>

                        {/* Course Details */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-amber-600" />
                            <span className="font-medium">{course.class_days}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Target className="h-4 w-4 mr-2 text-amber-600" />
                            <span className="font-medium">{course.department}</span>
                          </div>
                          {course.total_enrollments && (
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 mr-2 text-blue-600" />
                              <span className="font-medium">{course.total_enrollments} enrolled</span>
                            </div>
                          )}
                          <div className="flex items-center text-sm">
                            <Star className="h-4 w-4 mr-2 text-yellow-500" />
                            <span className="font-medium">Professional</span>
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <span className="text-2xl font-bold text-amber-600">K {course.price}</span>
                            <span className="text-sm text-muted-foreground ml-1">total</span>
                          </div>
                          <Link href={`/refresher/${course.course_id}`}>
                            <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg">
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No Refresher Courses Available
              </h3>
              <p className="text-muted-foreground">
                Check back soon for new refresher course offerings.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Investment Section */}
      <section id="apply" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/50 dark:via-orange-950/50 dark:to-yellow-950/50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Investment in Your Professional Growth
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Affordable pricing for comprehensive skill development with hands-on training and certification
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Pricing Card */}
              <Card className="relative overflow-hidden shadow-2xl border-0 dark:bg-gray-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-full">
                      <GraduationCap className="h-8 w-8 text-amber-600" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">Refresher Course Program</CardTitle>
                  <CardDescription>Complete professional development package</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-amber-600 mb-2">Contact Us</div>
                    <div className="text-sm text-muted-foreground">for course-specific pricing</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {[
                      { icon: Target, text: "Hands-on practical training" },
                      { icon: UserCheck, text: "Expert instructor guidance" },
                      { icon: Award, text: "Real-world project experience" },
                      { icon: FileText, text: "Certificate of completion" },
                      { icon: Calendar, text: "Flexible evening/weekend schedules" },
                      { icon: TrendingUp, text: "Progress tracking and assessment" }
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="p-1 bg-amber-100 dark:bg-amber-900/50 rounded mr-3">
                          <feature.icon className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/apply?program=refresher">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg text-lg py-6">
                      Apply for Refresher Course
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Visual Content */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80"
                      alt="Professional training session"
                      className="rounded-xl shadow-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80"
                      alt="Hands-on learning"
                      className="rounded-xl shadow-lg"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-4 mt-8"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=80"
                      alt="Certificate achievement"
                      className="rounded-xl shadow-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                      alt="Career advancement"
                      className="rounded-xl shadow-lg"
                    />
                  </motion.div>
                </div>

                {/* Floating Success Stats */}
                <motion.div
                  className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-xs text-muted-foreground">Completion Rate</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">450+</div>
                    <div className="text-xs text-muted-foreground">Certified</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RefresherCoursesPage;
