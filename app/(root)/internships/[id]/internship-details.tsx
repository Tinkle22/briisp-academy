'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building,
  Clock, 
  Users, 
  Calendar, 
  DollarSign,
  MapPin,
  Globe,
  ChevronRight,
  CheckCircle,
  Target,
  Briefcase,
  Award,
  UserCheck,
  ExternalLink
} from 'lucide-react';

interface Internship {
  internship_id: number;
  title: string;
  description: string;
  company_name: string;
  company_logo: string;
  company_location: string;
  company_website: string;
  company_description: string;
  company_industry: string;
  company_size: string;
  type: 'paid' | 'unpaid';
  duration_months: number;
  industry: string;
  skills_required: string;
  requirements: string;
  responsibilities: string;
  stipend_amount?: number;
  application_deadline: string;
  start_date: string;
  total_applications: number;
}

interface SimilarInternship {
  internship_id: number;
  title: string;
  company_name: string;
  company_logo: string;
  company_location: string;
  type: 'paid' | 'unpaid';
  duration_months: number;
}

interface InternshipDetailsProps {
  internship: Internship;
  similarInternships: SimilarInternship[];
}

const InternshipDetails = ({ internship, similarInternships }: InternshipDetailsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const programBenefits = [
    {
      icon: UserCheck,
      title: "Dual Mentorship",
      description: "Industry supervisor + our academic mentor"
    },
    {
      icon: Award,
      title: "Certification",
      description: "Official completion certificate"
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Monthly reviews and assessments"
    },
    {
      icon: Briefcase,
      title: "Career Support",
      description: "CV guidance and interview prep"
    }
  ];

  const skillsList = internship.skills_required ? internship.skills_required.split(',').map(skill => skill.trim()) : [];
  const requirementsList = internship.requirements ? internship.requirements.split('\n').filter(req => req.trim()) : [];
  const responsibilitiesList = internship.responsibilities ? internship.responsibilities.split('\n').filter(resp => resp.trim()) : [];

  // Helper function to get internship image based on industry
  const getInternshipImage = (industry: string) => {
    const imageMap: { [key: string]: string } = {
      "Technology": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "Cybersecurity": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "Cloud Computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      "Mobile Development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      "Design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      "Software Development": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    };
    return imageMap[industry] || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getInternshipImage(internship.industry)}
            alt={internship.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-4 mb-6">
                {internship.company_logo && (
                  <motion.div
                    className="w-16 h-16 rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm p-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <img
                      src={internship.company_logo}
                      alt={internship.company_name}
                      className="w-full h-full object-cover rounded"
                    />
                  </motion.div>
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge
                      variant={internship.type === 'paid' ? 'default' : 'secondary'}
                      className={`${
                        internship.type === 'paid'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white border-0`}
                    >
                      {internship.type === 'paid' ? '💰 Paid Internship' : '🎓 Experience-Based'}
                    </Badge>
                    <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-white/20">
                      {internship.industry}
                    </Badge>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">{internship.title}</h1>
                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {internship.company_name}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {internship.company_location}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg text-white/90 mb-8">{internship.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <Clock className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                  <div className="font-semibold text-white">{internship.duration_months} months</div>
                  <div className="text-sm text-white/70">Duration</div>
                </div>
                {internship.type === 'paid' && internship.stipend_amount && (
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <div className="font-semibold text-white">K {internship.stipend_amount}</div>
                    <div className="text-sm text-white/70">Monthly</div>
                  </div>
                )}
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="font-semibold text-white">{internship.total_applications}</div>
                  <div className="text-sm text-white/70">Applications</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <Calendar className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="font-semibold text-white">
                    {new Date(internship.application_deadline).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-white/70">Deadline</div>
                </div>
              </div>

              <Link href={`/internships/${internship.internship_id}/apply`}>
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg">
                  Apply Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Building className="h-5 w-5 mr-2 text-amber-600" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-900">Industry:</span>
                    <p className="text-muted-foreground">{internship.company_industry}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Company Size:</span>
                    <p className="text-muted-foreground">{internship.company_size}</p>
                  </div>
                  {internship.company_website && (
                    <div>
                      <span className="font-medium text-gray-900">Website:</span>
                      <a
                        href={internship.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-amber-600 hover:text-amber-700 mt-1"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Visit Website
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  )}
                  {internship.company_description && (
                    <div>
                      <span className="font-medium text-gray-900">About:</span>
                      <p className="text-muted-foreground text-sm mt-1">{internship.company_description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Program Benefits */}
              <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-900">Program Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {programBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <benefit.icon className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-gray-900">{benefit.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">{benefit.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Internship Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground mb-6">{internship.description}</p>

                    <h3 className="text-lg font-semibold mb-4">What You'll Gain:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Real-world industry experience",
                        "Professional mentorship and guidance",
                        "Hands-on project work",
                        "Networking opportunities",
                        "Certificate of completion",
                        "Career development support"
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                  <CardDescription>
                    Qualifications and prerequisites for this internship
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {requirementsList.length > 0 ? (
                    <ul className="space-y-3">
                      {requirementsList.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      Requirements will be discussed during the application process.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="responsibilities" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Responsibilities</CardTitle>
                  <CardDescription>
                    Key tasks and duties you'll be involved in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {responsibilitiesList.length > 0 ? (
                    <ul className="space-y-3">
                      {responsibilitiesList.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Target className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      Specific responsibilities will be outlined during the onboarding process.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                  <CardDescription>
                    Technical and soft skills needed for this position
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {skillsList.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skillsList.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Skills requirements will be discussed during the application process.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Similar Internships */}
      {similarInternships.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Similar Opportunities
              </h2>
              <p className="text-lg text-muted-foreground">
                Other internships you might be interested in
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarInternships.map((similar) => (
                <motion.div
                  key={similar.internship_id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        {similar.company_logo && (
                          <img
                            src={similar.company_logo}
                            alt={similar.company_name}
                            className="w-8 h-8 rounded object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold text-sm">{similar.company_name}</h3>
                          <p className="text-xs text-muted-foreground">{similar.company_location}</p>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{similar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={similar.type === 'paid' ? 'default' : 'secondary'}>
                          {similar.type === 'paid' ? 'Paid' : 'Unpaid'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {similar.duration_months} months
                        </span>
                      </div>
                      <Link href={`/internships/${similar.internship_id}`}>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Start Your Internship Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our internship placement program and gain valuable industry experience
              with comprehensive support and mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/internships/${internship.internship_id}/apply`}>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  Apply for This Internship
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/internships">
                <Button variant="outline" size="lg">
                  Browse More Internships
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InternshipDetails;
