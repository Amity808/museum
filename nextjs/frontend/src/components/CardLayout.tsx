"use client";
import React from "react";
import { LayoutGrid } from "./ui/layout-grid";

export function LayoutGridLayer() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
      Terracotta Army
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      The Mausoleum Qín Shǐhuángdìs is an early Chinese tomb, built for the first Chinese emperor Qín Shǐhuángdì. 
      Construction began in 246 BC and the emperor was buried in it in 210 BC. 
      It is one of the largest tomb buildings in the world and is especially famous for its large figures of soldiers, 
      the so-called &quot;Terracotta Army&quot;.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Bangwa Queen
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        The Bangwa Queen has exchanged hands of many art collectors since she was stolen 
        from her royal shrine in Cameroon. 
        The wooden sculpture, which is believed to be more than a thousand years old, 
        was taken away by German colonial explorer, Gustav Conrau, in the 1890s.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Haniwa Hourse Head
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {/* A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life. */}
        Haniwa were an unglazed, low-fired, reddish, porous earthenware made of the same material 
        as a type of daily-use pottery called haji ware. 
        These clay creations were shaped from coils or slabs and took the form 
        of human figures, animals, and houses.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Old Mesopotamian
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {/* A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life. */}
        These were ancient cylindrical seals used in early forms of accounting 
        to keep records of the production, storage, and transport of various consumer goods, 
        such as food supplies and textiles. 
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "alexander.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "Bangwa-Queen_Cameroon.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "HaniwaJapan.webp",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "old_mesopotaman.jpeg",
  },
];
