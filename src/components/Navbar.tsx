import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'
import { useTheme } from '../hooks/useTheme'

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'hackathon', label: 'Hackathon' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()

  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`glass-nav sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-black/6 dark:border-white/6 bg-paper/88 dark:bg-paper-dark/90'
            : 'bg-paper/70 dark:bg-paper-dark/70'
        }`}
      >
        <nav className="container-site flex items-center justify-between h-[60px]">
          {/* Brand / Logo */}
          <a
            href="#home"
            onClick={close}
            className="group flex items-baseline gap-0.5 select-none"
          >
            <span className="font-display text-[1.15rem] font-normal tracking-[-0.01em] text-ink dark:text-warm-white">
              {profile.brand}
            </span>
            <span className="font-mono text-[0.6rem] text-primary align-super leading-none ml-0.5 tracking-tight">
              {profile.brandSuffix}
            </span>
          </a>

          <div className="flex items-center gap-2">
            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-7 mr-4">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="relative text-[0.8rem] font-medium text-ink-muted dark:text-gray-400 tracking-wide transition-colors duration-200 hover:text-ink dark:hover:text-warm-white py-1 group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-px w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-black/10 dark:border-white/12 text-ink-muted dark:text-gray-400 transition-all duration-200 hover:border-primary hover:text-primary"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="flex h-[34px] w-[34px] items-center justify-center lg:hidden"
            >
              <span className="relative flex flex-col gap-[5px] w-[20px]">
                <span
                  className={`block h-[1.5px] w-full bg-ink dark:bg-warm-white transition-all duration-300 origin-center ${
                    open ? 'rotate-45 translate-y-[6.5px]' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-ink dark:bg-warm-white transition-all duration-300 ${
                    open ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-ink dark:bg-warm-white transition-all duration-300 origin-center ${
                    open ? '-rotate-45 -translate-y-[6.5px]' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu — full-screen editorial overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-nav fixed inset-0 z-40 bg-paper/97 dark:bg-paper-dark/97 lg:hidden flex flex-col items-start justify-center px-[10%]"
          >
            {/* Close zone */}
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="absolute top-5 right-5 text-ink-muted dark:text-gray-400 hover:text-primary text-2xl p-2"
            >
              ✕
            </button>

            <ul className="flex flex-col gap-0 w-full">
              {links.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-black/8 dark:border-white/8 last:border-b-0"
                >
                  <a
                    href={`#${link.id}`}
                    onClick={close}
                    className="flex items-center justify-between py-5 font-display text-[1.9rem] font-normal text-ink dark:text-warm-white hover:text-primary dark:hover:text-[#e8906a] transition-colors"
                  >
                    {link.label}
                    <span className="text-sm font-mono text-ink-faint dark:text-gray-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 text-xs font-mono text-ink-faint dark:text-gray-600 tracking-widest uppercase">
              {profile.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
