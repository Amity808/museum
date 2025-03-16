import React, { useState } from 'react'
import CustomInput from './ui/CustomInput'
// import CustomButton from './ui/CustomButton'
import useValidation from '@/hooks/useValidation'
import { validateName, validateAmount } from '@/helper/validation'
import { abi } from '../contract/MuseumFactory';
import { abiMuseum } from '@/contract/Museum';
import { useReadContract, useAccount, useSimulateContract, useWriteContract } from 'wagmi';
import { FactoryAddress, Address_Zero } from '@/helper/constant'
import { parseEther } from 'viem';
import Link from 'next/link';
// import useDetectImage from '@/hooks/useDetectImag';



const MintArtifact = () => {

    const [name, setName] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [ticketPice, setTicketPice] = useState<string>('')
    const [imageURL, setImageURL] = useState<string>('')

    const isNameValid = useValidation(name, validateName);
    const isLocationValid = useValidation(location, validateName);
    const isTicketPiceValid = useValidation(ticketPice, validateAmount);

    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();

    const { data: DeployAddressToNewContract } = useReadContract({
        abi: abi,
        address: FactoryAddress,
        functionName: "deployedAddressR",
        args: [address as `0x${string}`]
    })


    console.log(DeployAddressToNewContract, "token")

    const { data: simulateWriteContract, error: simulateWriteContractError, isLoading } = useSimulateContract({
        abi: abiMuseum,
        address: DeployAddressToNewContract,
        functionName: "createArtifact",
        args: [name, location, parseEther(ticketPice), imageURL]
    })


    const handleCreatArtifact = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await writeContractAsync(simulateWriteContract!.request)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }



    // const i
    // string memory _name,
    //     string memory _location,
    //     uint256 _ticketPrice,
    //     string memory _imageURI validator

    return (
        <div className=' flex justify-center items-center mt-[24px]'>
            {
                DeployAddressToNewContract == Address_Zero ? (<>
                <div className="flex justify-center items-center flex-col gap-4">
                    <h3 className=' font-bold'>You need to visit Get Started Page</h3>
                    <Link href="/start">
                        <p className="btn">Go to Get Started</p>
                    </Link>
                </div>
                </>) : (
                    <>
                        <form action="" onSubmit={handleCreatArtifact}>
                            {/* <p className="text-red-900">{notification?.message}</p> */}
                            <CustomInput placeholder='Enter name' error={isNameValid?.message ?? ""} value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(e.target.value);
                                }} className='w-[300px]' />

                            <CustomInput placeholder='Enter Museum location' error={isLocationValid?.message ?? ""} value={location}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setLocation(e.target.value);
                                }} />
                            <CustomInput placeholder='Enter amount' error={isTicketPiceValid?.message ?? ""} type='number' value={ticketPice}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    //setTicketPice(e.target.value ?? 0);
                                    setTicketPice(e.target.value);
                                }} />

                            <div className='form-group mb-8'>
                                <input type='url' placeholder='Enter image URL' value={imageURL}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setImageURL(e.target.value)
                                    }} className='input' />
                            </div>

                            <button type='submit'>Create Artifact</button>
                            {simulateWriteContractError && <div className="text-red-900 text-sm">{simulateWriteContractError?.message}</div>}


                        </form>
                    </>
                )
            }


        </div>
    )
}

export default MintArtifact