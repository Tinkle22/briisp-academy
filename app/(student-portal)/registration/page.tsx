/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import {
  GraduationCap,
  Presentation,
  Lightbulb,
  Briefcase,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Course {
  course_id: number;
  title: string;
  course_code: string;
  program_type: string;
}

const ApplicationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const { toast } = useToast()
  
  // Form state
  const [studentType, setStudentType] = useState<'child' | 'adult'>('adult');
  const [formData, setFormData] = useState({
    studyMode: '',
    firstName: '',
    lastName: '',
    otherNames: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: '',
    nationality: '',
    idNumber: '',
    academicYear: new Date().getFullYear().toString(),
    intake: '',
    email: '',
    phoneNumber: '',
    country: '',
    courseId: ''
  });

  // Get program from URL and find matching course
  const programCode = searchParams.get('program');

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data);
        
        // If program code exists in URL, set the corresponding course
        if (programCode) {
          const matchingCourse = data.find((course: Course) => 
            course.course_code === programCode
          );
          if (matchingCourse) {
            setFormData(prev => ({
              ...prev,
              courseId: matchingCourse.course_id.toString()
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchCourses();
  }, [programCode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          studentType,
          courseId: parseInt(formData.courseId)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast({
        title: "Success!",
        description: "Your application has been submitted successfully.",
      });

      // Redirect to success page or show success message
      router.push('/');
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-background border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Applications & Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Apply for courses or explore our specialized services to advance your career and projects.
            </p>
          </div>
        </div>
      </section>

      {/* Specialized Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Specialized Services
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Apply for our professional services to support your academic and entrepreneurial journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Final Year Project Support */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => router.push('/apply/final-year-project')}>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-amber-100 rounded-full mb-4 group-hover:bg-amber-200 transition-colors">
                  <GraduationCap className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Final Year Project</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get expert guidance and support for your final year project from proposal to completion.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-amber-50">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Pitch Deck Service */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => router.push('/apply/pitch-deck')}>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                  <Presentation className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Pitch Deck Service</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Professional pitch deck creation and consultation for your startup or business idea.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-blue-50">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Innovation Lab */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => router.push('/apply/innovation-lab')}>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                  <Lightbulb className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Innovation Lab</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Join our innovation lab to develop cutting-edge solutions and collaborate with experts.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-green-50">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Internship Program */}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => router.push('/apply/internship')}>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                  <Briefcase className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Internship Program</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Apply for internship opportunities with our partner companies and organizations.
                </p>
                <Button variant="outline" className="w-full group-hover:bg-purple-50">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Application Form */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Course Application
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Apply for our educational courses and programs.
            </p>
          </div>
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Student Type Selection */}
              <div className="space-y-4">
                <Label>Student Type</Label>
                <RadioGroup
                  defaultValue={studentType}
                  onValueChange={(value) => setStudentType(value as 'child' | 'adult')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adult" id="adult" />
                    <Label htmlFor="adult">Adult</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="child" id="child" />
                    <Label htmlFor="child">Child</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Program Selection */}
              <div className="space-y-4">
                <Label htmlFor="courseId">Program</Label>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) => handleSelectChange('courseId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem 
                        key={course.course_id} 
                        value={course.course_id.toString()}
                      >
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Study Mode */}
              <div className="space-y-4">
                <Label htmlFor="studyMode">Study Mode</Label>
                <Select
                  value={formData.studyMode}
                  onValueChange={(value) => handleSelectChange('studyMode', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select study mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentType === 'child' ? (
                      <>
                        <SelectItem value="online">Online Learning</SelectItem>
                        <SelectItem value="weekends">Weekend Classes</SelectItem>
                        <SelectItem value="holiday">Holiday Program</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="online">Online Learning</SelectItem>
                        <SelectItem value="distance">Distance Learning</SelectItem>
                        <SelectItem value="partTime">Part Time</SelectItem>
                        <SelectItem value="fullTime">Full Time</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required value={formData.lastName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherNames">Other Names</Label>
                  <Input id="otherNames" value={formData.otherNames} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => handleSelectChange('maritalStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input 
                    type="date" 
                    id="dateOfBirth" 
                    required 
                    value={formData.dateOfBirth} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input 
                    id="nationality" 
                    required 
                    value={formData.nationality} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID (NRC or Passport)</Label>
                  <Input 
                    id="idNumber"  
                    value={formData.idNumber} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input id="academicYear" required value={formData.academicYear} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intake">Intake</Label>
                  <Select
                    value={formData.intake}
                    onValueChange={(value) => handleSelectChange('intake', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select intake" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January</SelectItem>
                      <SelectItem value="may">May</SelectItem>
                      <SelectItem value="september">September</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Applicant's Email</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    required 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Applicant's Phone #</Label>
                  <Input 
                    type="tel" 
                    id="phoneNumber" 
                    required 
                    value={formData.phoneNumber} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    required 
                    value={formData.country} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ApplicationForm; 