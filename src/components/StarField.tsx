import { useEffect, useRef } from 'react';

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      trail: { x: number; y: number; opacity: number }[];
      hasTrail: boolean;
    }

    const stars: Star[] = [];
    const starCount = 350;

    for (let i = 0; i < starCount; i++) {
      const hasTrail = Math.random() > 0.7;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speed: hasTrail ? Math.random() * 1.5 + 0.5 : Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        trail: [],
        hasTrail,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      stars.forEach((star) => {
        if (star.hasTrail) {
          star.trail.push({ x: star.x, y: star.y, opacity: star.opacity });
          if (star.trail.length > 15) {
            star.trail.shift();
          }

          star.trail.forEach((point, index) => {
            const trailOpacity = (index / star.trail.length) * point.opacity * 0.4;
            const trailSize = star.size * (index / star.trail.length) * 0.8;
            
            ctx.beginPath();
            ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 58, 237, ${trailOpacity})`;
            ctx.fill();
          });
        }

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
          star.trail = [];
        }

        const pulse = Math.sin(time * star.pulseSpeed + star.pulsePhase) * 0.3 + 0.7;
        const opacity = star.opacity * pulse;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${opacity * 0.6})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.fill();

        if (star.hasTrail && star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default StarField;