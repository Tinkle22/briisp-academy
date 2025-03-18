export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  course_id: number;
  course_code: string;
  title: string;
  description: string;
  duration_months: number;
  price: number;
  department: string;
  category: 'adults' | 'kids';
  image_url: string | null;
  program_type: string;
  num_lectures: number;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  languages: string;
  class_days: string;
}

export interface Enrollment {
  enrollment_id: number;
  course_id: number;
  course: Course;
  enrollment_date: string;
  status: 'active' | 'completed' | 'dropped';
}

export interface Notice {
  notice_id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  publish_date: string;
  expiry_date: string | null;
}

export interface FinancialSummary {
  total_payable: number;
  total_paid: number;
  others: number;
}