import React from 'react';
import { Sparkles, MessageCircle, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE7F3] dark:bg-pink-950/80 text-[#BE185D] dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-3 border border-pink-300/50 dark:border-pink-900/50">
          <MessageCircle className="w-3.5 h-3.5" />
          Client Kind Words
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-neutral-950 dark:text-white tracking-tight">
          What people say about working together.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
          >
            <div>
              {/* Badge & Stars */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px] font-bold">
                  {t.badge}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author details */}
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-11 h-11 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-sm text-neutral-950 dark:text-white font-display">
                  {t.name}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {t.role} • {t.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
