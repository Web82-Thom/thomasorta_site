export type ProjectItem = {
  title: string;
  description: string;
  technologies: string[];
  status: string;
  image: {
    src: string;
    alt: string;
  };
  projectUrl?: string;
};

export type ProjectsProps = {
  className?: string;
};
