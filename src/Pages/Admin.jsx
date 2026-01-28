import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../Components/Admin/Sidebar";
import Header from "../Components/Admin/Header";

import Dashboard from "../Pages/AdminPage/DashboardPage";
import Projects from "../Pages/AdminPage/ProjectsPage";
import Services from "../Pages/AdminPage/ServicesPage";
import Experience from "../Pages/AdminPage/ExperiencePage";
import Education from "../Pages/AdminPage/Educationpage";
import Skills from "../Pages/AdminPage/SkillsPage";
import Testimonials from "../Pages/AdminPage/TestimonialsPage";
import Settings from "../Pages/AdminPage/SettingsPage";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="services" element={<Services />} />
            <Route path="experience" element={<Experience />} />
            <Route path="education" element={<Education />} />
            <Route path="skills" element={<Skills />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
