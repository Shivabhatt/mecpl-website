import { Link } from "wouter";
import MecplArrowButtonContent from "@/components/MecplArrowButtonContent";
import CompletedProjectsPage from "@/pages/CompletedProjectsPage";

export default function ProjectsPage() {
  return (
    <div data-animate-page className="projects-page bg-white">
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
          <h2 className="page-title-font max-w-3xl font-medium leading-[1.1] tracking-[-0.02em] text-white">
            Ready To Shape What&apos;s Next?
          </h2>
          <p className="projects-contact-description mt-2 max-w-xl leading-relaxed text-white/80">
            Connect with the MECPL team to discuss your next construction project or explore opportunities to grow with us.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary"
            >
              <MecplArrowButtonContent>Contact Us</MecplArrowButtonContent>
            </Link>
            <Link
              href="/careers"
              className="mecpl-arrow-fill-button mecpl-arrow-fill-button--outline-light"
            >
              <MecplArrowButtonContent>View Careers</MecplArrowButtonContent>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
