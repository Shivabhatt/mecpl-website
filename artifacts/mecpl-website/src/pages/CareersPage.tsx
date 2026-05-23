import { Link } from "wouter";
import { Briefcase, Users, TrendingUp, Heart, Send, MapPin, Clock } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#1B2F6E] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 border border-white rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-[#F47920] text-xs font-bold tracking-widest uppercase mb-3">Join Our Team</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Careers at MECPL</h1>
          <div className="w-16 h-1 bg-[#F47920] mt-4"></div>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            Build your career with Pune's most trusted civil engineering firm. We seek passionate engineering professionals ready to shape India's skyline.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <Link href="/"><span className="hover:text-[#F47920] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white">Careers</span>
          </div>
        </div>
      </div>

      {/* Why MECPL */}
      <section className="py-16 bg-gray-50" data-testid="section-why-mecpl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Our Culture" title="Why Work With MECPL?" center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[
              { icon: TrendingUp, title: "Career Growth", desc: "Structured career development paths and leadership opportunities within a growing firm." },
              { icon: Users, title: "Expert Team", desc: "Work alongside some of India's most experienced civil engineers and project managers." },
              { icon: Heart, title: "Safety First", desc: "ISO 45001 certified workplace safety ensuring your well-being on every project site." },
              { icon: Briefcase, title: "Landmark Projects", desc: "Contribute to landmark structures for India's biggest developers and corporations." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#F47920]/30 hover:shadow-md transition-all text-center" data-testid={`card-why-${title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="w-14 h-14 bg-[#1B2F6E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-[#1B2F6E] font-bold text-sm mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="py-16 bg-white" data-testid="section-openings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Opportunities" title="Current Openings" />
          <div className="space-y-4">
            {openings.map((job, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-[#1B2F6E]/20 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-testid={`card-job-${i}`}>
                <div>
                  <h3 className="text-[#1B2F6E] font-bold text-base">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="flex items-center gap-1 text-gray-500 text-xs"><Briefcase size={11} /> {job.dept}</span>
                    <span className="flex items-center gap-1 text-gray-500 text-xs"><MapPin size={11} /> {job.location}</span>
                    <span className="flex items-center gap-1 text-gray-500 text-xs"><Clock size={11} /> {job.exp}</span>
                    <span className="bg-[#F47920]/10 text-[#F47920] text-xs font-bold px-2 py-0.5 rounded-full">{job.type}</span>
                  </div>
                </div>
                <a
                  href={`mailto:contact@mecpl.in?subject=Application for ${job.title}`}
                  className="flex-shrink-0 bg-[#1B2F6E] text-white text-xs font-bold px-5 py-2.5 rounded hover:bg-[#162459] transition-colors inline-flex items-center gap-2"
                  data-testid={`button-apply-${i}`}
                >
                  Apply Now <Send size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-16 bg-gray-50" data-testid="section-application-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Apply" title="Submit Your Application" center />
          {submitted ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-green-600" />
              </div>
              <h3 className="text-[#1B2F6E] font-black text-xl mb-2">Application Submitted!</h3>
              <p className="text-gray-500">Thank you for your interest. Our HR team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-100 space-y-4" data-testid="form-application">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1B2F6E] text-xs font-bold uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B2F6E] transition-colors"
                    placeholder="Your full name"
                    data-testid="input-applicant-name"
                  />
                </div>
                <div>
                  <label className="block text-[#1B2F6E] text-xs font-bold uppercase tracking-wide mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B2F6E] transition-colors"
                    placeholder="you@email.com"
                    data-testid="input-applicant-email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1B2F6E] text-xs font-bold uppercase tracking-wide mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B2F6E] transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                    data-testid="input-applicant-phone"
                  />
                </div>
                <div>
                  <label className="block text-[#1B2F6E] text-xs font-bold uppercase tracking-wide mb-1.5">Position Applying For *</label>
                  <select
                    required
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B2F6E] transition-colors bg-white"
                    data-testid="select-applicant-position"
                  >
                    <option value="">Select a position</option>
                    {openings.map((job) => (
                      <option key={job.title} value={job.title}>{job.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#1B2F6E] text-xs font-bold uppercase tracking-wide mb-1.5">Cover Letter / Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B2F6E] transition-colors resize-none"
                  placeholder="Tell us about your experience and why you'd like to join MECPL..."
                  data-testid="textarea-applicant-message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1B2F6E] text-white py-4 font-bold text-sm uppercase tracking-wide rounded-lg hover:bg-[#162459] transition-colors flex items-center justify-center gap-2"
                data-testid="button-submit-application"
              >
                Submit Application <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
