import styles from "./Services.module.css";
import type { ServiceItem, ServicesProps } from "./Services.types";

const services: ServiceItem[] = [
  {
    title: "Sites vitrines professionnels",
    description:
      "Création de sites modernes, responsive et adaptés à votre image pour présenter clairement votre activité.",
  },
  {
    title: "Applications web métier",
    description:
      "Développement d’outils sur mesure pour organiser, suivre et simplifier vos processus quotidiens.",
  },
  {
    title: "Applications mobiles Flutter",
    description:
      "Conception d’applications Android modernes, pensées pour le terrain et les usages professionnels.",
  },
  {
    title: "Déploiement et accompagnement",
    description:
      "Mise en ligne, configuration, conseils techniques et accompagnement jusqu’à une solution exploitable.",
  },
];

export function Services({ className }: ServicesProps) {
  return (
    <section
      className={`${styles.services} ${className ?? ""}`}
      id="services"
      aria-labelledby="services-title"
    >
      <div className={styles.header}>

        <h2 className={styles.title} id="services-title">
          Des solutions digitales pensées pour vos besoins réels.
        </h2>

        <p className={styles.description}>
          J’interviens sur des projets web et mobiles avec une approche simple :
          comprendre votre activité, structurer la solution et livrer un outil
          clair, utile et durable.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((service) => (
          <article className={styles.card} key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}