import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminMessages from './pages/AdminMessages';
import MessagePage from './pages/MessagePage';
import AdminMessagesPage from './pages/AdminMessagesPage';
import MyComponent from './components/MyComponent'; // وارد کردن کامپوننت جدید
import Home from './pages/Home'; // اضافه کردن صفحه اصلی

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* مسیر پیش‌فرض */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-messages" element={<AdminMessages />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/admin/messages" element={<AdminMessagesPage />} />
        <Route path="/mycomponent" element={<MyComponent />} /> {/* مسیر برای کامپوننت جدید */}
      </Routes>
    </Router>
  );
};

export default App;
