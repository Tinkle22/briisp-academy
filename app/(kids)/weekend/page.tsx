"use client"

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import AccommodationCard from '@/components/accommodation-card';
import { truncateText } from '@/utils/truncate';

interface Course {
  course_id: string;
  image_url: string;
  title: string;
  duration_months: number;
  description: string;
  price: number;
  course_code: string;
}

const Weekend = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses/weekend?program_type=weekend');
      const data = await response.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Weekend Programs
          </h1>
          <p className="text-lg text-muted-foreground">
            Intensive professional courses designed to kickstart your career
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Grid */}
          <div className="lg:flex-1">
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.course_id} className="overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-amber-600 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration_months} months</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                    <div
                      className="text-muted-foreground mb-4 flex-1"
                      dangerouslySetInnerHTML={{
                        __html: truncateText(course.description, 30),
                      }}
                    />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-amber-600">
                        K {course.price}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-amber-600 hover:bg-amber-700 group"
                        asChild
                      >
                        <Link href={`/apply?program=${course.course_code}`}>
                          Apply
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        asChild
                      >
                        <Link href={`/weekend/${course.course_id}`}>
                          View More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-6">
              <AccommodationCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weekend;