export const SITE = {
  name: 'McCal Development',
  shortName: 'McCal Dev',
  url: 'https://mccal-codes.github.io',
  person: 'Caleb McCartney',
  /** The homepage display name. Matches the Ko-fi banner. */
  headline: 'McCal',
  role: 'Photojournalist & Developer',
  /** In Caleb's own words. */
  intro: 'Hello, I just have fun.',
  /** Used for the meta description, where the intro alone says too little. */
  description:
    'Caleb McCartney (McCal) is a photojournalist and developer. Folio, TerraNova, Abridgd, and build notes.',
  github: 'https://github.com/McCal-Codes',
  /** The editorial photography portfolio. Same person, different medium. */
  portfolio: 'https://mcc-cal.com',
  portfolioLabel: 'mcc-cal.com',
  githubLabel: 'github.com/McCal-Codes',
} as const;

export const NAV = [
  { label: 'Projects', to: '/#index' },
  { label: 'Notes', to: '/notes' },
  { label: 'About', to: '/about' },
] as const;

export const EXTERNAL_NAV = [{ label: 'GitHub', href: SITE.github }] as const;

/**
 * The open-source footer block is generated from `github.json` rather than listed
 * here. See `SiteFooter`.
 */
