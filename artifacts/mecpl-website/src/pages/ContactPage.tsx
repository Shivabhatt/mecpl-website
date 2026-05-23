import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
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
          <div className="text-[#F47920] text-xs font-bold tracking-widest uppercase mb-3">Get In Touch</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Contact Us</h1>
          <div className="w-16 h-1 bg-[#F47920] mt-4"></div>
          <p className="text-white/60 text-base mt-4 max-w-xl">
            Ready to build your next landmark? Reach out to MECPL's project team for inquiries, partnerships, or general information.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/40 text-sm">
            <Link href="/"><span className="hover:text-[#F47920] cursor-pointer">Home</span></Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </div>

      {/* Contact info + form */}
      <section className="py-16 bg-gray-50" data-testid="section-contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-[#F47920] text-xs font-bold tracking-widest uppercase block mb-2">Contact Information</span>
                <h2 className="text-3xl font-black text-[#1B2F6E]">Let's Build Together</h2>
                <div className="w-12 h-1 bg-[#F47920] mt-3"></div>
              </div>

              <div className="space-y-5">
                <div className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-[#F47920]/30 transition-colors" data-testid="info-address">
                  <div className="w-11 h-11 bg-[#1B2F6E] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#1B2F6E] font-bold text-sm mb-1">Office Address</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Office No. 501-504, 5th Floor,<br />
                      Elite Transbay, Sr. No. 3,<br />
                      Opp. S.K.P Campus, Balewadi,<br />
                      Pune - 411045, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-[#F47920]/30 transition-colors" data-testid="info-phone">
                  <div className="w-11 h-11 bg-[#F47920] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#1B2F6E] font-bold text-sm mb-2">Phone Numbers</h4>
                    <a href="tel:02066865858" className="block text-gray-600 text-sm hover:text-[#F47920] transition-colors font-medium" data-testid="link-contact-phone1">
                      Exchange Line: 020 6686 5858
                    </a>
                    <a href="tel:+917066865858" className="block text-gray-600 text-sm hover:text-[#F47920] transition-colors font-medium mt-1" data-testid="link-contact-phone2">
                      Mobilization: +91 7066865858
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-[#F47920]/30 transition-colors" data-testid="info-email">
                  <div className="w-11 h-11 bg-[#1B2F6E] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-[#1B2F6E] font-bold text-sm mb-1">Email</h4>
                    <a href="mailto:contact@mecpl.in" className="text-gray-600 text-sm hover:text-[#F47920] transition-colors font-medium" data-testid="link-contact-email">
                      contact@mecpl.in
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100" data-testid="info-hours">
                  <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <h4 className="text-[#1B2F6E] font-bold text-sm mb-1">Office Hours</h4>
                    <p className="text-gray-500 text-sm">Monday – Saturday</p>
                    <p className="text-gray-500 text-sm">9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="h-full flex items-center justify-center bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <div>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={36} className="text-green-600" />
                    </div>
                    <h3 className="text-[#1B2F6E] font-black text-2xl mb-3">Message Sent!</h3>
                    <p className="text-gray-500 text-base max-w-sm mx-auto">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="mt-6 text-[#F47920] font-bold text-sm hover:underline"
                      data-testid="button-send-another"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-100 space-y-5" data-testid="form-contact">
                  <div>
                    <span className="text-[#F47920] text-xs font-bold tracking-widest uppercase block mb-2">Send a Message</span>
                    <h2 className="text-2xl font-black text-[#1B2F6E]">Project Inquiry</h2>
                  </div>

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
                        data-testid="input-contact-name"
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
                        placeholder="you@company.com"
                        data-testid="input-contact-email"
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
                        data-testid="input-contact-phone"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1B2F6E] text-xs font-bold uppercase tracking-wide mb-1.5">Subject *</label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B2F6E] transition-colors bg-white"
                        data-testid="select-contact-subject"
                      >
                        <option value="">Select subject</option>
                        <option value="Project Inquiry">Project Inquiry</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Careers">Careers</option>
                        <option value="Investor Relations">Investor Relations</option>
                        <option value="General">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#1B2F6E] text-xs font-bold uppercase tracking-wide mb-1.5">Message *</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1B2F6E] transition-colors resize-none"
                      placeholder="Tell us about your project requirements, scope, timeline, or any other details..."
                      data-testid="textarea-contact-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#F47920] text-white py-4 font-bold text-sm uppercase tracking-wide rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    data-testid="button-contact-submit"
                  >
                    Send Message <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-72 bg-[#1B2F6E] flex items-center justify-center relative overflow-hidden" data-testid="section-map">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute border border-white rounded-full" style={{
              width: `${(i + 1) * 120}px`,
              height: `${(i + 1) * 120}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
          ))}
        </div>
        <div className="text-center relative z-10">
          <div className="w-12 h-12 bg-[#F47920] rounded-full flex items-center justify-center mx-auto mb-3">
            <MapPin size={22} className="text-white" />
          </div>
          <p className="text-white font-bold text-lg">Elite Transbay, Balewadi, Pune</p>
          <a
            href="https://maps.google.com/?q=Elite+Transbay+Balewadi+Pune"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F47920] text-sm font-semibold mt-2 inline-block hover:underline"
            data-testid="link-maps"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
