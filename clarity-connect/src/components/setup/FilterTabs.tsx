import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterTabsProps {
  teams: string[];
  activeTeam: string | null;
  onTeamChange: (team: string | null) => void;
}

export function FilterTabs({ teams, activeTeam, onTeamChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Filter by Team</span>
      <button
        onClick={() => onTeamChange(null)}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
          activeTeam === null 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-muted-foreground hover:text-foreground'
        )}
      >
        All Teams
      </button>
      {teams.map(team => (
        <button
          key={team}
          onClick={() => onTeamChange(activeTeam === team ? null : team)}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
            activeTeam === team 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-muted-foreground hover:text-foreground'
          )}
        >
          <Users className="h-3.5 w-3.5" />
          {team}
        </button>
      ))}
    </div>
  );
}
