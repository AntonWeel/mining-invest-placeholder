import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Counter = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [change24h, setChange24h] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        setPrice(data.bitcoin.usd);
        setChange24h(data.bitcoin.usd_24h_change);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        setLoading(false);
      }
    };

    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-8 bg-card border-primary/20 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Icon name="Bitcoin" size={32} className="text-orange-500" />
          <h3 className="font-heading text-2xl font-semibold">Bitcoin</h3>
        </div>
        
        {loading ? (
          <div className="text-2xl text-muted-foreground">Загрузка...</div>
        ) : (
          <>
            <div className="text-5xl font-bold text-primary">
              ${price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className={`flex items-center justify-center gap-2 text-lg font-semibold ${
              change24h >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              <Icon name={change24h >= 0 ? 'TrendingUp' : 'TrendingDown'} size={20} />
              <span>{change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%</span>
              <span className="text-sm text-muted-foreground font-normal">за 24ч</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default Counter;