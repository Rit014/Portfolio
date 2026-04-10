import { Hero } from "../Components/Hero";
import { Skills } from "../components/Skills";

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto px-6">
      <Hero />

      <section className="py-16">
        <Skills name="React.js" type="frontend" />
      </section>
    </main>
  );
};

export default Home;