import { useEffect, useState } from "react";
import { X, Send, CheckCircle, Phone, Mail, MapPin, Building2 } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const projectTypes = [
  "Civil Construction",
  "Turnkey Project",
  "Industrial Facility",
  "Residential Tower",
  "Commercial Complex",
  "Interior Fitout",
  "Project Management",
  "Other",
];

const budgetRanges = [
  "Under ₹1 Crore",
  "₹1 – 5 Crore",
  "₹5 – 25 Crore",
  "₹25 – 100 Crore",
  "₹100 Crore+",
  "Prefer not to say",
];

export default function EnquiryModal() {
  const { isOpen, closeModal } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    location: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (!isOpen) setTimeout(() => setSubmitted(false), 400);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      data-testid="modal-enquiry"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-mecpl-dark border border-white/10 rounded-sm shadow-2xl flex flex-col lg:flex-row">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/5 hover:bg-[#C41E3A] border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all rounded-sm"
          data-testid="button-modal-close"
        >
          <X size={16} />
        </button>

        {/* Left panel */}
        <div className="lg:w-2/5 bg-[#C41E3A] p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-white/20 flex items-center justify-between p-2 rounded-sm flex-shrink-0">
              <div className="w-1.5 h-full bg-white rounded-full"></div>
              <div className="w-1.5 h-full bg-white rounded-full"></div>
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase text-white leading-tight">
              Request a<br />Quote
            </h2>
            <p className="text-white/70 text-xs leading-relaxed">
              Share your project details and our senior engineering team will respond within 24 hours with a tailored assessment and cost estimate.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-white/40 text-[10px] font-black tracking-widest uppercase mb-3">Why partner with MECPL</div>
            {[
              "25+ years of execution expertise",
              "ISO 9001 · 14001 · 45001 certified",
              "CRISIL SME 1 financial rating",
              "150+ projects delivered on time",
              "300+ trained engineering professionals",
            ].map((point) => (
              <div key={point} className="flex items-center gap-2.5 text-white/80 text-xs">
                <CheckCircle size={12} className="text-white flex-shrink-0" />
                {point}
              </div>
            ))}
          </div>

          <div className="space-y-2 text-white/60 text-[11px]">
            <a href="tel:02066865858" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={11} /> 020 6686 5858
            </a>
            <a href="mailto:contact@mecpl.in" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={11} /> contact@mecpl.in
            </a>
            <div className="flex items-start gap-2">
              <MapPin size={11} className="flex-shrink-0 mt-0.5" />
              Elite Transbay, Balewadi, Pune 411045
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="lg:w-3/5 p-10">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
                <CheckCircle size={28} className="text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">Enquiry Received</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  Thank you! Our team will review your project details and reach out within 24 hours.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="bg-[#C41E3A] hover:bg-red-700 text-white px-8 py-3 text-xs font-black tracking-widest uppercase rounded-sm transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-enquiry">
              <div>
                <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Project Intake</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-white mt-1">Tell Us About Your Project</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="E.g., Rahul Sharma"
                    className="w-full bg-mecpl-card border border-white/10 text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-[#C41E3A] transition-colors placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Company / Organization</label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="E.g., Panchshil Realty"
                    className="w-full bg-mecpl-card border border-white/10 text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-[#C41E3A] transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className="w-full bg-mecpl-card border border-white/10 text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-[#C41E3A] transition-colors placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-mecpl-card border border-white/10 text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-[#C41E3A] transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Project Type *</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    required
                    className="w-full bg-mecpl-card border border-white/10 text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
                  >
                    <option value="" className="bg-mecpl-card">Select type...</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-mecpl-card">{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Project Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="E.g., Kharadi, Pune"
                    className="w-full bg-mecpl-card border border-white/10 text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-[#C41E3A] transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Approximate Budget</label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full bg-mecpl-card border border-white/10 text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
                >
                  <option value="" className="bg-mecpl-card">Select range...</option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b} className="bg-mecpl-card">{b}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-widest uppercase text-gray-400">Project Brief *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Briefly describe your project requirements, scale, timeline, and any specific challenges..."
                  className="w-full bg-mecpl-card border border-white/10 text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-[#C41E3A] transition-colors placeholder:text-white/20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C41E3A] hover:bg-red-700 text-white py-4 text-xs font-black tracking-widest uppercase rounded-sm transition-all shadow-lg shadow-[#C41E3A]/20 flex items-center justify-center gap-2"
                data-testid="button-modal-submit"
              >
                <Send size={13} /> Submit Project Enquiry
              </button>

              <p className="text-white/20 text-[10px] text-center">
                Your information is confidential and will only be used to respond to your enquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
