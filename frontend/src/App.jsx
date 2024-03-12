import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider from your AuthContext file
import './App.css';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/Signup.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import StaffDashboard from './components/StaffDashboard.jsx';
import StaffMain from './components/StaffMain.jsx';
import AdminStaffInfo from './components/AdminStaffInfo.jsx';
import AdminReport from './components/AdminReport.jsx';
import Profile from './components/Profile.jsx';

function App() {
  return (
    <div className="App">
      <AuthProvider> 
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/StaffMain' element={<StaffMain />} />
            <Route path='/AdminDashboard' element={<AdminDashboard />} />
            <Route path='/StaffDashboard' element={<StaffDashboard />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/Signup' element={<SignUp />} />
            <Route path='/AdminStaffInfo' element={<AdminStaffInfo />} />
            <Route path='/AdminReport' element={<AdminReport />} />
            <Route path='/Profile' element={<Profile />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
