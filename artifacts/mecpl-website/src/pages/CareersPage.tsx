import { useState } from "react";
import { sentenceCase } from "@/lib/typography";
import MecplArrowButtonContent from "@/components/MecplArrowButtonContent";
import "./CareersPage.css";
import {
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Briefcase,
  Award,
  Users
} from "lucide-react";

const openings = [
  { title: "Site Engineer", dept: "Engineering", location: "Pune, Maharashtra", type: "Full-time", exp: "2-5 years" },
  { title: "Project Manager", dept: "Management", location: "Pune, Maharashtra", type: "Full-time", exp: "8-12 years" },
  { title: "Structural Engineer", dept: "Engineering", location: "Pune, Maharashtra", type: "Full-time", exp: "3-7 years" },
  { title: "Safety Officer", dept: "HSE", location: "Pune, Maharashtra", type: "Full-time", exp: "2-4 years" },
  { title: "Quality Control Engineer", dept: "Quality", location: "Pune, Maharashtra", type: "Full-time", exp: "3-6 years" },
  { title: "Quantity Surveyor", dept: "Finance", location: "Pune, Maharashtra", type: "Full-time", exp: "2-5 years" },
];

const values = [
  {
    title: "People First",
    desc: "We prioritise our people in everything we do: employees, customers, and all stakeholders.",
    image: "/images/careers-values/people-first.jpg",
    alt: "Construction crew working together on site, illustrating People First.",
  },
  {
    title: "Quality",
    desc: "Every process is benchmarked against disciplined execution, safety and premium outcomes.",
    image: "/images/careers-values/quality.jpg",
    alt: "Site engineers inspecting structural work, illustrating construction quality checks.",
  },
  {
    title: "Integrity",
    desc: "Transparent decisions and ethical project governance are part of MECPL's operating DNA.",
    image: "/images/careers-values/integrity.jpg",
    alt: "Engineers reviewing site plans together, illustrating integrity in project decisions.",
  },
  {
    title: "Innovation",
    desc: "We improve through modern systems, practical problem solving, and technical curiosity.",
    image: "/images/careers-values/innovation.jpg",
    alt: "Engineer using a tablet for digital planning inside a modern industrial facility.",
  },
  {
    title: "Teamwork",
    desc: "Cross-functional teams collaborate closely so execution is consistent from office to site.",
    image: "/images/careers-values/teamwork.jpg",
    alt: "Engineers collaborating around a tablet in an industrial workplace.",
  },
];

const benefits = [
  {
    title: "Health & Safety",
    desc: "Environment, Health and Safety is our priority on every project and in every workplace decision.",
    icon: ShieldCheck,
  },
  {
    title: "Growth Opportunities",
    desc: "Employees gain structured mentoring, project exposure, and clear pathways to advance.",
    icon: Briefcase,
  },
  {
    title: "Recognition",
    desc: "We value milestone delivery, technical excellence, and the people who make projects succeed.",
    icon: Award,
  },
  {
    title: "Supportive Culture",
    desc: "A workplace that encourages balance, belonging, and long-term development.",
    icon: Users,
  },
];

const employeeStories = [
  {
    name: "Meghna Bohra Maloo",
    role: "Deputy General Manager - Internal Process and Control",
    quote: "Flexibility helps me strike the balance between work and life.",
    image: "/images/careers.jpg",
  },
  {
    name: "Bhavna Mordani",
    role: "Deputy General Manager - Sales & CRM",
    quote: "Women are given a seat at the table at every level.",
    image: "/images/careers.jpg",
  },
  {
    name: "Dhruv Kotru",
    role: "Intern - Commercial Real Estate",
    quote: "I felt welcomed, right from day one.",
    image: "/images/careers.jpg",
  },
];

const careerSectionLabelStyle = {
  color: "rgb(196, 30, 58)",
  display: "block",
  fontSize: "clamp(0.75rem, 0.85vw, 0.9rem)",
  fontWeight: 500,
  letterSpacing: "-0.025em",
  marginBottom: "14px",
  textTransform: "uppercase" as const,
};

export default function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", exp: "0 - 2 Years Baseline", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div data-animate-page className="careers-page bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden bg-mecpl-dark flex items-center">
        <img
          src="/images/careers.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          alt="MECPL engineering team"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,16,0.92)_0%,rgba(6,10,16,0.78)_48%,rgba(6,10,16,0.54)_100%)]" />
        <div className="absolute inset-0 bg-mecpl-dark/20" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center">
          <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.35em] text-white">
            JOIN TEAM MECPL
          </span>
          <h1 className="careers-hero-title careers-display-heading max-w-4xl tracking-tight text-white">
            Build your engineering career
          </h1>
          <p className="careers-hero-description mt-6 max-w-2xl text-balance leading-relaxed text-white/75">
            Work with a team that values safety, quality, and professional growth. Build your skills and your impact inside high-performance projects.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#abt3"
              className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary"
            >
              <MecplArrowButtonContent>Explore Open Roles</MecplArrowButtonContent>
            </a>
            <a
               href="#careers-life"
              className="mecpl-arrow-fill-button mecpl-arrow-fill-button--outline-light"
            >
              <MecplArrowButtonContent>Life at MECPL</MecplArrowButtonContent>
            </a>
          </div>
        </div>
      </section>
      {/* WORKPLACE CULTURE */}
      <section id="abt1" className="py-24 md:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="careers-culture-copy">
              <span className="careers-section-label" style={careerSectionLabelStyle}>Our workplace</span>
              <h2 className="careers-section-title careers-sentence-case mb-6">
                A Culture That Enables Growth.
              </h2>
              <p className="text-mecpl-text text-sm md:text-base leading-relaxed max-w-md">
                We encourage our employees to achieve growth by creating opportunities to learn, lead, and contribute. Our teams work on landmark projects with disciplined standards and strong collaboration.
              </p>
              <a href="#apply-form" data-testid="button-careers-workplace-apply" className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary mt-8">
                <MecplArrowButtonContent>Apply Now</MecplArrowButtonContent>
              </a>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] md:aspect-square rounded-sm overflow-hidden bg-[#f3f4f6]">
                <img
                  src="/images/careers.jpg"
                  alt="MECPL site engineers"
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  data-scroll-reveal="image"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 md:p-8 border border-mecpl-dark/5 shadow-xl max-w-[280px]">
                <span className="careers-section-label" style={careerSectionLabelStyle}>Your Path at MECPL</span>
                <div className="mecpl-type-section-title text-2xl md:text-3xl font-light uppercase tracking-tighter text-mecpl-text">Build. Learn. <span className="font-semibold">Lead.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* LIFE AT MECPL */}
      <section id="careers-life" className="careers-life-section bg-[#f7f6f4] py-24 md:py-32 scroll-mt-20" aria-labelledby="careers-life-title">
        <div className="mx-auto max-w-7xl px-6">
          <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <span className="careers-section-label" style={careerSectionLabelStyle}>Life at MECPL</span>
            <h2 id="careers-life-title" className="careers-section-title careers-sentence-case">
              Good Work Is Built <span>Together.</span>
            </h2>
            <p className="careers-life-intro mx-auto mt-5 max-w-2xl">
              From learning on site to recognising milestones, the best work happens when people can grow, contribute, and feel part of the team.
            </p>
          </header>
          <div className="careers-life-grid">
            <figure className="careers-life-card careers-life-card--training">
              <img src="/images/careers-demo/training.jpg" alt="Illustrative photo of Indian construction professionals learning together during a site training session" loading="lazy" />
              <figcaption><span>01 / Learn together</span><strong>Knowledge, shared on site</strong></figcaption>
            </figure>
            <figure className="careers-life-card careers-life-card--milestone">
              <img src="/images/careers-demo/team-milestone.jpg" alt="Illustrative photo of Indian colleagues celebrating a project milestone" loading="lazy" />
              <figcaption><span>02 / Mark the moment</span><strong>Progress worth celebrating</strong></figcaption>
            </figure>
            <figure className="careers-life-card careers-life-card--wellbeing">
              <img src="/images/careers-demo/wellbeing.jpg" alt="Illustrative photo of Indian coworkers taking part in a morning wellbeing activity" loading="lazy" />
              <figcaption><span>03 / Make room to reset</span><strong>Wellbeing, as a team</strong></figcaption>
            </figure>
            <figure className="careers-life-card careers-life-card--teamwork">
              <img src="/images/careers-demo/teamwork.jpg" alt="Illustrative photo of Indian project colleagues walking through a finished building and talking" loading="lazy" />
              <figcaption><span>04 / Build with purpose</span><strong>Shared effort. Lasting impact.</strong></figcaption>
            </figure>
          </div>
          <p className="careers-demo-note">
            Illustrative placeholder photos only—not MECPL employees or events. These will be replaced with MECPL’s own employee-event photos.
          </p>
        </div>
      </section>
      {/* EMPLOYEE STORIES */}
      <section className="py-24 bg-[#f8fafc] border-y border-mecpl-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="careers-section-label" style={careerSectionLabelStyle}>Voices of MECPL</span>
            <h2 className="careers-section-title careers-sentence-case">Hear From the People Who Built It.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {employeeStories.map((story, i) => (
               <div
                 key={i}
                 className="bg-white p-8 border border-mecpl-dark/5 rounded-sm relative flex flex-col"
                 data-scroll-reveal="text"
                 data-scroll-reveal-delay={i * 90}
               >
                <div className="text-mecpl-red opacity-20 text-6xl font-montserrat absolute top-6 right-6 leading-none">"</div>
                 <p className="careers-story-quote mb-12 relative z-10 flex-1">
                  "{story.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-mecpl-text font-medium">{story.name}</div>
                    <div className="text-[9px] font-semibold uppercase tracking-widest text-mecpl-red mt-0.5">{story.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CORE VALUES */}
      <section id="abt2" className="relative bg-mecpl-dark text-white py-24 md:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-12 md:mb-16">
            <span className="careers-section-label" style={careerSectionLabelStyle}>What drives MECPL</span>
            <h2 className="careers-section-title careers-sentence-case">Core Values.</h2>
          </header>
          <div className="careers-values-grid">
              {values.map((v) => (
                <article key={v.title} className="careers-value-card group">
                  <div className="aspect-[16/10] overflow-hidden mb-6">
                    <img
                      src={v.image}
                      alt={v.alt}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-semibold uppercase tracking-tight mb-3">{sentenceCase(v.title)}</h3>
                  <p className="text-white/70 text-sm md:text-base max-w-lg leading-relaxed">{v.desc}</p>
                </article>
              ))}
          </div>
        </div>
      </section>
      {/* CAREER GROWTH */}
      <section className="border-b border-mecpl-dark/10 bg-white py-20 md:py-28 text-mecpl-text">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="careers-growth-copy" data-scroll-reveal="text">
              <span className="careers-section-label" style={careerSectionLabelStyle}>Build Your Career With Us</span>
              <h2 className="careers-section-title careers-sentence-case leading-[0.98]">
                Start With Purpose.<br /><span className="font-medium">Grow With Responsibilities.</span>
              </h2>
              <div className="mt-12 flex max-w-md flex-col items-start gap-5 border-t border-mecpl-dark/10 pt-7">
                <p className="max-w-md text-sm leading-relaxed text-mecpl-text">
                  Ready to build what comes next? Find the role where your next chapter starts.
                </p>
                <a
                  href="#abt3"
                  className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary self-start"
                >
                  <MecplArrowButtonContent>Explore Open Roles</MecplArrowButtonContent>
                </a>
              </div>
            </div>
            <div className="grid gap-px bg-white/20 sm:grid-cols-3">
              {[
                ["01", "Learn on live projects", "Turn technical knowledge into practical judgment alongside experienced teams."],
                ["02", "Grow through mentorship", "Build capability through feedback, cross-functional exposure, and clear progression."],
                ["03", "Lead meaningful work", "Take ownership of safety, quality, technology, and outcomes that shape communities."],
              ].map(([number, title, description], index) => (
                <article
                  key={number}
                  className="bg-mecpl-red p-6 md:p-7 text-white"
                  data-scroll-reveal="text"
                  data-scroll-reveal-delay={index * 90}
                >
                  <div className="text-[10px] font-semibold tracking-[0.2em] text-white/55">{number}</div>
                 <h3 className="careers-step-title mt-8">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/75">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* BENEFITS */}
      <section id="abt4" className="py-24 md:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-5 mb-16">
            <div>
              <span className="careers-section-label" style={careerSectionLabelStyle}>Benefits</span>
              <h2 className="careers-section-title careers-sentence-case">Live Your Best Life.</h2>
            </div>
            <p className="text-mecpl-text text-sm max-w-sm">Learn about the benefits of working with MECPL and how we prioritise our employees at every step.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="p-8 border border-mecpl-dark/10 hover:border-mecpl-red/40 transition-colors bg-white hover:bg-[#f9fafb] flex flex-col h-full rounded-sm"
                data-scroll-reveal="text"
                data-scroll-reveal-delay={i * 90}
              >
                <div className="w-12 h-12 rounded-full bg-mecpl-red/10 flex items-center justify-center mb-8">
                  <b.icon size={20} className="text-mecpl-red" />
                </div>
                <h3 className="text-lg font-semibold uppercase tracking-tight text-mecpl-text mb-4">{sentenceCase(b.title)}</h3>
                <p className="text-mecpl-text text-sm leading-relaxed flex-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* OPEN POSITIONS */}
      <section id="abt3" className="py-24 md:py-32 bg-[#f8fafc] border-y border-mecpl-dark/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="careers-section-label" style={careerSectionLabelStyle}>Current Opportunities</span>
            <h2 className="careers-section-title careers-sentence-case">Open Roles.</h2>
          </div>

          <div className="flex flex-col border-t border-mecpl-dark/10">
            {openings.map((job, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-mecpl-dark/10 hover:bg-white hover:shadow-sm transition-all md:px-6 -mx-6 px-6" data-testid={`card-job-${i}`}>
                <div className="flex-1 mb-6 md:mb-0">
                  <div className="flex items-center gap-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-mecpl-steel">
                    <span>{job.dept}</span>
                    <span className="w-1 h-1 rounded-full bg-mecpl-red" />
                    <span>{job.type}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-tight text-mecpl-text group-hover:text-mecpl-red transition-colors">{sentenceCase(job.title)}</h3>
                  <div className="flex items-center gap-6 mt-4 text-[11px] font-semibold uppercase tracking-widest text-mecpl-text">
                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-mecpl-red"/> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-mecpl-red"/> {job.exp}</span>
                  </div>
                </div>
                <div>
                  <a
                    href={`mailto:contact@mecpl.in?subject=Application for ${job.title}`}
                    className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary"
                    data-testid={`button-apply-${i}`}
                  >
                    <MecplArrowButtonContent>Apply Now</MecplArrowButtonContent>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* APPLICATION FORM */}
      <section id="apply-form" className="py-24 md:py-32 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="careers-section-label" style={careerSectionLabelStyle}>Application</span>
            <h2 className="careers-section-title careers-sentence-case">Submit General Application.</h2>
            <p className="mt-6 text-mecpl-text text-sm max-w-xl mx-auto">
              Share your background, the role you're interested in, and any portfolio or CV details. We review applications on a rolling basis.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-mecpl-dark/10 p-8 md:p-12 rounded-sm" data-testid="section-application-form">
            {submitted ? (
              <div className="text-center py-16" role="status" aria-live="polite">
                <div className="w-16 h-16 bg-mecpl-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-mecpl-red text-2xl">✓</span>
                </div>
                <h3 className="text-mecpl-text font-semibold text-2xl uppercase tracking-tight mb-3">Application Submitted!</h3>
                <p className="text-mecpl-text text-sm">Our HR team will contact you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-mecpl-red text-[10px] font-semibold uppercase tracking-widest hover:underline"
                  data-testid="button-send-another"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-application">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="career-name" className="text-[10px] font-semibold uppercase tracking-widest text-mecpl-steel block mb-2">Full Legal Name</label>
                    <input
                      id="career-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="E.g., Rahul Sharma"
                      className="w-full bg-white border border-mecpl-dark/10 rounded-sm p-4 text-sm text-mecpl-text focus:outline-none focus:border-mecpl-red transition-colors placeholder:text-black/30"
                      data-testid="input-applicant-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="career-email" className="text-[10px] font-semibold uppercase tracking-widest text-mecpl-steel block mb-2">Email Address</label>
                    <input
                      id="career-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="E.g., r.sharma@domain.com"
                      className="w-full bg-white border border-mecpl-dark/10 rounded-sm p-4 text-sm text-mecpl-text focus:outline-none focus:border-mecpl-red transition-colors placeholder:text-black/30"
                      data-testid="input-applicant-email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="career-experience" className="text-[10px] font-semibold uppercase tracking-widest text-mecpl-steel block mb-2">Experience Level</label>
                  <select
                    id="career-experience"
                    value={form.exp}
                    onChange={e => setForm({ ...form, exp: e.target.value })}
                    className="w-full bg-white border border-mecpl-dark/10 rounded-sm p-4 text-sm text-mecpl-text focus:outline-none focus:border-mecpl-red transition-colors appearance-none"
                    data-testid="select-applicant-exp"
                  >
                    <option>0 - 2 Years Baseline</option>
                    <option>2 - 5 Years Mid-Scale</option>
                    <option>5 - 10 Years Advanced</option>
                    <option>10+ Years Senior Executive</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="career-message" className="text-[10px] font-semibold uppercase tracking-widest text-mecpl-steel block mb-2">Cover Message</label>
                  <textarea
                    id="career-message"
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your experience and why you'd like to join MECPL..."
                    className="w-full bg-white border border-mecpl-dark/10 rounded-sm p-4 text-sm text-mecpl-text focus:outline-none focus:border-mecpl-red transition-colors resize-none placeholder:text-black/30"
                    data-testid="textarea-applicant-message"
                  />
                </div>

                <label htmlFor="career-cv" className="block border-2 border-dashed border-mecpl-dark/10 hover:border-mecpl-red/40 bg-white p-8 rounded-sm text-center transition-colors cursor-pointer relative group">
                  <div className="text-mecpl-steel group-hover:text-mecpl-red transition-colors mb-2">
                    <Send size={24} className="mx-auto" />
                  </div>
                  <p className="text-xs text-mecpl-steel font-medium">Drag and drop CV/Portfolio here, or browse</p>
                  <input id="career-cv" type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                </label>

                <button
                  type="submit"
                  className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary careers-submit-button mt-4"
                  data-testid="button-submit-application"
                >
                  <MecplArrowButtonContent>Submit Application</MecplArrowButtonContent>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="careers-bottom-cta mecpl-cta-banner px-10 py-[72px]">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="careers-sentence-case mb-9 text-[26px] font-medium tracking-tight text-white">
            Ready to Build What Comes Next.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#abt3" className="mecpl-arrow-fill-button mecpl-arrow-fill-button--primary">
              <MecplArrowButtonContent>View Current Opportunities</MecplArrowButtonContent>
            </a>
            <a href="#apply-form" className="mecpl-arrow-fill-button mecpl-arrow-fill-button--outline-light">
              <MecplArrowButtonContent>Submit Application</MecplArrowButtonContent>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
