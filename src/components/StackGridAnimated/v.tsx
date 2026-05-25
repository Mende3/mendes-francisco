'use client'

import { useRef, useState } from 'react'

const stackItems = [
  {
    icon: 'ti-code',
    label: 'Linguagens',
    value: 'C · C++ · Go\nTS / JS · Python',
    iconColor: '#534AB7',
  },
  {
    icon: 'ti-server',
    label: 'Backend',
    value: 'NestJS · FastAPI\nExpress · Go std',
    iconColor: '#0F6E56',
  },
  {
    icon: 'ti-database',
    label: 'Base de dados',
    value: 'PostgreSQL · Redis\nPrisma ORM',
    iconColor: '#185FA5',
  },
  {
    icon: 'ti-brand-docker',
    label: 'DevOps / Infra',
    value: 'Docker · Compose\nHetzner · Debian',
    iconColor: '#993C1D',
  },
  {
    icon: 'ti-brain',
    label: 'AI / LLM',
    value: 'LangGraph · Ollama\nRAG · n8n · Mistral',
    iconColor: '#854F0B',
  },
  {
    icon: 'ti-layout',
    label: 'Frontend',
    value: 'React · Vite · PWA\nSocket.io · Tailwind',
    iconColor: '#993556',
  },
  {
    icon: 'ti-chart-line',
    label: 'Observabilidade',
    value: 'Prometheus · Grafana\ncAdvisor',
    iconColor: '#3B6D11',
  },
  {
    icon: 'ti-shield-lock',
    label: 'Auth & Segurança',
    value: 'JWT · Passport.js\nOAuth · Rate limiting',
    iconColor: '#534AB7',
  },
  {
    icon: 'ti-message-chatbot',
    label: 'Produto',
    value: 'Mukanda · WhatsApp\nEvolution API',
    iconColor: '#0F6E56',
  },
]

export default function StackGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setActiveIndex(index)
    if (!highlightRef.current || !containerRef.current) return
    const cell = e.currentTarget
    const containerRect = containerRef.current.getBoundingClientRect()
    const cellRect = cell.getBoundingClientRect()
    highlightRef.current.style.width = `${cellRect.width}px`
    highlightRef.current.style.height = `${cellRect.height}px`
    highlightRef.current.style.top = `${cellRect.top - containerRect.top}px`
    highlightRef.current.style.left = `${cellRect.left - containerRect.left}px`
    highlightRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    setActiveIndex(null)
    if (!highlightRef.current) return
    highlightRef.current.style.opacity = '0'
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center px-4">
      <div
        ref={containerRef}
        onMouseLeave={handleMouseLeave}
        className="w-[90%] border border-white/20 relative z-10 grid grid-cols-3 max-sm:grid-cols-1"
      >
        {stackItems.map((item, i) => {
          const isLastInRow = (i + 1) % 3 === 0
          const isLastRow = i >= stackItems.length - 3
          const isLastItem = i === stackItems.length - 1

          return (
            <div
              key={i}
              onMouseEnter={(e) => handleMouseEnter(e, i)}
              className={[
                'grid-item flex flex-col items-center justify-center gap-2 py-8 px-4 relative z-20 min-h-[110px] text-center',
                !isLastInRow && 'border-r border-white/10 max-sm:border-r-0',
                !isLastRow && 'border-b border-white/10',
                isLastItem && 'max-sm:border-b-0',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <i
                className={`ti ${item.icon} text-[22px] z-30`}
                style={{ color: item.iconColor }}
                aria-hidden="true"
              />
              <p className="z-30 uppercase text-[11px] font-medium tracking-widest text-white/50">
                {item.label}
              </p>
              <p className="z-30 text-[13px] font-medium text-white/90 whitespace-pre-line leading-snug">
                {item.value}
              </p>
            </div>
          )
        })}

        <div
          ref={highlightRef}
          className="absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-out z-10 opacity-0 bg-white/[0.04]"
        />
      </div>
    </div>
  )
}