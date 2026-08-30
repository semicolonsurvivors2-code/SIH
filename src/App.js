import React from "react";
import { Routes, Route } from "react-router-dom";
// BrowserRouter, ThemeProvider, ToastProvider and AuthProvider are all
// applied in index.js — don't wrap them here again.

import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import ComingSoon from "./components/ComingSoon";
import NotFound from "./pages/NotFound";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ExploreCourses from "./pages/ExploreCourses";
import CourseDetails from "./pages/CourseDetails";
import LearningPlayer from "./pages/LearningPlayer";
import SearchResults from "./pages/SearchResults";
import TrainerProfile from "./pages/TrainerProfile";

import LearnerDashboard from "./pages/LearnerDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Assessments from "./pages/Assessments";
import QuizAttempt from "./pages/QuizAttempt";
import QuizResult from "./pages/QuizResult";
import Certificates from "./pages/Certificates";
import Certificate from "./pages/Certificate";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      {/* Public site: Navbar + Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<ExploreCourses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/trainers" element={<TrainerProfile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Linked from footer, still placeholder content */}
        <Route path="/help-center" element={<ComingSoon />} />
        <Route path="/terms" element={<ComingSoon />} />
        <Route path="/privacy" element={<ComingSoon />} />
        <Route path="/faqs" element={<ComingSoon />} />
      </Route>

      {/* Logged-in area: fixed Sidebar + .main-content (see App.css).
          DashboardLayout redirects to /login if nobody's signed in. */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<LearnerDashboard />} />
        <Route path="/learn/:id" element={<LearningPlayer />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/assessments/:id" element={<QuizAttempt />} />
        <Route path="/assessments/:id/result" element={<QuizResult />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/certificate/:id" element={<Certificate />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/trainer" element={<TrainerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Sidebar links without dedicated pages yet */}
        <Route path="/live-sessions" element={<ComingSoon />} />
        <Route path="/skills" element={<ComingSoon />} />
        <Route path="/achievements" element={<ComingSoon />} />
        <Route path="/calendar" element={<ComingSoon />} />
        <Route path="/messages" element={<ComingSoon />} />
        <Route path="/trainer/courses" element={<ComingSoon />} />
        <Route path="/trainer/learners" element={<ComingSoon />} />
        <Route path="/trainer/analytics" element={<ComingSoon />} />
        <Route path="/admin/users" element={<ComingSoon />} />
        <Route path="/admin/trainers" element={<ComingSoon />} />
        <Route path="/admin/enrollments" element={<ComingSoon />} />
        <Route path="/admin/reports" element={<ComingSoon />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
