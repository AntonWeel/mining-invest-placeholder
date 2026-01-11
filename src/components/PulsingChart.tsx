import { useEffect, useRef } from 'react';

const PulsingChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const points: number[] = [];
    const maxPoints = 50;
    let time = 0;

    for (let i = 0; i < maxPoints; i++) {
      points.push(Math.random() * 0.3 + 0.5);
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.02;
      points.shift();
      points.push(Math.sin(time) * 0.2 + 0.7 + Math.random() * 0.1);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.6)');
      gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.4)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.2)');

      ctx.beginPath();
      ctx.moveTo(0, height);

      points.forEach((point, index) => {
        const x = (index / (maxPoints - 1)) * width;
        const y = height - point * height;
        
        if (index === 0) {
          ctx.lineTo(x, y);
        } else {
          const prevX = ((index - 1) / (maxPoints - 1)) * width;
          const prevY = height - points[index - 1] * height;
          const cpX = (prevX + x) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) / 2);
        }
      });

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, height - points[0] * height);

      points.forEach((point, index) => {
        const x = (index / (maxPoints - 1)) * width;
        const y = height - point * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevX = ((index - 1) / (maxPoints - 1)) * width;
          const prevY = height - points[index - 1] * height;
          const cpX = (prevX + x) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) / 2);
        }
      });

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.lineWidth = 3;
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={80}
      className="w-full h-full"
    />
  );
};

export default PulsingChart;
