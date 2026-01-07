import { SetupStatus } from '@/types/setup';
import { Check, AlertTriangle, Clock, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: SetupStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const statusConfig: Record<SetupStatus, { label: string; icon: typeof Check; className: string }> = {
  complete: {
    label: 'Complete',
    icon: Check,
    className: 'bg-success-bg text-success border-success/20',
  },
  'in-progress': {
    label: 'In Progress',
    icon: Clock,
    className: 'bg-warning-bg text-warning border-warning/20',
  },
  blocked: {
    label: 'Blocked',
    icon: AlertTriangle,
    className: 'bg-blocker-bg text-blocker border-blocker/20',
  },
  pending: {
    label: 'Not Started',
    icon: Circle,
    className: 'bg-secondary text-muted-foreground border-border',
  },
};

export function StatusBadge({ status, showLabel = true, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      )}
    >
      <Icon className={cn(size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
