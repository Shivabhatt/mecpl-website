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
    <div data-animate-page className="bg-mecpl-dark">
      {/* <div className="px-6 py-5">
        <div className="grid grid-cols-2 rounded-full border border-white/10 bg-white/5 p-1 w-full lg:inline-flex lg:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full lg:flex-none px-4 sm:px-5 py-3 text-[10px] font-black tracking-[0.22em] uppercase rounded-full transition-colors whitespace-nowrap ${
                activeTab === tab.id ? "bg-[#C41E3A] text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div> */}

      {activeTab === "completed" ? <CompletedProjectsPage /> : <OngoingProjectsPage />}
    </div>
  );
}