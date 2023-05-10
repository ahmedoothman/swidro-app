// react
import React, { Suspense } from 'react';
// router
import { Routes, Route } from 'react-router-dom';
// components
// Auth Pages
const AuthPages = React.lazy(() => import('./pages/AuthPages'));
import { SignUp } from './pages/AuthPages/signUp';
import { SignIn } from './pages/AuthPages/signIn';
import { ForgetPassword } from './pages/AuthPages/forgetPassword';
import { ResetPassword } from './pages/AuthPages/resetPassword';
import { VerifyEmail } from './pages/AuthPages/verifyEmail';
// Dashboard Pages
const DashboardPages = React.lazy(() => import('./pages/Dashboards'));
import { Amenities } from './pages/Dashboards/amenities';
import { Devices } from './pages/Dashboards/devices';
import { Monitoring } from './pages/Dashboards/monitoring';
import { Settings } from './pages/Dashboards/settings';
import { Staff } from './pages/Dashboards/staff';
// styles
import './App.module.scss';

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth Routes */}
          <Route path='/*' element={<AuthPages />}>
            <Route path='sign-up' element={<SignUp />} />
            <Route path='forget-password' element={<ForgetPassword />} />
            <Route path='reset-password/:token' element={<ResetPassword />} />
            <Route path='verify-email/:token' element={<VerifyEmail />} />
            <Route path='*' element={<SignIn />} />
          </Route>
          {/* Dashboard Routes */}
          <Route path='/dashboard/*' element={<DashboardPages />}>
            <Route path='amenities' element={<Amenities />} />
            <Route path='devices' element={<Devices />} />
            <Route path='settings' element={<Settings />} />
            <Route path='staff' element={<Staff />} />
            <Route path='*' element={<Monitoring />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
