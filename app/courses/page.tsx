"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Clock, Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { truncateText } from "@/utils/truncate";

interface Course {
  course_id: number;
  title: string;
  description: string;
  duration_months: number;
  price: number;
  department: string;
  category: "adults" | "kids";
  image_url: string;
  program_type: string;
  num_lectures: number;
  skill_level: "beginner" | "intermediate" | "advanced";
  languages: string;
  class_days: string;
  course_code: string;
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProgramType, setSelectedProgramType] = useState<string>("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 12]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter function
  const applyFilters = () => {
    let filtered = [...courses];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Program type filter
    if (selectedProgramType !== "all") {
      filtered = filtered.filter(
        (course) => course.program_type === selectedProgramType
      );
    }

    // Skill level filter
    if (selectedSkillLevel !== "all") {
      filtered = filtered.filter(
        (course) => course.skill_level === selectedSkillLevel
      );
    }

    // Department filter
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(
        (course) => course.department === selectedDepartment
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (course) => course.price >= priceRange[0] && course.price <= priceRange[1]
    );

    // Duration range filter
    filtered = filtered.filter(
      (course) =>
        course.duration_months >= durationRange[0] &&
        course.duration_months <= durationRange[1]
    );

    setFilteredCourses(filtered);
  };

  // Apply filters whenever any filter changes
  useEffect(() => {
    applyFilters();
  }, [
    searchQuery,
    selectedCategory,
    selectedProgramType,
    selectedSkillLevel,
    selectedDepartment,
    priceRange,
    durationRange,
    showOnlyAvailable,
  ]);

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="adults">Adults</SelectItem>
            <SelectItem value="kids">Kids</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Program Type</h3>
        <Select
          value={selectedProgramType}
          onValueChange={setSelectedProgramType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select program type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            <SelectItem value="fulltime">Full Time</SelectItem>
            <SelectItem value="adults-online">Online</SelectItem>
            <SelectItem value="weekend">Weekend</SelectItem>
            <SelectItem value="holiday">Holiday</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Skill Level</h3>
        <Select
          value={selectedSkillLevel}
          onValueChange={setSelectedSkillLevel}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select skill level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Price Range (K)</h3>
        <div className="pt-4">
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            max={5000}
            step={100}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>K{priceRange[0]}</span>
            <span>K{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Duration (Months)</h3>
        <div className="pt-4">
          <Slider
            defaultValue={[durationRange[0], durationRange[1]]}
            max={12}
            step={1}
            onValueChange={(value) => setDurationRange([value[0], value[1]])}
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{durationRange[0]} months</span>
            <span>{durationRange[1]} months</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Available Only</span>
        <Switch
          checked={showOnlyAvailable}
          onCheckedChange={setShowOnlyAvailable}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 animate-slide-up">
            Explore Our Courses
          </h1>
          <p className="text-lg text-muted-foreground animate-slide-up-delay">
            Find the perfect course to advance your skills and career
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:w-auto">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <FilterSection />
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="hover-card-animation">
              {selectedCategory}
            </Badge>
          )}
          {selectedProgramType !== "all" && (
            <Badge variant="secondary" className="hover-card-animation">
              {selectedProgramType}
            </Badge>
          )}
          {selectedSkillLevel !== "all" && (
            <Badge variant="secondary" className="hover-card-animation">
              {selectedSkillLevel}
            </Badge>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 space-y-6">
            <FilterSection />
          </div>

          {/* Course Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.course_id}
                    className="overflow-hidden flex flex-col hover-card-animation"
                  >
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
                      <h2 className="text-xl font-semibold mb-2">
                        {course.title}
                      </h2>
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
                          className="flex-1 bg-amber-6000 hover:bg-amber-600 group"
                          asChild
                        >
                          <Link href={`/apply?program=${course.course_code}`}>
                            Apply
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link
                            href={`/${course.program_type}/${course.course_id}`}
                          >
                            View More
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
