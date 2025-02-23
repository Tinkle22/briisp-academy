'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Rocket, Notebook as Robot, Code, Brain, ChevronDown, Calendar, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

const programs = [
  {
    id: '01',
    name: 'Space Science',
    description: 'Explore the wonders of space, learn about planets, stars, and space exploration.',
    icon: Rocket,
    color: 'bg-purple-500',
  },
  {
    id: '02',
    name: 'Robotics',
    description: 'Build and program robots, learn about mechanics and automation.',
    icon: Robot,
    color: 'bg-blue-500',
  },
  {
    id: '03',
    name: 'Coding',
    description: 'Learn programming fundamentals through fun, interactive projects.',
    icon: Code,
    color: 'bg-emerald-500',
  },
  {
    id: '04',
    name: 'Artificial Intelligence',
    description: 'Discover the basics of AI and machine learning through hands-on activities.',
    icon: Brain,
    color: 'bg-orange-500',
  },
];

export default function KidsAdmissionsPage() {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Banner */}
      <div className="bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 text-center">
          <p className="text-sm sm:text-base font-medium">
            🎉 Early Bird Registration Now Open for {new Date().getFullYear()}! Limited Spots Available
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
          alt="Kids learning"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Kids Program {new Date().getFullYear()}
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto">
              Nurturing young minds through innovative STEM education
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Program Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Calendar,
              title: 'Flexible Schedule',
              description: 'Weekend and holiday programs available',
            },
            {
              icon: Clock,
              title: 'Convenient Timing',
              description: 'Morning and afternoon sessions',
            },
            {
              icon: Globe,
              title: 'Hybrid Learning',
              description: 'Both in-person and online classes',
            },
          ].map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-emerald-600/10">
                  <feature.icon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Programs Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Available Programs</h2>
          <div className="space-y-4">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
                  className="w-full"
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${program.color}`}>
                        <program.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{program.name}</h3>
                        <p className="text-sm text-muted-foreground">{program.description}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        expandedProgram === program.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {expandedProgram === program.id && (
                  <div className="px-6 pb-6 pt-2 border-t">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Schedule Options:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          <li>Weekend Program (Saturday & Sunday)</li>
                          <li>Holiday Program (Special Sessions)</li>
                          <li>Online Program (Flexible Timing)</li>
                        </ul>
                      </div>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                        <Link href="/apply">Apply Now</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div>
          <h2 className="text-3xl font-bold mb-8">How to Apply</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Choose a Program',
                description: 'Select the program that best matches your child\'s interests and age group.',
              },
              {
                step: '02',
                title: 'Submit Application',
                description: 'Fill out the online application form with your child\'s details and preferences.',
              },
              {
                step: '03',
                title: 'Complete Registration',
                description: 'Upon acceptance, complete the registration process and secure your child\'s spot.',
              },
            ].map((step) => (
              <Card key={step.step} className="p-6">
                <div className="text-4xl font-bold text-amber-600 mb-4">{step.step}</div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}