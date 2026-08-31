import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, type Project } from '../data/projects'
import { SectionTitle } from './SectionTitle'

const ease = [0.16, 1, 0.3, 1] as const

const languageColor: Record<string, string> = {
  TypeScript: '#3178c6',
  Python: '#3776ab',
}

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function ExternalIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projects" className="section bg-paper-alt dark:bg-paper-dark-alt/50 transition-colors duration-500">
      <div className="container-site">
        <SectionTitle
          eyebrow="04 / Projects"
          title="Selected work"
          subtitle="Practical applications and projects built while learning."
        />

        {/* Editorial numbered list — not a grid of equal cards */}
        <div className="space-y-0 divide-y divide-black/8 dark:divide-white/8 border-y border-black/8 dark:border-white/8">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              onClick={() => setActive(p)}
              className="group grid sm:grid-cols-[4rem_1fr_auto] gap-x-6 gap-y-3 py-8 sm:py-10 cursor-pointer transition-colors duration-200 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] -mx-4 px-4"
            >
              {/* Index number */}
              <div className="hidden sm:block">
                <span className="font-mono text-[0.72rem] text-ink-faint dark:text-gray-600 tracking-wide">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Main content */}
              <div className="min-w-0">
                {/* Language / status row */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: languageColor[p.language] ?? '#9ca3af' }}
                  />
                  <span className="font-mono text-[0.68rem] text-ink-faint dark:text-gray-500 uppercase tracking-[0.16em]">
                    {p.language}
                  </span>
                  {p.status && (
                    <>
                      <span className="text-ink-faint dark:text-gray-600 text-xs">·</span>
                      <span className="font-mono text-[0.68rem] text-primary dark:text-[#e8906a] uppercase tracking-[0.12em]">
                        {p.status}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display font-normal text-[1.15rem] sm:text-[1.3rem] leading-snug tracking-[-0.015em] text-ink dark:text-warm-white group-hover:text-primary dark:group-hover:text-[#e8906a] transition-colors duration-200 mb-2">
                  {p.title}
                </h3>

                {/* Description excerpt */}
                <p className="text-[0.875rem] text-ink-muted dark:text-gray-400 line-clamp-2 leading-relaxed max-w-[72ch]">
                  {p.description}
                </p>

                {/* Tech tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-[0.72rem] font-medium border border-black/8 dark:border-white/8 text-ink-muted dark:text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="flex sm:items-center sm:justify-end">
                <motion.span
                  className="text-ink-faint dark:text-gray-600 group-hover:text-primary dark:group-hover:text-[#e8906a] transition-colors duration-200"
                  whileHover={{ x: 3 }}
                >
                  →
                </motion.span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project detail modal — clean, generous whitespace */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/50 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-2xl bg-paper dark:bg-paper-dark-alt rounded-t-2xl sm:rounded-2xl p-8 sm:p-10 shadow-2xl border-t sm:border border-black/6 dark:border-white/8 max-h-[90svh] overflow-y-auto"
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close project details"
                className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-ink-muted dark:text-gray-400 hover:bg-black/6 dark:hover:bg-white/8 transition-colors text-sm"
              >
                ✕
              </button>

              {/* Language + status */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: languageColor[active.language] ?? '#9ca3af' }}
                />
                <span className="font-mono text-[0.68rem] text-ink-faint dark:text-gray-500 uppercase tracking-[0.16em]">
                  {active.language}
                </span>
                {active.status && (
                  <>
                    <span className="text-ink-faint dark:text-gray-600">·</span>
                    <span className="font-mono text-[0.68rem] text-primary dark:text-[#e8906a] uppercase tracking-[0.12em]">
                      {active.status}
                    </span>
                  </>
                )}
              </div>

              <h3 className="font-display font-normal text-[1.6rem] sm:text-[1.9rem] leading-[1.1] tracking-[-0.02em] text-ink dark:text-warm-white mb-4">
                {active.title}
              </h3>

              <p className="text-[0.9rem] text-ink-muted dark:text-gray-300 leading-relaxed mb-8">
                {active.description}
              </p>

              {/* Technologies */}
              <div className="mb-8">
                <span className="eyebrow block mb-3">Technologies</span>
                <div className="flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full text-[0.78rem] font-medium border border-black/8 dark:border-white/8 text-ink-muted dark:text-gray-300 bg-paper-alt dark:bg-paper-dark"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={active.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn bg-ink dark:bg-warm-white text-paper dark:text-ink hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub Repo
                </a>
                {active.demo && (
                  <a
                    href={active.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn border border-black/12 dark:border-white/12 text-ink dark:text-warm-white hover:border-primary hover:text-primary dark:hover:text-[#e8906a] dark:hover:border-[#e8906a]"
                  >
                    <ExternalIcon />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
