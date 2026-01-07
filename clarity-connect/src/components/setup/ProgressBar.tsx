import { cn } from '@/lib/utils';

interface ProgressBarProps {
  completed: number;
  total: number;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({ completed, total, showLabel = true, size = 'md', className }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(
        'flex-1 rounded-full bg-secondary overflow-hidden',
        size === 'sm' ? 'h-1.5' : 'h-2'
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            percentage === 100 ? 'bg-success' : percentage > 0 ? 'bg-primary' : 'bg-muted-foreground/20'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn(
          'font-medium tabular-nums',
          size === 'sm' ? 'text-xs text-muted-foreground' : 'text-sm text-foreground',
          percentage === 100 && 'text-success'
        )}>
          {completed}/{total}
        </span>
      )}
    </div>
  );
}
