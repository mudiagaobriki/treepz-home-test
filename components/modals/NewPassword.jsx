'use client';

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";

// Custom components
import Button1 from '@/components/items/Button1';
// import isMobile from '@/components/helpers/isMobile'

const NewPassword = ({isOpen, closeModal, onNextStep, onBackClicked}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    
    // let mobPad = isMobile ? "px-5 py-2" : "px-20 py-3";
    useEffect(() => {
        setIsVisible(isOpen);
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling when modal is closed
        }
    }, [isOpen]);

    const handleResetPassword = async () => {
        // call api to reset password
        // if password is reset successfully
        onNextStep()
    }

    return (
        <div>
            {/* Main modal */}
            <div id="new-password-modal" tabindex="-1" aria-hidden="true" className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 ${isVisible ? 'block' : 'hidden'}`}>
                <div className="relative w-full max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="bg-white rounded-2xl shadow w-[37.5rem]">
                        <div className="flex justify-between items-center w-full px-8 py-3 tz-border-bottom-1">
                            <h4 className="font-medium tz-text-dark-1">Enter new password</h4>
                            <button onClick={closeModal} type="button" className="p-1 tz-bg-light bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="new-password-modal">
                                <Image src="/assets/images/close-lg.png" alt="close-x" width={16} height={16} />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="w-full pt-6 pb-20 px-8">
                            <div className="mb-10">
                                <h3 className="text-xl font-semibold text-center tz-text-dark-1">Create new password</h3>
                                <p className="text-sm text-opacity-70 text-center tz-text-dark-1">Enter a new secure password</p>
                            </div>
                            <form className="" action="#">
                                <div className="flex flex-col items-start gap-8 mb-12">
                                    <div className="relative w-full">
                                        <a href="#" onClick={() => setIsPasswordVisible1(!isPasswordVisible1)} className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-cursor">
                                            <Image src="/assets/images/eye-line.png" alt="eye-icon" width={20} height={20} />
                                        </a>
                                        <input type={isPasswordVisible1 ? "text" : "password"} id="password" className="block rounded-lg px-3 pt-6 pb-2 w-full text-base bg-white  border appearance-none focus:outline-none focus:ring-0 focus:border-[#A0A3A6] peer tz-text-gray-2 tz-border-light-3" placeholder=" " />
                                        <label htmlFor="password" className="absolute text-base duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-[#A0A3A6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 tz-text-gray-2">Enter new password</label>
                                    </div>
                                    <div className="relative w-full">
                                        <a href="#" onClick={() => setIsPasswordVisible2(!isPasswordVisible2)} className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-cursor">
                                            <Image src="/assets/images/eye-line.png" alt="eye-icon" width={20} height={20} />
                                        </a>
                                        <input type={isPasswordVisible2 ? "text" : "password"} id="confirmPassword" className="block rounded-lg px-3 pt-6 pb-2 w-full text-base bg-white  border appearance-none focus:outline-none focus:ring-0 focus:border-[#A0A3A6] peer tz-text-gray-2 tz-border-light-3" placeholder=" " />
                                        <label htmlFor="confirmPassword" className="absolute text-base duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-[#A0A3A6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 tz-text-gray-2">Confirm new password</label>
                                    </div>
                                </div>
                                <div className="w-full mb-5">
                                    <Button1 onClick={handleResetPassword} text="Confirm" submit={true} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default NewPassword;
