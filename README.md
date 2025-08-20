# 📊 รายงานข้อมูล - Dashboard System

[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://script.google.com)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)](https://www.chartjs.org)

## 🎯 ภาพรวมระบบ

ระบบแดชบอร์ดสำหรับการจัดการและแสดงรายงานข้อมูลครู **สพป.ศรีสะเกษ เขต 3** ที่พัฒนาด้วย Google Apps Script พร้อมระบบยืนยันตัวตน การจัดการข้อมูล และการแสดงผลด้วยกราฟแบบ Interactive

## ✨ ฟีเจอร์หลัก

### 🔐 ระบบยืนยันตัวตน
- 🔑 Login/Logout ด้วย Google Sheets
- ⏰ Session Management (24 ชั่วโมง)
- 🛡️ ความปลอดภัยระดับ Enterprise

### 📊 Dashboard และรายงาน
- 📈 กราฟเส้น (Line Charts)
- 📊 กราฟแท่ง (Bar Charts) 
- 🥧 กราฟวงกลม (Pie Charts)
- 📋 ตารางข้อมูลแบบ Interactive
- 🔍 ระบบค้นหาและกรองข้อมูล

### 👥 การจัดการข้อมูลครู (CRUD)
- ➕ เพิ่มข้อมูลครูใหม่
- ✏️ แก้ไขข้อมูลครู
- 🗑️ ลบข้อมูลครู
- 🔍 ค้นหาและกรองข้อมูล
- 📱 Modal Form แบบ Responsive

### 📱 Responsive Design
- 💻 รองรับ Desktop, Tablet, Mobile
- 🎨 UI/UX ทันสมัยด้วย Bootstrap 5
- 🌈 Color Scheme ตามที่กำหนด
- 🚀 Performance ที่เหมาะสม

## 🎨 Color Scheme

```css
🟣 Russian Violet: #231942
🟣 Ultra Violet: #5e548e  
🟣 African Violet: #9f86c0
🟣 Lilac: #be95c4
🌸 Pink Lavender: #e0b1cb
```

## 📁 โครงสร้างไฟล์

```
📂 devjoid/
├── 📄 Code.gs                 # เซิร์ฟเวอร์ไซด์ Google Apps Script
├── 📄 Login.html              # หน้าล็อกอิน
├── 📄 Dashboard.html          # หน้าแดชบอร์ด
├── 📄 CSS.html                # สไตล์ CSS แบบ Responsive
├── 📄 JavaScript.html         # ฟังก์ชัน JavaScript
├── 📄 ModalTeacher.html       # Modal สำหรับจัดการข้อมูลครู
├── 📄 INSTALLATION.md         # คู่มือการติดตั้งแบบละเอียด
└── 📄 README.md               # เอกสารนี้
```

## 🚀 การติดตั้งแบบด่วน

### ขั้นตอนที่ 1: Setup Google Sheets
```
1. สร้าง Google Sheets ใหม่หรือใช้ ID: 1pnGLgyvoa14fGnISUbWKUWU4k0KId5mNtqfo-dhl-dE
2. สร้าง Sheet "users" และ "Teachers" ตามโครงสร้างที่กำหนด
```

### ขั้นตอนที่ 2: Deploy Google Apps Script
```
1. ไปที่ script.google.com
2. สร้างโครงการใหม่
3. Copy ไฟล์ทั้งหมดจาก Repository นี้
4. Deploy เป็น Web App
5. อนุญาตสิทธิ์
```

### ขั้นตอนที่ 3: ทดสอบระบบ
```
Login: admin / admin123
```

📖 **[คู่มือการติดตั้งแบบละเอียด](INSTALLATION.md)**

## 🛠️ เทคโนโลยีที่ใช้

| เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|-----------|---------|---------|
| **Google Apps Script** | Latest | Backend & Server |
| **Bootstrap** | 5.3.0 | CSS Framework |
| **Chart.js** | Latest | Data Visualization |
| **SweetAlert2** | 11 | Notifications |
| **Font Awesome** | 6.4.0 | Icons |
| **Google Fonts** | Kanit | Typography |

## 📊 ข้อมูลที่ใช้งาน

### Sheet: "users"
| คอลัมน์ | ประเภท | คำอธิบาย |
|---------|--------|----------|
| A (id) | Number | รหัสผู้ใช้ |
| B (user) | String | ชื่อผู้ใช้ |
| C (password) | String | รหัสผ่าน |

### Sheet: "Teachers"
| คอลัมน์ | ประเภท | คำอธิบาย |
|---------|--------|----------|
| A (id) | Number | รหัสครู |
| B (code) | String | รหัสประจำตัวครู |
| C (prefix) | String | คำนำหน้า |
| D (firstName) | String | ชื่อ |
| E (lastName) | String | นามสกุล |
| F (position) | String | ตำแหน่ง |
| G (school) | String | โรงเรียน |

## 🔧 ฟีเจอร์พิเศษ

### 🚨 SweetAlert Integration
- 📋 Loading States
- ✅ Success Notifications  
- ❌ Error Handling
- ❓ Confirmation Dialogs

### 📱 Mobile-First Design
- 🍔 Collapsible Sidebar
- 👆 Touch-Friendly Interface
- 📐 Flexible Grid System
- 🔄 Auto-Hide Menu

### 🎯 Advanced CRUD Operations
- ✅ Form Validation
- 🔍 Real-time Search
- 📊 Data Filtering
- 💾 Auto-Save

## 🎭 Demo Screenshots

### 🔐 Login Page
```
- Modern gradient design
- Form validation
- Loading states
- Error handling
```

### 📊 Dashboard
```
- Statistics cards
- Interactive charts
- Responsive layout
- Real-time data
```

### 👥 Teacher Management
```
- Data table with pagination
- Search and filter
- CRUD operations
- Modal forms
```

## 🔒 ความปลอดภัย

- 🔐 **Authentication**: Session-based login
- 🛡️ **Authorization**: Role-based access
- 🔒 **Data Protection**: Google Sheets security
- 🚫 **Input Validation**: XSS prevention
- 📝 **Error Handling**: Information disclosure prevention

## 🚀 Performance

- ⚡ **Fast Loading**: Optimized assets
- 📊 **Efficient Charts**: Chart.js optimization
- 📱 **Mobile Performance**: Lightweight code
- 🔄 **Caching**: Browser caching strategies

## 🤝 การสนับสนุน

### 📞 ติดต่อ
- **หน่วยงาน**: กลุ่มพัฒนาข้าราชการครูฯ สพป.ศรีสะเกษ เขต 3
- **ปีที่พัฒนา**: 2025
- **เวอร์ชัน**: 1.0.0

### 🐛 การรายงานปัญหา
หากพบปัญหาการใช้งาน กรุณาติดต่อผู้ดูแลระบบหรือสร้าง Issue ใน Repository นี้

### 📖 เอกสารเพิ่มเติม
- [คู่มือการติดตั้ง](INSTALLATION.md)
- [การแก้ไขปัญหา](INSTALLATION.md#-การแก้ไขปัญหา-troubleshooting)

## 📄 License

Copyright © 2025 สพป.ศรีสะเกษ เขต 3. All rights reserved.

---

💖 **พัฒนาด้วยความตั้งใจเพื่อการศึกษาไทย**