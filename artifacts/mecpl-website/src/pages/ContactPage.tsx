import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div data-animate-page className="bg-white pt-20">
      {/* Header */}
      <div className="relative py-20 border-b border-black/[0.06] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-[0.1]" alt="Construction" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/40"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <img src="/assets/logo/mecpl-logo.webp" alt="MECPL logo" className="h-16 w-auto object-contain" />
          </div>
          <SectionHeader label="Project Intake Channel" title={`Let's Build Something Extraordinary Together`} subtitle="Transmit your structural blueprints or enterprise construction specifications. Our central operations bureau will analyze your requirements immediately." />
          <div className="flex items-center gap-2 mt-2 text-[#9ca3af] text-xs tracking-widest uppercase font-bold">
            <Link href="/"><span className="hover:text-[#C41E3A] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-[#6b7280]">Contact</span>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <section className="max-w-7xl mx-auto px-6 py-14" data-testid="section-contact">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5">
            <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Contact Details</span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#111827]">Get in Touch</h3>

            <div className="space-y-4">
              <div className="flex gap-4 p-5 bg-white border border-black/[0.07] rounded-sm hover:border-[#C41E3A]/20 transition-colors shadow-sm" data-testid="info-address">
                <div className="w-10 h-10 bg-[#C41E3A] rounded-sm flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#6b7280] mb-1">Office Address</div>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Office No. 501-504, 5th Floor,<br />
                    Elite Transbay, Sr. No. 3,<br />
                    Opp. S.K.P Campus, Balewadi,<br />
                    Pune - 411045, Maharashtra
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white border border-black/[0.07] rounded-sm hover:border-[#C41E3A]/20 transition-colors shadow-sm" data-testid="info-phone">
                <div className="w-10 h-10 bg-[#C41E3A] rounded-sm flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#6b7280] mb-1">Phone</div>
                  <a href="tel:02066865858" className="block text-[#374151] text-sm hover:text-[#C41E3A] transition-colors" data-testid="link-contact-phone1">020 6686 5858</a>
                  <a href="tel:+917066865858" className="block text-[#374151] text-sm hover:text-[#C41E3A] transition-colors mt-0.5" data-testid="link-contact-phone2">+91 7066865858</a>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white border border-black/[0.07] rounded-sm hover:border-[#C41E3A]/20 transition-colors shadow-sm" data-testid="info-email">
                <div className="w-10 h-10 bg-[#C41E3A] rounded-sm flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#6b7280] mb-1">Email</div>
                  <a href="mailto:contact@mecpl.in" className="text-[#374151] text-sm hover:text-[#C41E3A] transition-colors" data-testid="link-contact-email">contact@mecpl.in</a>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white border border-black/[0.07] rounded-sm shadow-sm" data-testid="info-hours">
                <div className="w-10 h-10 bg-[#f9f9f9] border border-black/[0.1] rounded-sm flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-[#6b7280]" />
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#6b7280] mb-1">Office Hours</div>
                  <p className="text-[#4b5563] text-sm">Monday – Saturday</p>
                  <p className="text-[#4b5563] text-sm">9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white border border-black/[0.07] rounded-sm p-8 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-x-8 translate-y-8 text-[200px] leading-none font-black text-[#111827]">⬡</div>

            {submitted ? (
              <div className="text-center py-14">
                <div className="w-16 h-16 bg-[#C41E3A]/10 rounded-sm flex items-center justify-center mx-auto mb-5">
                  <span className="text-[#C41E3A] text-3xl">✓</span>
                </div>
                <h3 className="text-[#111827] font-black text-2xl uppercase mb-3">Enquiry Logged</h3>
                <p className="text-[#4b5563] text-sm max-w-sm mx-auto">Thank you for reaching out. Our team will respond to your project enquiry within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                  className="mt-6 text-[#C41E3A] text-xs font-black uppercase tracking-widest hover:underline"
                  data-testid="button-send-another"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
                <div className="space-y-1">
                  <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase">Project Enquiry</span>
                  <h3 className="text-[#111827] font-black text-xl uppercase">Transmit Operational Parameters</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-[#6b7280] block mb-1.5">First / Last Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="E.g., Amit Patel"
                      className="w-full bg-[#f9f9f9] border border-black/[0.1] rounded-sm p-3 text-sm text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors"
                      data-testid="input-contact-name"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-[#6b7280] block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="E.g., patel@enterprise.co.in"
                      className="w-full bg-[#f9f9f9] border border-black/[0.1] rounded-sm p-3 text-sm text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors"
                      data-testid="input-contact-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#6b7280] block mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="E.g., +91 98765 43210"
                    className="w-full bg-[#f9f9f9] border border-black/[0.1] rounded-sm p-3 text-sm text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors"
                    data-testid="input-contact-phone"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#6b7280] block mb-1.5">Project Description *</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    placeholder="Outline square footage parameters, regional zoning coordinates, or physical structural demands..."
                    className="w-full bg-[#f9f9f9] border border-black/[0.1] rounded-sm p-3 text-sm text-[#111827] focus:outline-none focus:border-[#C41E3A] transition-colors resize-none"
                    data-testid="textarea-contact-message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C41E3A] hover:bg-red-700 text-white font-black text-xs tracking-widest uppercase p-4 rounded-sm transition-colors shadow-lg shadow-[#C41E3A]/20 flex items-center justify-center gap-2"
                  data-testid="button-contact-submit"
                >
                  Transmit Parameters <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-64 bg-[#f9f9f9] flex items-center justify-center relative overflow-hidden border-t border-black/[0.06]" data-testid="section-map">
        <div className="absolute inset-0 opacity-[0.06]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute border border-black rounded-full" style={{ width: `${(i + 1) * 150}px`, height: `${(i + 1) * 150}px`, left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
          ))}
        </div>
        <div className="text-center relative z-10">
          <div className="w-10 h-10 bg-[#C41E3A] rounded-sm flex items-center justify-center mx-auto mb-3">
            <MapPin size={18} className="text-white" />
          </div>
          <p className="text-[#111827] font-black text-sm uppercase tracking-widest">Elite Transbay, Balewadi, Pune</p>
          <a href="https://maps.google.com/?q=Elite+Transbay+Balewadi+Pune" target="_blank" rel="noopener noreferrer" className="text-[#C41E3A] text-xs font-bold mt-2 inline-block hover:underline tracking-wider uppercase" data-testid="link-maps">
            Open in Google Maps →
          </a>
        </div>
      </section>
    </div>
  );
}
