# รายงานข้อมูล - Dashboard System
## ระบบแดชบอร์ดแสดงรายงานข้อมูลครู สพป.ศรีสะเกษ เขต 3

### 📋 คำอธิบายระบบ
ระบบแดชบอร์ดสำหรับการจัดการและแสดงรายงานข้อมูลครูด้วย Google Apps Script พร้อมระบบ Login/Logout, CRUD Operations, และกราฟแสดงข้อมูลแบบ Interactive

### 🚀 ติดตั้งระบบ (Installation Guide)

#### ขั้นตอนที่ 1: เตรียม Google Sheets
1. เปิด Google Sheets ใหม่หรือใช้ Sheet ID: `1pnGLgyvoa14fGnISUbWKUWU4k0KId5mNtqfo-dhl-dE`
2. สร้าง Sheet ตามโครงสร้างดังนี้:

**Sheet: "users"** (สำหรับข้อมูลผู้ใช้)
```
| A (id) | B (user)  | C (password) |
|--------|-----------|--------------|
| 1      | admin     | admin123     |
| 2      | teacher1  | pass123      |
```

**Sheet: "Teachers"** (สำหรับข้อมูลครู)
```
| A (id) | B (code) | C (prefix) | D (firstName) | E (lastName) | F (position) | G (school) |
|--------|----------|------------|---------------|--------------|--------------|------------|
| 1      | T001     | นาย        | สมชาย         | ใจดี          | ครูผู้สอน     | โรงเรียนบ้านดง |
```

#### ขั้นตอนที่ 2: สร้าง Google Apps Script Project
1. ไปที่ [Google Apps Script](https://script.google.com)
2. คลิก "โครงการใหม่" (New Project)
3. ตั้งชื่อโครงการ: "รายงานข้อมูล Dashboard"

#### ขั้นตอนที่ 3: อัพโหลดไฟล์
สร้างไฟล์ในโครงการตามลำดับ:

1. **ลบไฟล์ Code.gs เดิม** และสร้างใหม่ด้วยเนื้อหาจากไฟล์ `Code.gs`
2. **สร้างไฟล์ HTML** โดยคลิก + > HTML file:
   - `Login.html` - วางเนื้อหาจากไฟล์ Login.html
   - `Dashboard.html` - วางเนื้อหาจากไฟล์ Dashboard.html
   - `CSS.html` - วางเนื้อหาจากไฟล์ CSS.html
   - `JavaScript.html` - วางเนื้อหาจากไฟล์ JavaScript.html
   - `ModalTeacher.html` - วางเนื้อหาจากไฟล์ ModalTeacher.html

#### ขั้นตอนที่ 4: ตั้งค่า Deployment
1. คลิก "Deploy" > "New deployment"
2. เลือก Type: "Web app"
3. ตั้งค่า:
   - Description: "รายงานข้อมูล Dashboard v1.0"
   - Execute as: "Me"
   - Who has access: "Anyone with Google account" หรือ "Anyone"
4. คลิก "Deploy"
5. **เก็บ Web app URL** ที่ได้รับ

#### ขั้นตอนที่ 5: ตั้งค่าสิทธิ์
1. หลังจาก Deploy แล้ว คลิก "Authorize access"
2. เลือกบัญชี Google
3. อนุญาตสิทธิ์ในการเข้าถึง Google Sheets

#### ขั้นตอนที่ 6: ทดสอบระบบ
1. เปิด Web app URL ที่ได้รับ
2. ทดสอบ Login ด้วย:
   - Username: `admin`
   - Password: `admin123`
3. ตรวจสอบการทำงานของ Dashboard

---

### 🔧 การใช้งานระบบ

#### 🔐 ระบบ Login/Logout
- **Login**: ใช้ข้อมูลจาก Sheet "users" (คอลัมน์ B = username, คอลัมน์ C = password)
- **Session**: อัตโนมัติหมดอายุใน 24 ชั่วโมง
- **Logout**: ออกจากระบบและลบ Session

#### 📊 ฟีเจอร์หลัก

**1. แดชบอร์ด (Dashboard)**
- สถิติจำนวนครูทั้งหมด
- สถิติจำนวนโรงเรียน
- กราหวงกลมแสดงสัดส่วนตำแหน่งงาน
- กราฟแท่งแสดงจำนวนครูในแต่ละโรงเรียน

**2. ข้อมูลครู (Teachers Management)**
- ตารางแสดงข้อมูลครูทั้งหมด
- ค้นหาและกรองข้อมูล
- เพิ่ม/แก้ไข/ลบข้อมูลครู
- Modal form สำหรับการจัดการข้อมูล

**3. กราฟและสถิติ (Charts & Statistics)**
- กราฟเส้นแสดงแนวโน้ม
- กราฟวงกลมแสดงสัดส่วนคำนำหน้า
- กราฟแท่งแสดงตำแหน่งงาน

**4. รายงาน (Reports)**
- สรุปข้อมูลตามตำแหน่ง
- สรุปข้อมูลตามโรงเรียน
- ส่งออกข้อมูล

#### 📱 Responsive Design
- รองรับหน้าจอมือถือและแท็บเล็ต
- เมนูด้านข้างจะซ่อนอัตโนมัติบนมือถือ
- ปุ่มและฟอร์มปรับขนาดอัตโนมัติ

---

### 🎨 การปรับแต่ง

#### สีธีม (Color Scheme)
```css
--russian-violet: #231942
--ultra-violet: #5e548e
--african-violet: #9f86c0
--lilac: #be95c4
--pink-lavender: #e0b1cb
```

#### โลโก้และข้อมูลองค์กร
- **Logo URL**: `https://person.ssk3.go.th/wp-content/uploads/2023/12/%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B9%80%E0%B8%82%E0%B8%95-3-removebg-preview.png`
- **หน่วยงาน**: กลุ่มพัฒนาข้าราชการครูฯ สพป.ศรีสะเกษ เขต 3

#### ฟอนต์
- **หลัก**: Kanit (Google Fonts)
- **รองรับ**: Thai, English

---

### 🔍 การแก้ไขปัญหา (Troubleshooting)

#### ปัญหาที่พบบ่อย

**1. หน้าขาว (White Screen)**
- ตรวจสอบ console browser สำหรับ error
- ตรวจสอบการเขียน event.preventDefault() ในทุกฟังก์ชัน
- ตรวจสอบ SPREADSHEET_ID ในไฟล์ Code.gs

**2. Login ไม่ได้**
- ตรวจสอบข้อมูล users ใน Google Sheets
- ตรวจสอบ Sheet name "users" (case-sensitive)
- ตรวจสอบสิทธิ์การเข้าถึง Google Sheets

**3. ข้อมูลไม่แสดง**
- ตรวจสอบ Sheet name "Teachers" 
- ตรวจสอบโครงสร้างคอลัมน์ตาม specification
- ตรวจสอบ Google Apps Script permissions

**4. กราฟไม่แสดง**
- ตรวจสอบการโหลด Chart.js library
- ตรวจสอบข้อมูลใน Dashboard stats
- ลองรีเฟรชหน้าเว็บ

#### การอัพเดทระบบ
1. แก้ไขไฟล์ใน Google Apps Script Editor
2. Save ไฟล์ (Ctrl+S)
3. ทดสอบการทำงาน
4. หากต้องการ Deploy ใหม่: Deploy > New deployment

---

### 📚 เทคโนโลยีที่ใช้

- **Backend**: Google Apps Script (JavaScript)
- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 5.3.0
- **Charts**: Chart.js
- **Icons**: Font Awesome 6.4.0
- **Alerts**: SweetAlert2
- **Fonts**: Google Fonts (Kanit)
- **Database**: Google Sheets

---

### 🔒 ความปลอดภัย

- Session-based authentication
- Input validation และ sanitization
- Error handling ป้องกัน information disclosure
- HTTPS encryption (Google Apps Script)
- Access control ตามสิทธิ์ผู้ใช้

---

### 📞 ติดต่อและสนับสนุน

**ผู้พัฒนา**: กลุ่มพัฒนาข้าราชการครูฯ สพป.ศรีสะเกษ เขต 3  
**ปีที่พัฒนา**: 2025  
**เวอร์ชัน**: 1.0.0

สำหรับการสนับสนุนหรือปัญหาการใช้งาน กรุณาติดต่อผู้ดูแลระบบ