import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CryptoData {
  price: number;
  change24h: number;
}

const Counter = () => {
  const [bitcoin, setBitcoin] = useState<CryptoData | null>(null);
  const [ethereum, setEthereum] = useState<CryptoData | null>(null);
  const [dogecoin, setDogecoin] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        setBitcoin({
          price: data.bitcoin.usd,
          change24h: data.bitcoin.usd_24h_change
        });
        setEthereum({
          price: data.ethereum.usd,
          change24h: data.ethereum.usd_24h_change
        });
        setDogecoin({
          price: data.dogecoin.usd,
          change24h: data.dogecoin.usd_24h_change
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        setLoading(false);
      }
    };

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);

  const CryptoCard = ({ name, icon, data, iconColor, isActive }: { name: string; icon: string; data: CryptoData | null; iconColor: string; isActive: boolean }) => (
    <Card className={`p-6 bg-card border-primary/20 transition-all duration-300 ${isActive ? 'scale-105 shadow-lg border-secondary/60' : ''}`}>
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Icon name={icon as any} size={24} className={iconColor} />
          <h3 className="font-heading text-xl font-semibold">{name}</h3>
        </div>
        
        {loading || !data ? (
          <div className="text-lg text-muted-foreground">Загрузка...</div>
        ) : (
          <>
            <div className={`text-3xl font-bold transition-all duration-300 ${isActive ? 'text-secondary scale-110' : 'text-primary'}`}>
              ${data.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
            </div>

            <div className={`flex items-center justify-center gap-2 text-sm font-semibold ${
              data.change24h >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              <Icon name={data.change24h >= 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
              <span>{data.change24h >= 0 ? '+' : ''}{data.change24h.toFixed(2)}%</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CryptoCard name="Bitcoin" icon="Bitcoin" data={bitcoin} iconColor="text-orange-500" isActive={activeIndex === 0} />
        <CryptoCard name="Ethereum" icon="Sparkles" data={ethereum} iconColor="text-purple-500" isActive={activeIndex === 1} />
        <CryptoCard name="Dogecoin" icon="Dog" data={dogecoin} iconColor="text-yellow-500" isActive={activeIndex === 2} />
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">Обновление каждые 5 секунд</p>
    </div>
  );
};

export default Counter;