'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Users, BookOpen, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const iconMap = {
  Clock,
  Users,
  BookOpen,
  Calendar,
};

interface CourseDetailsProps {
  course: any; // Type this properly based on your course structure
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="max-w-3xl mx-auto px-6 text-center text-white">
              {/* <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg opacity-90">{course.subtitle}</p> */}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {course.stats.map((stat: any, index: number) => {
                const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
                return (
                  <Card key={index} className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 rounded-lg bg-emerald-600/10 mb-2">
                        <IconComponent className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="font-semibold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6 border-b">
              {['overview', 'curriculum'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-amber-600 text-amber-600'
                      : 'text-muted-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                  <div
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Highlights</h2>
                  <div className="grid gap-3">
                    {course.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum.map((section: any, index: number) => (
                    <Card key={index} className="p-6">
                      <h3 className="font-semibold mb-3">{section.week}</h3>
                      <ul className="space-y-2">
                        {section.topics.map((topic: string, topicIndex: number) => (
                          <li key={topicIndex} className="flex items-center gap-2 text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6 sticky top-6">
              <div className="text-3xl font-bold text-amber-600 mb-4">
                {course.price}
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span>{course.duration}</span>
                </div>
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 group" asChild>
                <Link href="/apply">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 