import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  life: number;
}

const MAX_TRAIL = 110;
const WAVE_COUNT = 5;

export default function WaveCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const pointerRef = useRef({ x: -100, y: -100, active: false });
  const animationRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const handleMove = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
    };
    const handleLeave = () => {
      pointerRef.current.active = false;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);

    const render = () => {
      const pointer = pointerRef.current;
      timeRef.current += 0.014;
      const time = timeRef.current;
      const trail = trailRef.current;

      if (pointer.active) {
        const previous = trail[trail.length - 1];
        const distance = previous
          ? Math.hypot(pointer.x - previous.x, pointer.y - previous.y)
          : MAX_TRAIL;

        if (!previous || distance > 1.5) {
          trail.push({ x: pointer.x, y: pointer.y, life: 1 });
        } else {
          previous.x += (pointer.x - previous.x) * 0.24;
          previous.y += (pointer.y - previous.y) * 0.24;
          previous.life = 1;
        }
      }

      for (const point of trail) point.life -= 0.0075;
      while (trail.length > MAX_TRAIL || trail[0]?.life <= 0) trail.shift();

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (trail.length > 2) {
        for (let layer = 0; layer < WAVE_COUNT; layer += 1) {
          const segments: Array<{ x: number; y: number; width: number }> = [];

          for (let index = 0; index < trail.length; index += 1) {
            const point = trail[index];
            const progress = index / (trail.length - 1);
            const distanceFromTip = 1 - progress;
            const smoothGrowth = Math.pow(distanceFromTip, 0.72);
            const previous = trail[Math.max(index - 1, 0)];
            const next = trail[Math.min(index + 1, trail.length - 1)];
            const directionX = next.x - previous.x;
            const directionY = next.y - previous.y;
            const length = Math.hypot(directionX, directionY) || 1;
            const normalX = -directionY / length;
            const normalY = directionX / length;
            const wave = Math.sin(time * 1.7 + index * 0.075 + layer * 0.65) * 8;
            const amplitude = smoothGrowth * (22 + layer * 9) + wave * smoothGrowth;
            const width = smoothGrowth * (4 + layer * 1.5) + 0.8;

            segments.push({
              x: point.x + normalX * amplitude,
              y: point.y + normalY * amplitude,
              width,
            });
          }

          const opposite: Array<{ x: number; y: number }> = [];
          for (let index = segments.length - 1; index >= 0; index -= 1) {
            const point = segments[index];
            const previous = trail[Math.max(index - 1, 0)];
            const next = trail[Math.min(index + 1, trail.length - 1)];
            const directionX = next.x - previous.x;
            const directionY = next.y - previous.y;
            const length = Math.hypot(directionX, directionY) || 1;
            opposite.push({
              x: point.x + (directionY / length) * point.width,
              y: point.y - (directionX / length) * point.width,
            });
          }

          const first = segments[0];
          const last = segments[segments.length - 1];
          const gradient = context.createLinearGradient(first.x, first.y, last.x, last.y);
          gradient.addColorStop(0, `hsla(${202 + layer * 5}, 90%, 78%, 0)`);
          gradient.addColorStop(0.2, `hsla(${202 + layer * 5}, 90%, 78%, ${0.06 + layer * 0.012})`);
          gradient.addColorStop(0.72, `hsla(${202 + layer * 5}, 95%, 82%, ${0.16 - layer * 0.012})`);
          gradient.addColorStop(1, `hsla(${202 + layer * 5}, 100%, 94%, ${0.6 - layer * 0.06})`);

          context.beginPath();
          context.moveTo(first.x, first.y);
          for (let index = 1; index < segments.length - 1; index += 1) {
            const current = segments[index];
            const next = segments[index + 1];
            context.quadraticCurveTo(current.x, current.y, (current.x + next.x) / 2, (current.y + next.y) / 2);
          }
          context.lineTo(last.x, last.y);
          for (let index = 0; index < opposite.length - 1; index += 1) {
            const current = opposite[index];
            const next = opposite[index + 1];
            context.quadraticCurveTo(current.x, current.y, (current.x + next.x) / 2, (current.y + next.y) / 2);
          }
          context.closePath();
          context.fillStyle = gradient;
          context.shadowColor = `hsla(${202 + layer * 5}, 95%, 78%, 0.24)`;
          context.shadowBlur = 14;
          context.fill();
        }
      }

      context.shadowBlur = 0;
      if (pointer.active) {
        const pulse = 1 + Math.sin(time * 5) * 0.12;
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 18 * pulse);
        glow.addColorStop(0, 'rgba(224, 248, 255, .72)');
        glow.addColorStop(0.35, 'rgba(104, 207, 255, .22)');
        glow.addColorStop(1, 'rgba(104, 207, 255, 0)');
        context.fillStyle = glow;
        context.beginPath();
        context.arc(pointer.x, pointer.y, 18 * pulse, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = 'rgba(239, 252, 255, .96)';
        context.beginPath();
        context.arc(pointer.x, pointer.y, 2.1, 0, Math.PI * 2);
        context.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="wave-cursor" />;
}
