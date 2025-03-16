import React from 'react'
import { BackgroundGradient } from './background-gradient'

import Image from 'next/image'

// @typescript-eslint/no-empty-object-type
const ContentLayout = () => {
    return (
        <div>
            <div className="flex w-full bg-black lg:flex-row overflow-hidden max-sm:flex-col sm:flex-col">
                <div className="card bg-black rounded-box grid  grow place-items-center">
                    <BackgroundGradient className='rounded-[22px] max-w-lg p-4 sm:p-8 bg-white dark:bg-zinc-900'>
                        <Image src="/artifact.webp" alt="" width={500} height={500} className="" />
                    </BackgroundGradient>
                    
                </div>
                
                <div className="card bg-black rounded-box grid  grow place-items-center">
                    <p className=' font-bold'>
                        Greek Temple History
                    </p>
                    <p className=' w-[500px] '>This aerial view highlights the majestic Temple of Poseidon located at Cape Sounion,
                        Greece, during a stunning sunset. Built in the 5th century BCE,
                        this ancient Greek temple dedicated to the god Poseidon offers breathtaking
                        views of the Aegean Sea. The partially preserved Doric columns and
                        its elevated position on the cliff make it one of the most iconic archaeological sites in Greece.
                         Surrounded by vibrant colors of the sea and sky, 
                         the Temple of Poseidon is a popular destination for tourists, history enthusiasts, 
                         and photography lovers, offering a perfect blend of cultural heritage and natural beauty.</p>
                </div>
            </div></div>
    )
}

export default ContentLayout