interface RoadmapItemProps {
  icon: string
  title: string
  status: string
}

const RoadmapItem = ({ icon, title, status }: RoadmapItemProps) => {
  return (
    <div className="rounded-2xl border border-border-soft bg-white p-5 text-center shadow-sm">
      <div className="text-3xl">{icon}</div>
      <div className="mt-2 font-display font-bold text-text-dark">{title}</div>
      <div className="mt-1 text-sm text-text-muted">{status}</div>
    </div>
  )
}

export default RoadmapItem