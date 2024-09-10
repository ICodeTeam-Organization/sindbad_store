import React from "react";
import E_commerceCard from "./e-commCard";
import alibab from '../../../app/../public/images/alibaba.svg';

const e_commers = [
  {
    image: alibab,
    title: "علي بابا",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: alibab,
    title: "علي بابا",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: alibab,
    title: "علي بابا",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: alibab,
    title: "علي بابا",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: alibab,
    title: "علي بابا",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  {
    image: alibab,
    title: "علي بابا",
    description: "اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات - اواني منزلية - اكسسوارات ",
  },
  // ...other products
];

const E_commerceGrid = () => {
  return (
      <div className="px-10 mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {e_commers.map((e_comm, index) => (
          <E_commerceCard key={index} {...e_comm} />
        ))}
      </div>
  );
};

export default E_commerceGrid;