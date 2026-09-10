import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, Filter, Layers, CheckCircle2 } from 'lucide-react';
import { CASE_STUDIES } from '../data/portfolioData';
import { CaseStudy, CategoryType } from '../types';
import { sound } from '../utils/audio';

interface ProjectsSectionProps {
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectCaseStudy }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');

  const categories: CategoryType[] = [
    'All',
    'Mobile Apps',
    'UI/UX & Web',
    'Brand Identity',
    'Design Systems'
  ];

  const filteredProjects = activeCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category: CategoryType) => {
    sound.playPop();
    setActiveCategory(category);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF08A] text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-neutral-800" />
            Selected Works
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-neutral-950 dark:text-white tracking-tight">
            Crafted with heart &amp; precision.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl text-base sm:text-lg">
            A curated selection of products, mobile interfaces, and digital brands built for high engagement.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200/80 dark:border-neutral-700">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-btn-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs scale-102'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-neutral-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              layout
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => {
                sound.playClick();
                onSelectCaseStudy(project);
              }}
              className="group cursor-pointer flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
            >
              {/* Card Image Banner */}
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-tight shadow-xs border border-white/40 backdrop-blur-md"
                    style={{
                      backgroundColor: `${project.accentColor}dd`,
                      color: '#18181B'
                    }}
                  >
                    {project.category}
                  </span>

                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-900/80 text-white backdrop-blur-md">
                    {project.year}
                  </span>
                </div>

                {/* Hover CTA Pill */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-950 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card Content Footer */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                    <span>{project.client}</span>
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      {project.metrics[0]?.value || 'Completed'}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-neutral-900 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base mt-2 line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Tools Chips */}
                <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-1.5">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-lg text-xs font-medium border border-neutral-200/60 dark:border-neutral-700"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="text-neutral-600 dark:text-neutral-400 text-xs font-medium pl-1">
                      +{project.tools.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
