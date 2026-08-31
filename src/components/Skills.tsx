import { motion } from 'framer-motion'
import { skills } from '../data/profile'

const ease = [0.16, 1, 0.3, 1] as const

// Variant sizes per position — creates natural hierarchy without bold weight
const tagSizes = [
  'text-[1.05rem]',
  'text-[0.9rem]',
  'text-[0.95rem]',
  'text-[0.85rem]',
  'text-[1rem]',
  'text-[0.88rem]',
  'text-[0.93rem]',
]

export function Skills() {
  return (
    <section
      id="skills"
      className="relative bg-paper-dark-deep dark:bg-paper-dark-deep overflow-hidden"
    >
      {/* Top hairline rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/6" />

      <div className="container-site py-24 lg:py-32">

        {/* ── Section header ── */}
        <div className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            {/* Eyebrow */}
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-[#a39c90]/70 block mb-5">
              02 / Skills &amp; Learning Areas
            </span>

            {/* Main heading — large display serif, light weight */}
            <h2 className="font-display font-normal text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.02] tracking-[-0.03em] text-[#f0ece3]">
              What I know,
              <br />
              <span className="font-display italic font-normal text-[#c94a0a]">
                what I'm learning.
              </span>
            </h2>
          </motion.div>

          {/* Right: short context note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-[0.82rem] text-[#6d675e] leading-relaxed max-w-[28ch] lg:text-right lg:pb-1"
          >
            Technologies, concepts, and areas actively being built on — as of 2026.
          </motion.p>
        </div>

        {/* ── Top rule ── */}
        <div className="h-px bg-white/8 mb-0" />

        {/* ── Three-column editorial type grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-white/8">
          {skills.map((cat, colIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: colIndex * 0.12, ease }}
              className={`py-10 ${colIndex > 0 ? 'md:pl-10 lg:pl-14' : ''} ${colIndex < skills.length - 1 ? 'md:pr-10 lg:pr-14' : ''} border-b border-white/8 md:border-b-0`}
            >
              {/* Column header — mono label only, no icon */}
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[#a39c90]/60">
                  {String(colIndex + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[#c94a0a]/70">
                  {/* Abbreviated category label */}
                  {colIndex === 0 ? 'Languages' : colIndex === 1 ? 'CS Topics' : 'Interests'}
                </span>
              </div>

              {/* Category title — Fraunces italic */}
              <h3 className="font-display italic font-normal text-[1.05rem] text-[#f0ece3]/70 leading-snug tracking-[-0.01em] mb-7">
                {cat.title}
              </h3>

              {/* Skills — plain typographic list, varying sizes */}
              <ul className="space-y-0">
                {cat.tags.map((tag, j) => (
                  <motion.li
                    key={tag}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.45, delay: colIndex * 0.1 + j * 0.055, ease }}
                    className="group border-b border-white/5 last:border-b-0"
                  >
                    <span
                      className={`flex items-baseline justify-between py-3 ${tagSizes[j % tagSizes.length]}
                        font-body font-normal leading-snug
                        text-[#a39c90]
                        group-hover:text-[#f0ece3]
                        transition-colors duration-300 cursor-default select-none`}
                    >
                      {tag}
                      {/* Subtle index mark */}
                      <span className="font-mono text-[0.55rem] text-[#a39c90]/25 group-hover:text-[#c94a0a]/50 transition-colors duration-300 ml-3 shrink-0">
                        {String(j + 1).padStart(2, '0')}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom rule + count footnote ── */}
        <div className="h-px bg-white/8 mt-0" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-between pt-6"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-[#a39c90]/35">
            {skills.reduce((acc, c) => acc + c.tags.length, 0)} items across {skills.length} areas
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-[#a39c90]/35">
            Actively learning
          </span>
        </motion.div>

      </div>

      {/* Bottom hairline rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/6" />
    </section>
  )
}
