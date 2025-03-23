"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Video, 
  Music, 
  File, 
  Download, 
  ArrowLeft, 
  Calendar, 
  Clock 
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface CourseFile {
  file_id: number;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  description: string;
  upload_date: string;
}

interface Course {
  course_id: number;
  title: string;
  description: string;
  image_url: string;
}

export default function CourseMaterialsPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [materials, setMaterials] = useState<CourseFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseAndMaterials = async () => {
      try {
        // Fetch course details
        const courseResponse = await fetch(`/api/courses/${courseId}`);

        if (!courseResponse.ok) {
          throw new Error("Failed to fetch course details");
        }

        const courseData = await courseResponse.json();
        setCourse(courseData);

        // Fetch course materials
        const materialsResponse = await fetch(`/api/courses/${courseId}/materials`);

        if (!materialsResponse.ok) {
          throw new Error("Failed to fetch course materials");
        }

        const materialsData = await materialsResponse.json();
        setMaterials(materialsData);
      } catch (error) {
        console.error("Error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseAndMaterials();
    }
  }, [courseId]);

  const getFileIcon = (fileType: string) => {
    if (!fileType) return <File className="h-6 w-6" />;
    
    const type = fileType.toLowerCase();
    if (type.includes('pdf') || type.includes('doc') || type.includes('text')) {
      return <FileText className="h-6 w-6 text-blue-500" />;
    } else if (type.includes('video')) {
      return <Video className="h-6 w-6 text-red-500" />;
    } else if (type.includes('audio')) {
      return <Music className="h-6 w-6 text-purple-500" />;
    } else {
      return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round((bytes / Math.pow(1024, i))) + ' ' + sizes[i];
  };

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
    <div className="space-y-6">
      {/* Header with course info */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <Button variant="ghost" size="sm" className="mb-2" asChild>
          <Link href="/course">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{course?.title}</h1>
          {/* <p className="text-muted-foreground mt-2">{course?.description}</p> */}
        </div>
        
        {course?.image_url && (
          <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
            <img 
              src={course.image_url} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Materials section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center">
          Course Materials
        </h2>

        {materials.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No materials available for this course yet.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {materials.map((file) => (
              <Card key={file.file_id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getFileIcon(file.file_type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{file.file_name}</h3>
                    {file.description && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {file.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDistanceToNow(new Date(file.upload_date), { addSuffix: true })}
                      </span>
                      {file.file_size && (
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatFileSize(file.file_size)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-shrink-0"
                    asChild
                  >
                    <a href={file.file_url} target="_blank" rel="noopener noreferrer" download>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}