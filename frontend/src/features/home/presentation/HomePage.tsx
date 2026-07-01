import { MainLayout } from "../../../layouts/MainLayout";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Weather } from "./components/Weather";

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <Weather />
      <Services />
      <Projects />
      <Contact />
    </MainLayout>
  );
}
