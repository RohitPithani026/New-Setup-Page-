import { useState, useMemo } from 'react';
import { setupModules } from '@/data/setupModules';
import { OverviewCards } from '@/components/setup/OverviewCards';
import { FilterTabs } from '@/components/setup/FilterTabs';
import { ModuleCard } from '@/components/setup/ModuleCard';
import { Button } from '@/components/ui/button';
import { Sparkles, Target, Play, Bell } from 'lucide-react';

const Index = () => {
  const [activeTeam, setActiveTeam] = useState<string | null>(null);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  const allTeams = useMemo(() => {
    const teams = new Set<string>();
    setupModules.forEach(m => m.teams.forEach(t => teams.add(t)));
    return Array.from(teams);
  }, []);

  const filteredModules = useMemo(() => {
    if (!activeTeam) return setupModules;
    return setupModules.filter(m => m.teams.includes(activeTeam));
  }, [activeTeam]);

  const hasBlockedModules = setupModules.some(m => m.status === 'blocked');

  const handleModuleToggle = (moduleId: string) => {
    setExpandedModuleId(expandedModuleId === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              TS
            </div>
            <span className="font-semibold text-lg">ThriveStack</span>
          </div>
          <div className="flex items-center gap-3">
            {hasBlockedModules && (
              <Button variant="outline" size="sm" className="text-blocker border-blocker/30">
                <Bell className="h-4 w-4 mr-2" />
                1 Setup Issue
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Demo Mode
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Setup Growth Intelligence</h1>
            <p className="text-muted-foreground max-w-2xl">
              Configure your analytics to eliminate blind spots and data silos. 
              Establish key use cases to unify data and align all teams effectively.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              Personalized Setup
            </Button>
            <Button>
              <Target className="h-4 w-4 mr-2" />
              Targeted Insights
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="mb-8">
          <OverviewCards modules={setupModules} />
        </div>

        {/* Controls - Filter and Demo Button */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <FilterTabs 
            teams={allTeams} 
            activeTeam={activeTeam} 
            onTeamChange={setActiveTeam} 
          />
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Skip setup, try demo mode
          </Button>
        </div>

        {/* Module Cards */}
        <div className="space-y-4">
          {filteredModules.map(module => (
            <ModuleCard 
              key={module.id} 
              module={module}
              isExpanded={expandedModuleId === module.id}
              onToggle={() => handleModuleToggle(module.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
