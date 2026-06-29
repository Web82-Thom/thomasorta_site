import { useEffect, useState } from "react";

import styles from "./Hero.module.css";
import type { HeroProps } from "./Hero.types";
import heroCodeImage from "../../../../../assets/images/hero-code.jpg";
import heroHostingImage from "../../../../../assets/images/hero-hosting.jpg";
import heroSolutionsImage from "../../../../../assets/images/hero-solutions.jpg";

const heroHighlights = [
  {
    label: "Développement web",
    title: "Création web",
    description: "Sites vitrines, SaaS et interfaces métier",
    image: heroCodeImage,
    alt: "Code informatique sur écran",
  },
  {
    label: "Objectifs et solutions",
    title: "Solutions métier",
    description: "Des outils pensés pour répondre à un besoin concret",
    image: heroSolutionsImage,
    alt: "Objectifs et solutions digitales",
  },
  {
    label: "Hébergement web",
    title: "Hébergement web",
    description: "Mise en ligne, configuration et accompagnement technique",
    image: heroHostingImage,
    alt: "Infrastructure d'hébergement web",
  },
];

export function Hero({ className }: HeroProps) {
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHighlightIndex((currentIndex) =>
        currentIndex === heroHighlights.length - 1 ? 0 : currentIndex + 1,
      );
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const activeHighlight = heroHighlights[activeHighlightIndex];

  return (
    <section
      className={`${styles.hero} ${className ?? ""}`}
      aria-labelledby="home-hero-title"
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 id="home-hero-title" className={styles.title}>
            Je crée des applications pro, performantes, modernes et durables.
          </h1>

          <p className={styles.description}>
            Disponible pour vos projets web et App Flutter, je vous accompagne
            de l'analyse du besoin jusqu'à la mise en ligne.
          </p>

          <div className={styles.actions} aria-label="Actions principales">
            <a className={styles.primaryAction} href="#portfolio">
              Voir mes projets
            </a>
            <a className={styles.secondaryAction} href="#contact">
              Me contacter
            </a>
          </div>
        </div>

        <div className={styles.showcase} aria-label="Domaines d'intervention">
          <article className={styles.featuredCard}>
            <img src={activeHighlight.image} alt={activeHighlight.alt} />

            <div className={styles.featuredOverlay}>
              <span>{activeHighlight.title}</span>
              <strong>{activeHighlight.description}</strong>
            </div>
          </article>

          <div className={styles.highlightGrid}>
            {heroHighlights.map((highlight, highlightIndex) => (
              <button
                className={
                  highlightIndex === activeHighlightIndex
                    ? `${styles.highlightCard} ${styles.highlightCardActive}`
                    : styles.highlightCard
                }
                key={highlight.label}
                type="button"
                onClick={() => {
                  setActiveHighlightIndex(highlightIndex);
                }}
              >
                <img src={highlight.image} alt="" aria-hidden="true" />
                <span>{highlight.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}