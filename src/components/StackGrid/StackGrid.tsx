import { Code2, Server, Container, Bot, Layout, Shield } from 'lucide-react'

const stacks = [
  {
    label: 'Linguagens',
    icon: Code2,
    color: 'blue',
    tags: ['TypeScript', 'JavaScript', 'Python', 'Go', 'C', 'C++'],
  },
  {
    label: 'Backend',
    icon: Server,
    color: 'green',
    tags: ['NestJS', 'FastAPI', 'Express', 'Prisma ORM', 'PostgreSQL', 'Redis'],
  },
  {
    label: 'Infra & DevOps',
    icon: Container,
    color: 'amber',
    tags: ['Docker', 'Docker Compose', 'Prometheus', 'Grafana', 'Linux', 'Nginx'],
  },
  {
    label: 'AI & LLM',
    icon: Bot,
    color: 'purple',
    tags: ['LangChain', 'LangGraph', 'Ollama', 'n8n', 'RAG', 'Mistral'],
  },
  {
    label: 'Frontend',
    icon: Layout,
    color: 'teal',
    tags: ['React', 'Vite', 'Tailwind', 'Socket.io', 'PWA'],
  },
  {
    label: 'Segurança & Auth',
    icon: Shield,
    color: 'gray',
    tags: ['JWT', 'OAuth 2.0', 'Passport.js', 'OTP / Redis', 'Rate limiting'],
  },
]

const colorMap: Record<string, { card: string; tag: string; icon: string; label: string }> = {
  blue:   { card: 'border-primary/30 bg-muted/10',         tag: 'bg-primary/10 text-primary border-primary/20',         icon: 'text-primary',   label: 'text-primary' },
  green:  { card: 'border-primary/60 bg-primary/20',       tag: 'bg-muted/30 text-foreground/80 border-primary/30',     icon: 'text-foreground', label: 'text-foreground' },
  amber:  { card: 'border-primary/30 bg-muted/10',         tag: 'bg-primary/10 text-primary border-primary/20',         icon: 'text-primary',   label: 'text-primary' },
  purple: { card: 'border-primary/60 bg-primary/20',       tag: 'bg-muted/30 text-foreground/80 border-primary/30',     icon: 'text-foreground', label: 'text-foreground' },
  teal:   { card: 'border-primary/30 bg-muted/10',         tag: 'bg-primary/10 text-primary border-primary/20',         icon: 'text-primary',   label: 'text-primary' },
  gray:   { card: 'border-primary/60 bg-primary/20',       tag: 'bg-muted/30 text-foreground/80 border-primary/30',     icon: 'text-foreground', label: 'text-foreground' },
}

export default function StackGrid() {
  return (
    <section className="py-10 px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold text-foreground">Stack <span className="text-blue-600">Técnica</span></h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stacks.map(({ label, icon: Icon, color, tags }) => {
            const c = colorMap[color]
            return (
              <div
                key={label}
                className={`rounded-xl border p-5 flex flex-col gap-4 ${c.card}`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={18} className={c.icon} />
                  <span className={`text-sm font-medium ${c.label}`}>{label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 text-xs ${c.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}