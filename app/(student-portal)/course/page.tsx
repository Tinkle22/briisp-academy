'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const enrolledCourses = [
  {
    id: '1',
    name: 'Object Oriented Programming',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Fundamentals of Database Systems',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
  },
];

const recommendedCourses = [
  {
    id: '3',
    name: 'Advanced Web Development',
    duration: '12 weeks',
    totalStudents: 120,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80',

  },
  {
    id: '4',
    name: 'Machine Learning Fundamentals',
    duration: '16 weeks',
    totalStudents: 85,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=600&q=80',

  },
  {
    id: '5',
    name: 'Cloud Computing',
    duration: '10 weeks',
    totalStudents: 95,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',

  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">My Courses</h1>
        <p className="text-muted-foreground mt-2">
          Track your progress and explore new learning opportunities
        </p>
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Currently Enrolled</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="aspect-video w-full">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                  <Link href={`/courses/${course.id}`}>
                    Course Material
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Other Courses</h2>
          <Button variant="link" className="text-amber-600">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="aspect-video w-full">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{course.name}</h3>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <Clock className="h-5 w-5 mx-auto text-amber-600 mb-1" />
                    <p className="text-xs text-muted-foreground">{course.duration}</p>
                  </div>
                </div>

                

                <Button variant="outline" className="w-full group" asChild>
                  <Link href={`/courses/${course.id}`}>
                    Apply
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}