import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";

import Dashboard from './pages/Dashboard';
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

import Assessments from "./pages/Assessments";
import QuizAttempt from "./pages/QuizAttempt";
import TakeQuiz from './pages/TakeQuiz';
import CreateQuiz from './pages/CreateQuiz';
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
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/trainer/:id" element={<TrainerProfile />} />
      </Route>

      {/* Logged-in area: fixed Sidebar */}
      <Route element={<DashboardLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/trainer" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn/:id" element={<LearningPlayer />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/assessments/:id" element={<QuizAttempt />} />
        <Route path="/assessments/:id/result" element={<QuizResult />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/:id" element={<TakeQuiz />} />
        <Route path="/quiz/:id/result" element={<QuizResult />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/certificate/:id" element={<Certificate />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default App;
