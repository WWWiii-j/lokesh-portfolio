import { motion } from 'framer-motion'
import { education } from '../data/profile'
import { SectionTitle } from './SectionTitle'

const ease = [0.16, 1, 0.3, 1] as const

export function Education() {
  return (
    <section id="education" className="section bg-paper dark:bg-paper-dark transition-colors duration-500">
      <div className="container-site">
        <SectionTitle
          eyebrow="05 / Education"
          title="Academic background"
          subtitle="Current enrollment and coursework."
        />

        {/* Clean timeline — minimal dot + line, open layout */}
        <div className="max-w-[720px] relative">
          {/* Vertical guide line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-black/8 dark:bg-white/8" />

          {education.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="relative pl-9 pb-12 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-4px] top-[6px] w-[9px] h-[9px] rounded-full bg-primary ring-2 ring-paper dark:ring-paper-dark" />

              {/* Date badge */}
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary dark:text-[#e8906a] block mb-3">
                {item.date}
              </span>

              <h3 className="font-display font-normal text-[1.15rem] leading-snug tracking-[-0.01em] text-ink dark:text-warm-white mb-1">
                {item.title}
              </h3>
              <p className="font-medium text-[0.875rem] text-ink-muted dark:text-gray-400 mb-4">
                {item.school}
              </p>

              {/* Status and coursework — flat, not boxed */}
              <div className="space-y-3 text-[0.875rem] text-ink-muted dark:text-gray-400 leading-relaxed">
                <p>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint dark:text-gray-500 mr-2">Status</span>
                  {item.status}
                </p>
                <p>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint dark:text-gray-500 mr-2">Coursework</span>
                  {item.coursework}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
