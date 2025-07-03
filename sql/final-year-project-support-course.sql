-- SQL Commands for Final Year Project Support Course
-- Execute these commands to add the Final Year Project Support course to the database

-- Insert the main course record
INSERT INTO courses (
    course_code,
    title,
    description,
    duration_months,
    price,
    department,
    category,
    image_url,
    program_type,
    num_lectures,
    skill_level,
    languages,
    class_days
) VALUES (
    'FYPS001',
    'Final Year Project Support',
    'Final Year Project Hub assists students with selecting topics, conducting research, and writing academic documentation tailored to meet university standards. Our comprehensive support includes topic ideation, proposal writing, research methodology guidance, academic writing assistance, plagiarism checks, and presentation preparation. Get expert supervision and continuous guidance throughout your project journey with access to software tools like SPSS, MATLAB, Python, and more.',
    6,
    1500.00,
    'Academic Support',
    'adults',
    '/images/courses/final-year-project-support.jpg',
    'final-year-project-support',
    24,
    'intermediate',
    'English',
    'Flexible Schedule'
);

-- Get the course_id for the curriculum and gallery inserts
-- Note: Replace @course_id with the actual course_id returned from the above insert

-- Insert curriculum data (assuming course_id = LAST_INSERT_ID())
SET @course_id = LAST_INSERT_ID();

INSERT INTO curriculum (course_id, week_number, topic, content, learning_objectives) VALUES
(@course_id, 1, 'Project Planning & Topic Selection', 'Introduction to research methodology, topic brainstorming sessions, feasibility analysis, and proposal structure overview.', 'Understand research fundamentals, identify viable project topics, learn proposal writing basics'),

(@course_id, 2, 'Research Methodology & Literature Review', 'Research design principles, literature search strategies, citation management, and academic database navigation.', 'Master research design, conduct effective literature reviews, understand citation standards'),

(@course_id, 3, 'Proposal Writing & Abstract Development', 'Crafting compelling project proposals, abstract writing techniques, and academic writing standards.', 'Write professional proposals, create effective abstracts, apply academic writing conventions'),

(@course_id, 4, 'Data Collection & Analysis Planning', 'Research instruments design, data collection methods, sampling techniques, and analysis planning.', 'Design research instruments, plan data collection strategies, understand sampling methods'),

(@course_id, 5, 'Academic Writing & Documentation', 'Report structure, chapter organization, academic tone, referencing systems (APA, IEEE, Harvard).', 'Structure academic reports, maintain academic tone, apply proper referencing systems'),

(@course_id, 6, 'Data Analysis & Software Tools', 'Introduction to SPSS, MATLAB, Python for research, statistical analysis, and data visualization.', 'Use research software tools, perform statistical analysis, create data visualizations'),

(@course_id, 7, 'Results Presentation & Interpretation', 'Data interpretation techniques, results presentation, charts and graphs creation, findings discussion.', 'Interpret research results, present findings effectively, create professional visualizations'),

(@course_id, 8, 'Thesis/Dissertation Writing', 'Chapter development, argument construction, critical analysis, and academic argumentation.', 'Develop thesis chapters, construct logical arguments, apply critical analysis skills'),

(@course_id, 9, 'Plagiarism Prevention & Ethics', 'Academic integrity, plagiarism detection tools, proper attribution, ethical research practices.', 'Understand academic integrity, prevent plagiarism, apply ethical research standards'),

(@course_id, 10, 'Formatting & Standards Compliance', 'IEEE format, Springer guidelines, university standards, document formatting, and style guides.', 'Apply formatting standards, comply with publication guidelines, maintain consistency'),

(@course_id, 11, 'Presentation Design & Delivery', 'Slide design principles, presentation structure, visual aids creation, and public speaking techniques.', 'Design effective presentations, structure content logically, deliver confident presentations'),

(@course_id, 12, 'Final Review & Defense Preparation', 'Project review sessions, defense preparation, Q&A practice, and final submission guidelines.', 'Prepare for project defense, handle questions effectively, finalize project submission');

-- Insert gallery images for the course
INSERT INTO gallery (course_id, image_url, image_title, image_description, image_type, display_order, is_active) VALUES
(@course_id, '/images/courses/fyps/hero-banner.jpg', 'Final Year Project Support Hero', 'Students working on research projects with expert guidance', 'banner', 1, true),
(@course_id, '/images/courses/fyps/research-methodology.jpg', 'Research Methodology', 'Students learning research methodology and data collection techniques', 'content', 2, true),
(@course_id, '/images/courses/fyps/academic-writing.jpg', 'Academic Writing', 'Professional academic writing and documentation support', 'content', 3, true),
(@course_id, '/images/courses/fyps/data-analysis.jpg', 'Data Analysis', 'Students using SPSS, MATLAB, and Python for data analysis', 'content', 4, true),
(@course_id, '/images/courses/fyps/presentation-prep.jpg', 'Presentation Preparation', 'Students preparing for project defense presentations', 'content', 5, true),
(@course_id, '/images/courses/fyps/supervision.jpg', 'Expert Supervision', 'One-on-one mentorship and continuous guidance sessions', 'content', 6, true);

-- Create a specific table for project support services (optional enhancement)
CREATE TABLE IF NOT EXISTS project_support_services (
    service_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    service_description TEXT,
    service_icon VARCHAR(100),
    service_color VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    INDEX idx_course_services (course_id, is_active)
);

-- Insert project support services
INSERT INTO project_support_services (course_id, service_name, service_description, service_icon, service_color, display_order) VALUES
(@course_id, 'Topic Ideation & Proposal Writing', 'Get expert guidance in selecting compelling research topics and crafting winning project proposals.', 'Lightbulb', 'bg-blue-500', 1),
(@course_id, 'Abstract, Poster & Report Writing', 'Professional assistance with academic writing, poster design, and comprehensive report structuring.', 'FileText', 'bg-green-500', 2),
(@course_id, 'Research Papers (IEEE, Springer formats)', 'Expert help with formatting and writing research papers for top-tier academic publications.', 'Search', 'bg-purple-500', 3),
(@course_id, 'Thesis & Dissertation Support', 'Comprehensive guidance through the entire thesis writing process from start to finish.', 'BookOpen', 'bg-orange-500', 4),
(@course_id, 'Plagiarism Checks & Correction', 'Thorough plagiarism detection and professional assistance with content originality.', 'Shield', 'bg-red-500', 5),
(@course_id, 'Presentation Slide Creation', 'Professional presentation design and content development for project defenses.', 'PresentationChart', 'bg-indigo-500', 6);

-- Create a table for project support benefits (optional enhancement)
CREATE TABLE IF NOT EXISTS project_support_benefits (
    benefit_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    benefit_title VARCHAR(255) NOT NULL,
    benefit_description TEXT,
    benefit_icon VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    display_order INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    INDEX idx_course_benefits (course_id, is_active)
);

-- Insert project support benefits
INSERT INTO project_support_benefits (course_id, benefit_title, benefit_description, benefit_icon, display_order) VALUES
(@course_id, 'Access to Project Examples', 'Browse through our extensive library of successful project examples and templates.', 'Target', 1),
(@course_id, 'Supervision & Continuous Guidance', 'One-on-one mentorship with experienced supervisors throughout your project journey.', 'Users', 2),
(@course_id, 'Software Tools Support', 'Expert assistance with SPSS, MATLAB, Python, R, and other research software tools.', 'Code', 3);

-- Update course statistics (optional - for the statistics cards)
-- These could be stored in a separate statistics table or updated periodically
CREATE TABLE IF NOT EXISTS course_statistics (
    stat_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    stat_name VARCHAR(100) NOT NULL,
    stat_value VARCHAR(50) NOT NULL,
    stat_label VARCHAR(100) NOT NULL,
    stat_icon VARCHAR(100),
    display_order INT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    INDEX idx_course_stats (course_id, is_active)
);

-- Insert course statistics
INSERT INTO course_statistics (course_id, stat_name, stat_value, stat_label, stat_icon, display_order) VALUES
(@course_id, 'projects_completed', '500+', 'Projects Completed', 'Award', 1),
(@course_id, 'success_rate', '95%', 'Success Rate', 'TrendingUp', 2),
(@course_id, 'expert_supervisors', '50+', 'Expert Supervisors', 'UserCheck', 3),
(@course_id, 'support_availability', '24/7', 'Support Available', 'Clock', 4);

-- Verify the insertion
SELECT 
    c.course_id,
    c.course_code,
    c.title,
    c.program_type,
    COUNT(curr.curriculum_id) as curriculum_count,
    COUNT(g.gallery_id) as gallery_count
FROM courses c
LEFT JOIN curriculum curr ON c.course_id = curr.course_id
LEFT JOIN gallery g ON c.course_id = g.course_id
WHERE c.course_code = 'FYPS001'
GROUP BY c.course_id;
