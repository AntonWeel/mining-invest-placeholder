import { useEffect, useState } from 'react';

interface HashrateChartProps {
  targetValue: number;
  isVisible: boolean;
  color?: string;
}

const HashrateChart = ({ targetValue, isVisible, color = '#06b6d4' }: HashrateChartProps) => {
  const [dataPoints, setDataPoints] = useState<number[]>(Array(20).fill(0));

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const newPoints = [...prev.slice(1)];
        const fluctuation = (Math.random() * 2 - 1) * 0.5;
        newPoints.push(targetValue + fluctuation);
        return newPoints;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isVisible, targetValue]);

  const maxValue = Math.max(...dataPoints, targetValue + 2);
  const minValue = Math.min(...dataPoints, targetValue - 2);
  const range = maxValue - minValue || 1;

  const points = dataPoints
    .map((value, index) => {
      const x = (index / (dataPoints.length - 1)) * 100;
      const y = 100 - ((value - minValue) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="w-full h-16 bg-muted/30 rounded-lg p-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`gradient-${targetValue}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="transition-all duration-300"
        />
        <polyline
          points={`0,100 ${points} 100,100`}
          fill={`url(#gradient-${targetValue})`}
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};

export default HashrateChart;
