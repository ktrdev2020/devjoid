/**
 * Google Apps Script Dashboard System
 * รายงานข้อมูล - Data Report System
 * สพป.ศรีสะเกษ เขต 3
 */

// Configuration
const SPREADSHEET_ID = '1pnGLgyvoa14fGnISUbWKUWU4k0KId5mNtqfo-dhl-dE';
const USERS_SHEET = 'users';
const TEACHERS_SHEET = 'Teachers';

/**
 * Main function to serve the web app
 */
function doGet(e) {
  const page = e.parameter.page;
  
  // Check if user is logged in
  const userSession = getUserSession();
  
  if (!userSession && page !== 'login') {
    // Redirect to login if not authenticated
    return HtmlService.createTemplateFromFile('Login')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  }
  
  // Serve appropriate page
  switch(page) {
    case 'login':
      return HtmlService.createTemplateFromFile('Login')
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    default:
      return HtmlService.createTemplateFromFile('Dashboard')
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  }
}

/**
 * Include external files in HTML
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Authentication Functions
 */

/**
 * Authenticate user login
 */
function authenticateUser(username, password) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(USERS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    // Skip header row and check credentials
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === username && data[i][2] === password) {
        // Store session
        const session = {
          userId: data[i][0],
          username: username,
          loginTime: new Date().getTime()
        };
        PropertiesService.getScriptProperties().setProperty('userSession', JSON.stringify(session));
        return { success: true, message: 'เข้าสู่ระบบสำเร็จ' };
      }
    }
    
    return { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
  } catch (error) {
    Logger.log('Authentication error: ' + error.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
  }
}

/**
 * Get current user session
 */
function getUserSession() {
  try {
    const sessionData = PropertiesService.getScriptProperties().getProperty('userSession');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      // Check if session is still valid (24 hours)
      const currentTime = new Date().getTime();
      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
      
      if (currentTime - session.loginTime < sessionDuration) {
        return session;
      }
    }
    return null;
  } catch (error) {
    Logger.log('Session error: ' + error.toString());
    return null;
  }
}

/**
 * Logout user
 */
function logoutUser() {
  try {
    PropertiesService.getScriptProperties().deleteProperty('userSession');
    return { success: true, message: 'ออกจากระบบสำเร็จ' };
  } catch (error) {
    Logger.log('Logout error: ' + error.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดในการออกจากระบบ' };
  }
}

/**
 * Data Management Functions
 */

/**
 * Get all teachers data
 */
function getTeachersData() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(TEACHERS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    if (data.length === 0) return [];
    
    const headers = data[0];
    const teachers = [];
    
    for (let i = 1; i < data.length; i++) {
      const teacher = {};
      headers.forEach((header, index) => {
        teacher[header] = data[i][index] || '';
      });
      teachers.push(teacher);
    }
    
    return teachers;
  } catch (error) {
    Logger.log('Get teachers error: ' + error.toString());
    throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลครู');
  }
}

/**
 * Add new teacher
 */
function addTeacher(teacherData) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(TEACHERS_SHEET);
    const lastRow = sheet.getLastRow();
    
    // Generate new ID
    const newId = lastRow; // Simple ID generation
    
    const newRow = [
      newId,
      teacherData.code || '',
      teacherData.prefix || '',
      teacherData.firstName || '',
      teacherData.lastName || '',
      teacherData.position || '',
      teacherData.school || ''
    ];
    
    sheet.appendRow(newRow);
    return { success: true, message: 'เพิ่มข้อมูลครูสำเร็จ', id: newId };
  } catch (error) {
    Logger.log('Add teacher error: ' + error.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูลครู' };
  }
}

/**
 * Update teacher data
 */
function updateTeacher(teacherId, teacherData) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(TEACHERS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    // Find the row with matching ID
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == teacherId) {
        const updatedRow = [
          teacherId,
          teacherData.code || '',
          teacherData.prefix || '',
          teacherData.firstName || '',
          teacherData.lastName || '',
          teacherData.position || '',
          teacherData.school || ''
        ];
        
        sheet.getRange(i + 1, 1, 1, updatedRow.length).setValues([updatedRow]);
        return { success: true, message: 'อัพเดทข้อมูลครูสำเร็จ' };
      }
    }
    
    return { success: false, message: 'ไม่พบข้อมูลครูที่ต้องการอัพเดท' };
  } catch (error) {
    Logger.log('Update teacher error: ' + error.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูลครู' };
  }
}

/**
 * Delete teacher
 */
function deleteTeacher(teacherId) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(TEACHERS_SHEET);
    const data = sheet.getDataRange().getValues();
    
    // Find the row with matching ID
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == teacherId) {
        sheet.deleteRow(i + 1);
        return { success: true, message: 'ลบข้อมูลครูสำเร็จ' };
      }
    }
    
    return { success: false, message: 'ไม่พบข้อมูลครูที่ต้องการลบ' };
  } catch (error) {
    Logger.log('Delete teacher error: ' + error.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดในการลบข้อมูลครู' };
  }
}

/**
 * Get dashboard statistics
 */
function getDashboardStats() {
  try {
    const teachers = getTeachersData();
    
    // Calculate statistics
    const totalTeachers = teachers.length;
    const schoolStats = {};
    const positionStats = {};
    const prefixStats = {};
    
    teachers.forEach(teacher => {
      // School statistics
      const school = teacher.school || 'ไม่ระบุ';
      schoolStats[school] = (schoolStats[school] || 0) + 1;
      
      // Position statistics
      const position = teacher.position || 'ไม่ระบุ';
      positionStats[position] = (positionStats[position] || 0) + 1;
      
      // Prefix statistics
      const prefix = teacher.prefix || 'ไม่ระบุ';
      prefixStats[prefix] = (prefixStats[prefix] || 0) + 1;
    });
    
    return {
      totalTeachers,
      totalSchools: Object.keys(schoolStats).length,
      schoolStats,
      positionStats,
      prefixStats,
      recentUpdates: teachers.slice(-5).reverse() // Last 5 teachers
    };
  } catch (error) {
    Logger.log('Dashboard stats error: ' + error.toString());
    throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ');
  }
}

/**
 * Search teachers
 */
function searchTeachers(searchTerm, filterField) {
  try {
    const teachers = getTeachersData();
    
    if (!searchTerm) return teachers;
    
    const filtered = teachers.filter(teacher => {
      if (filterField && filterField !== 'all') {
        const fieldValue = (teacher[filterField] || '').toString().toLowerCase();
        return fieldValue.includes(searchTerm.toLowerCase());
      } else {
        // Search in all fields
        return Object.values(teacher).some(value => 
          (value || '').toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });
    
    return filtered;
  } catch (error) {
    Logger.log('Search teachers error: ' + error.toString());
    throw new Error('เกิดข้อผิดพลาดในการค้นหาข้อมูลครู');
  }
}

/**
 * Initialize sample data for both users and teachers sheets
 */
function initializeSampleData() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Initialize Users Sheet
    let usersSheet = spreadsheet.getSheetByName(USERS_SHEET);
    if (!usersSheet) {
      usersSheet = spreadsheet.insertSheet(USERS_SHEET);
    }
    
    // Clear and setup users data
    usersSheet.clear();
    const userHeaders = ['id', 'user', 'password'];
    usersSheet.getRange(1, 1, 1, userHeaders.length).setValues([userHeaders]);
    
    const usersData = [
      [1, 'admin', 'admin123'],
      [2, 'teacher1', 'pass123'],
      [3, 'teacher2', 'pass456'],
      [4, 'director', 'dir123']
    ];
    
    usersSheet.getRange(2, 1, usersData.length, userHeaders.length).setValues(usersData);
    
    // Initialize Teachers Sheet
    let teachersSheet = spreadsheet.getSheetByName(TEACHERS_SHEET);
    if (!teachersSheet) {
      teachersSheet = spreadsheet.insertSheet(TEACHERS_SHEET);
    }
    
    // Clear and setup teachers data
    teachersSheet.clear();
    const teacherHeaders = ['id', 'code', 'prefix', 'firstName', 'lastName', 'position', 'school'];
    teachersSheet.getRange(1, 1, 1, teacherHeaders.length).setValues([teacherHeaders]);
    
    const teachersData = [
      [1, 'T001', 'นาย', 'สมชาย', 'ใจดี', 'ครูผู้สอน', 'โรงเรียนบ้านดง'],
      [2, 'T002', 'นาง', 'สมศรี', 'ใสใจ', 'หัวหน้าฝ่าย', 'โรงเรียนบ้านไผ่'],
      [3, 'T003', 'นางสาว', 'สุภา', 'ดีใจ', 'ครูผู้สอน', 'โรงเรียนบ้านดง'],
      [4, 'T004', 'นาย', 'สมปอง', 'มีใจ', 'ผู้อำนวยการ', 'โรงเรียนบ้านไผ่'],
      [5, 'T005', 'นาง', 'สมหญิง', 'เมตตา', 'รองผู้อำนวยการ', 'โรงเรียนบ้านไผ่'],
      [6, 'T006', 'นาย', 'สมศักดิ์', 'ดีงาม', 'ครูผู้สอน', 'โรงเรียนบ้านโค้ง'],
      [7, 'T007', 'นาง', 'สมรัก', 'รักดี', 'ครูผู้สอน', 'โรงเรียนบ้านคลอง'],
      [8, 'T008', 'นางสาว', 'สมใจ', 'ใจงาม', 'ครูชำนาญการ', 'โรงเรียนบ้านสวน'],
      [9, 'T009', 'นาย', 'สมหมาย', 'หมายดี', 'รองผู้อำนวยการ', 'โรงเรียนบ้านไร่'],
      [10, 'T010', 'นาง', 'สมจิต', 'จิตดี', 'ผู้อำนวยการ', 'โรงเรียนบ้านน้อย'],
      [11, 'T011', 'นาย', 'สมควร', 'ควรดี', 'ครูผู้สอน', 'โรงเรียนบ้านใหญ่'],
      [12, 'T012', 'นางสาว', 'สมนึก', 'นึกดี', 'ครูผู้สอน', 'โรงเรียนวัดใหม่'],
      [13, 'T013', 'นาง', 'สมปรารถนา', 'ปรารถนาดี', 'หัวหน้าฝ่าย', 'โรงเรียนวัดเก่า'],
      [14, 'T014', 'นาย', 'สมคิด', 'คิดดี', 'ครูชำนาญการพิเศษ', 'โรงเรียนบ้านดง'],
      [15, 'T015', 'นาง', 'สมหวัง', 'หวังดี', 'ครูเชี่ยวชาญ', 'โรงเรียนบ้านไผ่']
    ];
    
    teachersSheet.getRange(2, 1, teachersData.length, teacherHeaders.length).setValues(teachersData);
    
    return { success: true, message: 'สร้างข้อมูลตัวอย่างทั้งหมดสำเร็จ' };
  } catch (error) {
    Logger.log('Initialize sample data error: ' + error.toString());
    return { success: false, message: 'เกิดข้อผิดพลาดในการสร้างข้อมูลตัวอย่าง: ' + error.toString() };
  }
}

/**
 * Test function to create sample teachers data only
 */
function createSampleData() {
  return initializeSampleData();
}

/**
 * Function to check and repair sheet structure
 */
function checkSheetStructure() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const result = {
      spreadsheetExists: true,
      usersSheet: false,
      teachersSheet: false,
      usersStructure: false,
      teachersStructure: false
    };
    
    // Check users sheet
    const usersSheet = spreadsheet.getSheetByName(USERS_SHEET);
    if (usersSheet) {
      result.usersSheet = true;
      const usersHeaders = usersSheet.getRange(1, 1, 1, 3).getValues()[0];
      if (usersHeaders[0] === 'id' && usersHeaders[1] === 'user' && usersHeaders[2] === 'password') {
        result.usersStructure = true;
      }
    }
    
    // Check teachers sheet
    const teachersSheet = spreadsheet.getSheetByName(TEACHERS_SHEET);
    if (teachersSheet) {
      result.teachersSheet = true;
      const teachersHeaders = teachersSheet.getRange(1, 1, 1, 7).getValues()[0];
      if (teachersHeaders[0] === 'id' && teachersHeaders[6] === 'school') {
        result.teachersStructure = true;
      }
    }
    
    return result;
  } catch (error) {
    Logger.log('Check sheet structure error: ' + error.toString());
    return { spreadsheetExists: false, error: error.toString() };
  }
}