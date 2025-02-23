'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, Calendar, Users, Trophy, Code, Network, Shield, Smartphone, Gamepad, Database } from 'lucide-react';
import Link from 'next/link';

// Define the Course type
type Course = {
  course_id: number;
  name: string;
  description: string;
  duration: string;
  level: string; // Add other properties as needed
  // ... other properties ...
};

const ComputerSciencePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/getCourses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Computer Science"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Department of Computer Science
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto">
              Empowering students with cutting-edge technology education
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Department Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Department Overview</h2>
            <p className="text-muted-foreground mb-6">
              Our Computer Science department offers comprehensive programs designed to prepare students 
              for successful careers in technology. With state-of-the-art facilities and experienced faculty, 
              we provide hands-on learning experiences in software development, cybersecurity, artificial 
              intelligence, and more.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: Users, label: '500+ Students' },
                { icon: Trophy, label: 'Industry Partners' },
                { icon: Calendar, label: 'Flexible Schedule' },
              ].map((item, index) => (
                <Card key={index} className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/10">
                    <item.icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </Card>
              ))}
            </div>
          </div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admissions">Admission Requirements</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/faculty">Meet Our Faculty</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/research">Research Projects</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/facilities">Lab Facilities</Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Courses Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Our Courses</h2>
          <div className="grid grid-cols-1 gap-4">
            {courses.map((course) => (
              <Card key={course.course_id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedCourse(expandedCourse === course.course_id ? null : course.course_id)}
                  className="w-full"
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-blue-600/10">
                        <course.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{course.name}</h3>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        expandedCourse === course.course_id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {expandedCourse === course.course_id && (
                  <div className="px-6 pb-6 pt-2 border-t">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">{course.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Level</p>
                          <p className="text-sm text-muted-foreground">{course.level}</p>
                        </div>
                      </div>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                        <Link href={`/courses/${course.course_id}`}>Learn More</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-blue-50 dark:bg-blue-950">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-6">
              Join our Computer Science department and build your future in technology.
            </p>
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComputerSciencePage;