import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ACTIVITY } from '@/content/activity';
import { NOTES } from '@/content/notes';
import { PROJECTS, getProject } from '@/content/projects';
import { SHOW_NOTES, SITE } from '@/content/site';
import NoteCard from '@/components/NoteCard';
import ProjectTile from '@/components/ProjectTile';
import { useDocumentMeta } from '@/lib/useDocumentTitle';
import styles from './HomePage.module.css';

const LINKS = [
  { label: 'Photos', value: SITE.portfolioLabel, href: SITE.portfolio },
  { label: 'Code', value: SITE.githubLabel, href: SITE.github },
] as const;

/*
  The tall tile sits beside the intro on wide screens and straight after it on
  phones, so it comes first in the source too. Reading order matches what you see.
*/
const TILES = [...PROJECTS].sort(
  (a, b) => Number(b.tile.size === 'tall') - Number(a.tile.size === 'tall'),
);

export default function HomePage() {
  useDocumentMeta(SITE.name, SITE.description);

  return (
    <>
      <section aria-labelledby="intro-heading" className={styles.top} id="index">
        <div className="shell-wide">
          <div className={styles.grid}>
            <div className={styles.hero}>
              <p className={`${styles.person} meta`}>{SITE.person}</p>
              <h1 className={styles.name} id="intro-heading">
                {SITE.headline}
              </h1>
              <p className={styles.role}>{SITE.role}</p>
              <p className={styles.intro}>{SITE.intro}</p>

              <ul className={styles.links}>
                {LINKS.map((link) => (
                  <li key={link.label}>
                    <a className={styles.chip} href={link.href} rel="noreferrer" target="_blank">
                      <span className={styles.chipLabel}>{link.label}</span>
                      <span className={styles.chipValue}>
                        {link.value}
                        <span aria-hidden="true"> ↗</span>
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="visually-hidden">Projects</h2>

            {TILES.map((project, index) => (
              <ProjectTile key={project.slug} priority={index === 0} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="currently-heading" className={styles.section}>
        <div className="shell-wide">
          <h2 className={`${styles.blockHeading} meta`} id="currently-heading">
            What I am working on right now
          </h2>

          <ul className={styles.activity}>
            {ACTIVITY.map((entry) => {
              const project = getProject(entry.slug);
              const style = project
                ? ({
                    '--tile-from': project.tile.from,
                    '--tile-to': project.tile.to,
                  } as CSSProperties)
                : undefined;

              return (
                <li className={`${styles.activityItem} tile-surface`} key={entry.slug} style={style}>
                  {project && project.sections.length > 0 ? (
                    <Link className={styles.activityProject} to={`/projects/${entry.slug}`}>
                      {entry.project}
                    </Link>
                  ) : (
                    <p className={styles.activityProject}>{entry.project}</p>
                  )}
                  <p className={styles.activityDetail}>{entry.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {SHOW_NOTES && (
      <section aria-labelledby="notes-heading" className={styles.section}>
        <div className="shell-wide">
          <div className={styles.notesHead}>
            <h2 className={`${styles.blockHeading} meta`} id="notes-heading">
              Build notes
            </h2>
            <Link className={`${styles.allNotes} meta`} to="/notes">
              All notes<span aria-hidden="true"> →</span>
            </Link>
          </div>

          <div className={styles.noteList}>
            {NOTES.slice(0, 3).map((note) => (
              <NoteCard key={note.slug} note={note} />
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
