import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile, quickFacts } from '../data/profile'
import { SectionTitle } from './SectionTitle'

const ease = [0.16, 1, 0.3, 1] as const

export function Contact() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const socials = quickFacts.filter((f) => f.url)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return

    const form = e.currentTarget

    setSubmitting(true)
    setStatus(null)

    try {
      const res = await fetch('https://formspree.io/f/mqpkebgk', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        const fd = new FormData(form)
        const name = String(fd.get('name') || '').trim()
        setStatus({ type: 'success', msg: `Thank you${name ? `, ${name}` : ''}! Your message has been sent.` })
        form.reset()
        setTimeout(() => setStatus(null), 6000)
      } else {
        const data = await res.json().catch(() => ({}))
        const msg =
          (data as { errors?: { message: string }[] }).errors
            ?.map((err) => err.message)
            .join(', ') ?? 'Something went wrong. Please try again or email me directly.'
        setStatus({ type: 'error', msg })
      }
    } catch {
      setStatus({ type: 'error', msg: 'Network error. Please check your connection and try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section bg-paper-alt dark:bg-paper-dark-alt/50 transition-colors duration-500">
      <div className="container-site">
        <SectionTitle
          eyebrow="06 / Contact"
          title="Get in touch"
          subtitle="Open to learning discussions, student projects, and collaborations."
        />

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">

          {/* Left: info panel — no card box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            <h3 className="font-display italic font-normal text-[1.25rem] text-ink dark:text-warm-white mb-5 tracking-[-0.01em]">
              Let's Connect
            </h3>
            <p className="text-[0.9rem] text-ink-muted dark:text-gray-300 leading-relaxed mb-8 max-w-[40ch]">
              I am always open to learning, discussing programming ideas, and collaborating on student projects. Reach out via email or connect through my profiles below.
            </p>

            {/* Contact details — flat list */}
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-[5rem_1fr] gap-x-4">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint dark:text-gray-500 pt-0.5">Email</span>
                <a href={`mailto:${profile.email}`} className="text-[0.875rem] text-primary dark:text-[#e8906a] hover:underline break-all">
                  {profile.email}
                </a>
              </div>
              <div className="grid grid-cols-[5rem_1fr] gap-x-4">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint dark:text-gray-500 pt-0.5">College</span>
                <span className="text-[0.875rem] text-ink-muted dark:text-gray-300">{profile.college}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ghost-btn w-fit"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            id="contactForm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {[
              { name: 'name', label: 'Name', placeholder: 'Your name', type: 'text' },
              { name: 'email', label: 'Email', placeholder: 'name@example.com', type: 'email' },
              { name: 'subject', label: 'Subject', placeholder: 'Project · Collaboration · Query', type: 'text' },
            ].map((f) => (
              <div key={f.name}>
                <label
                  htmlFor={f.name}
                  className="block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-faint dark:text-gray-500 mb-2"
                >
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-paper dark:bg-paper-dark text-ink dark:text-warm-white text-[0.9rem] placeholder:text-ink-faint dark:placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/60 transition-colors duration-200"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-faint dark:text-gray-500 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Write your message here…"
                required
                className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-paper dark:bg-paper-dark text-ink dark:text-warm-white text-[0.9rem] placeholder:text-ink-faint dark:placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/60 transition-colors duration-200 resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={submitting ? {} : { y: -2 }}
              whileTap={submitting ? {} : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="w-full rounded-lg bg-ink dark:bg-warm-white text-paper dark:text-ink py-3.5 text-sm font-medium tracking-wide hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending…' : 'Send Message'}
            </motion.button>

            {status && (
              <p
                className={`rounded-lg px-4 py-3 text-center text-[0.85rem] font-medium ${
                  status.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                }`}
              >
                {status.msg}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
