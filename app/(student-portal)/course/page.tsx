"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface Course {
  course_id: number;
  title: string;
  description: string;
  duration_months: number;
  department: string;
  image_url: string;
  total_students?: number;
  success_rate?: number;
}

interface Enrollment {
  enrollment_id: number;
  status: string;
  course: Course;
}

const truncateDescription = (description: string, wordLimit: number = 20) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

export default function CoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<Enrollment[]>([]);
  const [suggestedCourses, setSuggestedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch enrolled courses
        const enrollmentsResponse = await fetch("/api/enrollments", {
          credentials: "include",
        });

        if (!enrollmentsResponse.ok) {
          throw new Error("Failed to fetch enrollments");
        }

        const enrollmentsData = await enrollmentsResponse.json();
        setEnrolledCourses(enrollmentsData);

        // Fetch suggested courses if there are enrolled courses
        if (enrollmentsData.length > 0) {
          const department = enrollmentsData[0].course.department;
          const suggestedResponse = await fetch(
            `/api/courses/suggested?department=${department}`
          );

          if (!suggestedResponse.ok) {
            throw new Error("Failed to fetch suggested courses");
          }

          const suggestedData = await suggestedResponse.json();
          // Filter out courses that the user is already enrolled in
          const filteredSuggestions = suggestedData.filter(
            (course: Course) =>
              !enrollmentsData.some(
                (enrollment: Enrollment) =>
                  enrollment.course.course_id === course.course_id
              )
          );
          setSuggestedCourses(filteredSuggestions);
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {enrolledCourses.map((enrollment) => (
            <Card
              key={enrollment.enrollment_id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video w-full h-40">
                <img
                  src={enrollment.course.image_url || "/placeholder-course.jpg"}
                  alt={enrollment.course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold line-clamp-1">
                    {enrollment.course.title}
                  </h3>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs whitespace-nowrap">
                    {enrollment.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 mb-3 line-clamp-2">
                  {truncateDescription(enrollment.course.description, 15)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {enrollment.course.duration_months} months
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-amber-600 hover:text-amber-700 p-0"
                    asChild
                  >
                    <Link
                      href={`/course/${enrollment.course.course_id}/materials`}
                    >
                      View Material
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested Courses */}
      {suggestedCourses.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recommended Courses</h2>
            <Button variant="link" className="text-amber-600">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {suggestedCourses.map((course) => (
              <Card
                key={course.course_id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video w-full h-40">
                  <img
                    src={course.image_url || "/placeholder-course.jpg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-2 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {truncateDescription(course.description, 15)}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="flex items-center justify-center text-center bg-amber-50 rounded-lg py-1">
                      <div>
                        <Clock className="h-4 w-4 mx-auto text-amber-600" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {course.duration_months}m
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-center bg-amber-50 rounded-lg py-1">
                      <div>
                        <Users className="h-4 w-4 mx-auto text-amber-600" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {course.total_students || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-center bg-amber-50 rounded-lg py-1">
                      <div>
                        <Star className="h-4 w-4 mx-auto text-amber-600" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round((course.success_rate || 0) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group"
                    asChild
                  >
                    <Link href={`/courses/${course.course_id}`}>
                      Learn More
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
