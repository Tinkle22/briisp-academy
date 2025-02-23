'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, Calendar, Clock, Globe } from 'lucide-react';
import {  SiCisco, SiPython, SiAdobecreativecloud, SiKalilinux, SiReact, SiAndroid, SiUnity } from 'react-icons/si';
import { GiAutoRepair, GiDeliveryDrone } from 'react-icons/gi';
import { FaDatabase } from "react-icons/fa";
import Link from 'next/link';

const programs = [
  {
    id: '01',
    name: 'Software Development',
    description: 'Web, mobile, and game development using modern technologies.',
    icon: SiReact,
    color: 'bg-blue-500',
    courses: ['Full-stack Web Development', 'Mobile App Development', 'Game Development with Unity'],
  },
  {
    id: '02',
    name: 'Database & Analytics',
    description: 'Database management, data analytics, and business intelligence.',
    icon: FaDatabase ,
    color: 'bg-orange-500',
    courses: ['Database Administration', 'Data Analytics', 'Business Intelligence'],
  },
  {
    id: '03',
    name: 'Networking & Security',
    description: 'Computer networking, cybersecurity, and system administration.',
    icon: SiCisco,
    color: 'bg-emerald-500',
    courses: ['Network Administration', 'Cybersecurity', 'Cloud Computing'],
  },
  {
    id: '04',
    name: 'Design & Multimedia',
    description: 'Graphic design, UI/UX, and digital content creation.',
    icon: SiAdobecreativecloud,
    color: 'bg-pink-500',
    courses: ['Graphic Design', 'UI/UX Design', 'Digital Marketing'],
  },
  {
    id: '05',
    name: 'Robotics & Automation',
    description: 'Industrial automation, robotics programming, and IoT.',
    icon: GiAutoRepair,
    color: 'bg-purple-500',
    courses: ['Industrial Automation', 'Robotics Programming', 'IoT Development'],
  },
  {
    id: '06',
    name: 'Drone Technology',
    description: 'Drone operation, maintenance, and aerial photography.',
    icon: GiDeliveryDrone,
    color: 'bg-cyan-500',
    courses: ['Drone Piloting', 'Drone Maintenance', 'Aerial Photography'],
  },
];

export default function AdultsAdmissionsPage() {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Banner */}
      <div className="bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 text-center">
          <p className="text-sm sm:text-base font-medium">
            🎓 Professional Certification Programs - Enrollment Open for {new Date().getFullYear()} Batch
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Professional training"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Professional Training Programs
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto">
              Industry-focused training to advance your career in technology
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
              title: 'Flexible Learning',
              description: 'Evening and weekend classes available',
            },
            {
              icon: Clock,
              title: 'Industry-Led Training',
              description: 'Learn from experienced professionals',
            },
            {
              icon: Globe,
              title: 'Career Support',
              description: 'Job placement assistance and internships',
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
          <h2 className="text-3xl font-bold mb-8">Professional Programs</h2>
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
                        <h4 className="font-medium mb-2">Available Courses:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {program.courses.map((course, index) => (
                            <li key={index}>{course}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {/* <Button variant="outline" asChild>
                          <Link href={`/programs/${program.id}`}>Learn More</Link>
                        </Button> */}
                        <Button className="bg-amber-600 hover:bg-amber-700" asChild>
                          <Link href="/apply">Apply Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Admission Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Choose Program',
                description: 'Select a program that aligns with your career goals.',
              },
              {
                step: '02',
                title: 'Submit Application',
                description: 'Complete the online application with required documents.',
              },
              {
                step: '03',
                title: 'Enrollment',
                description: 'Complete registration and begin your learning journey.',
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