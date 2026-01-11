import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Card className="p-8 bg-card border-primary/20 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <h3 className="font-heading text-2xl font-semibold">Счётчик</h3>
        
        <div className="text-6xl font-bold text-primary">
          {count}
        </div>

        <div className="flex gap-3 justify-center">
          <Button 
            size="lg"
            variant="outline"
            onClick={() => setCount(count - 1)}
            className="border-primary/30 hover:bg-primary/10"
          >
            <Icon name="Minus" size={20} />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => setCount(0)}
            className="border-primary/30 hover:bg-primary/10"
          >
            Сброс
          </Button>
          
          <Button 
            size="lg"
            onClick={() => setCount(count + 1)}
            className="bg-primary hover:bg-primary/90"
          >
            <Icon name="Plus" size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Counter;
