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

    interface Nebula {
      x: number;
      y: number;
      radius: number;
      color: string;
      opacity: number;
      pulsePhase: number;
    }

    interface Flash {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      expanding: boolean;
    }

    interface Dust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
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

    const nebulas: Nebula[] = [];
    for (let i = 0; i < 5; i++) {
      nebulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 150 + 100,
        color: Math.random() > 0.5 ? '124, 58, 237' : '6, 182, 212',
        opacity: Math.random() * 0.15 + 0.05,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const flashes: Flash[] = [];

    const dust: Dust[] = [];
    const dustCount = 100;
    for (let i = 0; i < dustCount; i++) {
      dust.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: Math.random() * 0.5 + 0.2,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      nebulas.forEach((nebula) => {
        const pulse = Math.sin(time * 0.5 + nebula.pulsePhase) * 0.3 + 0.7;
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, `rgba(${nebula.color}, ${nebula.opacity * pulse})`);
        gradient.addColorStop(0.5, `rgba(${nebula.color}, ${nebula.opacity * 0.5 * pulse})`);
        gradient.addColorStop(1, `rgba(${nebula.color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          nebula.x - nebula.radius,
          nebula.y - nebula.radius,
          nebula.radius * 2,
          nebula.radius * 2
        );
      });

      if (Math.random() > 0.98) {
        flashes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: Math.random() * 100 + 50,
          opacity: 0.6,
          expanding: true,
        });
      }

      flashes.forEach((flash, index) => {
        if (flash.expanding) {
          flash.radius += 2;
          flash.opacity -= 0.015;
          if (flash.radius >= flash.maxRadius || flash.opacity <= 0) {
            flashes.splice(index, 1);
            return;
          }
        }

        const gradient = ctx.createRadialGradient(
          flash.x, flash.y, 0,
          flash.x, flash.y, flash.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${flash.opacity})`);
        gradient.addColorStop(0.3, `rgba(124, 58, 237, ${flash.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      dust.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 255, ${particle.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120 && !stars[i].hasTrail && !stars[j].hasTrail) {
            const opacity = (1 - distance / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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