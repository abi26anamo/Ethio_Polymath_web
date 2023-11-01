import Image from 'next/image';
import React, { useState } from 'react';
import { Poppins } from 'next/font/google'

const poppins400 = Poppins({
    weight: ["400"],
    subsets: ['latin']
})

const ClosePopup = ({ onClose, onSubmit, title }) => {
    const handleOnClose = (e) => {
        if (e.target.id) onClose()
    }

    const ConfirmHandler = () => {
        onSubmit()
    }

    const cancelHandler = () => {
        onClose()
    }

    return (
        <div id="container" onClick={handleOnClose} className={`fixed inset-0 bg-opacity-20 flex items-center justify-center px-2`}>
            <div className={`bg-[#FAFAFA] shadow-[0_0px_50px_0px_rgba(0,0,0,0.3)] rounded-2xl md:min-w-[450px] lg:min-w-[500px] xl:min-w-[550px] 2xl:min-w-[600px] 3xl:min-w-[650px] flex flex-col items-center  gap-12 px-14 py-20 z-50`}>
                <div className="flex flex-col justify-center gap-2">
                    <p className={`${poppins400.className} text-2xl text-center`}>{title}Thumbnail & video files won&apos;t be saved</p>
                    <p className={`${poppins400.className} text-2xl text-center`}>Are you sure?</p>
                </div>
                <div className={`${poppins400.className} flex justify-around gap-4`}>
                    <button onClick={cancelHandler} className='border border-[#FE6E6E] bg-[#FE6E6E] text-white transition-all py-3 px-16 rounded-full'>No</button>
                    <button onClick={ConfirmHandler} className='border border-[#FE6E6E] text-[#FE6E6E] transition-all py-3 px-16 rounded-full'>Yes</button>
                </div>
            </div>
        </div>
    );
};

export default ClosePopup;
