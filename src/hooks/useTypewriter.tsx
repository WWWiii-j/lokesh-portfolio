import { useEffect, useState } from 'react'

export function useTypewriter(words: string[], typeSpeed = 95, deleteSpeed = 45, pause = 2400) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? word.substring(0, text.length - 1)
              : word.substring(0, text.length + 1),
          )
        },
        deleting ? deleteSpeed : typeSpeed,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause])

  return text
}

export function Typewriter({ words, className = '' }: { words: string[]; className?: string }) {
  const text = useTypewriter(words)
  return (
    <span className={className}>
      {text}
      {/* quiet editorial text-rule, not a blinking terminal caret */}
      <span
        aria-hidden
        className="inline-block w-[2px] h-[0.8em] translate-y-[0.12em] ml-2 bg-current opacity-60"
      />
    </span>
  )
}
