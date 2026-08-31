import { motion } from 'framer-motion'
import { about, quickFacts } from '../data/profile'
import { SectionTitle } from './SectionTitle'

const ease = [0.16, 1, 0.3, 1] as const

export function About() {
  return (
    <section id="about" className="section bg-paper dark:bg-paper-dark transition-colors duration-500">
      <div className="container-site">
        <SectionTitle
          eyebrow="01 / About"
          title="A bit about me"
          subtitle="Background, motivations, and a few quick facts."
        />

        {/* Open two-column layout — not card-boxed */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 mt-2">

          {/* Left: narrative text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            <h3 className="font-display italic font-normal text-[1.25rem] text-ink dark:text-warm-white mb-5 tracking-[-0.01em]">
              Who I Am
            </h3>
            <div className="space-y-4">
              {about.whoIAm.map((p, i) => (
                <p key={i} className="text-[0.95rem] text-ink-muted dark:text-gray-300 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right: quick profile — list, not table-card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <h3 className="font-display italic font-normal text-[1.25rem] text-ink dark:text-warm-white mb-5 tracking-[-0.01em]">
              Quick Profile
            </h3>
            <ul className="space-y-0">
              {quickFacts.map((fact, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[7rem_1fr] gap-x-4 py-3 border-b border-black/6 dark:border-white/6 last:border-b-0 text-[0.875rem]"
                >
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint dark:text-gray-500 leading-relaxed pt-0.5">
                    {fact.label}
                  </span>
                  <span className="text-ink-muted dark:text-gray-300 leading-relaxed break-words">
                    {fact.url ? (
                      <a
                        href={fact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary dark:text-[#e8906a] hover:underline"
                      >
                        {fact.value}
                      </a>
                    ) : fact.email ? (
                      <a
                        href={`mailto:${fact.email}`}
                        className="text-primary dark:text-[#e8906a] hover:underline"
                      >
                        {fact.email}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
