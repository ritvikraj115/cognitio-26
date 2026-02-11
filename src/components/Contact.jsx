import React, { useState } from 'react';
import { toast } from "react-toastify";
import { sendContactForm } from '../utils/sendForm';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContactForm(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-gradient-to-b from-slate-950 via-[#0a1628] to-[#0b0f14] py-24 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h2>
          <div className="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-amber-400" />
        </div>

        {/* Contact cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {/* Phone card */}
          <a href="tel:+916205658576" className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm px-6 py-5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Phone</p>
              <p className="text-white font-medium mt-0.5">Shivam Prasad</p>
              <p className="text-slate-400 text-sm">6205658576</p>
            </div>
          </a>

          {/* Email card */}
          <a href="mailto:mes@nitjsr.ac.in" className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm px-6 py-5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</p>
              <p className="text-white font-medium mt-0.5">MES, NIT Jamshedpur</p>
              <p className="text-slate-400 text-sm">mes@nitjsr.ac.in</p>
            </div>
          </a>

          {/* Developers card */}
          <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm px-6 py-5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Developers</p>
              <p className="text-white font-medium mt-0.5">Debdeep Choudhary</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 md:p-10"
          >
            <div className="mb-8">
              <h4 className="text-2xl font-bold text-white">Send Us a Message</h4>
              <p className="text-slate-400 text-sm mt-1">We'll get back to you as soon as possible.</p>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 placeholder-slate-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 placeholder-slate-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 placeholder-slate-500 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 placeholder-slate-500 transition-all duration-200 resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-[0_8px_24px_rgba(16,185,129,0.25)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-slate-500 text-sm">&copy; 2026 Cognitio 26 &middot; 13th–15th February &middot; NIT Jamshedpur</p>
          <p className="mt-2 text-xs text-slate-600">
            Developed by <span className="text-slate-400">Debdeep Choudhary</span>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
