-- Create companies table for internship providers
CREATE TABLE companies (
    company_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url VARCHAR(255),
    website VARCHAR(255),
    location VARCHAR(255),
    industry VARCHAR(100),
    size ENUM('startup', 'small', 'medium', 'large', 'enterprise') DEFAULT 'medium',
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_industry (industry),
    INDEX idx_location (location),
    INDEX idx_active (is_active)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create internships table
CREATE TABLE internships (
    internship_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    company_id INT NOT NULL,
    type ENUM('paid', 'unpaid') NOT NULL,
    duration_months INT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    industry VARCHAR(100) NOT NULL,
    skills_required TEXT,
    application_deadline DATE,
    start_date DATE,
    stipend_amount DECIMAL(10,2) NULL COMMENT 'Monthly stipend for paid internships',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    INDEX idx_type (type),
    INDEX idx_industry (industry),
    INDEX idx_active (is_active),
    INDEX idx_deadline (application_deadline),
    INDEX idx_start_date (start_date)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create internship applications table
CREATE TABLE internship_applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    internship_id INT NULL COMMENT 'NULL for general applications, specific ID for targeted applications',
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_phone VARCHAR(50) NOT NULL,
    university VARCHAR(255) NOT NULL,
    course_of_study VARCHAR(255) NOT NULL,
    year_of_study VARCHAR(20) NOT NULL,
    gpa VARCHAR(20),
    cv_url VARCHAR(500),
    cover_letter TEXT,
    portfolio_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    availability_start DATE,
    preferred_duration VARCHAR(50),
    motivation TEXT,
    relevant_experience TEXT,
    technical_skills TEXT,
    soft_skills TEXT,
    preferred_industry VARCHAR(100) COMMENT 'For general applications',
    internship_type_preference ENUM('paid', 'unpaid', 'both') COMMENT 'For general applications',
    status ENUM('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected') DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT,
    review_date TIMESTAMP NULL,
    review_notes TEXT,
    FOREIGN KEY (internship_id) REFERENCES internships(internship_id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_application_date (application_date),
    INDEX idx_student_email (student_email),
    INDEX idx_internship (internship_id),
    UNIQUE KEY unique_application (internship_id, student_email) COMMENT 'Prevents duplicate applications'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert sample companies
INSERT INTO companies (name, description, logo_url, website, location, industry, size, contact_email, contact_phone) VALUES
('TechZambia Solutions', 'Leading software development company specializing in web and mobile applications for African markets.', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=100&q=80', 'https://techzambia.com', 'Lusaka, Zambia', 'Technology', 'medium', 'internships@techzambia.com', '+260 211 123456'),
('DataFlow Analytics', 'Data science and analytics company helping businesses make data-driven decisions.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=100&q=80', 'https://dataflow.zm', 'Lusaka, Zambia', 'Data Science', 'small', 'careers@dataflow.zm', '+260 211 234567'),
('CyberGuard Zambia', 'Cybersecurity firm providing security solutions for enterprises across Southern Africa.', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=100&q=80', 'https://cyberguard.zm', 'Lusaka, Zambia', 'Cybersecurity', 'medium', 'internships@cyberguard.zm', '+260 211 345678'),
('CloudTech Africa', 'Cloud computing and DevOps services provider for African businesses.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=100&q=80', 'https://cloudtech.africa', 'Lusaka, Zambia', 'Cloud Computing', 'large', 'talent@cloudtech.africa', '+260 211 456789'),
('MobileFirst Innovations', 'Mobile app development studio creating innovative solutions for various industries.', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=100&q=80', 'https://mobilefirst.zm', 'Lusaka, Zambia', 'Mobile Development', 'startup', 'join@mobilefirst.zm', '+260 211 567890');

-- Insert sample internships
INSERT INTO internships (title, description, company_id, type, duration_months, requirements, responsibilities, industry, skills_required, application_deadline, start_date, stipend_amount) VALUES
('Software Development Intern', 'Join our development team to work on exciting web and mobile applications. You will gain hands-on experience with modern technologies and contribute to real projects.', 1, 'paid', 6, 'Currently enrolled in Computer Science or related field\nBasic knowledge of programming\nStrong problem-solving skills', 'Assist in developing web applications\nWrite clean, maintainable code\nParticipate in code reviews\nCollaborate with senior developers', 'Technology', 'JavaScript, Python, React, Node.js', '2024-02-15', '2024-03-01', 2500.00),
('Data Science Intern', 'Work with our data science team to analyze large datasets and build predictive models. Perfect opportunity to apply your statistical knowledge in real-world scenarios.', 2, 'paid', 4, 'Statistics or Data Science background\nPython programming experience\nFamiliarity with data analysis libraries', 'Analyze business data\nBuild predictive models\nCreate data visualizations\nPresent findings to stakeholders', 'Data Science', 'Python, R, SQL, Pandas, Scikit-learn, Tableau', '2024-02-20', '2024-03-15', 2000.00),
('Cybersecurity Intern', 'Learn about cybersecurity practices and help protect our clients from digital threats. Gain experience in penetration testing and security auditing.', 3, 'unpaid', 3, 'Interest in cybersecurity\nBasic networking knowledge\nEthical mindset and attention to detail', 'Assist in security assessments\nMonitor security systems\nDocument security procedures\nSupport incident response', 'Cybersecurity', 'Network Security, Ethical Hacking, Risk Assessment', '2024-02-10', '2024-03-01', NULL),
('Cloud Engineering Intern', 'Get hands-on experience with cloud platforms and DevOps practices. Work on infrastructure automation and deployment pipelines.', 4, 'paid', 6, 'Basic understanding of cloud concepts\nLinux command line experience\nInterest in automation', 'Deploy applications to cloud\nManage cloud infrastructure\nAutomate deployment processes\nMonitor system performance', 'Cloud Computing', 'AWS, Docker, Kubernetes, Linux, Python', '2024-02-25', '2024-04-01', 3000.00),
('Mobile App Development Intern', 'Create innovative mobile applications for iOS and Android platforms. Work with cutting-edge technologies and user experience design.', 5, 'paid', 4, 'Mobile development interest\nBasic programming knowledge\nCreative problem-solving skills', 'Develop mobile applications\nImplement user interfaces\nTest app functionality\nCollaborate with design team', 'Mobile Development', 'React Native, Flutter, Swift, Kotlin', '2024-02-12', '2024-03-10', 1800.00),
('UI/UX Design Intern', 'Design user-friendly interfaces and improve user experience across our digital products. Learn industry-standard design tools and methodologies.', 1, 'unpaid', 3, 'Design portfolio or coursework\nCreativity and attention to detail\nBasic design software knowledge', 'Create user interface designs\nConduct user research\nDevelop wireframes and prototypes\nCollaborate with development team', 'Design', 'Figma, Adobe XD, Sketch, User Research', '2024-02-18', '2024-03-20', NULL);
