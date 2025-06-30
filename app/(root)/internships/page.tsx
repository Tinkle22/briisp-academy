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
      <section className="relative py-16 bg-background border-b overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="p-4 bg-amber-100 rounded-full">
                <Briefcase className="h-12 w-12 text-amber-600" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Internship Placement Program
            </h1>
            <p className="text-lg leading-8 text-muted-foreground mb-8 max-w-3xl mx-auto">
              We connect students with relevant, real-world internship opportunities across the tech industry. 
              All internships are guided, monitored, and certified to ensure maximum learning and career growth.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="#internships">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  Browse Internships
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#services">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20"
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0]
            }}
            transition={{
              duration: 4,
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
      <section id="services" className="py-16 bg-muted">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <service.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Available Internships Section */}
      <section id="internships" className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Available Internship Opportunities
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore current internship openings from our industry partners
            </p>

            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4">
              {['all', 'paid', 'unpaid'].map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? 'default' : 'outline'}
                  onClick={() => setFilter(filterType as 'all' | 'paid' | 'unpaid')}
                  className={filter === filterType ? 'bg-amber-600 hover:bg-amber-700' : ''}
                >
                  {filterType === 'all' ? 'All Internships' :
                   filterType === 'paid' ? 'Paid Internships' : 'Unpaid Internships'}
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
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {internship.company_logo && (
                            <img
                              src={internship.company_logo}
                              alt={internship.company_name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">
                              {internship.company_name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {internship.company_location}
                            </p>
                          </div>
                        </div>
                        <Badge variant={internship.type === 'paid' ? 'default' : 'secondary'}>
                          {internship.type === 'paid' ? 'Paid' : 'Unpaid'}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{internship.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {internship.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2 text-amber-600" />
                          {internship.duration_months} months
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building className="h-4 w-4 mr-2 text-amber-600" />
                          {internship.industry}
                        </div>
                        {internship.type === 'paid' && internship.stipend_amount && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4 mr-2 text-amber-600" />
                            K {internship.stipend_amount}/month
                          </div>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2 text-amber-600" />
                          {internship.total_applications} applications
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <Link href={`/internships/${internship.internship_id}`}>
                          <Button className="w-full bg-amber-600 hover:bg-amber-700">
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
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
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Investment in Your Future
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              A small placement fee covers comprehensive mentorship, certification, and ongoing support
            </p>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Placement Program</CardTitle>
                <CardDescription>Complete internship support package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-amber-600 mb-2">Contact Us</div>
                  <div className="text-sm text-muted-foreground">for pricing details</div>
                </div>

                <ul className="space-y-3 text-left mb-6">
                  {[
                    "Internship placement assistance",
                    "Industry + Academic mentorship",
                    "Certificate of completion",
                    "CV and cover letter guidance",
                    "Monthly progress reviews",
                    "Career development support"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-amber-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/internships/apply">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    APPLY
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InternshipPlacementProgram;
