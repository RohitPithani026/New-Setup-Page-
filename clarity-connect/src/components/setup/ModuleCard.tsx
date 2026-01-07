import { SetupModule } from '@/types/setup';
import { StatusBadge } from './StatusBadge';
import { AssigneeBadge } from './AssigneeBadge';
import { ProgressBar } from './ProgressBar';
import { StepItem } from './StepItem';
import { ValueUnlockSection } from './ValueUnlockSection';
import { BlockerCard } from './BlockerCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, BarChart3, DollarSign, Shield, 
  ChevronDown, ChevronUp, Clock, ArrowRight,
  AlertTriangle, ListChecks, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const iconMap: Record<string, typeof Target> = {
  target: Target,
  'bar-chart': BarChart3,
  'dollar-sign': DollarSign,
  shield: Shield,
};

interface ModuleCardProps {
  module: SetupModule;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function ModuleCard({ module, isExpanded = false, onToggle }: ModuleCardProps) {
  const Icon = iconMap[module.icon] || Target;
  
  const blockers = useMemo(() => 
    module.steps.filter(s => s.blocker).map(s => s.blocker!), 
    [module.steps]
  );
  const hasBlocker = blockers.length > 0;

  // Get the primary assignee (first one with an assignee)
  const primaryAssignee = useMemo(() => {
    const stepWithAssignee = module.steps.find(s => s.assignee);
    return stepWithAssignee?.assignee;
  }, [module.steps]);

  return (
    <div className={cn(
      'rounded-xl border bg-card shadow-card transition-all duration-200 overflow-hidden',
      isExpanded && 'shadow-card-hover',
      module.status === 'blocked' && 'border-blocker/30',
      module.status === 'in-progress' && 'border-warning/30'
    )}>
      {/* Header - Always visible */}
      <div 
        className="flex items-start gap-4 p-5 cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={onToggle}
      >
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0',
          module.status === 'complete' && 'bg-success/10 text-success',
          module.status === 'in-progress' && 'bg-warning/10 text-warning',
          module.status === 'blocked' && 'bg-blocker/10 text-blocker',
          module.status === 'pending' && 'bg-primary/10 text-primary'
        )}>
          <Icon className="h-6 w-6" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-semibold text-lg">{module.title}</h3>
                {/* Show assignee badge after title */}
                {primaryAssignee && (
                  <AssigneeBadge assignee={primaryAssignee} size="sm" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{module.estimatedTime} mins</span>
              </div>
              <StatusBadge status={module.status} />
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Quick status when collapsed */}
          {!isExpanded && (
            <div className="mt-4 flex items-center gap-4">
              <ProgressBar 
                completed={module.completedSteps} 
                total={module.totalSteps} 
                size="sm"
                className="flex-1 max-w-xs"
              />
              {hasBlocker && (
                <div className="flex items-center gap-1.5 text-sm text-blocker font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{blockers.length} blocker{blockers.length > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t animate-accordion-down">
          {/* Blocker Alert Banner */}
          {hasBlocker && (
            <div className="mx-5 mt-5 rounded-lg border border-blocker/30 bg-blocker/5 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-blocker" />
                <div>
                  <p className="font-medium text-blocker">{blockers.length} Active Blocker{blockers.length > 1 ? 's' : ''}</p>
                  <p className="text-sm text-muted-foreground">Resolve these issues to continue with setup</p>
                </div>
              </div>
            </div>
          )}

          {/* Tabs for Setup Steps, Blockers, Activity */}
          <div className="px-5 pt-5">
            <Tabs defaultValue={hasBlocker ? 'blockers' : 'steps'} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="steps" className="gap-2">
                  <ListChecks className="h-4 w-4" />
                  Setup Steps
                </TabsTrigger>
                <TabsTrigger value="blockers" className="gap-2 relative">
                  <AlertTriangle className="h-4 w-4" />
                  Blockers
                  {hasBlocker && (
                    <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blocker text-blocker-foreground text-xs font-semibold shadow-sm">
                      {blockers.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2">
                  <Activity className="h-4 w-4" />
                  Activity
                </TabsTrigger>
              </TabsList>

              {/* Setup Steps Tab */}
              <TabsContent value="steps" className="mt-0">
                <div className="grid lg:grid-cols-3 gap-6 pb-5">
                  {/* Left: Challenge & Solution */}
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Challenge</h4>
                        <p className="text-sm">{module.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Solution</h4>
                        <p className="text-sm">{module.solution}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Key Features</h4>
                      <ul className="space-y-1.5">
                        {module.keyFeatures.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-success-bg px-3 py-2">
                      <BarChart3 className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">{module.impactMetric}</span>
                    </div>
                  </div>

                  {/* Center: Steps */}
                  <div className="lg:col-span-1 lg:border-x lg:px-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Setup Steps</h4>
                      <ProgressBar 
                        completed={module.completedSteps} 
                        total={module.totalSteps}
                        size="sm" 
                      />
                    </div>
                    <div className="space-y-0">
                      {module.steps.map((step, i) => (
                        <StepItem 
                          key={step.id} 
                          step={step} 
                          index={i}
                          isLast={i === module.steps.length - 1}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: Value Unlocks */}
                  <div>
                    <ValueUnlockSection 
                      valueUnlocks={module.valueUnlocks}
                      isComplete={module.status === 'complete'}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Blockers Tab */}
              <TabsContent value="blockers" className="mt-0">
                <div className="pb-5">
                  {blockers.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Active Blockers</h4>
                        <Button size="sm" variant="destructive">
                          Report New Blocker
                        </Button>
                      </div>
                      {blockers.map((blocker) => (
                        <BlockerCard key={blocker.id} blocker={blocker} detailed />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      <p>No active blockers</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="mt-0">
                <div className="pb-5 text-center py-8 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>Activity feed coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Action Footer */}
          <div className="border-t bg-secondary/30 px-5 py-4 flex items-center justify-end">
            <Button 
              className={cn(
                module.status === 'complete' && 'bg-success hover:bg-success/90',
                module.status === 'blocked' && 'bg-blocker hover:bg-blocker/90'
              )}
            >
              {module.status === 'complete' ? 'View Analytics' : 
               module.status === 'pending' ? 'Start Setup' : 'Continue Setup'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
