/**
 * Quick Setup Script for Dashboard System
 * รันฟังก์ชันนี้ใน Google Apps Script Editor เพื่อตั้งค่าระบบอัตโนมัติ
 */

function quickSetup() {
  try {
    // Step 1: Check spreadsheet access
    console.log('🔄 ตรวจสอบการเข้าถึง Google Sheets...');
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('✅ เข้าถึง Google Sheets สำเร็จ');
    
    // Step 2: Initialize sample data
    console.log('🔄 สร้างข้อมูลตัวอย่าง...');
    const initResult = initializeSampleData();
    
    if (initResult.success) {
      console.log('✅ สร้างข้อมูลตัวอย่างสำเร็จ');
    } else {
      console.log('❌ เกิดข้อผิดพลาด:', initResult.message);
      return initResult;
    }
    
    // Step 3: Test authentication
    console.log('🔄 ทดสอบระบบยืนยันตัวตน...');
    const authResult = authenticateUser('admin', 'admin123');
    
    if (authResult.success) {
      console.log('✅ ระบบยืนยันตัวตนทำงานปกติ');
    } else {
      console.log('❌ ระบบยืนยันตัวตนมีปัญหา:', authResult.message);
    }
    
    // Step 4: Test data retrieval
    console.log('🔄 ทดสอบการดึงข้อมูล...');
    const teachers = getTeachersData();
    const stats = getDashboardStats();
    
    console.log('✅ ข้อมูลครู:', teachers.length, 'รายการ');
    console.log('✅ สถิติ:', 'โรงเรียน', stats.totalSchools, 'แห่ง, ครู', stats.totalTeachers, 'คน');
    
    // Step 5: Final check
    console.log('🔄 ตรวจสอบโครงสร้างข้อมูลสุดท้าย...');
    const structureResult = checkSheetStructure();
    
    console.log('📊 สรุปผลการตรวจสอบ:');
    console.log('   📋 Spreadsheet:', structureResult.spreadsheetExists ? '✅' : '❌');
    console.log('   👥 Users Sheet:', structureResult.usersSheet ? '✅' : '❌');
    console.log('   👨‍🏫 Teachers Sheet:', structureResult.teachersSheet ? '✅' : '❌');
    console.log('   🏗️ Users Structure:', structureResult.usersStructure ? '✅' : '❌');
    console.log('   🏗️ Teachers Structure:', structureResult.teachersStructure ? '✅' : '❌');
    
    if (structureResult.usersSheet && structureResult.teachersSheet && 
        structureResult.usersStructure && structureResult.teachersStructure) {
      
      console.log('🎉 การตั้งค่าเสร็จสมบูรณ์!');
      console.log('📝 ขั้นตอนต่อไป:');
      console.log('   1. Deploy โปรเจกต์เป็น Web App');
      console.log('   2. อนุญาตสิทธิ์การเข้าถึง');
      console.log('   3. ทดสอบเข้าสู่ระบบด้วย admin/admin123');
      
      return { 
        success: true, 
        message: 'การตั้งค่าเสร็จสมบูรณ์',
        data: {
          teachers: teachers.length,
          schools: stats.totalSchools,
          users: 4
        }
      };
    } else {
      console.log('⚠️ พบปัญหาในการตั้งค่า กรุณาตรวจสอบโครงสร้างข้อมูล');
      return { 
        success: false, 
        message: 'พบปัญหาในการตั้งค่า',
        details: structureResult 
      };
    }
    
  } catch (error) {
    console.log('❌ เกิดข้อผิดพลาดในการตั้งค่า:', error.toString());
    return { 
      success: false, 
      message: 'เกิดข้อผิดพลาดในการตั้งค่า: ' + error.toString() 
    };
  }
}

/**
 * Test deployment function
 */
function testDeployment() {
  try {
    console.log('🔄 ทดสอบการ Deploy...');
    
    // Test doGet function
    const testRequest = { parameter: {} };
    const response = doGet(testRequest);
    
    if (response) {
      console.log('✅ ฟังก์ชัน doGet ทำงานปกติ');
      console.log('📄 Content Type:', response.getContentType());
    }
    
    // Test server functions
    const functions = [
      'authenticateUser',
      'getTeachersData',
      'getDashboardStats',
      'addTeacher',
      'updateTeacher',
      'deleteTeacher',
      'searchTeachers',
      'logoutUser'
    ];
    
    console.log('🔄 ตรวจสอบฟังก์ชันสำคัญ...');
    functions.forEach(funcName => {
      if (typeof eval(funcName) === 'function') {
        console.log(`   ✅ ${funcName}`);
      } else {
        console.log(`   ❌ ${funcName}`);
      }
    });
    
    return { success: true, message: 'การทดสอบ Deployment สำเร็จ' };
  } catch (error) {
    console.log('❌ การทดสอบ Deployment ล้มเหลว:', error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Reset all data (ใช้ระวัง!)
 */
function resetAllData() {
  try {
    console.log('⚠️ กำลังรีเซ็ตข้อมูลทั้งหมด...');
    
    // Clear sessions
    PropertiesService.getScriptProperties().deleteProperty('userSession');
    
    // Reinitialize data
    const result = initializeSampleData();
    
    console.log(result.success ? '✅ รีเซ็ตข้อมูลสำเร็จ' : '❌ รีเซ็ตข้อมูลล้มเหลว');
    return result;
  } catch (error) {
    console.log('❌ เกิดข้อผิดพลาดในการรีเซ็ต:', error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Get system status
 */
function getSystemStatus() {
  try {
    const status = {
      timestamp: new Date(),
      spreadsheet: false,
      authentication: false,
      dataAccess: false,
      teachers: 0,
      schools: 0,
      users: 0
    };
    
    // Check spreadsheet
    try {
      SpreadsheetApp.openById(SPREADSHEET_ID);
      status.spreadsheet = true;
    } catch (e) {
      console.log('❌ Spreadsheet access failed');
    }
    
    // Check authentication
    try {
      const authResult = authenticateUser('admin', 'admin123');
      status.authentication = authResult.success;
    } catch (e) {
      console.log('❌ Authentication failed');
    }
    
    // Check data access
    try {
      const teachers = getTeachersData();
      const stats = getDashboardStats();
      status.dataAccess = true;
      status.teachers = teachers.length;
      status.schools = stats.totalSchools;
      status.users = 4; // Default sample users
    } catch (e) {
      console.log('❌ Data access failed');
    }
    
    console.log('📊 System Status:', status);
    return status;
  } catch (error) {
    console.log('❌ Failed to get system status:', error.toString());
    return { error: error.toString() };
  }
}

/**
 * Instructions for deployment
 */
function showDeploymentInstructions() {
  console.log(`
🚀 คำแนะนำการ Deploy Google Apps Script

📋 ขั้นตอนการ Deploy:
1. รันฟังก์ชัน quickSetup() เพื่อตั้งค่าข้อมูลเบื้องต้น
2. คลิก Deploy > New deployment
3. เลือก Type: Web app
4. ตั้งค่า Execute as: Me
5. ตั้งค่า Who has access: Anyone หรือ Anyone with Google account
6. คลิก Deploy
7. อนุญาตสิทธิ์ที่จำเป็น
8. เก็บ Web app URL ที่ได้รับ

🔐 ข้อมูลการ Login:
- Username: admin
- Password: admin123

📊 Google Sheets ID: ${SPREADSHEET_ID}

⚠️ หมายเหตุ:
- ตรวจสอบให้แน่ใจว่า Google Sheets มีสิทธิ์ในการแก้ไข
- หากเกิดปัญหา ให้รันฟังก์ชัน resetAllData()
- สามารถรันฟังก์ชัน getSystemStatus() เพื่อตรวจสอบสถานะระบบ
  `);
}