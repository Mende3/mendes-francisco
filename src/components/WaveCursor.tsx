import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

const WAVE_LAYERS = 5;
const MAX_TRAIL = 90;
const BASE_HUE = 200;

export default function WaveCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, active: false });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('touchmove', onTouch, { passive: true });

    const render = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const { x: mx, y: my, active } = mouseRef.current;

      // Add new trail point
      if (active) {
        trailRef.current.push({
          x: mx,
          y: my,
          life: 1,
          maxLife: 1,
        });
        if (trailRef.current.length > MAX_TRAIL) {
          trailRef.current.shift();
        }
      }

      // Fade existing trail
      const trail = trailRef.current;
      for (let i = 0; i < trail.length; i++) {
        trail[i].life -= 0.012;
      }
      while (trail.length > 0 && trail[0].life <= 0) {
        trail.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trail.length < 2) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      // Draw multiple wave layers along the trail
      for (let layer = 0; layer < WAVE_LAYERS; layer++) {
        const layerProgress = layer / (WAVE_LAYERS - 1);
        const amplitudeScale = 0.3 + layerProgress * 0.7;
        const phaseOffset = layer * 0.8;
        const lineWidth = (1 - layerProgress) * 2.5 + 0.5;
        const alpha = (1 - layerProgress * 0.6) * 0.7;

        ctx.beginPath();
        const segments: { x: number; y: number }[] = [];

        for (let i = 0; i < trail.length; i++) {
          const p = trail[i];
          const trailProgress = i / (trail.length - 1);
          // Amplitude grows from 0 (cursor tip = newest) to larger (older trail)
          const distFromTip = 1 - trailProgress;
          const amplitude = distFromTip * distFromTip * 35 * amplitudeScale;
          const frequency = 0.08 + layerProgress * 0.04;
          const wave = Math.sin(t * 3 + i * frequency + phaseOffset) * amplitude;
          const wave2 = Math.cos(t * 2.2 + i * frequency * 0.7 + phaseOffset) * amplitude * 0.4;

          // Perpendicular offset based on trail direction
          let perpX = 0;
          let perpY = 0;
          if (i > 0 && i < trail.length - 1) {
            const prev = trail[i - 1];
            const next = trail[i + 1];
            const dx = next.x - prev.x;
            const dy = next.y - prev.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            perpX = -dy / len;
            perpY = dx / len;
          } else if (i === 0 && trail.length > 1) {
            const next = trail[1];
            const dx = next.x - p.x;
            const dy = next.y - p.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            perpX = -dy / len;
            perpY = dx / len;
          } else if (i === trail.length - 1 && trail.length > 1) {
            const prev = trail[i - 1];
            const dx = p.x - prev.x;
            const dy = p.y - prev.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            perpX = -dy / len;
            perpY = dx / len;
          }

          segments.push({
            x: p.x + perpX * (wave + wave2),
            y: p.y + perpY * (wave + wave2),
          });
        }

        // Draw smooth curve through segments
        ctx.moveTo(segments[0].x, segments[0].y);
        for (let i = 1; i < segments.length - 1; i++) {
          const xc = (segments[i].x + segments[i + 1].x) / 2;
          const yc = (segments[i].y + segments[i + 1].y) / 2;
          ctx.quadraticCurveTo(segments[i].x, segments[i].y, xc, yc);
        }
        const last = segments[segments.length - 1];
        ctx.lineTo(last.x, last.y);

        // Gradient stroke — bright at cursor tip, fading toward tail
        const tip = segments[segments.length - 1];
        const tail = segments[0];
        const grad = ctx.createLinearGradient(tail.x, tail.y, tip.x, tip.y);
        const hue = BASE_HUE + layerProgress * 30;
        grad.addColorStop(0, `hsla(${hue}, 80%, 70%, 0)`);
        grad.addColorStop(0.4, `hsla(${hue}, 80%, 70%, ${alpha * 0.3})`);
        grad.addColorStop(0.85, `hsla(${hue}, 90%, 80%, ${alpha * 0.8})`);
        grad.addColorStop(1, `hsla(${hue}, 100%, 90%, ${alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = `hsla(${hue}, 90%, 75%, 0.6)`;
        ctx.shadowBlur = 8;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      // Draw cursor tip — small bright dot
      if (active && trail.length > 0) {
        const tip = trail[trail.length - 1];
        const pulse = 1 + Math.sin(t * 6) * 0.15;

        // Outer glow
        const glowGrad = ctx.createRadialGradient(
          tip.x, tip.y, 0,
          tip.x, tip.y, 20 * pulse,
        );
        glowGrad.addColorStop(0, 'hsla(200, 100%, 90%, 0.5)');
        glowGrad.addColorStop(0.5, 'hsla(210, 90%, 75%, 0.15)');
        glowGrad.addColorStop(1, 'hsla(200, 80%, 70%, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 20 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.fillStyle = 'hsla(200, 100%, 95%, 0.95)';
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Thin ring
        ctx.strokeStyle = 'hsla(210, 90%, 85%, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 6 * pulse, 0, Math.PI * 2);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
