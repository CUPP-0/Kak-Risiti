import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, Clock, ArrowRight, Layers, Smartphone, Globe, Palette } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ServicesEstimatorProps {
  onBookService: (serviceTitle: string) => void;
}

export const ServicesEstimator: React.FC<ServicesEstimatorProps> = ({ onBookService }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([SERVICES[0].title]);

  const toggleService = (title: string) => {
    sound.playPop();
    if (selectedServices.includes(title)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== title));
      }
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'srv-app':
        return <Smartphone className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />;
      case 'srv-web':
        return <Globe className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />;
      case 'srv-brand':
        return <Palette className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />;
      default:
        return <Layers className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF08A] text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Ways We Can Collaborate
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-neutral-950 dark:text-white tracking-tight">
          Services tailored for startups &amp; creators.
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-base sm:text-lg">
          Clear deliverables, rapid sprints, and zero corporate bureaucracy. Select your scope below.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {SERVICES.map((srv) => {
          const isSelected = selectedServices.includes(srv.title);
          return (
            <div
              key={srv.id}
              onClick={() => toggleService(srv.title)}
              className={`cursor-pointer p-7 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-neutral-900 border-neutral-900 dark:border-neutral-500 shadow-[6px_6px_0px_#18181B] dark:shadow-[6px_6px_0px_#3f3f46] -translate-y-1'
                  : 'bg-white/80 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                      {getServiceIcon(srv.id)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EDE9FE] dark:bg-purple-950/80 text-[#6D28D9] dark:text-purple-300">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Selection Checkbox */}
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-neutral-950 dark:bg-white border-neutral-950 dark:border-white text-white dark:text-neutral-950'
                        : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-neutral-950 dark:text-white">
                  {srv.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2 leading-relaxed">
                  {srv.description}
                </p>

                {/* Deliverables List */}
                <div className="mt-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
                    What&apos;s Included:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {srv.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                  Estimated: {srv.timeline}
                </span>
                <span className="text-neutral-900 dark:text-white font-bold">
                  {isSelected ? 'Selected' : 'Click to add'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scope Summary Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 dark:bg-neutral-900 border dark:border-neutral-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[#86EFAC] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Active Scope ({selectedServices.length} Selected)
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display">
            Ready to kickstart this project?
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl">
            Selected: {selectedServices.join(' + ')}
          </p>
        </div>

        <button
          onClick={() => {
            sound.playSparkle();
            onBookService(selectedServices.join(', '));
          }}
          className="px-6 py-3 rounded-full bg-[#86EFAC] text-neutral-950 font-bold text-sm hover:bg-[#6ee7b7] active:scale-95 transition-all flex items-center gap-2 shrink-0 shadow-md"
        >
          <span>Request Custom Proposal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
