import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Counter from '@/components/Counter';
import MatrixBackground from '@/components/MatrixBackground';
import ServerGlow from '@/components/ServerGlow';
import BitcoinHashrate from '@/components/BitcoinHashrate';
import PulsingChart from '@/components/PulsingChart';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = [
    { value: '500+', label: 'TH/s', icon: 'Zap' },
    { value: '99.9%', label: 'Uptime', icon: 'TrendingUp' },
    { value: '24/7', label: 'Monitoring', icon: 'Activity' },
    { value: '50+', label: 'Devices', icon: 'Cpu' }
  ];

  const advantages = [
    {
      icon: 'Server',
      title: 'Professional Equipment',
      description: 'Latest generation ASIC miners with maximum efficiency',
      image: 'https://cdn.poehali.dev/projects/2595ec54-28cb-40ee-9568-c873b989d779/files/706ea9f2-4d7d-40a5-abfd-79e460ef19ef.jpg'
    },
    {
      icon: 'Shield',
      title: 'Reliability & Security',
      description: 'Protected infrastructure with redundant power and cooling systems',
      image: 'https://cdn.poehali.dev/projects/2595ec54-28cb-40ee-9568-c873b989d779/files/bac40e44-b61c-4850-a6e2-66b0256288c1.jpg'
    },
    {
      icon: 'DollarSign',
      title: 'Transparent Economics',
      description: 'Detailed reporting and predictable profitability',
      image: 'https://cdn.poehali.dev/projects/2595ec54-28cb-40ee-9568-c873b989d779/files/d3d49397-8612-4059-a841-21a1280d69d2.jpg'
    },
    {
      icon: 'Headphones',
      title: 'Technical Support',
      description: 'Expert team ensures uninterrupted operations',
      image: 'https://cdn.poehali.dev/projects/2595ec54-28cb-40ee-9568-c873b989d779/files/39d4cfc7-274e-41c0-ad1d-18159dc92bb9.jpg'
    }
  ];

  const equipment = [
    {
      name: 'Antminer S19 Pro',
      hashrate: '110 TH/s',
      power: '3250W',
      efficiency: '29.5 J/TH',
      image: 'https://cdn.poehali.dev/projects/2595ec54-28cb-40ee-9568-c873b989d779/files/238b9a60-e14d-45ac-a987-83eee9607c70.jpg'
    },
    {
      name: 'Whatsminer M30S++',
      hashrate: '112 TH/s',
      power: '3472W',
      efficiency: '31 J/TH',
      image: 'https://cdn.poehali.dev/projects/2595ec54-28cb-40ee-9568-c873b989d779/files/bd5ccd2c-5b7b-4a4e-bafa-2f82f734cb3d.jpg'
    },
    {
      name: 'AvalonMiner 1246',
      hashrate: '90 TH/s',
      power: '3420W',
      efficiency: '38 J/TH',
      image: 'https://cdn.poehali.dev/projects/2595ec54-28cb-40ee-9568-c873b989d779/files/4793f4f3-b2c3-4115-abbc-05b2ea06aa7c.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <ServerGlow />
        
        <div className="relative">
          <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className={`max-w-6xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mb-6">
                <a 
                  href="https://forms.gle/JvG4uViTWvKkMLfn6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full border-2 border-primary shadow-lg hover:shadow-2xl transition-all cursor-pointer pulse-badge"
                >
                  <span className="text-base font-bold text-white tracking-wide">⚡ Invest in the Future</span>
                </a>
              </div>
              
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 opacity-20 overflow-hidden">
                  {isVisible && <PulsingChart />}
                </div>
                <h1 className="font-heading text-6xl md:text-8xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%] tracking-tight leading-tight relative z-10" style={{ textShadow: '0 0 10px rgba(124, 58, 237, 0.9), 0 0 20px rgba(124, 58, 237, 0.9), 0 0 30px rgba(124, 58, 237, 0.7), 0 0 40px rgba(6, 182, 212, 0.9), 0 0 60px rgba(6, 182, 212, 0.7), 0 0 80px rgba(124, 58, 237, 0.6), 0 0 100px rgba(6, 182, 212, 0.5), 0 0 120px rgba(124, 58, 237, 0.4)' }}>
                  Next-Generation<br />Mining
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-foreground/90 mb-12 max-w-3xl mx-auto">
                Professional cryptocurrency mining infrastructure with guaranteed returns
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_200%] hover:bg-[position:100%_0] transition-all duration-500 neon-button font-bold tracking-wide border-2 border-primary/50 hover:scale-110 group"
                  asChild
                >
                  <a href="https://forms.gle/JvG4uViTWvKkMLfn6" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Become an Investor
                    <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10"
                  onClick={() => document.getElementById('join-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-2xl bg-card border border-primary/20 shadow-sm stat-card-${index} ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon name={stat.icon as any} className="w-8 h-8 text-primary mx-auto mb-3 animate-float" />
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/20 mb-4">
                  <h2 className="font-heading text-4xl md:text-5xl font-bold">
                    About the Project
                  </h2>
                </div>
                <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/20 mt-4">
                  <p className="text-xl text-foreground max-w-3xl">
                    We've built modern infrastructure for cryptocurrency mining focused on reliability, efficiency and transparency
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {advantages.map((advantage, index) => (
                  <Card 
                    key={index}
                    className="p-8 bg-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group shadow-sm hover:shadow-md overflow-hidden"
                  >
                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                      <img 
                        src={advantage.image} 
                        alt={advantage.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 w-14 h-14 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Icon name={advantage.icon as any} className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-heading text-2xl font-semibold mb-3">{advantage.title}</h3>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-16">
                <Counter />
              </div>
              
              <div className="text-center mb-16">
                <div className="inline-block px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/20 mb-4">
                  <div className="flex items-center justify-center gap-4">
                    <Icon name="Fan" size={48} className="text-primary animate-spin" style={{ animationDuration: '2s' }} />
                    <h2 className="font-heading text-4xl md:text-5xl font-bold">
                      Technology & Equipment
                    </h2>
                  </div>
                </div>
                <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/20 mt-4">
                  <p className="text-xl text-foreground max-w-3xl">
                    Using cutting-edge equipment with optimal performance-to-efficiency ratio
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {equipment.map((item, index) => (
                  <Card 
                    key={index}
                    className="p-6 bg-card border-primary/20 hover:border-secondary/60 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md overflow-hidden relative"
                  >
                    <MatrixBackground />
                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-muted/50 z-10">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 equipment-image"
                      />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-4 text-center relative z-10">{item.name}</h3>
                    <div className="space-y-3 relative z-10">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span className="text-white">Hashrate</span>
                        <span className="font-semibold text-cyan-400">{item.hashrate}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span className="text-white">Power</span>
                        <span className="font-semibold text-purple-400">{item.power}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white">Efficiency</span>
                        <span className="font-semibold text-green-400">{item.efficiency}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div id="join-section" className="mt-16 text-center">
                <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 shadow-lg">
                  <div className="mb-6 flex justify-center">
                    <BitcoinHashrate />
                  </div>
                  <h3 className="font-heading text-3xl font-bold mb-4">
                    Want to Join Our Project?
                  </h3>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Start investing in mining operations today and receive stable returns
                  </p>
                  <Button 
                    size="lg" 
                    className="text-xl px-14 py-8 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_200%] hover:bg-[position:100%_0] transition-all duration-500 neon-button font-bold tracking-wide border-2 border-primary/50 hover:scale-110 group"
                    asChild
                  >
                    <a href="https://forms.gle/JvG4uViTWvKkMLfn6" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Icon name="Sparkles" className="mr-2 group-hover:rotate-12 transition-transform" size={24} />
                      Get Your Rewards
                      <Icon name="Gift" className="ml-2 group-hover:scale-110 transition-transform" size={24} />
                    </a>
                  </Button>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;