import Cards from "./components/Cards";
import Ads from "./components/sections/Ads";
import AllStores from "./components/sections/AllStores";
import BeastSeller from "./components/sections/BeastSeller";
import Categories from "./components/sections/Categories";
import Feature from "./components/sections/Feature";
import Hero from "./components/sections/Hero";
import RecentlyAdded from "./components/sections/RecentlyAdded";
import ShoppingNow from "./components/sections/ShoppingNow";
import TodayOffers from "./components/sections/TodayOffers";

export default function Home() {
  return (
    <section className="w-full bg-yellow-50">
      <Hero />
      <Cards />
      <Categories />
      <TodayOffers />
      <ShoppingNow />
      <AllStores />
      <BeastSeller />
      <Ads />
      <RecentlyAdded />
      <ShoppingNow />
      <AllStores />
      <Feature />
    </section>
  );
}
