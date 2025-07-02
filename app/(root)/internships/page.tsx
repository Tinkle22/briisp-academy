'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Users, 
  Award, 
  FileText,
  Calendar,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Building,
  Clock,
  DollarSign,
  Star,
  Target,
  BookOpen,
  UserCheck,
  Search
} from 'lucide-react';

interface Internship {
  internship_id: number;
  title: string;
  description: string;
  company_name: string;
  company_logo: string;
  company_location: string;
  type: 'paid' | 'unpaid';
  duration_months: number;
  industry: string;
  skills_required: string;
  stipend_amount?: number;
  application_deadline: string;
  total_applications: number;
}

const InternshipPlacementProgram = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  // Helper function to get service images
  const getServiceImage = (serviceTitle: string) => {
    const imageMap: { [key: string]: string } = {
      "Find Internships": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      "Dual Supervision": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
      "Certification": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      "Career Support": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
      "Progress Monitoring": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
    };
    return imageMap[serviceTitle] || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80";
  };

  // Helper function to get internship images based on industry
  const getInternshipImage = (industry: string) => {
    const imageMap: { [key: string]: string } = {
      "Technology": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      "Cybersecurity": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
      "Cloud Computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      "Mobile Development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
      "Design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
      "Software Development": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
    };
    return imageMap[industry] || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80";
  };

  useEffect(() => {
    fetchInternships();
  }, [filter]);

  const fetchInternships = async () => {
    try {
      const url = filter === 'all' ? '/api/internships' : `/api/internships?type=${filter}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setInternships(data);
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      icon: Search,
      title: "Find Internships",
      description: "Access to both paid and unpaid internship opportunities across the tech industry",
      features: ["Curated opportunities", "Industry partnerships", "Real-world projects"]
    },
    {
      icon: UserCheck,
      title: "Dual Supervision",
      description: "Industry-supervised internships with additional mentorship from our experienced team",
      features: ["Industry mentors", "Academic guidance", "Regular check-ins"]
    },
    {
      icon: Award,
      title: "Certification",
      description: "Receive an official Certificate of Completion upon successful internship completion",
      features: ["Industry recognition", "Portfolio enhancement", "Career advancement"]
    },
    {
      icon: FileText,
      title: "Career Support",
      description: "Comprehensive CV and cover letter guidance to help you stand out",
      features: ["Professional templates", "Expert review", "Interview preparation"]
    },
    {
      icon: TrendingUp,
      title: "Progress Monitoring",
      description: "Monthly progress reviews to ensure you're meeting your learning objectives",
      features: ["Regular assessments", "Feedback sessions", "Goal tracking"]
    }
  ];

  const stats = [
    { icon: Briefcase, label: "Active Internships", value: "150+", color: "text-amber-600" },
    { icon: Users, label: "Students Placed", value: "500+", color: "text-blue-600" },
    { icon: Building, label: "Partner Companies", value: "75+", color: "text-green-600" },
    { icon: Award, label: "Success Rate", value: "95%", color: "text-purple-600" }
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
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
                <div className="p-3 bg-amber-100 rounded-full mr-4">
                  <Briefcase className="h-8 w-8 text-amber-600" />
                </div>
                <span className="text-amber-600 font-semibold text-lg">Professional Growth</span>
              </motion.div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Internship Placement Program
              </h1>
              <p className="text-xl leading-8 text-muted-foreground mb-8">
                Connect with real-world opportunities across the tech industry.
                All internships include guided mentorship, progress monitoring, and professional certification.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link href="#internships">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 shadow-lg">
                    Browse Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#services">
                  <Button variant="outline" size="lg" className="border-2">
                    Learn More
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
                    alt="Students collaborating in tech internship"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">500+ Students</p>
                      <p className="text-xs text-muted-foreground">Successfully Placed</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">75+ Companies</p>
                      <p className="text-xs text-muted-foreground">Industry Partners</p>
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Comprehensive Internship Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our program offers end-to-end support to ensure your internship experience
              is valuable, educational, and career-enhancing.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Service Cards with Images */}
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getServiceImage(service.title)}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                      <div className="p-2 bg-white/90 backdrop-blur-sm rounded-lg">
                        <service.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-white font-semibold text-lg">{service.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-amber-600 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Process Flow with Images */}
          <motion.div
            className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Your Internship Journey</h3>
              <p className="text-muted-foreground">From application to certification - we guide you every step</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Apply",
                  description: "Submit your application with preferences",
                  image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80"
                },
                {
                  step: "2",
                  title: "Match",
                  description: "Get matched with suitable opportunities",
                  image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80"
                },
                {
                  step: "3",
                  title: "Learn",
                  description: "Gain hands-on experience with mentorship",
                  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
                },
                {
                  step: "4",
                  title: "Certify",
                  description: "Receive certification and career support",
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

      {/* Available Internships Section */}
      <section id="internships" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full">
                <Briefcase className="h-8 w-8 text-amber-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Available Internship Opportunities
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover exciting opportunities with our industry partners. Each internship includes
              mentorship, real projects, and certification.
            </p>

            {/* Enhanced Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { key: 'all', label: 'All Opportunities', icon: Briefcase },
                { key: 'paid', label: 'Paid Internships', icon: DollarSign },
                { key: 'unpaid', label: 'Experience-Based', icon: BookOpen }
              ].map((filterOption) => (
                <Button
                  key={filterOption.key}
                  variant={filter === filterOption.key ? 'default' : 'outline'}
                  onClick={() => setFilter(filterOption.key as 'all' | 'paid' | 'unpaid')}
                  className={`${
                    filter === filterOption.key
                      ? 'bg-amber-600 hover:bg-amber-700 shadow-lg'
                      : 'hover:bg-amber-50 hover:border-amber-200'
                  } transition-all duration-200`}
                  size="lg"
                >
                  <filterOption.icon className="h-4 w-4 mr-2" />
                  {filterOption.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading internships...</p>
            </div>
          ) : internships.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {internships.slice(0, 6).map((internship) => (
                <motion.div key={internship.internship_id} variants={itemVariants}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 shadow-lg bg-white">
                    {/* Card Header with Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getInternshipImage(internship.industry)}
                        alt={internship.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {/* Company Logo and Badge */}
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        {internship.company_logo && (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm p-1">
                            <img
                              src={internship.company_logo}
                              alt={internship.company_name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        )}
                      </div>

                      <div className="absolute top-4 right-4">
                        <Badge
                          variant={internship.type === 'paid' ? 'default' : 'secondary'}
                          className={`${
                            internship.type === 'paid'
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                          } text-white border-0`}
                        >
                          {internship.type === 'paid' ? '💰 Paid' : '🎓 Experience'}
                        </Badge>
                      </div>

                      {/* Title and Company */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                          {internship.title}
                        </h3>
                        <div className="flex items-center text-white/90 text-sm">
                          <Building className="h-4 w-4 mr-1" />
                          {internship.company_name} • {internship.company_location}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {internship.description}
                      </p>

                      {/* Key Details */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-amber-600" />
                          <span className="font-medium">{internship.duration_months} months</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Target className="h-4 w-4 mr-2 text-amber-600" />
                          <span className="font-medium">{internship.industry}</span>
                        </div>
                        {internship.type === 'paid' && internship.stipend_amount && (
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                            <span className="font-medium text-green-600">K {internship.stipend_amount}/month</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="font-medium">{internship.total_applications} applied</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link href={`/internships/${internship.internship_id}`}>
                        <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg">
                          View Opportunity
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Internships Available</h3>
              <p className="text-muted-foreground">
                Check back soon for new internship opportunities.
              </p>
            </div>
          )}

          {internships.length > 6 && (
            <div className="text-center mt-8">
              <Link href="/internships/browse">
                <Button variant="outline" size="lg">
                  View All Internships
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Investment in Your Future
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                A small placement fee covers comprehensive mentorship, certification, and ongoing support
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Pricing Card */}
              <Card className="relative overflow-hidden shadow-2xl border-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full">
                      <Award className="h-8 w-8 text-amber-600" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">Placement Program</CardTitle>
                  <CardDescription>Complete internship support package</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-amber-600 mb-2">Contact Us</div>
                    <div className="text-sm text-muted-foreground">for pricing details</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {[
                      { icon: Search, text: "Internship placement assistance" },
                      { icon: UserCheck, text: "Industry + Academic mentorship" },
                      { icon: Award, text: "Certificate of completion" },
                      { icon: FileText, text: "CV and cover letter guidance" },
                      { icon: TrendingUp, text: "Monthly progress reviews" },
                      { icon: Target, text: "Career development support" }
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="p-1 bg-amber-100 rounded mr-3">
                          <feature.icon className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/internships/apply">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg text-lg py-6">
                      APPLY NOW
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
                      alt="Students collaborating"
                      className="rounded-xl shadow-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80"
                      alt="Mentorship session"
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
                      alt="Certificate ceremony"
                      className="rounded-xl shadow-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                      alt="Career development"
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
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-xs text-muted-foreground">Graduates</div>
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

export default InternshipPlacementProgram;
