import { SetupModule } from '@/types/setup';
import { Check, Clock, AlertTriangle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverviewCardsProps {
  modules: SetupModule[];
}

export function OverviewCards({ modules }: OverviewCardsProps) {
  const stats = {
    complete: modules.filter(m => m.status === 'complete').length,
    inProgress: modules.filter(m => m.status === 'in-progress').length,
    blocked: modules.filter(m => m.status === 'blocked').length,
    pending: modules.filter(m => m.status === 'pending').length,
  };

  const totalBlockers = modules.reduce(
    (acc, m) => acc + m.steps.filter(s => s.blocker).length, 
    0
  );

  const cards = [
    { label: 'Completed', value: stats.complete, icon: Check, className: 'text-success bg-success-bg border-success/20' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, className: 'text-warning bg-warning-bg border-warning/20' },
    { label: 'Blocked', value: stats.blocked, icon: AlertTriangle, className: 'text-blocker bg-blocker-bg border-blocker/20', sublabel: `${totalBlockers} issue${totalBlockers !== 1 ? 's' : ''}` },
    { label: 'Not Started', value: stats.pending, icon: Circle, className: 'text-muted-foreground bg-secondary border-border' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div 
          key={card.label}
          className={cn(
            'rounded-xl border p-4 transition-all hover:shadow-card-hover',
            card.className
          )}
        >
          <div className="flex items-center justify-between">
            <card.icon className="h-5 w-5" />
            <span className="text-2xl font-bold">{card.value}</span>
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium">{card.label}</span>
            {card.sublabel && (
              <span className="block text-xs opacity-80">{card.sublabel}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
