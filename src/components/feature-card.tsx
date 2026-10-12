interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <article className="rounded-2xl border border-border-soft bg-white p-6 text-center shadow-sm transition hover:shadow-md">
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-3 font-display text-lg font-bold text-text-dark">{title}</h3>
      <p className="mt-2 text-sm text-text-body">{description}</p>
    </article>
  )
}

export default FeatureCard