import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@/content/types';
import { getRepo } from '@/content/github';
import StatusMarker from './StatusMarker';
import styles from './ProjectTile.module.css';

interface ProjectTileProps {
  project: Project;
  /** Above the fold on the homepage. Loads its capture eagerly. */
  priority?: boolean;
}

/**
 * A homepage project tile, in the style of the Ko-fi banner.
 *
 * The title is the tile's only link. Its hit area is stretched over the whole tile,
 * so the card is one tab stop with one accessible name rather than a nest of links.
 */
export default function ProjectTile({ project, priority = false }: ProjectTileProps) {
  const { tile, preview } = project;
  const headingId = `tile-${project.slug}`;
  const repo = getRepo(project.slug);
  const hasCaseStudy = project.sections.length > 0;
  const summary = tile.summary ?? project.pitch ?? project.purpose;

  // Measured languages first, then frameworks the language stats cannot see.
  const stack = [
    ...(repo?.languages.map((language) => language.name) ?? []),
    ...(project.meta.frameworks ?? []),
  ];

  const style = { '--tile-from': tile.from, '--tile-to': tile.to } as CSSProperties;
  const className = [
    styles.tile,
    tile.kind === 'cover' ? styles.cover : styles.device,
    tile.size === 'tall' ? styles.tall : '',
  ]
    .filter(Boolean)
    .join(' ');

  const image = preview?.src && (
    <img
      alt={preview.alt}
      className={styles.shot}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      height={preview.height}
      loading={priority ? 'eager' : 'lazy'}
      src={preview.src}
      width={preview.width}
    />
  );

  return (
    <article
      aria-labelledby={headingId}
      className={className}
      data-size={tile.size}
      style={style}
    >
      {tile.kind === 'cover' && image && <div className={styles.coverMedia}>{image}</div>}

      <div className={styles.content}>
        <img alt="" className={styles.icon} height={64} src={tile.icon} width={64} />

        <h3 className={styles.title} id={headingId}>
          {hasCaseStudy ? (
            <Link className={styles.link} to={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          ) : tile.href ? (
            <a className={styles.link} href={tile.href} rel="noreferrer" target="_blank">
              {project.title}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className={styles.summary}>{summary}</p>

        <div className={styles.facts}>
          <StatusMarker className={styles.status} status={project.status} />
          {stack.length > 0 && <p className={`${styles.stack} meta`}>{stack.join(' / ')}</p>}
        </div>

        {(hasCaseStudy || tile.href) && (
          <p aria-hidden="true" className={`${styles.cta} meta`}>
            {hasCaseStudy ? 'How it works →' : `${tile.hrefLabel ?? 'Open'} ↗`}
          </p>
        )}
      </div>

      {tile.kind === 'device' && image && <div className={styles.deviceMedia}>{image}</div>}
    </article>
  );
}
