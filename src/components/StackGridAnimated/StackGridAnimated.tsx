
'use client'
import { useEffect, useRef } from "react"

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

export default function StackGridAnimated() {
  
  const containerRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const highlight = highlightRef.current
    if (!container || !highlight) return
    
    // Select all grid items for UI interaction
    const gridItems = container.querySelectorAll('.grid-item')
    const firstItem = gridItems[0] as HTMLElement
    
    // Define a visually appealing color palette for our UI
    const colors = ['#ff6b6b', '#feca57', '#1dd1a1', '#54a0ff', '#5f27cd', '#00d2d3']
    gridItems.forEach((item, i) => {
      (item as HTMLElement).dataset.color = colors[i % colors.length]
    })
    
    // Core animation function for UI movement
    function moveToElement(el: HTMLElement) {
      const itemRect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const x = itemRect.left - containerRect.left
      const y = itemRect.top - containerRect.top
      const w = itemRect.width
      const h = itemRect.height
      const color = el.dataset.color || '#fff'
      
      highlight.style.transform = `translate(${x}px, ${y}px)`
      highlight.style.width = `${w}px`
      highlight.style.height = `${h}px`
      highlight.style.backgroundColor = color
    }
    
    // Event handler to track mouse movement for interactive UI
    function moveHighlight(e: MouseEvent) {
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (!el) return
      const target = (el as HTMLElement).closest('.grid-item') as HTMLElement
      if (target) moveToElement(target)
    }
    
    // Initialize highlight position for consistent UI state
    if (firstItem) moveToElement(firstItem)
    
    // Event listeners with proper cleanup for React best practices
    container.addEventListener('mousemove', moveHighlight)
    return () => container.removeEventListener('mousemove', moveHighlight)
  }, [])

  

  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center px-4">
      <div
        ref={containerRef}
        className="w-[90%] h-[60%] border border-white/20 flex flex-col justify-between relative z-10"
      >
        <div className="flex flex-1 border-b border-white/10">
          {['One', 'Two', 'Three'].map((text, i) => (
            <div key={i} className="grid-item flex-1 flex items-center justify-center border-r last:border-none border-white/10 relative z-20">
              <p className="z-30 uppercase text-sm font-medium">{text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-1">
          {['Four', 'Five', 'Six', 'Seven'].map((text, i) => (
            <div key={i} className="grid-item flex-1 flex items-center justify-center border-r last:border-none border-white/10 relative z-20">
              <p className="z-30 uppercase text-sm font-medium">{text}</p>
            </div>
          ))}
        </div>
        <div
          ref={highlightRef}
          className="absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-out z-10"
        />
      </div>
    </div>
    </>
  )
}