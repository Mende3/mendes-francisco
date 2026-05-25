import type { LucideIcon } from 'lucide-react'
import { Code2, Server, Container, Bot, Layout, Shield } from 'lucide-react'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const stacks = [
  { label: 'Linguagens',      icon: Code2,      color: 'blue',   tags: ['TypeScript', 'JavaScript', 'Python', 'Go', 'C', 'C++'] },
  { label: 'Backend',         icon: Server,     color: 'green',  tags: ['NestJS', 'FastAPI', 'Express', 'Prisma ORM', 'PostgreSQL', 'Redis'] },
  { label: 'Infra & DevOps',  icon: Container,  color: 'amber',  tags: ['Docker', 'Docker Compose', 'Prometheus', 'Grafana', 'Linux', 'Nginx'] },
  { label: 'AI & LLM',        icon: Bot,        color: 'purple', tags: ['LangChain', 'LangGraph', 'Ollama', 'n8n', 'RAG', 'Mistral'] },
  { label: 'Frontend',        icon: Layout,     color: 'teal',   tags: ['React', 'Vite', 'Tailwind', 'Socket.io', 'PWA'] },
  { label: 'Segurança & Auth',icon: Shield,     color: 'gray',   tags: ['JWT', 'OAuth 2.0', 'Passport.js', 'OTP / Redis', 'Rate limiting'] },
]

const colorMap: Record<string, { card: string; tag: string; icon: string; label: string; spotlight: string }> = {
  blue:   { card: 'border-primary/30 bg-muted/10',   tag: 'bg-primary/10 text-primary border-primary/20',        icon: 'text-primary',    label: 'text-primary',    spotlight: 'rgba(148,163,184,0.08)' },
  green:  { card: 'border-primary/60 bg-primary/20', tag: 'bg-muted/30 text-foreground/80 border-primary/30',    icon: 'text-foreground', label: 'text-foreground', spotlight: 'rgba(37, 99, 235, 0.15)' },
  amber:  { card: 'border-primary/30 bg-muted/10',   tag: 'bg-primary/10 text-primary border-primary/20',        icon: 'text-primary',    label: 'text-primary',    spotlight: 'rgba(148,163,184,0.08)' },
  purple: { card: 'border-primary/60 bg-primary/20', tag: 'bg-muted/30 text-foreground/80 border-primary/30',    icon: 'text-foreground', label: 'text-foreground', spotlight: 'rgba(37, 99, 235, 0.15)' },
  teal:   { card: 'border-primary/30 bg-muted/10',   tag: 'bg-primary/10 text-primary border-primary/20',        icon: 'text-primary',    label: 'text-primary',    spotlight: 'rgba(148,163,184,0.08)' },
  gray:   { card: 'border-primary/60 bg-primary/20', tag: 'bg-muted/30 text-foreground/80 border-primary/30',    icon: 'text-foreground', label: 'text-foreground', spotlight: 'rgba(37, 99, 235, 0.15)' },
}

interface StackCardProps {
  label: string
  icon: LucideIcon
  color: string
  tags: string[]
  index: number
}

function StackCard({ label, icon: Icon, color, tags, index }: StackCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -999, y: -999 })
  const [hovered, setHovered] = useState(false)
  const c = colorMap[color]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => setHovered(false)

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-xl border p-5 flex flex-col gap-4 cursor-default ${c.card}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: hovered
            ? `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${c.spotlight}, transparent 70%)`
            : 'transparent',
        }}
      />

      <div className="relative flex items-center gap-2">
        <Icon size={18} className={c.icon} />
        <span className={`text-sm font-medium ${c.label}`}>{label}</span>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-3 py-1 text-xs ${c.tag}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function StackGrid() {
  return (
    <section className="py-10 px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          Stack <span className="text-primary">Técnica</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stacks.map(({ label, icon, color, tags }, index) => (
            <StackCard
              key={label}
              label={label}
              icon={icon}
              color={color}
              tags={tags}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}