import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { headers } from "next/headers";
import { truncateText } from '@/utils/truncate';

// Define the Course type based on your database schema
interface Course {
  course_id: number;
  title: string;
  description: string;
  duration_months: number;
  price: number;
  department: string;
  category: "kids" | "adults";
  image_url: string;
  program_type: string;
  num_lectures: number;
  skill_level: "beginner" | "intermediate" | "advanced";
  languages: string;
  class_days: string;
  course_code: string;
}

async function getKidsCourses(): Promise<Course[]> {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  try {
    const res = await fetch(`${protocol}://${host}/api/courses/kids`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching kids courses:", error);
    return [];
  }
}

export default async function KidsPrograms() {
  const courses = await getKidsCourses();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Kids Program (Weekend Program)</h2>
          <Link
            href="/courses"
            className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            View All Programs <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.course_id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-video relative">
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-col space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    {course.program_type}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {course.class_days}
                  </p>
                </div>

                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>

                <div
                  className="text-muted-foreground mb-4 flex-1"
                  dangerouslySetInnerHTML={{
                    __html: truncateText(course.description, 30),
                  }}
                />

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                    #{course.skill_level}
                  </span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                    #{course.department}
                  </span>
                </div>

                <Button
                  asChild
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <Link href={`/${course.program_type}/${course.course_id}`}>Read More</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
