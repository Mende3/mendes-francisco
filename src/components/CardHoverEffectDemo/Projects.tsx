import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const projects = [
  {
    title: 'Mukanda',
    description:
      'Plataforma SaaS de atendimento ao cliente via WhatsApp com IA, pensada para PMEs angolanas. Arquitectura multi-agente com NestJS, n8n e Mistral.',
    tags: ['NestJS', 'WhatsApp API', 'n8n', 'Redis', 'PostgreSQL'],
    github: 'https://github.com/Mende3/mukanda-app',
    live: 'https://mukanda.ao',
    highlight: true,
  },
  {
    title: 'Ngolo',
    description:
      'Rede social full-stack com NestJS, Prisma, PostgreSQL, Redis e monitorização com Prometheus e Grafana.',
    tags: ['NestJS', 'Prisma', 'Docker', 'Prometheus', 'Grafana', 'langGraph', 'AI', 'Redis'],
    live: null,
    highlight: false,
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
      key={project.title}
      className={`group relative flex flex-col gap-4 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 ${
        project.highlight
          ? 'border-primary/40 bg-primary/10'
          : 'border-border bg-muted/10'
      }`}
    >
      {project.highlight && (
        <span className="absolute -top-3 left-4 rounded-full border border-primary/30 bg-background px-3 py-0.5 text-xs text-primary">
          destaque
        </span>
      )}

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="text-xs leading-relaxed text-foreground/60">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex gap-3 pt-2">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-foreground/50 transition-colors hover:text-foreground"
        >
          GitHub
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-foreground/50 transition-colors hover:text-foreground"
          >
            <ExternalLink size={14} />
            Live
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, x: -20 }}
          animate={titleInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-8 text-2xl font-bold text-foreground"
        >
          Projectos
        </motion.h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}