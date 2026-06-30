import styles from "./Projects.module.css";
import { projects } from "./Projects.data";
import type { ProjectsProps } from "./Projects.types";

export function Projects({ className }: ProjectsProps) {
  return (
    <section
      id="portfolio"
      className={`${styles.projects} ${className ?? ""}`}
      aria-labelledby="projects-title"
    >
      <div className={styles.header}>

        <h2 id="projects-title" className={styles.title}>
          Des projets conçus pour répondre à des besoins concrets.
        </h2>

        <p className={styles.description}>
          Chaque réalisation est pensée pour résoudre un problème métier précis,
          avec une interface claire, une architecture propre et une solution
          durable.
        </p>
      </div>

      <div className={styles.grid}>
        {projects.map((project) => (
          <article className={styles.card} key={project.title}>
            {project.projectUrl ? (
              <a
                className={styles.mediaLink}
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Voir le projet ${project.title}`}
              >
                <img src={project.image.src} alt={project.image.alt} />
              </a>
            ) : (
              <div className={styles.media}>
                <img src={project.image.src} alt={project.image.alt} />
              </div>
            )}

            <span className={styles.status}>{project.status}</span>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <ul
              className={styles.techList}
              aria-label="Technologies utilisées"
            >
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>

            {project.projectUrl ? (
              <a
                className={styles.projectLink}
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
              >
                Voir le projet
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
