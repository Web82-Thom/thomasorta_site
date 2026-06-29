import { MainLayout } from "../../../layouts/MainLayout";
import { Hero } from "./components/Hero";
import { Weather } from "./components/Weather";

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <Weather />
    </MainLayout>
  );
}
