import { useConnect} from "wagmi"
import Image from "next/image";
export const WalletButton = () => {
    const { connectors, connect} = useConnect();
    console.log(connectors)

    return connectors?.map((connector) => (
        <div className=" flex flex-row gap-3 mt-4 items-center btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" key={connector.uid}>
            <Image src={connector?.icon || ''} alt="" className=" w-[24px] h-[24px]" width={24} height={24}/>
            <button className="" onClick={() => connect({connector})}>
            {connector.name}
        </button>

        </div>
        
    ))
}