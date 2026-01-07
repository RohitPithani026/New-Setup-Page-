export type SetupStatus = 'complete' | 'in-progress' | 'blocked' | 'pending';

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role: 'champion' | 'developer';
}

export interface SetupBlocker {
  id: string;
  title: string;
  description: string;
  prescription: string;
  severity: 'critical' | 'warning';
  assignee?: TeamMember;
  createdAt: string;
}

export interface SetupStep {
  id: string;
  title: string;
  description: string;
  status: SetupStatus;
  blocker?: SetupBlocker;
  assignee?: TeamMember;
  estimatedTime: number; // in minutes
}

export interface ValueUnlock {
  name: string;
  description: string;
  pageUrl?: string;
}

export interface SetupModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: SetupStatus;
  teams: string[];
  steps: SetupStep[];
  estimatedTime: number;
  completedSteps: number;
  totalSteps: number;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  impactMetric: string;
  valueUnlocks: ValueUnlock[];
}
