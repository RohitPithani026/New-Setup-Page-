import { TeamMember } from '@/types/setup';
import { cn } from '@/lib/utils';

interface AssigneeBadgeProps {
  assignee: TeamMember;
  className?: string;
  size?: 'sm' | 'md';
}

export function AssigneeBadge({ assignee, className, size = 'md' }: AssigneeBadgeProps) {
  const initials = assignee.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const isSmall = size === 'sm';

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full bg-secondary/80 pl-1',
        isSmall ? 'gap-1 pr-2 py-0.5 text-xs' : 'gap-2 pr-3 py-1 text-sm',
        className
      )}
    >
      {assignee.avatar ? (
        <img
          src={assignee.avatar}
          alt={assignee.name}
          className={cn(
            'rounded-full object-cover',
            isSmall ? 'h-4 w-4' : 'h-6 w-6'
          )}
        />
      ) : (
        <div className={cn(
          'flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium',
          isSmall ? 'h-4 w-4 text-[10px]' : 'h-6 w-6 text-xs'
        )}>
          {initials}
        </div>
      )}
      <span className={cn('font-medium text-foreground', isSmall && 'text-xs')}>{assignee.name}</span>
    </div>
  );
}
