"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GraduationCap, FileText, Calendar, Users } from 'lucide-react';

const FinalYearProjectApplicationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Personal Information
    student_name: '',
    email: '',
    phone: '',
    university: '',
    course_of_study: '',
    year_of_study: '',
    student_id: '',
    
    // Supervisor Information
    supervisor_name: '',
    supervisor_email: '',
    
    // Project Information
    project_title: '',
    project_description: '',
    project_type: '',
    research_area: '',
    methodology: '',
    expected_outcomes: '',
    timeline_weeks: '',
    required_resources: '',
    technical_requirements: '',
    preferred_supervisor_expertise: '',
    project_deadline: '',
    defense_date: '',
    university_requirements: '',
    additional_notes: ''
  });

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
      const response = await fetch('/api/fyp-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timeline_weeks: formData.timeline_weeks ? parseInt(formData.timeline_weeks) : null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast({
        title: "Success!",
        description: "Your final year project application has been submitted successfully.",
      });

      // Redirect to success page
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
      <section className="relative py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GraduationCap className="mx-auto h-16 w-16 text-amber-600 mb-6" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Final Year Project Application
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Get expert support for your final year project. Fill out the form below to begin your journey to academic success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-6 sm:p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Users className="h-6 w-6 text-amber-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        type="email" 
                        id="email" 
                        required 
                        value={formData.email} 
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        type="tel" 
                        id="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleInputChange}
                        placeholder="+260 XXX XXX XXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student_id">Student ID</Label>
                      <Input 
                        id="student_id" 
                        value={formData.student_id} 
                        onChange={handleInputChange}
                        placeholder="Your university student ID"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <GraduationCap className="h-6 w-6 text-amber-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Academic Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="university">University *</Label>
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
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                          <SelectItem value="5">5th Year</SelectItem>
                          <SelectItem value="masters">Masters</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Supervisor Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Users className="h-6 w-6 text-amber-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Supervisor Information (Optional)</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="supervisor_name">Supervisor Name</Label>
                      <Input 
                        id="supervisor_name" 
                        value={formData.supervisor_name} 
                        onChange={handleInputChange}
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supervisor_email">Supervisor Email</Label>
                      <Input 
                        type="email" 
                        id="supervisor_email" 
                        value={formData.supervisor_email} 
                        onChange={handleInputChange}
                        placeholder="supervisor@university.edu"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <FileText className="h-6 w-6 text-amber-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Project Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project_title">Project Title</Label>
                      <Input
                        id="project_title"
                        value={formData.project_title}
                        onChange={handleInputChange}
                        placeholder="Enter your project title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project_description">Project Description</Label>
                      <Textarea
                        id="project_description"
                        value={formData.project_description}
                        onChange={handleInputChange}
                        placeholder="Provide a detailed description of your project"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project_type">Project Type *</Label>
                        <Select
                          value={formData.project_type}
                          onValueChange={(value) => handleSelectChange('project_type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="research">Research</SelectItem>
                            <SelectItem value="development">Development</SelectItem>
                            <SelectItem value="analysis">Analysis</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="research_area">Research Area</Label>
                        <Input
                          id="research_area"
                          value={formData.research_area}
                          onChange={handleInputChange}
                          placeholder="e.g., Machine Learning, Web Development"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="methodology">Methodology</Label>
                      <Textarea
                        id="methodology"
                        value={formData.methodology}
                        onChange={handleInputChange}
                        placeholder="Describe your research methodology or approach"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expected_outcomes">Expected Outcomes</Label>
                      <Textarea
                        id="expected_outcomes"
                        value={formData.expected_outcomes}
                        onChange={handleInputChange}
                        placeholder="What do you expect to achieve from this project?"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline and Resources Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Calendar className="h-6 w-6 text-amber-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Timeline & Resources</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeline_weeks">Timeline (Weeks)</Label>
                      <Input
                        type="number"
                        id="timeline_weeks"
                        value={formData.timeline_weeks}
                        onChange={handleInputChange}
                        placeholder="12"
                        min="1"
                        max="52"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project_deadline">Project Deadline</Label>
                      <Input
                        type="date"
                        id="project_deadline"
                        value={formData.project_deadline}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="defense_date">Defense Date</Label>
                      <Input
                        type="date"
                        id="defense_date"
                        value={formData.defense_date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="required_resources">Required Resources</Label>
                      <Textarea
                        id="required_resources"
                        value={formData.required_resources}
                        onChange={handleInputChange}
                        placeholder="List any specific resources, tools, or equipment needed"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="technical_requirements">Technical Requirements</Label>
                      <Textarea
                        id="technical_requirements"
                        value={formData.technical_requirements}
                        onChange={handleInputChange}
                        placeholder="Specify any technical requirements or software needed"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferred_supervisor_expertise">Preferred Supervisor Expertise</Label>
                      <Input
                        id="preferred_supervisor_expertise"
                        value={formData.preferred_supervisor_expertise}
                        onChange={handleInputChange}
                        placeholder="What expertise should your supervisor have?"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <FileText className="h-6 w-6 text-amber-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="university_requirements">University Requirements</Label>
                      <Textarea
                        id="university_requirements"
                        value={formData.university_requirements}
                        onChange={handleInputChange}
                        placeholder="Any specific requirements from your university"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additional_notes">Additional Notes</Label>
                      <Textarea
                        id="additional_notes"
                        value={formData.additional_notes}
                        onChange={handleInputChange}
                        placeholder="Any additional information you'd like to share"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-5 w-5 rounded-full bg-amber-600 flex items-center justify-center">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      By submitting this application, you agree to our terms and conditions and
                      consent to being contacted regarding your final year project support.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Submitting Application..." : "Submit Final Year Project Application"}
                  </Button>
                </div>

                <Toaster />
              </form>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FinalYearProjectApplicationForm;
