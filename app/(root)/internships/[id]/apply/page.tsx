'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  Link as LinkIcon,
  Calendar,
  Target,
  CheckCircle
} from 'lucide-react';

interface Internship {
  internship_id: number;
  title: string;
  company_name: string;
  type: 'paid' | 'unpaid';
  duration_months: number;
}

const InternshipApplicationForm = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [internship, setInternship] = useState<Internship | null>(null);
  const [formData, setFormData] = useState({
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
    soft_skills: ''
  });

  useEffect(() => {
    fetchInternshipDetails();
  }, [params.id]);

  const fetchInternshipDetails = async () => {
    try {
      const response = await fetch(`/api/internships/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setInternship(data);
      }
    } catch (error) {
      console.error('Error fetching internship details:', error);
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
          internship_id: parseInt(params.id as string)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast({
        title: "Success!",
        description: "Your internship application has been submitted successfully.",
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

  const formSections = [
    {
      icon: User,
      title: "Personal Information",
      description: "Basic contact and personal details"
    },
    {
      icon: GraduationCap,
      title: "Academic Background",
      description: "University and course information"
    },
    {
      icon: FileText,
      title: "Documents & Portfolio",
      description: "CV, portfolio, and professional links"
    },
    {
      icon: Target,
      title: "Experience & Motivation",
      description: "Your background and goals"
    }
  ];

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading internship details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-background border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-amber-100 rounded-full">
                <Briefcase className="h-12 w-12 text-amber-600" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Apply for Internship
            </h1>
            <div className="bg-muted rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-2">{internship.title}</h2>
              <p className="text-muted-foreground">
                at {internship.company_name} • {internship.type === 'paid' ? 'Paid' : 'Unpaid'} • {internship.duration_months} months
              </p>
            </div>
            <p className="text-lg text-muted-foreground">
              Complete the application form below to apply for this internship opportunity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Indicators */}
      <section className="py-8 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formSections.map((section, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 p-4 bg-background rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="p-2 bg-amber-100 rounded-lg">
                  <section.icon className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{section.title}</h3>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              <form onSubmit={handleSubmit} className="space-y-12">
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
                    <Label htmlFor="cover_letter">Cover Letter</Label>
                    <Textarea
                      id="cover_letter"
                      value={formData.cover_letter}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Write a brief cover letter explaining your interest in this internship..."
                    />
                  </div>
                </div>

                {/* Experience & Motivation */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Target className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Experience & Motivation</h3>
                      <p className="text-sm text-muted-foreground">Your background and goals</p>
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
                      <Label htmlFor="motivation">Why are you interested in this internship?</Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Explain your motivation and what you hope to achieve..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="relevant_experience">Relevant Experience (Optional)</Label>
                      <Textarea
                        id="relevant_experience"
                        value={formData.relevant_experience}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Describe any relevant projects, work experience, or coursework..."
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
                          placeholder="Programming languages, tools, frameworks..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="soft_skills">Soft Skills</Label>
                        <Textarea
                          id="soft_skills"
                          value={formData.soft_skills}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Communication, teamwork, problem-solving..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                  <div className="flex items-center space-x-4 mb-6">
                    <CheckCircle className="h-5 w-5 text-amber-600" />
                    <p className="text-sm text-muted-foreground">
                      By submitting this application, you agree to our terms and conditions and
                      consent to being contacted regarding this internship opportunity.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-amber-600 hover:bg-amber-700"
                    disabled={loading}
                  >
                    {loading ? "Submitting Application..." : "Submit Application"}
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

export default InternshipApplicationForm;
