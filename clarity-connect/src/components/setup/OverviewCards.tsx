import { SetupModule } from '@/types/setup';
import { Check, Clock, AlertTriangle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverviewCardsProps {
  modules: SetupModule[];
}

export function OverviewCards({ modules }: OverviewCardsProps) {
  const statsCount = {
    complete: modules.filter(m => m.status === 'complete').length,
    inProgress: modules.filter(m => m.status === 'in-progress').length,
    blocked: modules.filter(m => m.status === 'blocked').length,
    pending: modules.filter(m => m.status === 'pending').length,
  };

  const totalBlockers = modules.reduce(
    (acc, m) => acc + m.steps.filter(s => s.blocker).length, 
    0
  );

  const stats = [
    { 
      label: 'Completed', 
      value: statsCount.complete, 
      icon: Check, 
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    { 
      label: 'In Progress', 
      value: statsCount.inProgress, 
      icon: Clock, 
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    { 
      label: 'Blocked', 
      value: statsCount.blocked, 
      icon: AlertTriangle, 
      color: 'text-blocker',
      bgColor: 'bg-blocker/10',
      borderColor: 'border-blocker/20',
      sublabel: `${totalBlockers} issue${totalBlockers !== 1 ? 's' : ''}`
    },
    { 
      label: 'Not Started', 
      value: statsCount.pending, 
      icon: Circle, 
      color: 'text-muted-foreground',
      bgColor: 'bg-secondary/50',
      borderColor: 'border-border'
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            'flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border transition-all hover:shadow-sm',
            stat.bgColor,
            stat.borderColor
          )}
        >
          <stat.icon className={cn('h-4 w-4', stat.color)} />
          <div className="flex items-baseline gap-1.5">
            <span className={cn('text-lg font-bold', stat.color)}>{stat.value}</span>
            <span className={cn('text-xs font-medium', stat.color)}>{stat.label}</span>
          </div>
          {stat.sublabel && (
            <span className={cn('text-[10px] opacity-80 ml-1', stat.color)}>
              {stat.sublabel}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
