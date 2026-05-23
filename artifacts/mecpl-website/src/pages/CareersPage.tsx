import { Link } from "wouter";
import { Briefcase, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

const openings = [
  { title: "Site Engineer", dept: "Engineering", location: "Pune, Maharashtra", type: "Full-time", exp: "2-5 years" },
  { title: "Project Manager", dept: "Management", location: "Pune, Maharashtra", type: "Full-time", exp: "8-12 years" },
  { title: "Structural Engineer", dept: "Engineering", location: "Pune, Maharashtra", type: "Full-time", exp: "3-7 years" },
  { title: "Safety Officer", dept: "HSE", location: "Pune, Maharashtra", type: "Full-time", exp: "2-4 years" },
  { title: "Quality Control Engineer", dept: "Quality", location: "Pune, Maharashtra", type: "Full-time", exp: "3-6 years" },
  { title: "Quantity Surveyor", dept: "Finance", location: "Pune, Maharashtra", type: "Full-time", exp: "2-5 years" },
];

export default function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", exp: "0 - 2 Years Baseline", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#1A1A1A] pt-20">
      {/* Header */}
      <div className="relative py-20 border-b border-white/5 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale" alt="Engineering team" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block mb-3">Join Team MECPL</span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-white">Construct Your<br />Engineering Career</h1>
          <div className="w-16 h-0.5 bg-[#C41E3A] mt-4"></div>
          <p className="text-gray-400 text-base mt-4 max-w-xl leading-relaxed">At Millennium Engineers & Contractors, we prioritize the safety metrics and professional engineering skill-mapping of our core talent team. Shape tomorrow alongside industry-leading veterans.</p>
          <div className="flex items-center gap-2 mt-5 text-white/30 text-xs tracking-widest uppercase font-bold">
            <Link href="/"><span className="hover:text-[#C41E3A] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white/60">Careers</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 py-14" data-testid="section-careers">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Join Team MECPL</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase text-white">Build Your Engineering Career</h2>
            <p className="text-gray-400 text-sm leading-relaxed">Shape tomorrow alongside industry-leading veterans. We prioritize professional development, safety excellence, and career growth for every team member.</p>
            <div className="h-48 rounded-sm overflow-hidden border border-white/10">
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 grayscale" alt="Engineering team" />
            </div>

            {/* Current openings */}
            <div className="space-y-3" data-testid="section-openings">
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-3">Current Openings</div>
              {openings.map((job, i) => (
                <div key={i} className="p-4 bg-[#2C2C2C] border border-white/5 rounded-sm hover:border-[#C41E3A]/30 transition-all group" data-testid={`card-job-${i}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-sm uppercase group-hover:text-[#C41E3A] transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <span className="flex items-center gap-1 text-gray-500 text-[10px]"><Briefcase size={9} /> {job.dept}</span>
                        <span className="flex items-center gap-1 text-gray-500 text-[10px]"><Clock size={9} /> {job.exp}</span>
                      </div>
                    </div>
                    <a
                      href={`mailto:contact@mecpl.in?subject=Application for ${job.title}`}
                      className="flex-shrink-0 text-[#C41E3A] text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors"
                      data-testid={`button-apply-${i}`}
                    >
                      Apply →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application form */}
          <div className="lg:col-span-7 bg-[#2C2C2C] border border-white/5 rounded-sm p-8 shadow-2xl" data-testid="section-application-form">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-white font-black text-xl uppercase mb-2">Application Submitted!</h3>
                <p className="text-gray-400 text-sm">Our HR team will contact you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-5 text-[#C41E3A] text-xs font-black uppercase tracking-widest hover:underline" data-testid="button-send-another">
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-application">
                <div className="space-y-1">
                  <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Applications</span>
                  <h3 className="text-white font-black text-xl uppercase">Submit Corporate Application</h3>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="E.g., Rahul Sharma"
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-[#C41E3A] transition-colors"
                    data-testid="input-applicant-name"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="E.g., r.sharma@domain.com"
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-[#C41E3A] transition-colors"
                    data-testid="input-applicant-email"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">Experience Level</label>
                  <select
                    value={form.exp}
                    onChange={e => setForm({...form, exp: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm p-3 text-sm text-gray-300 focus:outline-none focus:border-[#C41E3A] transition-colors"
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
                    onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Tell us about your experience and why you'd like to join MECPL..."
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-[#C41E3A] transition-colors resize-none"
                    data-testid="textarea-applicant-message"
                  />
                </div>
                <div className="border-2 border-dashed border-white/10 hover:border-[#C41E3A]/40 bg-[#1A1A1A] p-5 rounded-sm text-center transition-colors cursor-pointer relative">
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
    </div>
  );
}
