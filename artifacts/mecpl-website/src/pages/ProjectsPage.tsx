import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import CompletedProjectsPage from "@/pages/CompletedProjectsPage";
import OngoingProjectsPage from "@/pages/OngoingProjectsPage";

const assetBase = import.meta.env.BASE_URL;

const tabs = [
  { id: "completed", label: "Completed Projects" },
  { id: "ongoing", label: "Ongoing Projects" },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("completed");

  return (
    <div data-animate-page className="bg-white">
      {activeTab === "completed" ? <CompletedProjectsPage /> : <OngoingProjectsPage />}

      {/* Project Contact CTA */}
      <section className="relative overflow-hidden bg-white px-0 py-0 md:px-6">
        <div className="relative mx-auto min-h-[520px] max-w-7xl">
          <div className="relative h-[390px] w-full overflow-hidden bg-[#111827] md:h-[500px] md:w-[74%]">
            <img
              src={`${assetBase}assets/video-thumbnail.png`}
              alt="MECPL construction team at work"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/5" />
            <div className="absolute inset-x-8 bottom-10 md:inset-x-14 md:bottom-14">
              <h2 className="max-w-[480px] text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
                Let&apos;s Build
                <br />
                Together
              </h2>
              <Link
                href="/careers"
                className="group mt-8 inline-flex items-center gap-3 bg-[#C41E3A] px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-white hover:text-[#C41E3A]"
              >
                <span>View Career Openings</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative z-10 -mt-8 ml-auto flex min-h-[270px] w-[calc(100%-2rem)] flex-col items-center justify-center bg-white px-8 py-12 text-center shadow-[0_12px_35px_rgba(17,24,39,0.12)] sm:w-[70%] md:absolute md:right-0 md:top-14 md:mt-0 md:min-h-[335px] md:w-[34%] md:px-10">
            <span className="mb-4 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#6b7280]">
              Let&apos;s Talk
            </span>
            <h3 className="text-2xl font-black uppercase leading-[1.05] tracking-[-0.04em] text-[#111827] sm:text-3xl">
              Need to Reach Us?
            </h3>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3 bg-[#C41E3A] px-6 py-3 text-[9px] font-black uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#111827]"
            >
              <span>Contact Us</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
