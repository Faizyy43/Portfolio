import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./features/home/pages/Home";
import About from "./features/about/pages/About";
import Projects from "./features/projects/pages/Projects";
import Contact from "./features/contacts/pages/Contact";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./features/auth/pages/AdminLogin";
import Dashboard from "./features/dashboard/pages/Dashboard";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import Loader from "./components/Loader";
import WhatsAppButton from "./components/WhatsAppButton";
import { useState, useEffect } from "react";
import Services from "./features/services/pages/Services";
import ReviewBot from "./components/ReviewBot";
import AnimatedCursor from "./components/AnimatedCursor";
import TitleManager from "./components/TitleManager";

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard");

  if (loading) return <Loader />;

  return (
    <>
      {/* {!location.pathname.includes("dashboard") && <Navbar />} */}
      {!hideLayout && <Navbar />}
      <div>
        {/* 🔥 FIX: use location.key for smooth routing */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />

            <Route
              path="/about"
              element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              }
            />

            <Route
              path="/projects"
              element={
                <PageWrapper>
                  <Projects />
                </PageWrapper>
              }
            />

            {/* 🔥 CONTACT FIXED */}
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />

            <Route path="/services" element={<Services />} />
            <Route path="/admin" element={<AdminLogin />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>

      {/* <WhatsAppButton /> */}
      {!hideLayout && <ReviewBot />}
      <AnimatedCursor />
      <TitleManager />
      {!hideLayout && <Footer />}
      {/* {!location.pathname.includes("dashboard") && <Footer />} */}
    </>
  );
}

/* 🔥 PAGE WRAPPER */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
