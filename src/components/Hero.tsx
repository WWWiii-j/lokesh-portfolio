import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { Typewriter } from '../hooks/useTypewriter'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-[60px]">
      <div className="container-site w-full py-20 lg:py-28">

        {/* Top status line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="flex h-[6px] w-[6px] rounded-full bg-primary" />
          <span className="eyebrow">Available for collaborations</span>
        </motion.div>

        {/* Main headline area */}
        <div className="max-w-[900px]">
          {/* "Loki" — large, editorial, italic, acts as a visual anchor */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease }}
            className="relative"
          >
            {/* Large italic "Loki" in display serif */}
            <span
              aria-hidden="true"
              className="select-none pointer-events-none absolute -top-2 right-0 lg:right-auto lg:left-[calc(100%-2ch)] font-display italic font-normal text-[clamp(5rem,14vw,10rem)] leading-none text-ink/5 dark:text-warm-white/4 tracking-[-0.03em]"
            >
              Loki
            </span>

            <h1 className="font-display font-normal tracking-[-0.025em] text-ink dark:text-warm-white">
              {/* Name — two-line stagger, different weights */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease }}
                className="block text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.0] font-normal"
              >
                Lokesh Venkat
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8, ease }}
                className="block text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.0] font-normal"
              >
                Sai
                <span className="font-display italic font-normal text-[0.38em] text-primary dark:text-[#e8906a] ml-[0.8em] leading-none align-middle tracking-normal">
                  — Loki
                </span>
              </motion.span>
            </h1>
          </motion.div>

          {/* Role / title — restrained weight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
            className="mt-8 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6"
          >
            <em className="font-display not-italic text-[1.05rem] text-ink dark:text-warm-white/90">
              {profile.heroTitle}
            </em>
            <span className="hidden sm:block h-px w-8 bg-ink-faint dark:bg-gray-600 self-center" />
            <span className="font-display italic text-[0.95rem] text-ink-muted dark:text-gray-400">
              <Typewriter words={profile.roles} />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.7, ease }}
            className="mt-6 text-[0.95rem] text-ink-muted dark:text-gray-400 leading-relaxed max-w-[54ch]"
          >
            {profile.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="pill-btn bg-primary text-white hover:bg-primary-hover shadow-primary"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="pill-btn border border-black/12 dark:border-white/12 text-ink dark:text-warm-white hover:border-primary hover:text-primary dark:hover:text-[#e8906a] dark:hover:border-[#e8906a]"
            >
              About
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="pill-btn border border-black/12 dark:border-white/12 text-ink dark:text-warm-white hover:border-primary hover:text-primary dark:hover:text-[#e8906a] dark:hover:border-[#e8906a]"
            >
              Contact
            </motion.a>
          </motion.div>
        </div>

        {/* Profile photo — bottom-right for desktop, centered below CTAs on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease }}
          className="mt-16 lg:mt-0 lg:absolute lg:right-[5%] lg:bottom-0 lg:top-[60px] lg:flex lg:items-center lg:max-h-[calc(100svh-60px)]"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mx-auto lg:mx-0 w-[180px] sm:w-[200px] lg:w-[230px] xl:w-[260px]"
          >
            {/* Subtle warm tint ring behind photo */}
            <span
              aria-hidden
              className="absolute inset-[-6px] rounded-[20px] bg-primary/6 dark:bg-primary/8"
            />
            <img
              src="/profile.JPG"
              alt="Lokesh Venkat Sai (Loki)"
              className="relative w-full h-auto block rounded-[16px] border border-black/6 dark:border-white/8 shadow-card object-contain"
              style={{ imageOrientation: 'from-image', maxHeight: 'calc(100svh - 160px)' }}
            />
            {/* Small name tag */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-paper dark:bg-paper-dark-alt border border-black/8 dark:border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-soft whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-mono text-[0.62rem] text-ink-muted dark:text-gray-400 tracking-wide">
                Loki · 2nd Year CSE/AI-ML
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 lg:mt-24 flex items-center gap-3"
        >
          <span className="block h-px w-6 bg-ink-faint dark:bg-gray-600" />
          <span className="eyebrow">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}
