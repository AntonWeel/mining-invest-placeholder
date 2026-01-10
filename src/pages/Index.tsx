import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
      title: 'Профессиональное оборудование',
      description: 'ASIC-майнеры последнего поколения с максимальной эффективностью'
    },
    {
      icon: 'Shield',
      title: 'Надёжность и безопасность',
      description: 'Защищённая инфраструктура с резервированием питания и охлаждения'
    },
    {
      icon: 'DollarSign',
      title: 'Прозрачная экономика',
      description: 'Детальная отчётность и прогнозируемая доходность'
    },
    {
      icon: 'Headphones',
      title: 'Техническая поддержка',
      description: 'Команда экспертов обеспечивает бесперебойную работу'
    }
  ];

  const equipment = [
    {
      name: 'Antminer S19 Pro',
      hashrate: '110 TH/s',
      power: '3250W',
      efficiency: '29.5 J/TH'
    },
    {
      name: 'Whatsminer M30S++',
      hashrate: '112 TH/s',
      power: '3472W',
      efficiency: '31 J/TH'
    },
    {
      name: 'AvalonMiner 1246',
      hashrate: '90 TH/s',
      power: '3420W',
      efficiency: '38 J/TH'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient-shift bg-[length:200%_200%]" />
        
        <div className="relative">
          <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
                <span className="text-sm font-medium text-primary">Инвестиции в будущее</span>
              </div>
              
              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Майнинг-производство <br />нового поколения
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                Профессиональная инфраструктура для криптовалютного майнинга с гарантированной доходностью
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 group">
                  Стать инвестором
                  <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
                  Подробнее о проекте
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-2xl bg-card border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
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

          <section className="py-20 px-4 bg-card/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                  О проекте
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Мы создали современную инфраструктуру для майнинга криптовалют с фокусом на надёжность, эффективность и прозрачность
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {advantages.map((advantage, index) => (
                  <Card 
                    key={index}
                    className="p-8 bg-background/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon name={advantage.icon as any} className="w-7 h-7 text-primary" />
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
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                  Технология и оборудование
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Используем передовое оборудование с оптимальным соотношением производительности и энергоэффективности
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {equipment.map((item, index) => (
                  <Card 
                    key={index}
                    className="p-6 bg-card border-primary/20 hover:border-secondary/60 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Icon name="Cpu" className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-4 text-center">{item.name}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span className="text-muted-foreground">Hashrate</span>
                        <span className="font-semibold text-primary">{item.hashrate}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span className="text-muted-foreground">Мощность</span>
                        <span className="font-semibold">{item.power}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Эффективность</span>
                        <span className="font-semibold text-secondary">{item.efficiency}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                  <h3 className="font-heading text-3xl font-bold mb-4">
                    Готовы присоединиться?
                  </h3>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Начните инвестировать в майнинг-производство уже сегодня и получайте стабильный доход
                  </p>
                  <Button size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90">
                    Связаться с нами
                    <Icon name="MessageCircle" className="ml-2" />
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
