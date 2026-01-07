import { SetupModule, TeamMember } from '@/types/setup';

export const teamMembers: TeamMember[] = [
  { id: '1', name: 'Kevin Chen', role: 'champion' },
  { id: '2', name: 'Sarah Dev', role: 'developer' },
  { id: '3', name: 'Mike Ops', role: 'developer' },
];

export const setupModules: SetupModule[] = [
  {
    id: 'marketing-intelligence',
    title: 'Marketing Intelligence',
    description: 'Connect every touchpoint to revenue',
    icon: 'target',
    status: 'complete',
    teams: ['Marketing teams'],
    estimatedTime: 10,
    completedSteps: 4,
    totalSteps: 4,
    challenge: 'Measure attribution but don\'t know which leads convert',
    solution: 'Track the complete journey from first touch to revenue',
    keyFeatures: [
      'Multi-touch attribution modeling',
      'Revenue impact tracking',
      'Campaign performance analytics',
      'Custom attribution models'
    ],
    impactMetric: '38% improvement in campaign ROI on average',
    steps: [
      { id: 'm1', title: 'Connect tracking pixel', description: 'Install the ThriveStack pixel on your website', status: 'complete', estimatedTime: 2, assignee: teamMembers[0] },
      { id: 'm2', title: 'Configure UTM parameters', description: 'Set up campaign tracking parameters', status: 'complete', estimatedTime: 3, assignee: teamMembers[0] },
      { id: 'm3', title: 'Connect ad platforms', description: 'Link Google Ads, Meta, LinkedIn', status: 'complete', estimatedTime: 3, assignee: teamMembers[0] },
      { id: 'm4', title: 'Set conversion goals', description: 'Define what constitutes a conversion', status: 'complete', estimatedTime: 2, assignee: teamMembers[0] },
    ],
    valueUnlocks: [
      { name: 'Traffic by UTM', description: 'Attribute traffic to campaigns, channels, and sources', pageUrl: '/analyze/marketing-intelligence/traffic-by-utm' },
      { name: 'Channel Performance Dashboard', description: 'Track performance across marketing channels', pageUrl: '/analyze/marketing-intelligence/channel-performance-dashboard' },
      { name: 'Content Performance', description: 'Monitor page interactions to identify high-performing content', pageUrl: '/analyze/marketing-intelligence/content-performance' },
      { name: 'Goal Conversions', description: 'Track key business goals like signups and demo requests', pageUrl: '/analyze/marketing-intelligence/goal-conversions' },
    ]
  },
  {
    id: 'product-intelligence',
    title: 'Product Intelligence',
    description: 'Turn usage data into revenue insights',
    icon: 'bar-chart',
    status: 'blocked',
    teams: ['Product teams', 'Engineering teams'],
    estimatedTime: 26,
    completedSteps: 1,
    totalSteps: 3,
    challenge: 'Track usage but lack visibility into revenue impact',
    solution: 'Connect product usage directly to revenue metrics',
    keyFeatures: [
      'Feature usage tracking',
      'Engagement scoring',
      'User journey mapping',
      'Revenue correlation'
    ],
    impactMetric: '52% better feature adoption rates',
    steps: [
      { id: 'p1', title: 'Install SDK', description: 'Add the ThriveStack SDK to your application', status: 'complete', estimatedTime: 5, assignee: teamMembers[1] },
      { 
        id: 'p2', 
        title: 'Configure event tracking', 
        description: 'Set up events for key user actions', 
        status: 'blocked', 
        estimatedTime: 15,
        assignee: teamMembers[1],
        blocker: {
          id: 'b1',
          title: 'Event schema validation failing',
          description: 'The event payload for "feature_used" event is missing required field "user_id". Events are being dropped by the ingestion pipeline.',
          prescription: 'Update your SDK initialization to include user identification before sending events. Call `thrivestack.identify(userId)` after user login, then ensure all events include the user context.',
          severity: 'critical',
          assignee: teamMembers[1],
          createdAt: '2024-01-05T10:30:00Z'
        }
      },
      { id: 'p3', title: 'Map features to revenue', description: 'Link product features to subscription tiers', status: 'pending', estimatedTime: 6, assignee: teamMembers[1] },
    ],
    valueUnlocks: [
      { name: 'Onboarding Journeys', description: 'Visualize user onboarding flows', pageUrl: '/analyze/product-intelligence/onboarding-journeys' },
      { name: 'Feature Engagement', description: 'Track feature usage and adoption', pageUrl: '/analyze/product-intelligence/feature-engagement' },
      { name: 'Retention Analytics', description: 'Measure user retention over time', pageUrl: '/analyze/product-intelligence/retention' },
    ]
  },
  {
    id: 'revenue-intelligence',
    title: 'Revenue Intelligence',
    description: 'Maximize conversion and revenue',
    icon: 'dollar-sign',
    status: 'in-progress',
    teams: ['Sales teams', 'RevOps teams'],
    estimatedTime: 30,
    completedSteps: 3,
    totalSteps: 6,
    challenge: 'Focus on Revenue ($) but don\'t know what drives conversions',
    solution: 'Identify key behaviors that lead to upgrades',
    keyFeatures: [
      'Revenue forecasting',
      'Conversion path analysis',
      'Pricing optimization',
      'Upgrade trigger identification'
    ],
    impactMetric: '45% increase in upgrade conversion rate',
    steps: [
      { id: 'r1', title: 'Connect billing system', description: 'Integrate Stripe, Chargebee, or custom billing', status: 'complete', estimatedTime: 5, assignee: teamMembers[2] },
      { id: 'r2', title: 'Import historical data', description: 'Sync past transactions and subscriptions', status: 'complete', estimatedTime: 8, assignee: teamMembers[2] },
      { id: 'r3', title: 'Configure plan mapping', description: 'Map your subscription plans to ThriveStack', status: 'complete', estimatedTime: 4, assignee: teamMembers[2] },
      { id: 'r4', title: 'Set up revenue events', description: 'Track upgrade, downgrade, churn events', status: 'in-progress', estimatedTime: 5, assignee: teamMembers[2] },
      { id: 'r5', title: 'Configure cohorts', description: 'Define customer segments for analysis', status: 'pending', estimatedTime: 4, assignee: teamMembers[2] },
      { id: 'r6', title: 'Enable forecasting', description: 'Activate predictive revenue models', status: 'pending', estimatedTime: 4, assignee: teamMembers[2] },
    ],
    valueUnlocks: [
      { name: 'Revenue Dashboard', description: 'Overview of all revenue metrics', pageUrl: '/analyze/revenue-analytics/dashboard' },
      { name: 'MRR Movements', description: 'Track monthly recurring revenue changes', pageUrl: '/analyze/revenue-analytics/mrr-movements' },
      { name: 'Subscriber Movements', description: 'Monitor subscription changes', pageUrl: '/analyze/revenue-analytics/subscriber-movements' },
    ]
  },
  {
    id: 'churn-prevention',
    title: 'Predict and Prevent Churn',
    description: 'Retention and Expansion',
    icon: 'shield',
    status: 'pending',
    teams: ['Customer Success teams'],
    estimatedTime: 18,
    completedSteps: 0,
    totalSteps: 6,
    challenge: 'React to churn after it happens',
    solution: 'Predict and prevent churn before customers leave',
    keyFeatures: [
      'Churn prediction models',
      'Health scoring',
      'At-risk alerts',
      'Expansion opportunity detection'
    ],
    impactMetric: '32% reduction in churn rate',
    steps: [
      { id: 'c1', title: 'Define health metrics', description: 'Set up customer health indicators', status: 'pending', estimatedTime: 4, assignee: teamMembers[0] },
      { id: 'c2', title: 'Connect support data', description: 'Integrate Intercom, Zendesk, or similar', status: 'pending', estimatedTime: 3, assignee: teamMembers[0] },
      { id: 'c3', title: 'Configure alerts', description: 'Set up at-risk customer notifications', status: 'pending', estimatedTime: 3, assignee: teamMembers[0] },
      { id: 'c4', title: 'Train prediction model', description: 'Calibrate churn prediction with your data', status: 'pending', estimatedTime: 4, assignee: teamMembers[0] },
      { id: 'c5', title: 'Set up playbooks', description: 'Define response actions for at-risk accounts', status: 'pending', estimatedTime: 2, assignee: teamMembers[0] },
      { id: 'c6', title: 'Enable expansion signals', description: 'Track upsell and cross-sell opportunities', status: 'pending', estimatedTime: 2, assignee: teamMembers[0] },
    ],
    valueUnlocks: [
      { name: 'At Risk Accounts', description: 'View accounts likely to churn', pageUrl: '/analyze/accounts/list/at-risk' },
      { name: 'Account Lifecycle Journey', description: 'Track customer journey stages', pageUrl: '/analyze/accounts/list/csm-team-dashboard' },
      { name: 'Churned Accounts', description: 'Analyze churned customer patterns', pageUrl: '/analyze/accounts/list?segmentName=churned_accounts' },
    ]
  },
];
