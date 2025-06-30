'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  Calendar, 
  Award, 
  BookOpen, 
  Target,
  ChevronRight,
  Star,
  CheckCircle
} from 'lucide-react';

interface RefresherCourse {
  course_id: number;
  title: string;
  description: string;
  duration_months: number;
  price: number;
  department: string;
  category: 'adults' | 'kids';
  image_url: string;
  program_type: string;
  num_lectures: number;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  languages: string;
  class_days: string;
  course_code: string;
  total_enrollments?: number;
  gallery_images?: string;
}

const RefresherCoursesPage = () => {
  const [courses, setCourses] = useState<RefresherCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRefresherCourses();
  }, []);

  const fetchRefresherCourses = async () => {
    try {
      const response = await fetch('/api/courses/refresher');
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.error('Error fetching refresher courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Calendar,
      title: "Flexible Schedules",
      description: "Evening and weekend classes to fit your busy lifestyle"
    },
    {
      icon: Award,
      title: "Hands-on Projects",
      description: "Real-world projects and certification upon completion"
    },
    {
      icon: Users,
      title: "Mentor-Guided Labs",
      description: "Expert mentors to guide you through practical exercises"
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Assessment and progress tracking throughout your journey"
    }
  ];

  const availableCourses = [
    "Data Science Bootcamp",
    "Cybersecurity Fundamentals & Practice", 
    "Networking Essentials (Cisco-based)",
    "Web & Mobile App Development (Frontend & Backend)",
    "Machine Learning & AI for Beginners",
    "Cloud Computing & DevOps Intro"
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading refresher courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-background border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Refresher Course Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Designed for graduates and professionals who wish to sharpen or update their
              ICT-related skills through practical, hands-on training.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="#courses">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                  Explore Courses
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#apply">
                <Button variant="outline" size="lg">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">🛠 Platform Features</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to refresh and advance your ICT skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Offered Section */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Courses Offered</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive programs designed to update your skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{course}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Hands-on training with industry-relevant projects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Courses */}
      <section id="courses" className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Available Refresher Courses</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose from our current refresher course offerings
            </p>
          </div>
          
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.course_id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary">{course.skill_level}</Badge>
                      <Badge variant="outline">Refresher</Badge>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-amber-600" />
                        {course.duration_months} months
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-amber-600" />
                        {course.num_lectures} lectures
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-amber-600" />
                        {course.class_days}
                      </div>
                      {course.total_enrollments && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-amber-600" />
                          {course.total_enrollments} enrolled
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-2xl font-bold text-amber-600">
                        K {course.price}
                      </span>
                      <Link href={`/refresher/${course.course_id}`}>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          Learn More
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No Refresher Courses Available
              </h3>
              <p className="text-muted-foreground">
                Check back soon for new refresher course offerings.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to refresh your skills and dive back into ICT?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who have advanced their careers through our refresher programs.
          </p>
          <Link href="/apply?program=refresher">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              Apply for Refresher Course
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RefresherCoursesPage;
