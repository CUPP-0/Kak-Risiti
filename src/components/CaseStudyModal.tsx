import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ExternalLink, Sparkles, CheckCircle, Clock, User, Wrench, ArrowLeft } from 'lucide-react';
import { CaseStudy } from '../types';
import { sound } from '../utils/audio';
import { CASE_STUDIES } from '../data/portfolioData';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onSelectAnother: (caseStudy: CaseStudy) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onSelectAnother
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playPop();
        onClose();
      }
    };
    if (caseStudy) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  const currentIndex = CASE_STUDIES.findIndex((c) => c.id === caseStudy.id);
  const nextProject = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#FDFBF7] dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-y-auto flex flex-col z-10"
        >
          {/* Sticky Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FDFBF7]/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: caseStudy.accentColor }}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {caseStudy.category} • {caseStudy.year}
              </span>
            </div>

            <button
              id="close-case-study-btn"
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-10">
            {/* Title & Tagline */}
            <div>
              <h1
                id="case-study-title"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-neutral-950 dark:text-white tracking-tight leading-tight"
              >
                {caseStudy.title}
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mt-3 font-medium">
                {caseStudy.tagline}
              </p>
            </div>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
              <div>
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase flex items-center gap-1">
                  <User className="w-3 h-3 text-neutral-600 dark:text-neutral-400" /> Client
                </span>
                <p className="font-bold text-neutral-900 dark:text-white text-sm mt-1">{caseStudy.client}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-neutral-600 dark:text-neutral-400" /> Role
                </span>
                <p className="font-bold text-neutral-900 dark:text-white text-sm mt-1">{caseStudy.role}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-600 dark:text-neutral-400" /> Timeline
                </span>
                <p className="font-bold text-neutral-900 dark:text-white text-sm mt-1">{caseStudy.timeline}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-neutral-600 dark:text-neutral-400" /> Key Stack
                </span>
                <p className="font-bold text-neutral-900 dark:text-white text-sm mt-1">{caseStudy.tools.slice(0, 2).join(', ')}</p>
              </div>
            </div>

            {/* Main Cover Banner */}
            <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-md aspect-16/9 bg-neutral-100 dark:bg-neutral-800">
              <img
                src={caseStudy.coverImage}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overview & Key Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-bold font-display text-neutral-900 dark:text-white">
                  Project Overview
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
                  {caseStudy.overview}
                </p>
              </div>

              {/* Metrics Box */}
              <div className="p-6 rounded-2xl bg-[#FEF9C3]/50 dark:bg-amber-950/30 border border-[#FEF08A] dark:border-amber-900/50 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Key Impact
                </h3>
                <div className="space-y-3">
                  {caseStudy.metrics.map((m) => (
                    <div key={m.label} className="border-b border-amber-200/60 dark:border-amber-800/40 pb-2.5 last:border-0 last:pb-0">
                      <div className="text-xl font-extrabold text-neutral-950 dark:text-white font-display">
                        {m.value}
                      </div>
                      <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The Challenge & The Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-2xs">
                <div className="inline-block px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase">
                  The Challenge
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                  {caseStudy.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-2xs">
                <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase">
                  The Design Solution
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                  {caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Screenshots Gallery */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-display text-neutral-900 dark:text-white">
                Interface Highlights &amp; Interaction Design
              </h2>
              <div className="space-y-6">
                {caseStudy.screenshots.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm"
                  >
                    <div className="aspect-16/9 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-4 sm:p-5 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800">
                      <h3 className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base font-display">
                        {s.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-1">
                        {s.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design System & Typography */}
            {caseStudy.designSystem && (
              <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Design System Palette &amp; Typography
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {caseStudy.designSystem.colors.map((color, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white dark:bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-mono shadow-2xs text-neutral-800 dark:text-neutral-200">
                      <span
                        className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-600"
                        style={{ backgroundColor: color }}
                      />
                      <span>{color}</span>
                    </div>
                  ))}
                  <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 pl-2">
                    Fonts: {caseStudy.designSystem.fonts.join(' + ')}
                  </div>
                </div>
              </div>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 dark:bg-neutral-950 border dark:border-neutral-800 text-white relative overflow-hidden">
                <div className="text-2xl sm:text-3xl font-display font-medium text-neutral-200 italic mb-4">
                  &ldquo;{caseStudy.testimonial.quote}&rdquo;
                </div>
                <div className="text-sm font-bold text-[#86EFAC]">
                  {caseStudy.testimonial.author}
                  <span className="text-neutral-400 font-normal ml-2">
                    — {caseStudy.testimonial.role}
                  </span>
                </div>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  sound.playPop();
                  onClose();
                }}
                className="flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Projects
              </button>

              <button
                onClick={() => {
                  sound.playSparkle();
                  onSelectAnother(nextProject);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <span>Next Project: {nextProject.title.split('—')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
