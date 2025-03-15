import React from 'react';

import type { ButtonHTMLAttributes } from "react";


const CustomButton = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
            {children}
        </button>
    )
}

export default CustomButton;