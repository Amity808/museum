import React from 'react'
import { useReadContract } from "wagmi"
import { abi } from '@/contract/MuseumFactory'
import { FactoryAddress } from '@/helper/constant';




type Props = {
    id: string | number;
}

const CardLayer = ({ id }: Props) => {

    const { data: getDeployAddress } = useReadContract({
        abi: abi,
        address: FactoryAddress,
        functionName: "deployedAddress",
        args: [BigInt(id)]
    })
    console.log(getDeployAddress)
  return (
    <div>

    </div>
  )
}

export default CardLayer