import { motion } from 'framer-motion'
import { hackathon } from '../data/profile'
import { Reveal } from './SectionTitle'

const ease = [0.16, 1, 0.3, 1] as const

export function Hackathon() {
  return (
    <section id="hackathon" className="section bg-paper dark:bg-paper-dark transition-colors duration-500">
      <div className="container-site">
        <Reveal>
          {/* Full-width editorial strip — accent left border, open layout */}
          <div className="relative border-l-[3px] border-primary pl-8 sm:pl-12">
            {/* Eyebrow */}
            <span className="eyebrow block mb-4">{hackathon.badge}</span>

            <h2 className="font-display font-normal text-[1.7rem] sm:text-[2.2rem] leading-[1.1] tracking-[-0.02em] text-ink dark:text-warm-white mb-4">
              {hackathon.title}
            </h2>

            <p className="text-[0.95rem] text-ink-muted dark:text-gray-300 leading-relaxed max-w-[62ch] mb-10">
              {hackathon.description}
            </p>

            {/* Detail rows — not cards, just horizontal pairs */}
            <div className="grid sm:grid-cols-2 gap-x-16 gap-y-6">
              {hackathon.details.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                  className="flex gap-4"
                >
                  <span className="shrink-0 text-[1.2rem] mt-0.5" aria-hidden>{d.icon}</span>
                  <div>
                    <strong className="block font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint dark:text-gray-500 mb-1">
                      {d.title}
                    </strong>
                    <p className="text-[0.9rem] text-ink-muted dark:text-gray-300 leading-relaxed">
                      {d.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
