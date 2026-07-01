import { Link } from "react-router-dom";

import { MainLayout } from "../../../layouts/MainLayout";
import styles from "./AboutPage.module.css";
import type { AboutProps } from "./About.types";

const focusCards = [
  {
    title: "Comprendre",
    description:
      "Analyser le besoin, les contraintes et les utilisateurs avant de choisir une solution.",
  },
  {
    title: "Structurer",
    description:
      "Poser une architecture claire pour éviter les empilements difficiles à maintenir.",
  },
  {
    title: "Livrer",
    description:
      "Construire des outils utilisables, documentés et prêts à évoluer avec le projet.",
  },
];

const services = [
  "Sites vitrines professionnels",
  "Applications web métier",
  "Applications mobiles Flutter",
  "Interfaces d'administration",
  "Outils de gestion interne",
];

const technologies = [
  "React",
  "TypeScript",
  "Symfony",
  "Flutter",
  "MySQL",
  "Docker",
  "Firebase",
  "Supabase",
];

const deliverySteps = [
  "Conception de l'architecture technique",
  "Développement frontend et backend",
  "Modélisation des données",
  "Création et consommation d'API REST",
  "Authentification et sécurisation",
  "Déploiement et maintenance",
];

export function AboutPage({ className }: AboutProps) {
  return (
    <MainLayout>
      <section
        className={`${styles.page} ${className ?? ""}`}
        aria-labelledby="about-title"
      >
        <div className={styles.content}>
          <Link className={styles.backLink} to="/">
            Retour
          </Link>

          <div className={styles.hero}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>À propos</p>

              <h1 id="about-title" className={styles.title}>
                Concevoir des solutions web et mobiles utiles, claires et
                durables.
              </h1>

              <p className={styles.lead}>
                Je suis Thomas ORTA, développeur Web & Mobile. Je transforme des
                besoins métier en sites, applications et outils structurés pour
                être réellement utilisés au quotidien.
              </p>
            </div>

            <aside className={styles.profile} aria-label="Profil professionnel">
              <strong>Thomas ORTA</strong>
              <span>Développeur Web & Mobile</span>
              <p>
                Une approche pragmatique : comprendre, structurer, développer,
                livrer et accompagner.
              </p>
            </aside>
          </div>

          <div className={styles.focusGrid}>
            {focusCards.map((card) => (
              <article className={styles.focusCard} key={card.title}>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.storyGrid}>
            <article className={styles.storyPanel}>
              <h2>Mon parcours</h2>

              <p>
                Issu d'un parcours en reconversion, j'ai obtenu le titre
                professionnel de développeur web avec OpenClassrooms. Depuis, je
                développe des projets orientés métier avec une attention forte
                portée à la clarté, l'organisation et l'utilité réelle des
                solutions.
              </p>

              <p>
                Avant de coder, je cherche à comprendre le besoin, les
                utilisateurs et les contraintes du projet. L'objectif est de
                livrer une solution simple à utiliser, maintenable et adaptée au
                quotidien de l'activité.
              </p>
            </article>

            <aside className={styles.sidePanel}>
              <h2>Ce que je développe</h2>

              <ul className={styles.checkList}>
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </aside>
          </div>

          <div className={styles.techPanel}>
            <div>
              <h2>Compétences techniques</h2>
              <p>
                Mes réalisations reposent principalement sur React, TypeScript,
                Symfony, Flutter, MySQL, Firebase et Supabase. Je privilégie la
                qualité de l'architecture, la compréhension du besoin métier et
                la capacité à construire des applications fiables.
              </p>
            </div>

            <ul
              className={styles.techList}
              aria-label="Technologies principales"
            >
              {technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>

          <div className={styles.deliveryPanel}>
            <div>
              <p className={styles.eyebrow}>De bout en bout</p>
              <h2>Du développement au déploiement</h2>
              <p>
                Je conçois des applications depuis l'analyse du besoin jusqu'à
                la mise en production, avec une logique de maintenance et
                d'évolution dès le départ.
              </p>
            </div>

            <ul className={styles.deliveryList}>
              {deliverySteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <p className={styles.quote}>
            Créer des outils qui restent simples à utiliser quand le quotidien
            devient complexe.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
