'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Briefcase, 
  User, 
  GraduationCap, 
  FileText, 
  Target,
  CheckCircle,
  ArrowRight,
  Users,
  Award
} from 'lucide-react';

interface Internship {
  internship_id: number;
  title: string;
  company_name: string;
  type: 'paid' | 'unpaid';
  duration_months: number;
}

const GeneralInternshipApplication = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [formData, setFormData] = useState({
    internship_id: '',
    student_name: '',
    student_email: '',
    student_phone: '',
    university: '',
    course_of_study: '',
    year_of_study: '',
    gpa: '',
    cv_url: '',
    cover_letter: '',
    portfolio_url: '',
    linkedin_url: '',
    github_url: '',
    availability_start: '',
    preferred_duration: '',
    motivation: '',
    relevant_experience: '',
    technical_skills: '',
    soft_skills: '',
    preferred_industry: '',
    internship_type_preference: ''
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await fetch('/api/internships');
      if (response.ok) {
        const data = await response.json();
        setInternships(data);
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/internships/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          internship_id: formData.internship_id ? parseInt(formData.internship_id) : null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast({
        title: "Success!",
        description: "Your internship application has been submitted successfully. We'll be in touch soon!",
      });

      router.push('/internships');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const programBenefits = [
    {
      icon: Users,
      title: "Dual Mentorship",
      description: "Industry + Academic guidance"
    },
    {
      icon: Award,
      title: "Certification",
      description: "Official completion certificate"
    },
    {
      icon: Target,
      title: "Career Support",
      description: "CV guidance & interview prep"
    }
  ];

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
              Apply for Internship Program
            </h1>
            <p className="text-lg leading-8 text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join our comprehensive internship placement program and gain valuable industry experience 
              with guided mentorship, certification, and career support.
            </p>
            
            {/* Program Benefits */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {programBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <benefit.icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-sm">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
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

      {/* Application Form */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Card className="p-6 sm:p-8">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Internship Application Form</CardTitle>
                <CardDescription>
                  Complete the form below to apply for our internship placement program
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Internship Preference */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Target className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Internship Preferences</h3>
                      <p className="text-sm text-muted-foreground">Tell us about your internship preferences</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="internship_id">Specific Internship (Optional)</Label>
                      <Select
                        value={formData.internship_id}
                        onValueChange={(value) => handleSelectChange('internship_id', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a specific internship or leave blank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No specific preference</SelectItem>
                          {internships.map((internship) => (
                            <SelectItem key={internship.internship_id} value={internship.internship_id.toString()}>
                              {internship.title} at {internship.company_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred_industry">Preferred Industry</Label>
                      <Select
                        value={formData.preferred_industry}
                        onValueChange={(value) => handleSelectChange('preferred_industry', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                          <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                          <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                          <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                          <SelectItem value="Design">UI/UX Design</SelectItem>
                          <SelectItem value="Any">Any Industry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="internship_type_preference">Type Preference</Label>
                      <Select
                        value={formData.internship_type_preference}
                        onValueChange={(value) => handleSelectChange('internship_type_preference', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paid">Paid Internships Only</SelectItem>
                          <SelectItem value="unpaid">Unpaid Internships Only</SelectItem>
                          <SelectItem value="both">Both Paid and Unpaid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <User className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <p className="text-sm text-muted-foreground">Basic contact and personal details</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="student_name">Full Name *</Label>
                      <Input
                        id="student_name"
                        required
                        value={formData.student_name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student_email">Email Address *</Label>
                      <Input
                        type="email"
                        id="student_email"
                        required
                        value={formData.student_email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student_phone">Phone Number *</Label>
                      <Input
                        type="tel"
                        id="student_phone"
                        required
                        value={formData.student_phone}
                        onChange={handleInputChange}
                        placeholder="+260 XXX XXX XXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Background */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Academic Background</h3>
                      <p className="text-sm text-muted-foreground">University and course information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="university">University/Institution *</Label>
                      <Input
                        id="university"
                        required
                        value={formData.university}
                        onChange={handleInputChange}
                        placeholder="University of Zambia"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course_of_study">Course of Study *</Label>
                      <Input
                        id="course_of_study"
                        required
                        value={formData.course_of_study}
                        onChange={handleInputChange}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year_of_study">Year of Study *</Label>
                      <Select
                        value={formData.year_of_study}
                        onValueChange={(value) => handleSelectChange('year_of_study', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gpa">GPA/Grade (Optional)</Label>
                      <Input
                        id="gpa"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        placeholder="3.5 or First Class"
                      />
                    </div>
                  </div>
                </div>

                {/* Documents & Portfolio */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <FileText className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Documents & Portfolio</h3>
                      <p className="text-sm text-muted-foreground">CV, portfolio, and professional links</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cv_url">CV/Resume URL</Label>
                      <Input
                        type="url"
                        id="cv_url"
                        value={formData.cv_url}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/..."
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload your CV to Google Drive or Dropbox and share the link
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio_url">Portfolio URL (Optional)</Label>
                      <Input
                        type="url"
                        id="portfolio_url"
                        value={formData.portfolio_url}
                        onChange={handleInputChange}
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin_url">LinkedIn Profile (Optional)</Label>
                      <Input
                        type="url"
                        id="linkedin_url"
                        value={formData.linkedin_url}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github_url">GitHub Profile (Optional)</Label>
                      <Input
                        type="url"
                        id="github_url"
                        value={formData.github_url}
                        onChange={handleInputChange}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cover_letter">Cover Letter / Personal Statement</Label>
                    <Textarea
                      id="cover_letter"
                      value={formData.cover_letter}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Write a brief statement explaining your interest in our internship program, your career goals, and what you hope to achieve..."
                    />
                  </div>
                </div>

                {/* Experience & Goals */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Target className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Experience & Goals</h3>
                      <p className="text-sm text-muted-foreground">Your background and career objectives</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="availability_start">Available Start Date</Label>
                      <Input
                        type="date"
                        id="availability_start"
                        value={formData.availability_start}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred_duration">Preferred Duration</Label>
                      <Select
                        value={formData.preferred_duration}
                        onValueChange={(value) => handleSelectChange('preferred_duration', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 months</SelectItem>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="motivation">Why do you want to join our internship program?</Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Explain your motivation and what you hope to achieve through this program..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="relevant_experience">Relevant Experience (Optional)</Label>
                      <Textarea
                        id="relevant_experience"
                        value={formData.relevant_experience}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Describe any relevant projects, work experience, coursework, or personal projects..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="technical_skills">Technical Skills</Label>
                        <Textarea
                          id="technical_skills"
                          value={formData.technical_skills}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Programming languages, tools, frameworks, software..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="soft_skills">Soft Skills</Label>
                        <Textarea
                          id="soft_skills"
                          value={formData.soft_skills}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Communication, teamwork, problem-solving, leadership..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                  <div className="bg-muted rounded-lg p-6 mb-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-2">What happens next?</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• We'll review your application within 3-5 business days</li>
                          <li>• Qualified candidates will be contacted for an initial interview</li>
                          <li>• We'll match you with suitable internship opportunities</li>
                          <li>• Successful applicants will be connected with our mentorship program</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-6">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <p className="text-sm text-muted-foreground">
                      By submitting this application, you agree to our terms and conditions and
                      consent to being contacted regarding internship opportunities.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    disabled={loading}
                  >
                    {loading ? "Submitting Application..." : "Submit Application"}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GeneralInternshipApplication;
