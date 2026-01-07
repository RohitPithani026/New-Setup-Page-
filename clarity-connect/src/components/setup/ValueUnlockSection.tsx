import { ValueUnlock } from '@/types/setup';
import { Sparkles, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValueUnlockSectionProps {
  valueUnlocks: ValueUnlock[];
  isComplete: boolean;
  className?: string;
}

export function ValueUnlockSection({ valueUnlocks, isComplete, className }: ValueUnlockSectionProps) {
  return (
    <div className={cn('rounded-lg border bg-secondary/50 p-4', className)}>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className={cn('h-4 w-4', isComplete ? 'text-success' : 'text-muted-foreground')} />
        <h4 className="text-sm font-semibold">
          {isComplete ? 'Unlocked Features' : 'Features you\'ll unlock'}
        </h4>
      </div>
      <div className="grid gap-2">
        {valueUnlocks.slice(0, 4).map((unlock, i) => (
          <div 
            key={i} 
            className={cn(
              'flex items-center justify-between rounded-md px-3 py-2 text-sm',
              isComplete ? 'bg-success-bg' : 'bg-background'
            )}
          >
            <div className="flex-1 min-w-0">
              <span className={cn('font-medium', isComplete && 'text-success')}>
                {unlock.name}
              </span>
              <p className="text-xs text-muted-foreground truncate">{unlock.description}</p>
            </div>
            {isComplete && unlock.pageUrl && (
              <ExternalLink className="h-3.5 w-3.5 text-success flex-shrink-0 ml-2" />
            )}
          </div>
        ))}
        {valueUnlocks.length > 4 && (
          <p className="text-xs text-muted-foreground text-center pt-1">
            +{valueUnlocks.length - 4} more features
          </p>
        )}
      </div>
    </div>
  );
}
