export interface Result {
  result_id: number;
  user_id: number;
  course_id: number;
  enrollment_id: number;
  assessment_type: string;
  assessment_title: string;
  score: number;
  max_score: number;
  result_date: string;
  comments?: string;
  is_passed: boolean;
  course_title: string;
}

export interface ResultsResponse {
  results: Result[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}