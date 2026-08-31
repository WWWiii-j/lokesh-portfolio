import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionTitleProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionTitle({ eyebrow, title, subtitle, align = 'left' }: SectionTitleProps) {
  const isCenter = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 ${isCenter ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <span className="eyebrow block mb-4">{eyebrow}</span>
      )}
      <h2 className={`font-display text-[2rem] sm:text-[2.5rem] font-normal leading-[1.1] tracking-[-0.02em] text-ink dark:text-warm-white ${isCenter ? '' : 'max-w-[22ch]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-sm text-ink-muted dark:text-gray-400 leading-relaxed ${isCenter ? 'max-w-[52ch] mx-auto' : 'max-w-[52ch]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
