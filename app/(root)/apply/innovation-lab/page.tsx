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
import { Checkbox } from '@/components/ui/checkbox';
import { Cpu, Users, Lightbulb, Target, Wrench, Calendar } from 'lucide-react';

const InnovationLabApplicationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Applicant Information
    applicant_name: '',
    email: '',
    phone: '',
    university_organization: '',
    
    // Project Details
    project_title: '',
    idea_description: '',
    innovation_type: '',
    development_stage: '',
    problem_statement: '',
    solution_approach: '',
    target_market: '',
    
    // Technical Requirements
    software_needs: '',
    hardware_needs: '',
    technologies_involved: '',
    technical_expertise_required: '',
    
    // Timeline and Goals
    project_duration: '',
    expected_outcomes: '',
    success_metrics: '',
    project_deadline: '',
    
    // Team Information
    team_size: '',
    team_member_roles: '',
    team_experience: '',
    previous_projects: '',
    
    // Resource Requirements
    lab_access_needs: '',
    equipment_requirements: '',
    funding_requirements: '',
    mentorship_needs: '',
    collaboration_interests: false,
    
    // Additional Information
    additional_notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/innovation-lab-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          team_size: formData.team_size ? parseInt(formData.team_size) : null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      toast({
        title: "Success!",
        description: "Your innovation lab application has been submitted successfully.",
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
      <section className="relative py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Cpu className="mx-auto h-16 w-16 text-blue-600 mb-6" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Innovation Lab Application
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Join our innovation lab and transform your breakthrough ideas into reality with cutting-edge technology and expert mentorship.
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
                {/* Applicant Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Users className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Applicant Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicant_name">Full Name *</Label>
                      <Input 
                        id="applicant_name" 
                        required 
                        value={formData.applicant_name} 
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
                      <Label htmlFor="university_organization">University/Organization *</Label>
                      <Input 
                        id="university_organization" 
                        required 
                        value={formData.university_organization} 
                        onChange={handleInputChange}
                        placeholder="Your institution or organization"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project_title">Project Title *</Label>
                      <Input 
                        id="project_title" 
                        required 
                        value={formData.project_title} 
                        onChange={handleInputChange}
                        placeholder="Name of your innovation project"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="innovation_type">Innovation Type *</Label>
                      <Select
                        value={formData.innovation_type}
                        onValueChange={(value) => handleSelectChange('innovation_type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select innovation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="software">Software/App Development</SelectItem>
                          <SelectItem value="hardware">Hardware/IoT Device</SelectItem>
                          <SelectItem value="ai-ml">AI/Machine Learning</SelectItem>
                          <SelectItem value="biotech">Biotechnology</SelectItem>
                          <SelectItem value="fintech">Financial Technology</SelectItem>
                          <SelectItem value="edtech">Educational Technology</SelectItem>
                          <SelectItem value="cleantech">Clean Technology</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="development_stage">Development Stage *</Label>
                      <Select
                        value={formData.development_stage}
                        onValueChange={(value) => handleSelectChange('development_stage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select current stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idea">Idea/Concept</SelectItem>
                          <SelectItem value="research">Research Phase</SelectItem>
                          <SelectItem value="prototype">Early Prototype</SelectItem>
                          <SelectItem value="testing">Testing Phase</SelectItem>
                          <SelectItem value="refinement">Refinement/Iteration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="idea_description">Project Description *</Label>
                      <Textarea
                        id="idea_description"
                        required
                        value={formData.idea_description}
                        onChange={handleInputChange}
                        placeholder="Describe your innovation idea, what it does, and how it works"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="problem_statement">Problem Statement</Label>
                      <Textarea
                        id="problem_statement"
                        value={formData.problem_statement}
                        onChange={handleInputChange}
                        placeholder="What problem does your innovation solve?"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="solution_approach">Solution Approach</Label>
                      <Textarea
                        id="solution_approach"
                        value={formData.solution_approach}
                        onChange={handleInputChange}
                        placeholder="How does your innovation solve the problem?"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="target_market">Target Market</Label>
                      <Textarea
                        id="target_market"
                        value={formData.target_market}
                        onChange={handleInputChange}
                        placeholder="Who are your target users or customers?"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Requirements Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Wrench className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Technical Requirements</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="technologies_involved">Technologies Involved</Label>
                      <Textarea
                        id="technologies_involved"
                        value={formData.technologies_involved}
                        onChange={handleInputChange}
                        placeholder="List the technologies, programming languages, frameworks, or tools you plan to use"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="software_needs">Software Requirements</Label>
                      <Textarea
                        id="software_needs"
                        value={formData.software_needs}
                        onChange={handleInputChange}
                        placeholder="Describe any specific software, licenses, or development tools you need"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hardware_needs">Hardware Requirements</Label>
                      <Textarea
                        id="hardware_needs"
                        value={formData.hardware_needs}
                        onChange={handleInputChange}
                        placeholder="List any hardware, equipment, or devices needed for your project"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="technical_expertise_required">Technical Expertise Required</Label>
                      <Textarea
                        id="technical_expertise_required"
                        value={formData.technical_expertise_required}
                        onChange={handleInputChange}
                        placeholder="What technical skills or expertise do you need support with?"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline and Goals Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Target className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Timeline and Goals</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project_duration">Project Duration</Label>
                      <Select
                        value={formData.project_duration}
                        onValueChange={(value) => handleSelectChange('project_duration', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3-months">1-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="6-12-months">6-12 months</SelectItem>
                          <SelectItem value="12-months-plus">12+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project_deadline">Target Completion Date</Label>
                      <Input
                        type="date"
                        id="project_deadline"
                        value={formData.project_deadline}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="expected_outcomes">Expected Outcomes</Label>
                      <Textarea
                        id="expected_outcomes"
                        value={formData.expected_outcomes}
                        onChange={handleInputChange}
                        placeholder="What do you expect to achieve by the end of this project?"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="success_metrics">Success Metrics</Label>
                      <Textarea
                        id="success_metrics"
                        value={formData.success_metrics}
                        onChange={handleInputChange}
                        placeholder="How will you measure the success of your project?"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Team Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Users className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Team Information</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="team_size">Team Size</Label>
                      <Input
                        type="number"
                        id="team_size"
                        value={formData.team_size}
                        onChange={handleInputChange}
                        placeholder="Number of team members"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="team_member_roles">Team Member Roles</Label>
                      <Textarea
                        id="team_member_roles"
                        value={formData.team_member_roles}
                        onChange={handleInputChange}
                        placeholder="List team members and their roles (e.g., Lead Developer, UI/UX Designer, etc.)"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="team_experience">Team Experience</Label>
                      <Textarea
                        id="team_experience"
                        value={formData.team_experience}
                        onChange={handleInputChange}
                        placeholder="Describe the relevant experience and skills of your team members"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="previous_projects">Previous Projects</Label>
                      <Textarea
                        id="previous_projects"
                        value={formData.previous_projects}
                        onChange={handleInputChange}
                        placeholder="List any previous projects or innovations your team has worked on"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Resource Requirements Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Resource Requirements</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lab_access_needs">Lab Access Needs</Label>
                      <Textarea
                        id="lab_access_needs"
                        value={formData.lab_access_needs}
                        onChange={handleInputChange}
                        placeholder="What type of lab access do you need? (e.g., AI/ML lab, IoT lab, general workspace)"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="equipment_requirements">Equipment Requirements</Label>
                      <Textarea
                        id="equipment_requirements"
                        value={formData.equipment_requirements}
                        onChange={handleInputChange}
                        placeholder="List any specific equipment or tools you need access to"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="funding_requirements">Funding Requirements</Label>
                      <Textarea
                        id="funding_requirements"
                        value={formData.funding_requirements}
                        onChange={handleInputChange}
                        placeholder="Describe any funding needs for your project (materials, licenses, etc.)"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mentorship_needs">Mentorship Needs</Label>
                      <Textarea
                        id="mentorship_needs"
                        value={formData.mentorship_needs}
                        onChange={handleInputChange}
                        placeholder="What areas would you like mentorship or guidance in?"
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="collaboration_interests"
                        checked={formData.collaboration_interests}
                        onCheckedChange={(checked) => handleCheckboxChange('collaboration_interests', checked as boolean)}
                      />
                      <Label htmlFor="collaboration_interests">I'm interested in collaborating with other lab members</Label>
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Additional Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="additional_notes">Additional Notes</Label>
                      <Textarea
                        id="additional_notes"
                        value={formData.additional_notes}
                        onChange={handleInputChange}
                        placeholder="Any additional information you'd like to share about your project or requirements"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      By submitting this application, you agree to our terms and conditions and
                      consent to being contacted regarding your innovation lab application.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Submitting Application..." : "Submit Innovation Lab Application"}
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

export default InnovationLabApplicationForm;
