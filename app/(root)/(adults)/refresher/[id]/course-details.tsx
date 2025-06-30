'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Users, 
  Calendar, 
  Award, 
  BookOpen, 
  Download,
  ChevronRight,
  Star,
  CheckCircle,
  Target,
  Lightbulb,
  UserCheck
} from 'lucide-react';

interface Course {
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

interface Curriculum {
  curriculum_id: number;
  course_id: number;
  week_number: number;
  topic: string;
  content: string;
  learning_objectives?: string;
}

interface Material {
  file_id: number;
  file_name: string;
  file_url: string;
  file_type?: string;
  file_size?: number;
  description?: string;
  upload_date: string;
}

interface RefresherCourseDetailsProps {
  course: Course;
  curriculum: Curriculum[];
  materials: Material[];
}

const RefresherCourseDetails = ({ course, curriculum, materials }: RefresherCourseDetailsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const refresherFeatures = [
    {
      icon: Calendar,
      title: "Flexible Learning Schedules",
      description: "Evening and weekend classes designed for working professionals"
    },
    {
      icon: Award,
      title: "Hands-on Projects & Certification",
      description: "Real-world projects with industry certification upon completion"
    },
    {
      icon: UserCheck,
      title: "Mentor-Guided Labs",
      description: "Expert mentors provide personalized guidance throughout your learning journey"
    },
    {
      icon: Target,
      title: "Assessment & Progress Tracking",
      description: "Regular assessments and detailed progress tracking to monitor your advancement"
    }
  ];

  const skillBenefits = [
    "Update your skills with latest industry practices",
    "Hands-on experience with modern tools and technologies", 
    "Industry-recognized certification",
    "Networking opportunities with professionals",
    "Career advancement support",
    "Flexible learning pace"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-background border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary">
                  Refresher Course
                </Badge>
                <Badge variant="outline">
                  {course.skill_level}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration_months} months</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{course.num_lectures} lectures</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{course.class_days}</span>
                </div>
                {course.total_enrollments && (
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{course.total_enrollments} enrolled</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-amber-600">K {course.price}</span>
                <Link href={`/apply?program=refresher&course=${course.course_id}`}>
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                    Apply Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:text-right">
              {course.image_url && (
                <img 
                  src={course.image_url} 
                  alt={course.title}
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
                        Course Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-6">{course.description}</p>
                      
                      <h3 className="text-lg font-semibold mb-4">What You'll Gain:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {skillBenefits.map((benefit, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <span className="font-medium">Course Code:</span>
                        <p className="text-muted-foreground">{course.course_code}</p>
                      </div>
                      <div>
                        <span className="font-medium">Department:</span>
                        <p className="text-muted-foreground">{course.department}</p>
                      </div>
                      <div>
                        <span className="font-medium">Languages:</span>
                        <p className="text-muted-foreground">{course.languages}</p>
                      </div>
                      <div>
                        <span className="font-medium">Skill Level:</span>
                        <Badge variant="outline" className="ml-2">{course.skill_level}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    Detailed week-by-week breakdown of the course content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {curriculum.length > 0 ? (
                    <div className="space-y-6">
                      {curriculum.map((week) => (
                        <div key={week.curriculum_id} className="border-l-4 border-blue-500 pl-6 pb-6">
                          <div className="flex items-center mb-2">
                            <Badge variant="outline" className="mr-3">
                              Week {week.week_number}
                            </Badge>
                            <h3 className="text-lg font-semibold">{week.topic}</h3>
                          </div>
                          <p className="text-muted-foreground mb-3">{week.content}</p>
                          {week.learning_objectives && (
                            <div>
                              <h4 className="font-medium mb-2">Learning Objectives:</h4>
                              <p className="text-sm text-muted-foreground">{week.learning_objectives}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Curriculum details will be available soon.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {refresherFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <feature.icon className="h-8 w-8 text-amber-600" />
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="materials" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Materials</CardTitle>
                  <CardDescription>
                    Downloadable resources and materials for this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {materials.length > 0 ? (
                    <div className="space-y-4">
                      {materials.map((material) => (
                        <div key={material.file_id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Download className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">{material.file_name}</h4>
                              {material.description && (
                                <p className="text-sm text-muted-foreground">{material.description}</p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                Uploaded: {new Date(material.upload_date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={material.file_url} download>
                              Download
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Download className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Course materials will be available after enrollment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to refresh your skills?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join this refresher course and advance your ICT career with updated skills and hands-on experience.
          </p>
          <Link href={`/apply?program=refresher&course=${course.course_id}`}>
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              Apply for This Course
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RefresherCourseDetails;
