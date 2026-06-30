import type { ProjectItem } from "./Projects.types";
import heroCodeImage from "../../../../../assets/images/hero-code.jpg";
import depanflow_card from "../../../../../assets/images/depanflow_card.jpg";
import nociblack_card from "../../../../../assets/images/nociblack_card.jpg";
import cleaningSchedule_card from "../../../../../assets/images/cleaningSchedule_card.jpg";

export const projects: ProjectItem[] = [
  {
    title: "DepanFlow",
    description:
      "Plateforme SaaS destinée aux dépanneurs automobiles pour la gestion des interventions.",
    technologies: ["Symfony", "React", "Flutter", "PostgreSQL", "Docker"],
    status: "En développement",
    image: {
      src: depanflow_card,
      alt: "Interface de développement représentant le projet DepanFlow",
    },
    projectUrl: "https://platformdepanflow.thomasorta.fr/",
  },
  {
    title: "NociBlacK",
    description:
      "Application mobile d'administration et site web connecté pour la gestion d'un catalogue produits.",
    technologies: ["Flutter", "React", "Supabase"],
    status: "En développement",
    image: {
      src: nociblack_card,
      alt: "Visuel représentant l'organisation d'un catalogue produit",
    },
    projectUrl: "https://nociblack.thomasorta.fr/",
  },
  {
    title: "Cleaning Schedule",
    description:
      "Application de gestion des plannings, présences et tâches quotidiennes pour un ESAT. Utilisation sur mobile et Web",
    technologies: ["Flutter", "Firebase"],
    status: "Prototype fonctionnel",
    image: {
      src: cleaningSchedule_card,
      alt: "Infrastructure technique représentant le suivi d'une application métier",
    },
    projectUrl: "https://cleaningsheduledemo.thomasorta.fr/",
  },
  {
    title: "ThomasOrta.fr",
    description:
      "Site professionnel développé avec React et Symfony pour présenter mes services et réalisations.",
    technologies: ["React", "Symfony", "TypeScript"],
    status: "En développement",
    image: {
      src: heroCodeImage,
      alt: "Code source représentant le site professionnel ThomasOrta.fr",
    },
    projectUrl: "https://thomasorta.fr",
  },
];

