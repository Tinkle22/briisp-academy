// Simple test script to verify refresher course API endpoints
// Run with: node scripts/test-refresher-api.js

const BASE_URL = 'http://localhost:3000';

async function testRefresherAPI() {
  console.log('🧪 Testing Refresher Course API Endpoints...\n');

  try {
    // Test 1: Fetch all refresher courses
    console.log('1. Testing GET /api/courses/refresher');
    const coursesResponse = await fetch(`${BASE_URL}/api/courses/refresher`);
    const courses = await coursesResponse.json();
    
    if (coursesResponse.ok) {
      console.log('✅ Success! Found', courses.length, 'refresher courses');
      if (courses.length > 0) {
        console.log('   Sample course:', courses[0].title);
      }
    } else {
      console.log('❌ Failed:', courses.error);
    }

    // Test 2: Fetch all courses (to verify refresher courses are included)
    console.log('\n2. Testing GET /api/courses (checking for refresher courses)');
    const allCoursesResponse = await fetch(`${BASE_URL}/api/courses`);
    const allCourses = await allCoursesResponse.json();
    
    if (allCoursesResponse.ok) {
      const refresherCourses = allCourses.filter(course => course.program_type === 'refresher');
      console.log('✅ Success! Found', refresherCourses.length, 'refresher courses in all courses');
    } else {
      console.log('❌ Failed to fetch all courses');
    }

    // Test 3: Test refresher application endpoint (GET)
    console.log('\n3. Testing GET /api/applications/refresher');
    const applicationsResponse = await fetch(`${BASE_URL}/api/applications/refresher`);
    const applications = await applicationsResponse.json();
    
    if (applicationsResponse.ok) {
      console.log('✅ Success! Found', applications.length, 'refresher applications');
    } else {
      console.log('❌ Failed:', applications.error);
    }

    // Test 4: Test creating a sample refresher course (POST)
    console.log('\n4. Testing POST /api/courses/refresher');
    const newCourse = {
      title: 'Test Refresher Course',
      description: 'A test course for API validation',
      duration_months: 3,
      price: 500.00,
      department: 'Computer Science',
      category: 'adults',
      image_url: 'https://example.com/test-image.jpg',
      num_lectures: 24,
      skill_level: 'beginner',
      languages: 'English',
      class_days: 'Weekends',
      course_code: 'TEST-REF-001'
    };

    const createResponse = await fetch(`${BASE_URL}/api/courses/refresher`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    });

    const createResult = await createResponse.json();
    
    if (createResponse.ok) {
      console.log('✅ Success! Created test course with ID:', createResult.id);
    } else {
      console.log('❌ Failed to create course:', createResult.error);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n💡 Make sure the development server is running on port 3000');
    console.log('   Run: npm run dev');
  }

  console.log('\n🏁 API testing complete!');
}

// Run the tests
testRefresherAPI();
