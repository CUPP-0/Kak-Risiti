import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Copy, Check, Sparkles, Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ContactSectionProps {
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledService }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Mobile App Design',
    budget: '$3k - $7k',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({
        ...prev,
        projectType: prefilledService,
        message: `Hi Alya! I'd love to collaborate on ${prefilledService}. Here are a few details about what we're building:`
      }));
    }
  }, [prefilledService]);

  const handleCopyEmail = () => {
    sound.playSparkle();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#86EFAC', '#C4B5FD', '#FEF08A']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    sound.playSparkle();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#86EFAC', '#C4B5FD', '#FEF08A', '#F472B6']
    });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading & Social Links (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9FE] dark:bg-purple-950/80 text-[#6D28D9] dark:text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-300/50 dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5" />
            Let&apos;s Build Together
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-neutral-950 dark:text-white tracking-tight leading-tight">
            Have a project in mind? Let&apos;s talk! ✨
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
            Whether you&apos;re an early-stage startup looking for your zero-to-one product design or need a high-converting Framer website, my inbox is always open.
          </p>

          {/* Quick Copy Email Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-2xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
              Direct Inquiries
            </span>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-white truncate">
                {PERSONAL_INFO.email}
              </span>
              <button
                id="copy-email-contact-btn"
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-colors flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
              Follow Along
            </span>
            <div className="flex flex-wrap gap-2">
              {PERSONAL_INFO.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-all hover:border-neutral-400 dark:hover:border-neutral-600"
                >
                  <span>{social.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 rounded-3xl p-6 sm:p-10 shadow-[6px_6px_0px_#18181B] dark:shadow-[6px_6px_0px_#3f3f46]">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#DCFCE7] dark:bg-emerald-950 text-[#15803D] dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-neutral-950 dark:text-white">
                  Message Sent! ✨
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
                  Thank you for reaching out, <span className="font-bold text-neutral-900 dark:text-white">{formData.name}</span>! I usually respond within 24 hours. Looking forward to chatting.
                </p>
                <button
                  onClick={() => {
                    sound.playPop();
                    setSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="maya@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    What are you looking to build?
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow text-neutral-800 dark:text-neutral-200 font-medium"
                  >
                    <option>Mobile App Design (iOS/Android)</option>
                    <option>Websites in Framer &amp; React</option>
                    <option>Brand Identity &amp; Visual Universe</option>
                    <option>UX &amp; Visual Polish Sprint</option>
                    <option>Full Design System</option>
                    <option>Other / General Chat</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Approximate Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['< $3k', '$3k - $7k', '$7k - $15k', '$15k+'].map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => {
                          sound.playClick();
                          setFormData({ ...formData, budget: b });
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                          formData.budget === b
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-2xs'
                            : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Project Details &amp; Timeline
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me a bit about your idea, timeline, and what success looks like..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-shadow resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full py-4 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
