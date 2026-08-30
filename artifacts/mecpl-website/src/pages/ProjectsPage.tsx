import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
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

      {/* Project Contact CTA */}
      <section
        className="relative overflow-hidden bg-[#C41E3A] px-6 py-8 font-montserrat md:py-9"
        data-testid="section-projects-cta"
      >
        <div
          className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center text-center"
          data-scroll-reveal="text"
        >
          <h2 className="page-title-font max-w-3xl text-2xl font-medium uppercase leading-[1.1] tracking-[-0.02em] text-white sm:text-3xl md:text-4xl">
            Ready to shape what&apos;s next?
          </h2>
          <p className="mt-2 max-w-xl text-[11px] leading-relaxed text-white/80 sm:text-xs">
            Connect with the MECPL team to discuss your next construction project or explore opportunities to grow with us.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 border-[1.5px] border-white bg-white px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#C41E3A] transition-colors duration-300 hover:border-[#111827] hover:bg-[#111827] hover:text-white"
            >
              <span>Contact Us</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2.5 border-[1.5px] border-white/75 bg-transparent px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#C41E3A]"
            >
              <span>View Careers</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
