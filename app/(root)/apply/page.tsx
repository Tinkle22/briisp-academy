/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

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
  const [isRefresherCourse, setIsRefresherCourse] = useState(false);
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
    courseId: '',
    // Refresher-specific fields
    currentSkillLevel: '',
    previousExperience: '',
    learningGoals: '',
    preferredSchedule: '',
    mentorshipInterest: ''
  });

  // Get program or course from URL and find matching course
  const programCode = searchParams.get('program') || searchParams.get('course');

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
            course.course_code === programCode || course.program_type === programCode
          );
          if (matchingCourse) {
            setFormData(prev => ({
              ...prev,
              courseId: matchingCourse.course_id.toString()
            }));
            // Check if it's a refresher course
            setIsRefresherCourse(matchingCourse.program_type === 'refresher');
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

    // Check if selected course is a refresher course
    if (id === 'courseId') {
      const selectedCourse = courses.find(course => course.course_id.toString() === value);
      setIsRefresherCourse(selectedCourse?.program_type === 'refresher');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use refresher-specific endpoint if it's a refresher course
      const endpoint = isRefresherCourse ? '/api/applications/refresher' : '/api/applications';

      const response = await fetch(endpoint, {
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
              Application Form
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Fill out the form below to begin your educational journey with us.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
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
                        {isRefresherCourse && (
                          <>
                            <SelectItem value="evening">Evening Classes</SelectItem>
                            <SelectItem value="weekend">Weekend Classes</SelectItem>
                          </>
                        )}
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

              {/* Refresher Course Specific Fields */}
              {isRefresherCourse && (
                <div className="space-y-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900">Refresher Course Information</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentSkillLevel">Current Skill Level</Label>
                      <Select
                        value={formData.currentSkillLevel}
                        onValueChange={(value) => handleSelectChange('currentSkillLevel', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your current level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert (need refresh)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredSchedule">Preferred Schedule</Label>
                      <Select
                        value={formData.preferredSchedule}
                        onValueChange={(value) => handleSelectChange('preferredSchedule', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="evening">Evening Classes</SelectItem>
                          <SelectItem value="weekend">Weekend Classes</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousExperience">Previous Experience (Optional)</Label>
                    <Textarea
                      id="previousExperience"
                      placeholder="Briefly describe your previous experience in this field"
                      value={formData.previousExperience}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="learningGoals">Learning Goals (Optional)</Label>
                    <Textarea
                      id="learningGoals"
                      placeholder="What do you hope to achieve from this refresher course?"
                      value={formData.learningGoals}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mentorshipInterest">Interest in Mentorship</Label>
                    <Select
                      value={formData.mentorshipInterest}
                      onValueChange={(value) => handleSelectChange('mentorshipInterest', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Are you interested in mentorship?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, I'm interested</SelectItem>
                        <SelectItem value="no">No, not at this time</SelectItem>
                        <SelectItem value="maybe">Maybe, tell me more</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={loading}
              >
                {loading ? "Submitting..." : `Submit ${isRefresherCourse ? 'Refresher Course ' : ''}Application`}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ApplicationForm; 