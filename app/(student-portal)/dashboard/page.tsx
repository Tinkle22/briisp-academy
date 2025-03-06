'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';


const enrolledCourses = [
  {
    name: 'Object Oriented Programming',

  },
  {
    name: 'Fundamentals of Database Systems',

  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
        <p className="text-sm opacity-80">September 4, 2023</p>
        <h1 className="mt-2 text-2xl font-semibold">Welcome back, John!</h1>
        <p className="mt-1 opacity-90">Always stay updated in your student portal</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Finance Section */}
        <div className="space-y-6">
 

          {/* Enrolled Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Enrolled Courses</h2>
              <Button variant="link" className="text-amber-600">
                See all
              </Button>
            </div>
            <div className="grid gap-4">
              {enrolledCourses.map((course) => (
                <Card key={course.name} className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">

                      <div>
                        <h3 className="font-medium">{course.name}</h3>
                        {/* <div className="mt-1 h-2 w-32 rounded-full">
                        </div> */}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Daily Notice */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Daily Notice</h2>
              <Bell className="h-5 w-5 text-amber-600" />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Prelim payment due</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Exam Schedule</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nunc volutpat libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}