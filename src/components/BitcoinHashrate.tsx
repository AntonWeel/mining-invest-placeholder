import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const BitcoinHashrate = () => {
  const [hashrate, setHashrate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const baseHashrate = 750;
    setHashrate(baseHashrate);
    setIsLoading(false);

    const interval = setInterval(() => {
      setHashrate(prev => prev + Math.random() * 0.5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-6 py-4 bg-black/40 backdrop-blur-md rounded-2xl border border-primary/30 shadow-lg">
      <Icon name="Activity" className="w-6 h-6 text-cyan-400 animate-pulse" />
      <div className="text-left">
        <div className="text-xs text-muted-foreground mb-1">Bitcoin Network Hashrate</div>
        <div className="text-2xl font-bold text-white">
          {isLoading ? (
            <span className="text-muted-foreground">Loading...</span>
          ) : (
            <>
              <span className="text-cyan-400">{hashrate.toFixed(2)}</span>
              <span className="text-sm ml-1 text-purple-400">EH/s</span>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
      </div>
    </div>
  );
};

export default BitcoinHashrate;
