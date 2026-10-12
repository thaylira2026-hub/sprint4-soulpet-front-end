import { useNavigate } from 'react-router-dom'

interface MissionCardProps {
  id: string
  icon: string
  difficulty: string
  tag?: string
  title: string
  description: string
  points: number
  deadline: string
}

const MissionCard = ({ id, icon, difficulty, tag, title, description, points, deadline }: MissionCardProps) => {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(`/missao/${id}`)}
      className="cursor-pointer rounded-2xl border border-border-soft bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {icon && <div className="text-3xl">{icon}</div>}
      <div className="mt-2 flex gap-2 text-xs font-semibold">
        <span className="rounded-full bg-lilac-light px-2 py-1 text-primary">{difficulty}</span>
        {tag && <span className="rounded-full bg-blue-light px-2 py-1 text-blue">{tag}</span>}
      </div>
      <h3 className="mt-3 font-display text-base font-bold text-text-dark">{title}</h3>
      <p className="mt-2 text-sm text-text-body">{description}</p>
      <div className="mt-4 flex justify-between text-sm font-semibold text-text-muted">
        <span>+{points} pts</span>
        <span>⏱️ {deadline}</span>
      </div>
    </article>
  )
}

export default MissionCard