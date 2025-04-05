import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminMessages from './pages/AdminMessages';
import MessagePage from './pages/MessagePage';  // صفحه پیام‌های کاربران
import AdminMessagesPage from './pages/AdminMessagesPage';  // صفحه پیام‌های ادمین

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/admin-messages" component={AdminMessages} />
        <Route path="/messages" component={MessagePage} />  {/* مسیر جدید برای پیام‌های کاربران */}
        <Route path="/admin/messages" component={AdminMessagesPage} />  {/* مسیر جدید برای پیام‌های ادمین */}
      </Switch>
    </Router>
  );
};

export default App;
