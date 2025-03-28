export interface Result {
  result_id: number;
  assessment_title: string;
  assessment_type: string;
  course_title: string;
  score: number;
  max_score: number;
  is_passed: boolean;
  result_date: string;
  comments?: string;
}

export interface ResultsResponse {
  results: Result[];
}