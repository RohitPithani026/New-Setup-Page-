import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamBadgeProps {
  team: string;
  className?: string;
}

export function TeamBadge({ team, className }: TeamBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary border border-primary/10',
        className
      )}
    >
      <Users className="h-3 w-3" />
      {team}
    </span>
  );
}
