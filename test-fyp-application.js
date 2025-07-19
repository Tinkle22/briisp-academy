// Test script to submit a FYP application
const testApplication = {
  // Personal Information
  student_name: 'John Doe',
  email: 'john.doe@university.edu',
  phone: '+260771234567',
  university: 'University of Zambia',
  course_of_study: 'Computer Science',
  year_of_study: '4',
  student_id: 'CS2021001',
  
  // Supervisor Information (optional)
  supervisor_name: 'Dr. Jane Smith',
  supervisor_email: 'jane.smith@unza.zm',
  
  // Project Information
  project_title: 'Machine Learning for Predictive Analytics in Healthcare',
  project_description: 'This project aims to develop a machine learning system that can predict patient outcomes based on historical medical data. The system will use various ML algorithms to analyze patterns in patient data and provide early warning systems for healthcare providers.',
  project_type: 'research',
  research_area: 'Machine Learning, Healthcare Analytics',
  methodology: 'The project will use supervised learning algorithms including Random Forest, SVM, and Neural Networks. Data will be collected from anonymized patient records and preprocessed using standard ML techniques.',
  expected_outcomes: 'A working ML model with at least 85% accuracy in predicting patient outcomes, a comprehensive research paper, and a prototype web application for healthcare providers.',
  
  // Timeline and Resources
  timeline_weeks: '16',
  project_deadline: '2025-11-15',
  defense_date: '2025-12-01',
  required_resources: 'Access to anonymized healthcare datasets, high-performance computing resources for model training, Python development environment',
  technical_requirements: 'Python, TensorFlow/PyTorch, Pandas, Scikit-learn, Jupyter Notebooks, MySQL database',
  preferred_supervisor_expertise: 'Machine Learning, Data Science, Healthcare Informatics',
  
  // Additional Information
  university_requirements: 'Must submit a 50-page thesis and present findings to a panel of 3 examiners',
  additional_notes: 'I have previous experience with Python and basic machine learning concepts from coursework. Looking forward to applying these skills to a real-world healthcare problem.'
};

async function submitTestApplication() {
  try {
    console.log('Submitting test FYP application...');
    
    const response = await fetch('http://localhost:3000/api/fyp-applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testApplication),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit application');
    }

    console.log('✅ Application submitted successfully!');
    console.log('Application ID:', data.applicationId);
    console.log('Response:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Error submitting application:', error.message);
    throw error;
  }
}

async function testFYPApplicationSystem() {
  console.log('🧪 Testing FYP Application System...\n');
  
  try {
    // Test 1: Submit application
    console.log('Test 1: Submitting FYP application');
    const result = await submitTestApplication();
    console.log('✅ Test 1 passed\n');
    
    // Test 2: Verify application appears in dashboard API
    console.log('Test 2: Checking if application appears in dashboard API');
    const dashboardResponse = await fetch('http://localhost:3002/api/fyp-applications');
    
    if (!dashboardResponse.ok) {
      throw new Error('Failed to fetch applications from dashboard');
    }
    
    const dashboardData = await dashboardResponse.json();
    console.log('Dashboard API response:', dashboardData);
    
    const applications = dashboardData.applications || [];
    const newApplication = applications.find(app => app.application_id === result.applicationId);
    
    if (newApplication) {
      console.log('✅ Test 2 passed - Application found in dashboard');
      console.log('Application details:', {
        id: newApplication.application_id,
        name: newApplication.student_name,
        email: newApplication.email,
        project_title: newApplication.project_title,
        status: newApplication.status
      });
    } else {
      console.log('❌ Test 2 failed - Application not found in dashboard');
    }
    
    console.log('\n🎉 FYP Application System test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testFYPApplicationSystem();
