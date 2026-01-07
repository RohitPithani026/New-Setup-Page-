import { SetupBlocker } from '@/types/setup';
import { AlertTriangle, Lightbulb, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface BlockerCardProps {
  blocker: SetupBlocker;
  className?: string;
  detailed?: boolean;
}

export function BlockerCard({ blocker, className, detailed = false }: BlockerCardProps) {
  const [showSolutions, setShowSolutions] = useState(detailed);
  
  const formattedDate = new Date(blocker.createdAt).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  // Parse prescription into bullet points if it contains multiple sentences
  const prescriptionPoints = blocker.prescription
    .split(/[.!?]/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (detailed) {
    return (
      <div className={cn(
        'rounded-lg border border-blocker/30 bg-card overflow-hidden',
        className
      )}>
        <div className="p-4">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-xs">
                {blocker.severity === 'critical' ? 'Critical' : 'Warning'}
              </Badge>
              <Badge variant="outline" className="text-xs">Technical</Badge>
            </div>
            <Button size="sm" variant="outline" className="border-blocker text-blocker hover:bg-blocker hover:text-blocker-foreground">
              Mark Resolved
            </Button>
          </div>

          <h4 className="font-semibold text-base mb-2">{blocker.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{blocker.description}</p>

          <p className="text-xs text-muted-foreground mb-4">
            Reported {blocker.assignee && <>by {blocker.assignee.name} • </>}{formattedDate}
          </p>

          <button
            onClick={() => setShowSolutions(!showSolutions)}
            className="flex items-center gap-2 text-sm text-warning hover:text-warning/80 font-medium mb-3"
          >
            <Lightbulb className="h-4 w-4" />
            {showSolutions ? 'Hide' : 'Show'} Diagnostic Information
            {showSolutions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showSolutions && (
            <div className="rounded-lg bg-secondary/50 border p-4">
              <h5 className="font-medium text-sm mb-3">Suggested Solutions:</h5>
              <ul className="space-y-2">
                {prescriptionPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-warning mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Compact inline version
  return (
    <div className={cn(
      'rounded-lg border border-blocker/30 bg-blocker/5 p-3',
      className
    )}>
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 text-blocker flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-blocker">{blocker.title}</p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{blocker.description}</p>
          
          <div className="mt-2 rounded bg-warning/10 border border-warning/20 p-2">
            <div className="flex items-start gap-1.5">
              <Lightbulb className="h-3.5 w-3.5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-warning">How to Fix</p>
                <p className="text-xs text-muted-foreground mt-0.5">{blocker.prescription}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            {blocker.assignee && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Assigned to</span>
                <span className="font-medium text-foreground">{blocker.assignee.name}</span>
              </div>
            )}
            <Button size="sm" variant="outline" className="h-7 text-xs border-blocker/30 text-blocker hover:bg-blocker/10">
              View Details
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
