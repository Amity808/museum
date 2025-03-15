import React, { useState } from 'react'
import CustomInput from './ui/CustomInput'
// import CustomButton from './ui/CustomButton'
import useValidation from '@/hooks/useValidation'
import { validateName, validateAmount } from '@/helper/validation'


const MintArtifact = () => {

    const [name, setName] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [ticketPice, setTicketPice] = useState<number>(0)
    const [imageURL, setImageURL] = useState<string>('')

    const isNameValid = useValidation(name, validateName);
    const isLocationValid = useValidation(location, validateName);
    const isTicketPiceValid = useValidation(ticketPice, validateAmount);

    // const i
    // string memory _name,
    //     string memory _location,
    //     uint256 _ticketPrice,
    //     string memory _imageURI validator

    return (
        <div className=' flex justify-center items-center mt-[24px]'>
            <form action="">
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
                        setTicketPice(parseInt(e.target.value) || 0);  
                    }} />

                    <div className='form-group mb-8'>
                    <input type='url' placeholder='Enter image URL' value={imageURL}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setImageURL(e.target.value)}} className='input'/>
                    </div>
                    
                    
            </form>

        </div>
    )
}

export default MintArtifact