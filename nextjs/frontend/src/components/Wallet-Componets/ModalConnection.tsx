import { useRef } from 'react'
import { WalletButton } from './WalletButton';



const ModalConnection = () => {

    const dialogRef = useRef<HTMLDialogElement>(null)

    const openModal = () => {
        dialogRef.current?.showModal()
    }
    return (
        <>
            <button className="btn" onClick={openModal}>Connect Wallet</button>
            <dialog ref={dialogRef} className="modal">
                <div className="modal-box w-[400px]">
                    <h3 className="font-bold text-lg">Hello, Amity Wallet Connect!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action justify-center items-center">
                        <form method="dialog">
                            <div className='flex flex-col justify-center'>
                                <WalletButton />
                            <button className="btn mt-4 justify-center items-center">Close</button>
                            </div>

                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default ModalConnection