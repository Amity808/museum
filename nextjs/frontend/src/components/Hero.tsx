import React from 'react'
import { BackgroundLines } from './ui/background-line'


const Hero = () => {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Arts Station, <br /> Sajana Textiles.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
    Explore the future of art in our Web3 museum, where NFTs meet
        masterpieces. Discover digital collectibles, blockchain-powered
        exhibits, and immersive experiences, all on the decentralized web.

      </p>
    </BackgroundLines>

  )
}

export default Hero