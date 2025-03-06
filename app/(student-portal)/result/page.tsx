'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  BookOpen,
  BarChart,
  Download,
  ChevronDown,
  Clock,
  Calendar,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

const semesters = [
  { id: '1', name: 'First Semester 2023/24' },
  { id: '2', name: 'Second Semester 2023/24' },
];

const courses = [
  {
    code: 'CS301',
    name: 'Object Oriented Programming',
    credits: 4,
    grade: 'A',
    score: 85,
    status: 'Completed',
    instructor: 'Dr. Sarah Johnson',
  },
  {
    code: 'CS302',
    name: 'Database Management Systems',
    credits: 4,
    grade: 'B+',
    score: 78,
    status: 'Completed',
    instructor: 'Prof. Michael Chen',
  },
  {
    code: 'CS303',
    name: 'Web Development',
    credits: 3,
    grade: 'A-',
    score: 82,
    status: 'Completed',
    instructor: 'Emily Brown',
  },
  {
    code: 'CS304',
    name: 'Computer Networks',
    credits: 4,
    grade: 'B',
    score: 75,
    status: 'In Progress',
    instructor: 'Dr. James Wilson',
  },
];

const performanceStats = [
  { label: 'GPA', value: '3.75', icon: Trophy },
  { label: 'Credits Completed', value: '15/18', icon: BookOpen },
  { label: 'Attendance', value: '92%', icon: Clock },
  { label: 'Assignments', value: '95%', icon: CheckCircle2 },
];

export default function ResultPage() {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Academic Results</h1>
        <p className="text-muted-foreground mt-2">
          View your academic performance and course grades
        </p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-emerald-100 dark:bg-amber-900">
                <stat.icon className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Semester Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-600" />
              <select
                value={selectedSemester.id}
                onChange={(e) => setSelectedSemester(semesters.find(s => s.id === e.target.value)!)}
                className="bg-transparent border-none font-semibold focus:outline-none focus:ring-0"
              >
                {semesters.map((semester) => (
                  <option key={semester.id} value={semester.id}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>

          {/* Course Results */}
          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.code} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{course.name}</h3>
                      <span className="text-sm text-muted-foreground">({course.code})</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Instructor: {course.instructor}
                    </p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Grade</p>
                      <p className="text-xl font-bold text-amber-600">{course.grade}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-xl font-bold">{course.score}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Credits</p>
                      <p className="text-xl font-bold">{course.credits}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Grade Distribution */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Grade Distribution</h3>
            <div className="space-y-4">
              {[
                { grade: 'A', percentage: 75 },
                { grade: 'B', percentage: 60 },
                { grade: 'C', percentage: 40 },
                { grade: 'D', percentage: 20 },
              ].map((item) => (
                <div key={item.grade} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.grade}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-amber-600 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Academic Standing */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Academic Standing</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-amber-900">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Good Standing</p>
                  <p className="text-sm text-muted-foreground">Keep up the good work!</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Requirements Met</h4>
                <div className="space-y-2">
                  {[
                    'Minimum GPA requirement',
                    'Credit completion rate',
                    'Attendance requirement',
                  ].map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                View Transcript
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Grade Appeal
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Academic Calendar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}