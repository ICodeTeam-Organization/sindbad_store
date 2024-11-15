import Cards from "./components/Cards";
import Ads from "./components/sections/Ads";
import AllStores from "./components/sections/all-stores";
import BeastSeller from "./components/sections/beast-seller";
import Categories from "./components/sections/Categories";
import Feature from "./components/sections/Feature";
import Hero from "./components/sections/Hero";
import RecentlyAdded from "./components/sections/recently-added";
import ShoppingNow from "./components/sections/shopping-now";
import TodayOffers from "./components/sections/today-offers";

export default function Home() {
  return (
    <section className="w-full">
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
