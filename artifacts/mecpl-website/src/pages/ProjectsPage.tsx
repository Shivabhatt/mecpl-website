import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import CompletedProjectsPage from "@/pages/CompletedProjectsPage";

export default function ProjectsPage() {
  return (
    <div data-animate-page className="bg-white">
      <CompletedProjectsPage />

      {/* Project Contact CTA */}
      <section
        id="project-contact"
        className="relative z-10 isolate flex min-h-[512px] scroll-mt-20 items-center overflow-hidden bg-mecpl-red px-6 pb-[120px] pt-24 font-montserrat"
        data-testid="section-projects-cta"
      >
        <div
          className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center text-center"
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
              className="group inline-flex items-center gap-2.5 border-[1.5px] border-mecpl-red bg-mecpl-red px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-mecpl-dark hover:bg-mecpl-dark hover:text-white"
            >
              <span>Contact Us</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/careers"
              className="group inline-flex items-center gap-2.5 border-[1.5px] border-white/75 bg-transparent px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-mecpl-red"
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
