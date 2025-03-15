import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MintArtifact from '@/components/MintArtifact'




const MintPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex justify-center items-center my-auto">
                {/* Your page content goes here */}
                <MintArtifact />
            </div>
            <Footer className="mt-auto"  />
        </div>
    )
}

export default MintPage