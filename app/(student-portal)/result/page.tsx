'use client';

import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Result, ResultsResponse } from '@/types/results';
import {
  Trophy,
  BookOpen,
  BarChart,
  Download,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

export default function ResultPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/results');
        if (!response.ok) throw new Error('Failed to fetch results');
        const data: ResultsResponse = await response.json();
        setResults(data.results);
        
        // Fetch student info
        const studentResponse = await fetch('/api/student/profile');
        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          setStudentInfo(studentData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // Calculate performance stats
  const calculateStats = () => {
    const totalScore = results.reduce((acc, result) => acc + (result.score / result.max_score), 0);
    const averageScore = (totalScore / results.length) * 100;
    const passedCount = results.filter(r => r.is_passed).length;
    const passRate = (passedCount / results.length) * 100;

    return [
      { 
        label: 'Average Score', 
        value: `${averageScore.toFixed(1)}%`, 
        icon: Trophy 
      },
      { 
        label: 'Total Assessments', 
        value: results.length.toString(), 
        icon: BookOpen 
      },
      { 
        label: 'Pass Rate', 
        value: `${passRate.toFixed(1)}%`, 
        icon: TrendingUp 
      },
      { 
        label: 'Passed', 
        value: `${passedCount}/${results.length}`, 
        icon: CheckCircle2 
      },
    ];
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Academic Results Slip',
    onBeforePrint: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600 mx-auto" />
          <p className="mt-2 text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-xl">
        <h1 className="text-2xl font-bold text-amber-900">Academic Results</h1>
        <p className="text-amber-700 mt-2">
          View your academic performance and assessment results
        </p>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {calculateStats().map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-amber-100">
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

      {/* Results List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BarChart className="h-5 w-5 text-amber-600" />
              Assessment Results
            </h2>
            <div className="flex gap-2">
              <Button 
                className="bg-amber-600 hover:bg-amber-700"
                onClick={() => handlePrint()}
                disabled={isPrinting}
              >
                <FileText className="h-4 w-4 mr-2" />
                {isPrinting ? "Generating..." : "Download Result Slip"}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.result_id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{result.assessment_title}</h3>
                      <p className="text-sm text-muted-foreground">{result.course_title}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      result.is_passed 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {result.is_passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Assessment Type</p>
                      <p className="font-medium">{result.assessment_type}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-muted-foreground">Score</p>
                      <p className="font-medium">{result.score}/{result.max_score}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {new Date(result.result_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {result.comments && (
                    <p className="text-sm text-muted-foreground border-t pt-4 mt-2">
                      {result.comments}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Performance Summary</h3>
            <div className="space-y-4">
              {/* Get unique assessment types from results */}
              {Array.from(new Set(results.map(r => r.assessment_type))).map((type) => {
                const typeResults = results.filter(r => r.assessment_type === type);
                const avgScore = typeResults.length 
                  ? (typeResults.reduce((acc, r) => acc + (r.score / r.max_score), 0) / typeResults.length) * 100
                  : 0;
                
                // Calculate pass rate for this assessment type
                const passedCount = typeResults.filter(r => r.is_passed).length;
                const passRate = typeResults.length ? (passedCount / typeResults.length) * 100 : 0;

                return (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{type}</span>
                      <div className="flex gap-4">
                        <span className="text-muted-foreground">Avg: {avgScore.toFixed(1)}%</span>
                        <span className="text-muted-foreground">Pass: {passRate.toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-amber-600 rounded-full transition-all"
                        style={{ width: `${avgScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {typeResults.length} {typeResults.length === 1 ? 'assessment' : 'assessments'}
                    </p>
                  </div>
                );
              })}
              
              {/* Show message if no results */}
              {results.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No assessment results available
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Hidden printable result slip */}
      <div className="hidden">
        <div ref={printRef} className="p-8 bg-white">
          {/* School Header */}
          <div className="text-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-amber-900">BRIISP ACADEMY</h1>
            <h2 className="text-xl font-semibold mt-2">OFFICIAL RESULT SLIP</h2>
            <p className="text-sm text-gray-600 mt-1">
              {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Student Information */}
          {studentInfo && (
            <div className="mb-6 border p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-amber-800">STUDENT INFORMATION</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name:</p>
                  <p className="font-medium">{studentInfo.first_name} {studentInfo.last_name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Student ID:</p>
                  <p className="font-medium">{studentInfo.student_id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Program:</p>
                  <p className="font-medium">{studentInfo.program || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Academic Year:</p>
                  <p className="font-medium">{new Date().getFullYear()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Table */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-amber-800">ASSESSMENT RESULTS</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-amber-50">
                  <th className="border p-2 text-left">Assessment</th>
                  <th className="border p-2 text-left">Course</th>
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Date</th>
                  <th className="border p-2 text-left">Score</th>
                  <th className="border p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.result_id} className="border-b">
                    <td className="border p-2">{result.assessment_title}</td>
                    <td className="border p-2">{result.course_title}</td>
                    <td className="border p-2">{result.assessment_type}</td>
                    <td className="border p-2">
                      {new Date(result.result_date).toLocaleDateString()}
                    </td>
                    <td className="border p-2">{result.score}/{result.max_score}</td>
                    <td className="border p-2">
                      <span className={result.is_passed ? 'text-green-600' : 'text-red-600'}>
                        {result.is_passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mb-6 border p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-amber-800">PERFORMANCE SUMMARY</h3>
            <div className="grid grid-cols-2 gap-4">
              {calculateStats().map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="font-medium">{stat.label}:</div>
                  <div>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-4 border-t text-center text-sm text-gray-600">
            <p>This is an official result slip from BRIISP Academy.</p>
            <p className="mt-1">For any inquiries, please contact the academic office.</p>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="border-t pt-2 mx-auto w-40">Academic Officer</div>
              </div>
              <div className="text-center">
                <div className="border-t pt-2 mx-auto w-40">School Stamp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}