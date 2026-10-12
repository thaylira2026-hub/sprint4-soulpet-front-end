interface TeamCardProps {
  photo: string
  name: string
  rm: string
  github: string
  linkedin: string
}

const TeamCard = ({ photo, name, rm, github, linkedin }: TeamCardProps) => {
  return (
    <article className="rounded-3xl border border-border-soft bg-white p-6 text-center shadow-sm transition hover:shadow-md">
      <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-lilac-light">
        <img src={photo} alt={name} className="h-full w-full object-cover" />
      </div>
      <h2 className="mt-4 font-display text-lg font-bold text-text-dark">{name}</h2>
      <span className="mt-1 block text-sm text-text-muted">RM: {rm}</span>
      <div className="mt-4 flex justify-center gap-3">
        
          <a href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-lilac-light px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
        >
          GitHub
        </a>
        
          <a href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-blue-light px-4 py-2 text-sm font-semibold text-blue hover:bg-blue hover:text-white"
        >
          LinkedIn
        </a>
      </div>
    </article>
  )
}

export default TeamCard