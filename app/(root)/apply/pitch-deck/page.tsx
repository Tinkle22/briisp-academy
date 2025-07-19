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
import { Rocket, Building2, Users, DollarSign, FileText, Calendar } from 'lucide-react';

const PitchDeckApplicationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Applicant Information
    applicant_name: '',
    email: '',
    phone: '',
    
    // Business Information
    company_name: '',
    industry: '',
    funding_stage: '',
    funding_amount: '',
    business_description: '',
    target_audience: '',
    current_traction: '',
    team_size: '',
    previous_funding: false,
    
    // Project Requirements
    pitch_deadline: '',
    specific_requirements: '',
    preferred_start_date: '',
    budget_range: '',
    referral_source: '',
    
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
      const response = await fetch('/api/pitch-deck-applications', {
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
        description: "Your pitch deck application has been submitted successfully.",
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
      <section className="relative py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Rocket className="mx-auto h-16 w-16 text-amber-600 mb-6" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Pitch Deck Application
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Get expert help creating a compelling pitch deck that attracts investors and secures funding for your startup.
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
                    <Users className="h-6 w-6 text-amber-600" />
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
                  </div>
                </div>

                {/* Business Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Building2 className="h-6 w-6 text-amber-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name</Label>
                      <Input 
                        id="company_name" 
                        value={formData.company_name} 
                        onChange={handleInputChange}
                        placeholder="Your startup name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input 
                        id="industry" 
                        value={formData.industry} 
                        onChange={handleInputChange}
                        placeholder="e.g., FinTech, HealthTech, EdTech"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="funding_stage">Funding Stage *</Label>
                      <Select
                        value={formData.funding_stage}
                        onValueChange={(value) => handleSelectChange('funding_stage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select funding stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                          <SelectItem value="seed">Seed</SelectItem>
                          <SelectItem value="series-a">Series A</SelectItem>
                          <SelectItem value="series-b">Series B</SelectItem>
                          <SelectItem value="later-stage">Later Stage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="funding_amount">Funding Amount Seeking</Label>
                      <Input 
                        id="funding_amount" 
                        value={formData.funding_amount} 
                        onChange={handleInputChange}
                        placeholder="e.g., $100K, $1M, $5M"
                      />
                    </div>
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
                      <Label htmlFor="business_description">Business Description *</Label>
                      <Textarea
                        id="business_description"
                        required
                        value={formData.business_description}
                        onChange={handleInputChange}
                        placeholder="Describe your business, the problem you solve, and your solution"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="target_audience">Target Audience</Label>
                      <Textarea
                        id="target_audience"
                        value={formData.target_audience}
                        onChange={handleInputChange}
                        placeholder="Who are your customers? Describe your target market"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="current_traction">Current Traction</Label>
                      <Textarea
                        id="current_traction"
                        value={formData.current_traction}
                        onChange={handleInputChange}
                        placeholder="Revenue, users, partnerships, or other metrics that show progress"
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="previous_funding"
                        checked={formData.previous_funding}
                        onCheckedChange={(checked) => handleCheckboxChange('previous_funding', checked as boolean)}
                      />
                      <Label htmlFor="previous_funding">We have received previous funding</Label>
                    </div>
                  </div>
                </div>

                {/* Project Requirements Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <DollarSign className="h-6 w-6 text-amber-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Project Requirements</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget_range">Budget Range *</Label>
                      <Select
                        value={formData.budget_range}
                        onValueChange={(value) => handleSelectChange('budget_range', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic ($500 - $1,500)</SelectItem>
                          <SelectItem value="standard">Standard ($1,500 - $3,000)</SelectItem>
                          <SelectItem value="premium">Premium ($3,000 - $5,000)</SelectItem>
                          <SelectItem value="enterprise">Enterprise ($5,000+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pitch_deadline">Pitch Deadline</Label>
                      <Input
                        type="date"
                        id="pitch_deadline"
                        value={formData.pitch_deadline}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferred_start_date">Preferred Start Date</Label>
                      <Input
                        type="date"
                        id="preferred_start_date"
                        value={formData.preferred_start_date}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referral_source">How did you hear about us?</Label>
                      <Select
                        value={formData.referral_source}
                        onValueChange={(value) => handleSelectChange('referral_source', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select referral source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Search</SelectItem>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="referral">Friend/Colleague Referral</SelectItem>
                          <SelectItem value="event">Event/Conference</SelectItem>
                          <SelectItem value="website">Our Website</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="specific_requirements">Specific Requirements</Label>
                      <Textarea
                        id="specific_requirements"
                        value={formData.specific_requirements}
                        onChange={handleInputChange}
                        placeholder="Any specific requirements, design preferences, or special considerations for your pitch deck"
                        rows={4}
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
                      <Label htmlFor="additional_notes">Additional Notes</Label>
                      <Textarea
                        id="additional_notes"
                        value={formData.additional_notes}
                        onChange={handleInputChange}
                        placeholder="Any additional information you'd like to share about your startup or pitch deck needs"
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
                      consent to being contacted regarding your pitch deck project.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Submitting Application..." : "Submit Pitch Deck Application"}
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

export default PitchDeckApplicationForm;
