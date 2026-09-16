import type { ActivityEntry } from './types';

/**
 * What is actually being worked on now. Short, specific, and worth updating often.
 * A stale "Currently" block is worse than no "Currently" block.
 */
export const ACTIVITY: ActivityEntry[] = [
  {
    project: 'TerraNova',
    slug: 'terranova',
    detail: 'Working the alpha channel toward a preview you can trust, and making density fields inspectable.',
  },
  {
    project: 'Folio',
    slug: 'folio',
    detail:
      'Folders past two apps, hidden apps behind a lock, a Work Apps switch, and layouts that adapt to each screen and fold.',
  },
  {
    project: 'Abridgd',
    slug: 'abridgd',
    detail:
      'In beta on iOS and Android. Recent work: Android support, rebuilt onboarding, feed fixes, and an accessibility pass.',
  },
];
