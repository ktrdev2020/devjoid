/**
 * Test Suite for Dashboard System
 * รันเพื่อทดสอบฟังก์ชันต่างๆ ของระบบ
 */

function runAllTests() {
  console.log('🧪 เริ่มต้นการทดสอบระบบ...');
  console.log('='.repeat(50));
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    tests: []
  };
  
  // Test cases
  const tests = [
    testSpreadsheetAccess,
    testAuthentication,
    testDataRetrieval,
    testTeacherCRUD,
    testSearch,
    testDashboardStats,
    testSessionManagement
  ];
  
  tests.forEach(test => {
    try {
      console.log(`🔄 รัน ${test.name}...`);
      const result = test();
      results.total++;
      
      if (result.success) {
        results.passed++;
        console.log(`✅ ${test.name}: PASS - ${result.message}`);
      } else {
        results.failed++;
        console.log(`❌ ${test.name}: FAIL - ${result.message}`);
      }
      
      results.tests.push({
        name: test.name,
        success: result.success,
        message: result.message
      });
      
    } catch (error) {
      results.total++;
      results.failed++;
      console.log(`❌ ${test.name}: ERROR - ${error.toString()}`);
      
      results.tests.push({
        name: test.name,
        success: false,
        message: error.toString()
      });
    }
  });
  
  console.log('='.repeat(50));
  console.log(`📊 ผลการทดสอบ: ${results.passed}/${results.total} ผ่าน`);
  
  if (results.failed === 0) {
    console.log('🎉 การทดสอบสำเร็จทั้งหมด!');
  } else {
    console.log(`⚠️ พบปัญหา ${results.failed} รายการ`);
  }
  
  return results;
}

function testSpreadsheetAccess() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const usersSheet = spreadsheet.getSheetByName(USERS_SHEET);
    const teachersSheet = spreadsheet.getSheetByName(TEACHERS_SHEET);
    
    if (!usersSheet) {
      return { success: false, message: 'ไม่พบ users sheet' };
    }
    
    if (!teachersSheet) {
      return { success: false, message: 'ไม่พบ teachers sheet' };
    }
    
    return { success: true, message: 'เข้าถึง spreadsheet สำเร็จ' };
  } catch (error) {
    return { success: false, message: `ไม่สามารถเข้าถึง spreadsheet: ${error.toString()}` };
  }
}

function testAuthentication() {
  try {
    // Test valid login
    const validAuth = authenticateUser('admin', 'admin123');
    if (!validAuth.success) {
      return { success: false, message: 'Login ที่ถูกต้องล้มเหลว' };
    }
    
    // Test invalid login
    const invalidAuth = authenticateUser('invalid', 'wrong');
    if (invalidAuth.success) {
      return { success: false, message: 'Login ที่ผิดไม่ควรสำเร็จ' };
    }
    
    // Test session
    const session = getUserSession();
    if (!session || !session.username) {
      return { success: false, message: 'Session ไม่ทำงาน' };
    }
    
    return { success: true, message: 'ระบบ authentication ทำงานปกติ' };
  } catch (error) {
    return { success: false, message: `Authentication error: ${error.toString()}` };
  }
}

function testDataRetrieval() {
  try {
    const teachers = getTeachersData();
    
    if (!Array.isArray(teachers)) {
      return { success: false, message: 'ข้อมูลครูไม่ใช่ array' };
    }
    
    if (teachers.length === 0) {
      return { success: false, message: 'ไม่มีข้อมูลครู' };
    }
    
    // Check teacher structure
    const teacher = teachers[0];
    const requiredFields = ['id', 'code', 'prefix', 'firstName', 'lastName', 'position', 'school'];
    
    for (const field of requiredFields) {
      if (!(field in teacher)) {
        return { success: false, message: `ขาด field: ${field}` };
      }
    }
    
    return { success: true, message: `ดึงข้อมูลครู ${teachers.length} รายการสำเร็จ` };
  } catch (error) {
    return { success: false, message: `Data retrieval error: ${error.toString()}` };
  }
}

function testTeacherCRUD() {
  try {
    // Test Add
    const newTeacher = {
      code: 'TEST001',
      prefix: 'นาย',
      firstName: 'ทดสอบ',
      lastName: 'ระบบ',
      position: 'ครูผู้สอน',
      school: 'โรงเรียนทดสอบ'
    };
    
    const addResult = addTeacher(newTeacher);
    if (!addResult.success) {
      return { success: false, message: `เพิ่มครูล้มเหลว: ${addResult.message}` };
    }
    
    const teacherId = addResult.id;
    
    // Test Update
    const updatedTeacher = {
      ...newTeacher,
      firstName: 'ทดสอบอัพเดท'
    };
    
    const updateResult = updateTeacher(teacherId, updatedTeacher);
    if (!updateResult.success) {
      return { success: false, message: `อัพเดทครูล้มเหลว: ${updateResult.message}` };
    }
    
    // Test Delete
    const deleteResult = deleteTeacher(teacherId);
    if (!deleteResult.success) {
      return { success: false, message: `ลบครูล้มเหลว: ${deleteResult.message}` };
    }
    
    return { success: true, message: 'CRUD operations ทำงานปกติ' };
  } catch (error) {
    return { success: false, message: `CRUD error: ${error.toString()}` };
  }
}

function testSearch() {
  try {
    // Test search with results
    const results1 = searchTeachers('สม', 'firstName');
    if (!Array.isArray(results1)) {
      return { success: false, message: 'Search results ไม่ใช่ array' };
    }
    
    // Test search without results
    const results2 = searchTeachers('ไม่มีข้อมูลนี้', 'firstName');
    if (!Array.isArray(results2)) {
      return { success: false, message: 'Empty search results ไม่ใช่ array' };
    }
    
    // Test search all fields
    const results3 = searchTeachers('ครู', 'all');
    if (!Array.isArray(results3)) {
      return { success: false, message: 'Search all fields ไม่ทำงาน' };
    }
    
    return { success: true, message: `ระบบค้นหาทำงานปกติ (${results1.length}, ${results2.length}, ${results3.length})` };
  } catch (error) {
    return { success: false, message: `Search error: ${error.toString()}` };
  }
}

function testDashboardStats() {
  try {
    const stats = getDashboardStats();
    
    const requiredFields = ['totalTeachers', 'totalSchools', 'schoolStats', 'positionStats', 'prefixStats'];
    
    for (const field of requiredFields) {
      if (!(field in stats)) {
        return { success: false, message: `ขาด stats field: ${field}` };
      }
    }
    
    if (typeof stats.totalTeachers !== 'number') {
      return { success: false, message: 'totalTeachers ไม่ใช่ตัวเลข' };
    }
    
    if (typeof stats.totalSchools !== 'number') {
      return { success: false, message: 'totalSchools ไม่ใช่ตัวเลข' };
    }
    
    return { success: true, message: `Dashboard stats ทำงานปกติ (${stats.totalTeachers} ครู, ${stats.totalSchools} โรงเรียน)` };
  } catch (error) {
    return { success: false, message: `Dashboard stats error: ${error.toString()}` };
  }
}

function testSessionManagement() {
  try {
    // Test logout
    const logoutResult = logoutUser();
    if (!logoutResult.success) {
      return { success: false, message: `Logout ล้มเหลว: ${logoutResult.message}` };
    }
    
    // Test session after logout
    const sessionAfterLogout = getUserSession();
    if (sessionAfterLogout) {
      return { success: false, message: 'Session ยังคงอยู่หลัง logout' };
    }
    
    // Re-login for other tests
    authenticateUser('admin', 'admin123');
    
    return { success: true, message: 'Session management ทำงานปกติ' };
  } catch (error) {
    return { success: false, message: `Session management error: ${error.toString()}` };
  }
}

/**
 * Performance test
 */
function testPerformance() {
  console.log('⚡ ทดสอบประสิทธิภาพ...');
  
  const startTime = new Date().getTime();
  
  // Test data loading
  const teachers = getTeachersData();
  const stats = getDashboardStats();
  
  const endTime = new Date().getTime();
  const loadTime = endTime - startTime;
  
  console.log(`📊 เวลาโหลดข้อมูล: ${loadTime}ms`);
  console.log(`👥 จำนวนครู: ${teachers.length}`);
  console.log(`🏫 จำนวนโรงเรียน: ${stats.totalSchools}`);
  
  if (loadTime > 5000) {
    console.log('⚠️ การโหลดข้อมูลช้าเกินไป (>5s)');
  } else if (loadTime > 2000) {
    console.log('🔶 การโหลดข้อมูลช้าปานกลาง (>2s)');
  } else {
    console.log('✅ การโหลดข้อมูลรวดเร็ว (<2s)');
  }
  
  return {
    loadTime,
    teachersCount: teachers.length,
    schoolsCount: stats.totalSchools
  };
}

/**
 * Data integrity test
 */
function testDataIntegrity() {
  console.log('🔍 ทดสอบความถูกต้องของข้อมูล...');
  
  try {
    const teachers = getTeachersData();
    const issues = [];
    
    teachers.forEach((teacher, index) => {
      // Check required fields
      if (!teacher.firstName || !teacher.lastName) {
        issues.push(`ครูลำดับ ${index + 1}: ขาดชื่อหรือนามสกุล`);
      }
      
      // Check ID uniqueness
      const duplicateIds = teachers.filter(t => t.id === teacher.id);
      if (duplicateIds.length > 1) {
        issues.push(`ครู ID ${teacher.id}: ID ซ้ำ`);
      }
      
      // Check code format
      if (teacher.code && !/^T\d+$/.test(teacher.code)) {
        issues.push(`ครู ${teacher.firstName}: รหัสผิดรูปแบบ (${teacher.code})`);
      }
    });
    
    if (issues.length === 0) {
      console.log('✅ ข้อมูลมีความถูกต้องครบถ้วน');
    } else {
      console.log(`⚠️ พบปัญหาข้อมูล ${issues.length} รายการ:`);
      issues.forEach(issue => console.log(`   - ${issue}`));
    }
    
    return { issues, teachersCount: teachers.length };
  } catch (error) {
    console.log('❌ ไม่สามารถตรวจสอบข้อมูลได้:', error.toString());
    return { error: error.toString() };
  }
}