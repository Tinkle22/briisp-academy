-- Insert sample refresher courses
INSERT INTO courses (
  course_code, title, description, duration_months, price, department,
  category, image_url, program_type, num_lectures, skill_level, languages, class_days
) VALUES 
(
  'REF-DS-001',
  'Data Science Bootcamp',
  'Comprehensive refresher course covering modern data science techniques, machine learning algorithms, and practical applications using Python, R, and popular frameworks. Perfect for professionals looking to update their skills in the rapidly evolving field of data science.',
  6,
  1200.00,
  'Computer Science',
  'adults',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  'refresher',
  48,
  'intermediate',
  'English',
  'Evenings & Weekends'
),
(
  'REF-CYB-001',
  'Cybersecurity Fundamentals & Practice',
  'Hands-on cybersecurity refresher course covering network security, ethical hacking, incident response, and compliance frameworks. Designed for IT professionals seeking to strengthen their security expertise and stay current with emerging threats.',
  4,
  950.00,
  'Computer Science',
  'adults',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  'refresher',
  32,
  'intermediate',
  'English',
  'Evenings & Weekends'
),
(
  'REF-NET-001',
  'Networking Essentials (Cisco-based)',
  'Cisco-certified networking refresher course covering routing, switching, network troubleshooting, and modern network architectures. Ideal for network administrators and engineers looking to update their Cisco skills and prepare for certification.',
  5,
  1100.00,
  'Computer Science',
  'adults',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  'refresher',
  40,
  'intermediate',
  'English',
  'Evenings & Weekends'
),
(
  'REF-WEB-001',
  'Web & Mobile App Development (Frontend & Backend)',
  'Full-stack development refresher covering modern JavaScript frameworks (React, Node.js), mobile development (React Native), and cloud deployment. Perfect for developers wanting to update their skills with current technologies and best practices.',
  8,
  1500.00,
  'Computer Science',
  'adults',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  'refresher',
  64,
  'intermediate',
  'English',
  'Evenings & Weekends'
),
(
  'REF-ML-001',
  'Machine Learning & AI for Beginners',
  'Beginner-friendly machine learning refresher course covering fundamental algorithms, neural networks, and practical AI applications. Designed for professionals new to ML/AI or those seeking to refresh their understanding of core concepts.',
  6,
  1300.00,
  'Computer Science',
  'adults',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
  'refresher',
  48,
  'beginner',
  'English',
  'Evenings & Weekends'
),
(
  'REF-CLOUD-001',
  'Cloud Computing & DevOps Intro',
  'Introduction to cloud computing and DevOps practices covering AWS/Azure, containerization (Docker), CI/CD pipelines, and infrastructure as code. Perfect for IT professionals transitioning to cloud-based environments.',
  5,
  1150.00,
  'Computer Science',
  'adults',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'refresher',
  40,
  'beginner',
  'English',
  'Evenings & Weekends'
);

-- Insert sample curriculum for Data Science Bootcamp
INSERT INTO curriculum (course_id, week_number, topic, content, learning_objectives) VALUES
((SELECT course_id FROM courses WHERE course_code = 'REF-DS-001'), 1, 'Python for Data Science Refresher', 'Review of Python fundamentals, NumPy, Pandas, and data manipulation techniques', 'Refresh Python skills and master data manipulation libraries'),
((SELECT course_id FROM courses WHERE course_code = 'REF-DS-001'), 2, 'Data Visualization & Exploratory Analysis', 'Matplotlib, Seaborn, and Plotly for creating compelling visualizations', 'Create professional data visualizations and perform exploratory data analysis'),
((SELECT course_id FROM courses WHERE course_code = 'REF-DS-001'), 3, 'Statistical Analysis & Hypothesis Testing', 'Statistical concepts, hypothesis testing, and A/B testing methodologies', 'Apply statistical methods to real-world data problems'),
((SELECT course_id FROM courses WHERE course_code = 'REF-DS-001'), 4, 'Machine Learning Fundamentals', 'Supervised and unsupervised learning algorithms using Scikit-learn', 'Implement and evaluate machine learning models'),
((SELECT course_id FROM courses WHERE course_code = 'REF-DS-001'), 5, 'Advanced ML & Model Deployment', 'Deep learning basics, model optimization, and deployment strategies', 'Deploy machine learning models to production environments'),
((SELECT course_id FROM courses WHERE course_code = 'REF-DS-001'), 6, 'Capstone Project', 'End-to-end data science project from data collection to model deployment', 'Complete a comprehensive data science project portfolio piece');

-- Insert sample curriculum for Cybersecurity course
INSERT INTO curriculum (course_id, week_number, topic, content, learning_objectives) VALUES
((SELECT course_id FROM courses WHERE course_code = 'REF-CYB-001'), 1, 'Security Fundamentals Review', 'CIA triad, threat landscape, and security frameworks overview', 'Understand core security principles and current threat environment'),
((SELECT course_id FROM courses WHERE course_code = 'REF-CYB-001'), 2, 'Network Security & Firewalls', 'Network security protocols, firewall configuration, and intrusion detection', 'Configure and manage network security infrastructure'),
((SELECT course_id FROM courses WHERE course_code = 'REF-CYB-001'), 3, 'Ethical Hacking & Penetration Testing', 'Hands-on penetration testing tools and methodologies', 'Perform ethical hacking assessments and vulnerability testing'),
((SELECT course_id FROM courses WHERE course_code = 'REF-CYB-001'), 4, 'Incident Response & Forensics', 'Incident response procedures, digital forensics, and recovery strategies', 'Develop incident response plans and conduct forensic analysis');

-- Insert sample curriculum for Web Development course
INSERT INTO curriculum (course_id, week_number, topic, content, learning_objectives) VALUES
((SELECT course_id FROM courses WHERE course_code = 'REF-WEB-001'), 1, 'Modern JavaScript & ES6+', 'Latest JavaScript features, async/await, and modern development practices', 'Master modern JavaScript development techniques'),
((SELECT course_id FROM courses WHERE course_code = 'REF-WEB-001'), 2, 'React.js Fundamentals', 'Component-based architecture, hooks, and state management', 'Build dynamic user interfaces with React'),
((SELECT course_id FROM courses WHERE course_code = 'REF-WEB-001'), 3, 'Node.js & Express Backend', 'Server-side development, RESTful APIs, and database integration', 'Develop robust backend applications'),
((SELECT course_id FROM courses WHERE course_code = 'REF-WEB-001'), 4, 'Database Design & Integration', 'SQL and NoSQL databases, ORM/ODM, and data modeling', 'Design and implement efficient database solutions'),
((SELECT course_id FROM courses WHERE course_code = 'REF-WEB-001'), 5, 'React Native Mobile Development', 'Cross-platform mobile app development with React Native', 'Create mobile applications for iOS and Android'),
((SELECT course_id FROM courses WHERE course_code = 'REF-WEB-001'), 6, 'Testing & Quality Assurance', 'Unit testing, integration testing, and code quality tools', 'Implement comprehensive testing strategies'),
((SELECT course_id FROM courses WHERE course_code = 'REF-WEB-001'), 7, 'Deployment & DevOps', 'CI/CD pipelines, containerization, and cloud deployment', 'Deploy applications to production environments'),
((SELECT course_id FROM courses WHERE course_code = 'REF-WEB-001'), 8, 'Full-Stack Project', 'Complete full-stack application with modern best practices', 'Build and deploy a professional full-stack application');
