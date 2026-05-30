import { Link } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import { Briefcase, Clock, MapPin, Send, ArrowRight, Sparkles, ShieldCheck, Users, Award, BadgeCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Quality",
    desc: "Every process is benchmarked against disciplined execution, safety and premium outcomes.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Integrity",
    desc: "Transparent decisions and ethical project governance are part of MECPL's operating DNA.",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Innovation",
    desc: "We improve through modern systems, practical problem solving, and technical curiosity.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Teamwork",
    desc: "Cross-functional teams collaborate closely so execution is consistent from office to site.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
];

const benefits = [
  {
    title: "Health & Safety",
    desc: "Environment, Health and Safety is our priority on every project and in every workplace decision.",
  },
  {
    title: "Growth Opportunities",
    desc: "Employees gain structured mentoring, project exposure, and clear pathways to advance.",
  },
  {
    title: "Recognition",
    desc: "We value milestone delivery, technical excellence, and the people who make projects succeed.",
  },
  {
    title: "Supportive Culture",
    desc: "A workplace that encourages balance, belonging, and long-term development.",
  },
];

const employeeStories = [
  {
    name: "Meghna Bohra Maloo",
    role: "Deputy General Manager - Internal Process and Control",
    quote: "Flexibility helps me strike the balance between work and life.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Bhavna Mordani",
    role: "Deputy General Manager - Sales & CRM",
    quote: "Women are given a seat at the table at every level.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Dhruv Kotru",
    role: "Intern - Commercial Real Estate",
    quote: "I felt welcomed, right from day one.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  },
];

export default function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", exp: "0 - 2 Years Baseline", message: "" });
  const [submitted, setSubmitted] = useState(false);
  
  const pinRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const slidesWrapRef = useRef<HTMLDivElement | null>(null);
  const benefitsRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const section = pinRef.current;

  if (!section) return;

  const slides = gsap.utils.toArray<HTMLElement>(".slide");
  const items = gsap.utils.toArray<HTMLElement>(".list li");
  const fill = fillRef.current;

  // INITIAL STATES
  gsap.set(slides, {
    autoAlpha: 0,
  });

  gsap.set(slides[0], {
    autoAlpha: 1,
  });

  gsap.set(items, {
    color: "rgba(17,17,17,0.45)",
  });

  gsap.set(items[0], {
    color: "#111111",
  });

  gsap.set(fill, {
    scaleY: 0,
    transformOrigin: "top",
  });

  const totalSlides = slides.length;

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: (self) => {

      const progress = self.progress;

      // FILL LINE
      gsap.set(fill, {
        scaleY: progress,
      });

      // CURRENT INDEX
      const index = Math.min(
        totalSlides - 1,
        Math.floor(progress * totalSlides)
      );

      // SLIDES
      slides.forEach((slide, i) => {
        gsap.to(slide, {
          autoAlpha: i === index ? 1 : 0,
          duration: 0.5,
          overwrite: true,
        });
      });

      // TEXT ACTIVE STATES
      items.forEach((item, i) => {
        const active = i === index;

        item.classList.toggle("active", active);

        gsap.to(item, {
          color: active ? "#111111" : "rgba(17,17,17,0.45)",
          opacity: active ? 1 : 0.65,
          x: active ? 18 : 0,
          scale: active ? 1.08 : 1,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
      });
    },
  });

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);



useEffect(() => {
  if (!benefitsRef.current) return;

  const ctx = gsap.context(() => {

    const cards = gsap.utils.toArray<HTMLElement>(".benefit-card");

    gsap.fromTo(
      cards,
      {
        y: 80,
        opacity: 0,
        scale: 0.92,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 75%",
        },
      }
    );

  }, benefitsRef);

  return () => ctx.revert();

}, []);




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div data-animate-page className="bg-mecpl-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/5">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1920&auto=format&fit=crop"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          alt="Engineering team"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mecpl-dark via-mecpl-dark/90 to-mecpl-dark/40" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24" style={{ paddingTop: 95, paddingBottom: 60 }}>
          <SectionHeader label="Join Team MECPL" title={`Build Your\nEngineering Career`} subtitle="Work with a team that values safety, quality, and professional growth. We create opportunities for engineers, managers and operations teams to grow inside high-impact projects." center light />
       
        
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="sticky top-20 z-30 bg-mecpl-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto">
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.28em] whitespace-nowrap text-white/50">
            <a href="#abt1" className="hover:text-[#C41E3A] hover:font-black transition-colors">Life at MECPL</a>
            <a href="#abt2" className="hover:text-[#C41E3A] hover:font-black transition-colors">Our Values</a>
            <a href="#abt3" className="hover:text-[#C41E3A] hover:font-black transition-colors">Open Roles</a>
            <a href="#abt4" className="hover:text-[#C41E3A] hover:font-black transition-colors">Benefits</a>
          </div>
        </div>
      </div>

      {/* Workplace Culture & Stories */}
      <section id="abt1" className="max-w-7xl mx-auto px-6 py-18 md:py-24 scroll-mt-28" style={{paddingBottom: 0}}>
        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1800&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            alt="Workplace"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-mecpl-dark via-mecpl-dark/95 to-mecpl-dark/70" />

          <div className="relative p-8 md:p-12 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-[#C41E3A] text-[10px] font-black tracking-[0.28em] uppercase block mb-3">Our Workplace</span>
              <h3 className="text-3xl font-light uppercase tracking-tight text-white leading-[0.95]">A Culture That Enables Growth</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-5 max-w-xl">
                We encourage our employees to achieve growth by creating opportunities to learn, lead, and contribute.
                Our teams work on landmark projects with disciplined standards and strong collaboration.
              </p>
            </div>
            <div className="rounded-[20px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-64 md:h-80 object-cover"
                alt="Employees at work"
              />
            </div>
          </div>

          <div className="relative px-8 md:px-12 py-7 md:py-8">
            <div className="text-white/60 text-[10px] font-black tracking-[0.3em] uppercase mb-4">Employee Stories</div>
            <div className="grid md:grid-cols-3 gap-4">
              {employeeStories.map((story) => (
                <div key={story.name} className="rounded-2xl bg-mecpl-dark shadow-2xl shadow-black/20 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <img src={story.image} alt={story.name} className="w-16 h-16 rounded-lg object-cover border border-white/10" />
                    <div>
                      <div className="text-white font-black uppercase text-sm tracking-tight leading-tight">{story.name}</div>
                      <div className="text-[#C41E3A] text-[10px] font-black tracking-[0.24em] uppercase mt-1 leading-snug">{story.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mt-4 leading-relaxed">{story.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


<section
  id="abt2"
  ref={pinRef}
  className="relative bg-mecpl-dark"
  style={{
    height: `${values.length * 100}vh`,
  }}
>

  {/* STICKY CONTAINER */}
  <div className="sticky top-0 h-screen flex items-center overflow-hidden">

    <div className="max-w-7xl mx-auto w-full px-6">
<div className="max-w-7xl mx-auto px-6 mb-8">
  <div className="flex items-end justify-between gap-6">
    <div>
      <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">CORE VALUES</span>
      <h3 className="text-3xl font-light uppercase tracking-tighter text-white mt-2">WHAT DRIVES MECPL</h3>
    </div>
    <div className="hidden md:flex items-center gap-2 text-white/40 text-[10px] font-black tracking-[0.28em] uppercase">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check" aria-hidden="true">
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
      People. Quality. Integrity.
    </div>
  </div>
</div>
      <div className="flex items-center gap-16">

        {/* LEFT */}
        <div className="relative flex items-start gap-8 w-[320px] shrink-0">

          {/* LINE */}
          <div className="relative w-[3px] h-[420px] bg-white/10 rounded-full overflow-hidden mt-1">
            <div
              ref={fillRef}
              className="absolute inset-0 bg-[#C41E3A]"
            />
          </div>

          {/* LIST */}
          <ul
            ref={listRef}
            className="list flex flex-col gap-8"
          >
            {values.map((v) => (
             <li
  key={v.title}
  className="group relative pl-6 text-sm md:text-base font-black uppercase tracking-[0.24em] will-change-transform"
>

  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C41E3A] opacity-0 group-[.active]:opacity-100 transition-opacity duration-300" />

  {v.title}
</li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="relative flex-1 h-[520px]">

          {values.map((v, i) => (
            <div
              key={i}
              className="slide absolute inset-0"
            >
              <div className="relative w-full h-full rounded-[28px] overflow-hidden">

                <img
                  src={v.image}
                  alt={v.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C41E3A]/30 bg-[#C41E3A]/10 mb-5">
                    <Sparkles size={14} className="text-[#C41E3A]" />


                  </div>

                  <h3 className="text-3xl font-light uppercase tracking-tight text-white leading-[0.92]">
                    {v.title}
                  </h3>

                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-5 max-w-xl">
                    {v.desc}
                  </p>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  </div>
</section>

      <section className="max-w-7xl mx-auto w-full px-6 py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center w-full">
          <div className="overflow-hidden rounded-[2px] w-full">
            <img
              className="h-[260px] w-full object-cover md:h-[360px] lg:h-[415px]"
              alt="Engineering team"
              src="/images/careers.jpg"
            />
          </div>
          <div className="max-w-2xl lg:pl-2 w-full pr-6 md:pr-12 lg:pr-16">
            <span className="block text-[#C41E3A] text-[10px] font-black tracking-[0.28em] uppercase mb-3">Build Your Career With Us</span>
            <h1 className="text-3xl font-light tracking-tight text-mecpl-text leading-[0.96] max-w-xl">
              Build your Career with Us
            </h1>
            <p className="text-mecpl-text-muted text-sm md:text-[17px] leading-relaxed mt-8 max-w-xl">
              Explore exciting growth opportunities and work in a conducive culture that will help you achieve your career goals.
            </p>
            <a
              href="#abt3"
              className="inline-flex items-center gap-3 mt-8 bg-[#C41E3A] text-white text-[10px] font-black tracking-[0.35em] uppercase px-6 py-4 rounded-[2px] transition-transform hover:-translate-y-0.5"
            >
            
              View Open Roles
              <ArrowRight size={14} />
           
            </a>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="abt3" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-28">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="grid gap-4">
              {openings.map((job, i) => (
                <div key={i} className="w-full rounded-[20px] bg-mecpl-dark p-5 md:p-6 transition-all" data-testid={`card-job-${i}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#C41E3A]">{job.dept} | {job.type}</div>
                      <h3 className="text-xl font-light uppercase tracking-tight text-white">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        <span className="inline-flex items-center gap-1.5"><MapPin size={10} /> {job.location}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock size={10} /> {job.exp}</span>
                      </div>
                    </div>
                    <a
                      href={`mailto:contact@mecpl.in?subject=Application for ${job.title}`}
                      className="inline-flex items-center gap-2 self-start bg-[#C41E3A] hover:bg-red-700 text-white text-[10px] font-black tracking-[0.25em] uppercase px-5 py-3 rounded-full transition-colors"
                      data-testid={`button-apply-${i}`}
                    >
                      Apply <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

   
<section
  id="abt4"
  ref={benefitsRef}
  className="py-28 scroll-mt-28 relative overflow-hidden"
>

  {/* BG GLOW */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,30,58,0.12),transparent_40%)]" />

  <div className="max-w-7xl mx-auto px-6 relative">

    <div className="grid lg:grid-cols-12 gap-12 items-start">

      {/* LEFT */}
      <div className="lg:col-span-5 space-y-6 sticky top-32">

        <span className="text-[#C41E3A] text-[10px] font-black tracking-[0.28em] uppercase">
          Benefits
        </span>

        <h3 className="text-4xl md:text-6xl font-light uppercase tracking-tight text-white leading-[0.92]">
          Live Your
          <br />
          Best Life
        </h3>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
          Learn about the benefits of working with MECPL and how we prioritise our employees at every step of the way.
        </p>

        <div className="rounded-[28px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop"
            className="h-[420px] w-full object-cover"
            alt="Benefits and workplace"
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="lg:col-span-7 grid md:grid-cols-2 gap-5">

        {benefits.map((benefit, i) => (
          <div
            key={benefit.title}
            className="benefit-card group relative rounded-[28px] border border-white/5 bg-white/[0.03] backdrop-blur-xl p-7 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#C41E3A]/30 hover:bg-[#C41E3A]/[0.04]"
          >

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(196,30,58,0.18),transparent_45%)]" />

            {/* NUMBER */}
            <div className="absolute top-6 right-6 text-white/5 text-5xl font-black">
              0{i + 1}
            </div>

            {/* ICON */}
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#C41E3A]/10 border border-[#C41E3A]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
              <Award
                size={22}
                className="text-[#C41E3A]"
              />
            </div>

            {/* CONTENT */}
            <div className="relative z-10">

              <h3 className="text-white text-xl font-light uppercase tracking-tight mb-4">
                {benefit.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.desc}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  </div>
</section>



      {/* Application Form Section */}
      <section id="apply-form" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-28">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Application</span>
            <h3 className="text-3xl md:text-4xl font-light uppercase tracking-tight text-white">Submit Corporate Application</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Share your background, the role you're interested in, and any portfolio or CV details. We review applications on a rolling basis.</p>
          </div>
          <div className="lg:col-span-7 rounded-[24px] p-6 md:p-8" data-testid="section-application-form">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 bg-[#C41E3A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#C41E3A] text-2xl">✓</span>
                </div>
                <h3 className="text-white font-light text-xl uppercase mb-2">Application Submitted!</h3>
                <p className="text-gray-400 text-sm">Our HR team will contact you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-5 text-[#C41E3A] text-xs font-black uppercase tracking-widest hover:underline" data-testid="button-send-another">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-application">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="E.g., Rahul Sharma"
                      className="w-full bg-mecpl-dark border border-white/10 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-[#C41E3A] transition-colors"
                      data-testid="input-applicant-name"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="E.g., r.sharma@domain.com"
                      className="w-full bg-mecpl-dark border border-white/10 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-[#C41E3A] transition-colors"
                      data-testid="input-applicant-email"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Experience Level</label>
                  <select
                    value={form.exp}
                    onChange={e => setForm({ ...form, exp: e.target.value })}
                    className="w-full bg-mecpl-dark border border-white/10 rounded-sm p-3 text-sm text-gray-300 focus:outline-none focus:border-[#C41E3A] transition-colors"
                    data-testid="select-applicant-exp"
                  >
                    <option>0 - 2 Years Baseline</option>
                    <option>2 - 5 Years Mid-Scale</option>
                    <option>5 - 10 Years Advanced</option>
                    <option>10+ Years Senior Executive</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Cover Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your experience and why you'd like to join MECPL..."
                    className="w-full bg-mecpl-dark border border-white/10 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-[#C41E3A] transition-colors resize-none"
                    data-testid="textarea-applicant-message"
                  />
                </div>
                <div className="border-2 border-dashed border-white/10 hover:border-[#C41E3A]/40 bg-mecpl-dark p-5 rounded-sm text-center transition-colors cursor-pointer relative">
                  <div className="text-gray-500 text-xl mb-1">↑</div>
                  <p className="text-xs text-gray-500">Drag and drop CV/Portfolio here, or browse</p>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C41E3A] hover:bg-red-700 text-white font-black text-xs tracking-widest uppercase p-4 rounded-sm transition-colors flex items-center justify-center gap-2"
                  data-testid="button-submit-application"
                >
                  Submit Application <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <style>{`

      .slide {
  opacity: 0;
  visibility: hidden;
}

.slide:first-child {
  opacity: 1;
  visibility: visible;
}

  .content {
    width: 100%;
    position: relative;
  }


  .fill {
    transform: scaleY(0);
    transform-origin: top;
  }

  @media (max-width: 1024px) {
    .pin-section {
      height: auto;
      padding: 100px 0;
    }

    .content {
      flex-direction: column;
      gap: 40px;
    }

    .right {
      width: 100%;
      height: auto !important;
    }

    .slide {
      position: relative !important;
      opacity: 1 !important;
      visibility: visible !important;
      margin-bottom: 24px;
    }
  }

  /* Improve contrast for Core Values slides */
  #abt2 .slide img { z-index: 5; }
  #abt2 .slide > .bg-gradient-to-t { z-index: 12; }
  #abt2 .slide::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.55) 35%, rgba(255,255,255,0.08) 65%);
    z-index: 16;
    border-radius: 28px;
    pointer-events: none;
  }

  #abt2 .slide h3,
  #abt2 .slide p,
  #abt2 .slide .inline-flex span {
    color: #111111 !important;
    text-shadow: none;
    position: relative;
    z-index: 30;
  }

`}</style>
    </div>
  );
}

