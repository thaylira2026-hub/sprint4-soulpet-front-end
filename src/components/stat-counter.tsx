import { useState, useEffect } from 'react'

interface StatCounterProps {
  target: number
  label: string
}

const StatCounter = ({ target, label }: StatCounterProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const step = Math.ceil(target / 50)

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev + step >= target) {
          clearInterval(interval)
          return target
        }
        return prev + step
      })
    }, 30)

    return () => {
      clearInterval(interval)
    }
  }, [target])

  return (
    <div className="text-center">
      <div className="font-display text-3xl font-bold text-primary">{count}+</div>
      <div className="text-sm text-text-muted">{label}</div>
    </div>
  )
}

export default StatCounter