import { useState } from "react";
import CompletedProjectsPage from "@/pages/CompletedProjectsPage";
import OngoingProjectsPage from "@/pages/OngoingProjectsPage";

const tabs = [
  { id: "completed", label: "Completed Projects" },
  { id: "ongoing", label: "Ongoing Projects" },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("completed");

  return (
    <div data-animate-page className="bg-white">
      {activeTab === "completed" ? <CompletedProjectsPage /> : <OngoingProjectsPage />}
    </div>
  );
}
