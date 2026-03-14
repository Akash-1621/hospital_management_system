import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DoctorsSection from './components/DoctorsSection';
import PatientsSection from './components/PatientsSection';
import NursesSection from './components/NursesSection';
import ReceptionistsSection from './components/ReceptionistsSection';
import ReportsSection from './components/ReportsSection';
import DetailsSection from './components/DetailsSection';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import HelpSection from './components/HelpSection';
import Footer from './components/Footer';
import ApiTester from './components/ApiTester';
import PatientPortal from './components/PatientPortal';
import AppointmentBooking from './components/AppointmentBooking';
import AIChatbot from './components/AIChatbot';
import Login from './pages/Login';
import { DoctorDashboard, PatientDashboard, ReceptionistDashboard } from './pages/Dashboards';
import ProtectedRoute from './components/ProtectedRoute';

function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
        style={{ scaleX }}
      />
      <Hero />
      <DoctorsSection />
      <PatientsSection />
      <NursesSection />
      <ReceptionistsSection />
      <ReportsSection />
      <DetailsSection />
    </>
  );
}

function App() {
  const location = useLocation();
  const isPortalRoute = location.pathname === '/login' || location.pathname.includes('-dashboard');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
      {!isPortalRoute && <Navbar />}
      {!isPortalRoute && <AIChatbot />}
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/doctor-dashboard" element={
            <ProtectedRoute allowedRoles={['Doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/patient-dashboard" element={
            <ProtectedRoute allowedRoles={['Patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/receptionist-dashboard" element={
            <ProtectedRoute allowedRoles={['Receptionist']}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          } />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/team" element={<TeamSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/help" element={<HelpSection />} />
          
          {/* Catch-all and Redirects */}
          <Route path="/doctor dashboard" element={<Navigate to="/doctor-dashboard" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isPortalRoute && <Footer />}
    </div>
  );
}

export default App;
