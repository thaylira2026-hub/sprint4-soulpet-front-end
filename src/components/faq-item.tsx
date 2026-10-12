import { useState } from 'react'

interface FaqItemProps {
  question: string
  answer: string
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft bg-white shadow-sm">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setOpen(!open)
          }
        }}
        className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-text-dark hover:bg-bg"
      >
        <span>{question}</span>
        <span className="text-xl text-primary">{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div role="region" className="border-t border-border-soft px-6 py-4 text-sm text-text-body">
          <div>{answer}</div>
        </div>
      )}
    </div>
  )
}

export default FaqItem