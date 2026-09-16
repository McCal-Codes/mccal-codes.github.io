import { useEffect } from 'react';
import { SITE } from '@/content/site';

export function formatTitle(title: string): string {
  return title === SITE.name ? title : `${title} · ${SITE.shortName}`;
}

/**
 * During a build-time render there is no document, so the page's title and
 * description are recorded here instead and written into the static HTML.
 */
let serverMeta: { title?: string; description?: string } | null = null;

function recordServerMeta(title: string, description?: string) {
  if (!serverMeta) return;
  serverMeta.title = formatTitle(title);
  if (description) serverMeta.description = description;
}

export function collectServerMeta<T>(render: () => T) {
  serverMeta = {};
  try {
    const result = render();
    return { result, ...serverMeta };
  } finally {
    serverMeta = null;
  }
}

/**
 * Sets the document title and meta description per route. Pre-rendered pages
 * already carry both; this keeps them right during client-side navigation.
 */
export function useDocumentMeta(title: string, description?: string) {
  recordServerMeta(title, description);

  useEffect(() => {
    document.title = formatTitle(title);

    if (!description) return;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description);
  }, [title, description]);
}
