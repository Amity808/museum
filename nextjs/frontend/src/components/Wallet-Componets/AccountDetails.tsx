
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { truncateAddress } from '../../utils/truncateAddress'
import { toast } from 'react-toastify'
import ModalConnection from './ModalConnection'


const AccountDetails = () => {
    
    const { address, isConnected } = useAccount()
    const {disconnect} = useDisconnect()


    const result = useBalance({ address })
    const balance = result.data?.value
    const symbol = result.data?.symbol

    const copytext = (addr: `0x${string}`) => {
        navigator.clipboard.writeText(addr)
        toast.success("Copy wallet address")
    }

    return (
        <div>
            {
                isConnected ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">View Wallet</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><button onClick={() => copytext(address as `0x${string}`)}>{truncateAddress(address as `0x${string}`)} ❐</button></li>
                            <li><p>Balance {balance?.toString()} {symbol}</p></li>
                            <li><button className='' onClick={() => disconnect()}>Disconnect</button>
                            </li>

                        </ul>
                    </div>
                ) : (
                    <ModalConnection />
                )
            }

        </div>
    )
}

export default AccountDetails