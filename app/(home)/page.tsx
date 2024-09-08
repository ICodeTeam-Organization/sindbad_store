import About from "./components/sections/About";
import Hero from "./components/sections/Hero";
import Subscribe from "./components/sections/Subscribe";

export default function Home() {
  return (
    <section className="w-full bg-yellow-50">
      <Hero />
      {/* Banner Section */}
      {/* Categories Section */}
      {/* ...other Sections */}
      <Subscribe />
      <About />
    </section>
  );
}
