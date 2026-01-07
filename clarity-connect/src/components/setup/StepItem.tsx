import { SetupStep } from '@/types/setup';
import { Check, Clock, AlertTriangle, Circle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepItemProps {
  step: SetupStep;
  index: number;
  isLast: boolean;
}

const statusIcons: Record<string, typeof Check> = {
  complete: Check,
  'in-progress': Clock,
  blocked: AlertTriangle,
  pending: Circle,
};

export function StepItem({ step, index, isLast }: StepItemProps) {
  const Icon = statusIcons[step.status];
  const showConnector = !isLast;

  return (
    <div className="relative animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex gap-4">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <div className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
            step.status === 'complete' && 'bg-success border-success text-success-foreground',
            step.status === 'in-progress' && 'bg-warning border-warning text-warning-foreground',
            step.status === 'blocked' && 'bg-blocker border-blocker text-blocker-foreground',
            step.status === 'pending' && 'bg-secondary border-border text-muted-foreground'
          )}>
            <Icon className="h-4 w-4" />
          </div>
          {showConnector && (
            <div className={cn(
              'w-0.5 flex-1 my-2',
              step.status === 'complete' ? 'bg-success/30' : 'bg-border'
            )} />
          )}
        </div>

        {/* Content */}
        <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
          <div className="flex items-start justify-between gap-4 mb-1">
            <div>
              <h4 className={cn(
                'font-medium',
                step.status === 'complete' && 'text-muted-foreground'
              )}>
                {step.title}
              </h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {step.assignee && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>{step.assignee.name}</span>
                </div>
              )}
              <span className="text-xs text-muted-foreground tabular-nums">~{step.estimatedTime}m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
