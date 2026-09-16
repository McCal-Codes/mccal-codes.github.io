/**
 * Build-time renderer. Not shipped to the browser.
 *
 * `scripts/emit-route-pages.js` calls `render` for each route and writes the markup
 * into that route's `index.html`, so the content is in the HTML for crawlers,
 * link unfurlers, and anyone without JavaScript. The browser then hydrates it.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom';
import { SITE } from './content/site';
import { collectServerMeta } from './lib/useDocumentTitle';
import { routes } from './routes';

export interface RenderedRoute {
  html: string;
  title: string;
  description: string;
}

export async function render(pathname: string): Promise<RenderedRoute> {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`${SITE.url}${pathname}`));
  if (context instanceof Response) {
    throw new Error(`${pathname} responded with ${context.status} instead of rendering`);
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  const meta = collectServerMeta(() =>
    renderToString(
      <StrictMode>
        {/* hydrate={false}: no inline hydration script, which the CSP would block. */}
        <StaticRouterProvider context={context} hydrate={false} router={router} />
      </StrictMode>,
    ),
  );

  return {
    html: meta.result,
    title: meta.title ?? SITE.name,
    description: meta.description ?? SITE.description,
  };
}
