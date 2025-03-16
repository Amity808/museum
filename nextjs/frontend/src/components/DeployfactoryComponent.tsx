// 0xeDFa3e28953bA25173baF11160D4aD435ec002b5

import React, { useState } from 'react'
import { useWriteContract, useSimulateContract, useReadContract, useAccount } from 'wagmi'
import { abi } from '../contract/MuseumFactory';
import { FactoryAddress, USDT } from '@/helper/constant'
import useValidation from '@/hooks/useValidation'
import { validateName, validateAmount } from '@/helper/validation'
import CustomInput from './ui/CustomInput';
// import CustomButton from './ui/CustomButton';
// import { ethers } from "ethers";
// import { parseEther } from 'viem';


const DeployfactoryComponent = () => {
    const [fee, setFee] = useState<bigint | null>();
    const [name, setName] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const { address } = useAccount()

    const isNameValid = useValidation(name, validateName);
    const isLocationValid = useValidation(location, validateName);


    const { data: simulateDeployContract } = useSimulateContract({
        abi: abi,
        address: FactoryAddress,
        functionName: "deployMuseum",
        args: [fee ? BigInt(fee) : BigInt(0), USDT, name, location]
    })

    const { writeContractAsync } = useWriteContract();

    const { data: DeployAddressToNewContract } = useReadContract({
        abi: abi,
        address: FactoryAddress,
        functionName: "deployedAddressR",
        args: [address as `0x${string}`]
    })

    console.log(DeployAddressToNewContract);

    const handleDeployInstance = async () => {
        try {
            const result = await writeContractAsync(simulateDeployContract!.request)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className=''>

            <CustomInput placeholder='Enter name' error={isNameValid?.message ?? ""} value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                }} className='w-[300px]' />

            <CustomInput placeholder='Enter Museum location' error={isLocationValid?.message ?? ""} value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setLocation(e.target.value);
                }} />
            <div className='form-group mb-8 items-center flex justify-center flex-col gap-5'>
                <input type='url' placeholder='Set fee' value={fee?.toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFee(BigInt(e.target.value || "0"))
                    }} className='input' />

                <button onClick={handleDeployInstance} className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'>Deploy</button>
            </div>

        </div>
    )
}

export default DeployfactoryComponent