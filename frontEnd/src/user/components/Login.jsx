import React from 'react';
import { useState } from 'react';

function Login() {
  const [stu_email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectUrls, setRedirectUrls] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบถ้วนหรือไม่
    if (!stu_email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
      return;
    }
  
    // สร้าง URL สำหรับการเรียกใช้งาน
    const url = `http://localhost:3000/login?stu_email=${encodeURIComponent(stu_email)}&password=${encodeURIComponent(password)}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET', // ใช้ GET method
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
  
        // เก็บ redirect URLs ใน state
        setRedirectUrls(data.redirectUrls);
        
        // Redirect ผู้ใช้ไปยังหน้า StuHome
        window.location.href = data.redirectUrls[0];
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };
  
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login ja</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={stu_email} // เชื่อมต่อกับ state
              onChange={(e) => setEmail(e.target.value)} // อัพเดตค่า email ใน state
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password} // เชื่อมต่อกับ state
              onChange={(e) => setPassword(e.target.value)} // อัพเดตค่า password ใน state
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login
