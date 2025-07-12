"use clinet";
import React from "react"; 
import NewShoppingNow from "./components/NewShoppingNow";
import NewEcommrcesCarsoule from "./components/NewEcommrcesCarsoule";
import NewHero from "./components/NewHero";

function Test() {
  return (
    <div>
      {/* <NewStoresCarsouole/> */}
      <NewHero/>
      <NewEcommrcesCarsoule   />
      {/* <NewCategoriesCarousel
        categories={[]}
        sectionHref=""
        sectionTitle="الفئات الئيسية"
      /> */}
       
      <NewShoppingNow />
    </div>
  );
}

export default Test;
