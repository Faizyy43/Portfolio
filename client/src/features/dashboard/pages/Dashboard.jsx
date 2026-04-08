import { useState, useEffect, useCallback } from "react";
import api from "../../../api/api";

import DashboardLayout from "../../dashboard/components/DashboardLayout";

import Stats from "../components/Stats";
import RevenueCard from "../components/RevenueCard";
import ActivityTimeline from "../components/ActivityTimeline";

import AddProjectForm from "../../projects/components/AddProjectForm";
import ProjectList from "../../projects/components/ProjectList";

import ContactList from "../../contacts/components/ContactList";
import KanbanBoard from "../../contacts/components/KanbanBoard";

import AdminReviews from "../components/AdminReviews";

import { motion } from "framer-motion";
import { DashboardSkeleton } from "../components/DashboardSkeleton";
import RecentProjects from "../components/RecentProjects";
import SectionCard from "../components/SectionCard";

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState([]);

  // ✅ Optimized fetch (useCallback for stability)
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [projectRes, contactRes] = await Promise.all([
        api.get("/projects"),
        api.get("/contact"),
      ]);

      const projectData =
        projectRes.data?.projects || projectRes.data?.data || projectRes.data;

      setProjects(Array.isArray(projectData) ? projectData : []);
      setContacts(contactRes.data || []);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Empty State Component (Pro UX)
  const EmptyState = () => (
    <div className="text-center py-12 text-gray-400">
      <p className="text-lg font-medium">No data available</p>
      <p className="text-sm mt-1">Start by adding your first project 🚀</p>
    </div>
  );

  return (
    <DashboardLayout active={active} setActive={setActive}>
      {/* 🔥 Loading */}
      {loading && <DashboardSkeleton />}

      {/* ❌ Error */}
      {!loading && error && <div className="text-red-400 text-sm">{error}</div>}

      {/* ✅ Main */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* ================= DASHBOARD ================= */}
          {active === "dashboard" && (
            <>
              {/* ✅ ALWAYS SHOW STATS */}
              <Stats projects={projects} contacts={contacts} />

              <div className="grid lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">
                  {projects.length > 0 ? (
                    <RecentProjects projects={projects} />
                  ) : (
                    <SectionCard title="Recent Projects">
                      <EmptyState />
                    </SectionCard>
                  )}
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                  <RevenueCard projects={projects} />
                  <ActivityTimeline projects={projects} />
                </div>
              </div>
            </>
          )}

          {/* ================= PROJECTS ================= */}
          {active === "projects" && (
            <>
              <SectionCard title="Add Project">
                <AddProjectForm refresh={fetchData} />
              </SectionCard>

              <SectionCard title="All Projects">
                {projects.length > 0 ? (
                  <ProjectList projects={projects} refresh={fetchData} />
                ) : (
                  <EmptyState />
                )}
              </SectionCard>
            </>
          )}

          {/* ================= CLIENTS ================= */}
          {active === "clients" && (
            <div className="flex flex-col gap-6 h-full overflow-hidden">
              {/* 🔥 KANBAN (FIXED HEIGHT) */}
              <div className="h-[65vh]">
                <SectionCard title="Client Pipeline" className="h-full">
                  <KanbanBoard />
                </SectionCard>
              </div>

              {/* 🔥 CONTACTS (SCROLLABLE AREA) */}
              <div className="flex-1 overflow-y-auto">
                <SectionCard title="Contacts" className="h-full">
                  <ContactList />
                </SectionCard>
              </div>
            </div>
          )}

          {/* ================= REVIEWS ================= */}
          {active === "reviews" && (
            <SectionCard title="User Reviews">
              <AdminReviews />
            </SectionCard>
          )}
        </motion.div>
      )}
    </DashboardLayout>
  );
}
