import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Clock,
  ArrowRight,
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
    image: "/images/careers.jpg",
  },
  {
    title: "Quality",
    desc: "Every process is benchmarked against disciplined execution, safety and premium outcomes.",
    image: "/assets/projects/HIGH-RISE-1-scaled.jpg",
  },
  {
    title: "Integrity",
    desc: "Transparent decisions and ethical project governance are part of MECPL's operating DNA.",
    image: "/assets/projects/GODREJ-INFINITY.jpg",
  },
  {
    title: "Innovation",
    desc: "We improve through modern systems, practical problem solving, and technical curiosity.",
    image: "/assets/projects/TechPark.jpg",
  },
  {
    title: "Teamwork",
    desc: "Cross-functional teams collaborate closely so execution is consistent from office to site.",
    image: "/assets/projects/43PD-1-scaled.jpg",
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
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "clamp(0.75rem, 0.85vw, 0.9rem)",
  fontWeight: 500,
  letterSpacing: "-0.025em",
  marginBottom: "14px",
  textTransform: "uppercase" as const,
};

export default function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", exp: "0 - 2 Years Baseline", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Values scroll-linked active state
        const panels = gsap.utils.toArray<HTMLElement>('.value-panel');
        const navItems = gsap.utils.toArray<HTMLElement>('.value-nav-item');

        if (panels.length > 0 && navItems.length > 0) {
          panels.forEach((panel, i) => {
            ScrollTrigger.create({
              trigger: panel,
              start: "top 60%",
              end: "bottom 60%",
              onToggle: (self) => {
                if (self.isActive) {
                  gsap.to(navItems, { opacity: 0.3, color: "white", duration: 0.3 });
                  gsap.to(navItems[i], { opacity: 1, color: "#EC3338", duration: 0.3 });
                }
              }
            });
          });

          ScrollTrigger.create({
            trigger: ".values-scroll-container",
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
            onUpdate: (self) => {
              if (progressLineRef.current) {
                gsap.set(progressLineRef.current, { scaleY: self.progress });
              }
            }
          });
        }
      });
    }, pageRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div data-animate-page className="careers-page bg-white font-montserrat" ref={pageRef}>
      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden bg-[#111827] flex items-center">
        <img
          src="/images/careers.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          alt="MECPL engineering team"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,10,16,0.9)_0%,rgba(6,10,16,0.72)_48%,rgba(6,10,16,0.4)_100%)]" />
        <div className="absolute inset-0 bg-black/15" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center">
          <span className="mb-5 block text-[10px] font-bold uppercase tracking-[0.35em] text-white">
            Join Team MECPL
          </span>
          <h1 className="careers-hero-title page-title-font max-w-4xl tracking-tight text-white text-[50px]">
            BUILD YOUR ENGINEERING CAREER
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            Work with a team that values safety, quality, and professional growth. Build your skills and your impact inside high-performance projects.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#abt3"
              className="careers-hero-cta inline-flex items-center justify-center gap-3 bg-[#C41E3A] px-6 py-4 text-white transition-colors hover:bg-[#ab1831]"
            >
              Explore Open Roles <ArrowRight size={14} />
            </a>
            <a
              href="#abt1"
              className="careers-hero-cta inline-flex items-center justify-center gap-3 border border-white/30 px-6 py-4 text-white transition-colors hover:border-white/70 hover:bg-white/10"
            >
              Life at MECPL
            </a>
          </div>
        </div>
      </section>
      {/* WORKPLACE CULTURE */}
      <section id="abt1" className="py-24 md:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="careers-section-label" style={careerSectionLabelStyle}>Our Workplace</span>
              <h2 className="uppercase tracking-tighter text-[#111827] mb-6 text-[30px] font-medium">
                A Culture That <br /><span className="font-medium">Enables Growth</span>
              </h2>
              <p className="text-[#4b5563] text-sm md:text-base leading-relaxed max-w-md">
                We encourage our employees to achieve growth by creating opportunities to learn, lead, and contribute. Our teams work on landmark projects with disciplined standards and strong collaboration.
              </p>
              <a href="#apply-form" className="inline-flex items-center gap-2 mt-8 text-[#111827] text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#C41E3A] transition-colors group">
                Apply Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
              <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 md:p-8 border border-black/5 shadow-xl max-w-[280px]">
                <span className="careers-section-label" style={careerSectionLabelStyle}>Your Path at MECPL</span>
                <div className="text-2xl md:text-3xl font-light uppercase tracking-tighter text-[#111827]">Build. Learn. <span className="font-bold">Lead.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* EMPLOYEE STORIES */}
      <section className="py-24 bg-[#f8fafc] border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="careers-section-label" style={careerSectionLabelStyle}>Voices</span>
            <h2 className="text-[30px] font-light uppercase tracking-tighter text-[#111827]">Hear from our <span className="font-medium">Team</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {employeeStories.map((story, i) => (
               <div
                 key={i}
                 className="bg-white p-8 border border-black/5 rounded-sm relative flex flex-col"
                 data-scroll-reveal="text"
                 data-scroll-reveal-delay={i * 90}
               >
                <div className="text-[#C41E3A] opacity-20 text-6xl font-serif absolute top-6 right-6 leading-none">"</div>
                <p className="text-lg font-medium text-[#111827] mb-12 relative z-10 leading-snug flex-1">
                  "{story.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-[#111827] font-medium">{story.name}</div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#C41E3A] mt-0.5">{story.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CORE VALUES */}
      <section id="abt2" className="relative bg-[#111827] text-white py-24 md:py-32 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="md:grid md:grid-cols-12 gap-12 lg:gap-20">
            {/* Sticky Sidebar */}
            <div className="md:col-span-5 relative mb-16 md:mb-0">
              <div className="md:sticky md:top-40 space-y-6">
                <span className="careers-section-label" style={careerSectionLabelStyle}>What Drives MECPL</span>
                <h2 className="text-[30px] font-light uppercase tracking-tighter leading-[1.05]">
                  Core <span className="font-medium">Values</span>
                </h2>

                {/* Desktop Nav Indicators */}
                <div className="hidden md:flex flex-col gap-6 mt-12 relative border-l border-white/10 pl-6 py-2">
                  <div
                    ref={progressLineRef}
                    className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[#C41E3A] origin-top scale-y-0"
                  />
                  {values.map((v, i) => (
                    <div key={i} className={`value-nav-item transition-colors duration-300 ${i === 0 ? 'opacity-100 text-[#C41E3A]' : 'opacity-30 text-white'}`}>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em]">{v.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrolling Content */}
            <div className="md:col-span-7 space-y-24 values-scroll-container">
              {values.map((v, i) => (
                <div key={i} className="value-panel group">
                  <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm mb-8">
                    <img
                      src={v.image}
                      alt={v.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{v.title}</h3>
                  <p className="text-white/70 text-sm md:text-base max-w-lg leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* CAREER GROWTH */}
      <section className="border-b border-black/10 bg-white py-20 md:py-28 text-[#111827]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="text-left lg:justify-self-start" data-scroll-reveal="text">
              <span className="careers-section-label" style={careerSectionLabelStyle}>Build Your Career With Us</span>
              <h2 className="text-[30px] font-light uppercase tracking-tighter leading-[0.98]">
                Start With Purpose.<br /><span className="font-medium">Grow With Responsibility.</span>
              </h2>
              <div className="mt-12 flex max-w-md flex-col items-start gap-5 border-t border-black/10 pt-7">
                <p className="max-w-md text-sm leading-relaxed text-[#4b5563]">
                  Ready to build what comes next? Find the role where your next chapter starts.
                </p>
                <a
                  href="#abt3"
                  className="inline-flex items-center gap-3 self-start bg-[#C41E3A] px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#ab1831]"
                >
                  Explore Open Roles <ArrowRight size={14} />
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
                  className="bg-[#C41E3A] p-6 md:p-7 text-white"
                  data-scroll-reveal="text"
                  data-scroll-reveal-delay={index * 90}
                >
                  <div className="text-[10px] font-black tracking-[0.2em] text-white/55">{number}</div>
                  <h3 className="mt-8 text-lg font-bold uppercase tracking-tight">{title}</h3>
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="careers-section-label" style={careerSectionLabelStyle}>Benefits</span>
              <h2 className="text-[30px] font-light uppercase tracking-tighter text-[#111827]">Live Your <span className="font-medium">Best Life</span></h2>
            </div>
            <p className="text-[#4b5563] text-sm max-w-sm">Learn about the benefits of working with MECPL and how we prioritise our employees at every step.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="p-8 border border-black/10 hover:border-[#C41E3A]/40 transition-colors bg-white hover:bg-[#f9fafb] flex flex-col h-full rounded-sm"
                data-scroll-reveal="text"
                data-scroll-reveal-delay={i * 90}
              >
                <div className="w-12 h-12 rounded-full bg-[#C41E3A]/10 flex items-center justify-center mb-8">
                  <b.icon size={20} className="text-[#C41E3A]" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#111827] mb-4">{b.title}</h3>
                <p className="text-[#4b5563] text-sm leading-relaxed flex-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* OPEN POSITIONS */}
      <section id="abt3" className="py-24 md:py-32 bg-[#f8fafc] border-y border-black/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col items-center text-center">
            <span className="careers-section-label" style={careerSectionLabelStyle}>Current Opportunities</span>
            <h2 className="text-[30px] font-light uppercase tracking-tighter text-[#111827]">Open <span className="font-medium">Roles</span></h2>
          </div>

          <div className="flex flex-col border-t border-black/10">
            {openings.map((job, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-black/10 hover:bg-white hover:shadow-sm transition-all md:px-6 -mx-6 px-6" data-testid={`card-job-${i}`}>
                <div className="flex-1 mb-6 md:mb-0">
                  <div className="flex items-center gap-3 mb-3 text-[10px] font-black uppercase tracking-widest text-[#6b7280]">
                    <span>{job.dept}</span>
                    <span className="w-1 h-1 rounded-full bg-[#C41E3A]" />
                    <span>{job.type}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[#111827] group-hover:text-[#C41E3A] transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-6 mt-4 text-[11px] font-bold uppercase tracking-widest text-[#4b5563]">
                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#C41E3A]"/> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#C41E3A]"/> {job.exp}</span>
                  </div>
                </div>
                <div>
                  <a
                    href={`mailto:contact@mecpl.in?subject=Application for ${job.title}`}
                    className="inline-flex items-center gap-2 px-6 py-4 bg-[#111827] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#C41E3A] transition-colors rounded-sm w-full md:w-auto justify-center"
                    data-testid={`button-apply-${i}`}
                  >
                    Apply Now <ArrowRight size={14} />
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
            <h2 className="text-[30px] font-light uppercase tracking-tighter text-[#111827]">Submit <span className="font-medium">General Application</span></h2>
            <p className="mt-6 text-[#4b5563] text-sm max-w-xl mx-auto">
              Share your background, the role you're interested in, and any portfolio or CV details. We review applications on a rolling basis.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-black/10 p-8 md:p-12 rounded-sm" data-testid="section-application-form">
            {submitted ? (
              <div className="text-center py-16" role="status" aria-live="polite">
                <div className="w-16 h-16 bg-[#C41E3A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-[#C41E3A] text-2xl">✓</span>
                </div>
                <h3 className="text-[#111827] font-bold text-2xl uppercase tracking-tight mb-3">Application Submitted!</h3>
                <p className="text-[#4b5563] text-sm">Our HR team will contact you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[#C41E3A] text-[10px] font-black uppercase tracking-widest hover:underline"
                  data-testid="button-send-another"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-application">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="career-name" className="text-[10px] font-black uppercase tracking-widest text-[#6b7280] block mb-2">Full Legal Name</label>
                    <input
                      id="career-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="E.g., Rahul Sharma"
                      className="w-full bg-white border border-black/10 rounded-sm p-4 text-sm text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors placeholder:text-black/30"
                      data-testid="input-applicant-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="career-email" className="text-[10px] font-black uppercase tracking-widest text-[#6b7280] block mb-2">Email Address</label>
                    <input
                      id="career-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="E.g., r.sharma@domain.com"
                      className="w-full bg-white border border-black/10 rounded-sm p-4 text-sm text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors placeholder:text-black/30"
                      data-testid="input-applicant-email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="career-experience" className="text-[10px] font-black uppercase tracking-widest text-[#6b7280] block mb-2">Experience Level</label>
                  <select
                    id="career-experience"
                    value={form.exp}
                    onChange={e => setForm({ ...form, exp: e.target.value })}
                    className="w-full bg-white border border-black/10 rounded-sm p-4 text-sm text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors appearance-none"
                    data-testid="select-applicant-exp"
                  >
                    <option>0 - 2 Years Baseline</option>
                    <option>2 - 5 Years Mid-Scale</option>
                    <option>5 - 10 Years Advanced</option>
                    <option>10+ Years Senior Executive</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="career-message" className="text-[10px] font-black uppercase tracking-widest text-[#6b7280] block mb-2">Cover Message</label>
                  <textarea
                    id="career-message"
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your experience and why you'd like to join MECPL..."
                    className="w-full bg-white border border-black/10 rounded-sm p-4 text-sm text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors resize-none placeholder:text-black/30"
                    data-testid="textarea-applicant-message"
                  />
                </div>

                <label htmlFor="career-cv" className="block border-2 border-dashed border-black/10 hover:border-[#C41E3A]/40 bg-white p-8 rounded-sm text-center transition-colors cursor-pointer relative group">
                  <div className="text-[#9ca3af] group-hover:text-[#C41E3A] transition-colors mb-2">
                    <Send size={24} className="mx-auto" />
                  </div>
                  <p className="text-xs text-[#6b7280] font-medium">Drag and drop CV/Portfolio here, or browse</p>
                  <input id="career-cv" type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                </label>

                <button
                  type="submit"
                  className="w-full bg-[#C41E3A] hover:bg-red-700 text-white font-black text-[10px] tracking-[0.2em] uppercase p-5 rounded-sm transition-colors flex items-center justify-center gap-2 mt-4"
                  data-testid="button-submit-application"
                >
                  Submit Application <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="careers-bottom-cta mecpl-cta-banner px-10 py-[72px]">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="mb-9 text-[30px] font-medium uppercase tracking-tight text-white">
            READY TO BUILD WHAT COMES NEXT?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#abt3" className="mecpl-button mecpl-button--light">
              View Current Opportunities <ArrowRight size={12} />
            </a>
            <a href="#apply-form" className="mecpl-button mecpl-button--outline-light">
              Submit Application <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
