import Cards from "./components/cards";
import Ads from "./components/sections/ads";
import AllStores from "./components/sections/all-stores";
import BeastSeller from "./components/sections/beast-seller";
import Categories from "./components/sections/categories";
import Feature from "./components/sections/feature";
import Hero from "./components/sections/hero";
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
