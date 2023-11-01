import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { newFeedback, reset } from '@/redux/features/feedback/feedbackSlice';

const poppins600 = Poppins({
    weight: ["600"],
    subsets: ['latin']
})

const poppins400 = Poppins({
    weight: ["400"],
    subsets: ['latin']
})

const SidebarPopup = ({ onClose }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [inputValue, setInputValue] = useState({
        type: '',
        message: ''
    })

    const { type, message } = inputValue

    const { isNewFeedback, isError, message: msg } = useSelector((state) => state.feedback)

    useEffect(() => {
        if (isNewFeedback) {
            toast.success(msg)
            dispatch(reset())
            onClose()
        } else if (isError) {
            toast.error(msg)
            dispatch(reset())
        }

    }, [dispatch, isNewFeedback, text, message, isError, msg, onClose])

    const handleOnClose = (e) => {
        if (e.target.id) onClose()
    }

    const onChange = (e) => {
        const { name, value } = e.target
        setInputValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const typeSelectHandler = (value) => {
        setInputValue((prev) => ({
            ...prev,
            type: value
        }))
    }

    const onCancelHandler = () => {
        onClose()
    }

    const onSubmitHandler = () => {
        if (!type || !message) {
            toast.warning('Please fill the fields')
        } else {
            dispatch(newFeedback(inputValue))
        }
    }
    return (
        <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center px-2">
            <div className={`bg-white shadow-[0_0px_50px_0px_rgba(0,0,0,0.3)] rounded-2xl md:min-w-[450px] lg:min-w-[500px] xl:min-w-[550px] 2xl:min-w-[600px] 3xl:min-w-[650px] flex flex-col items-center gap-2 md:gap-3 lg:gap-6 px-10 py-8 z-50`}>
                <div className={`my-3 ${poppins600.className} text-center space-y-3`}>
                    <p className={`text-4xl`}>Feedback</p>
                    <p className={`text-xl text-[#4B4B4B]`}>Help us to make this better.</p>
                </div>
                <div className={`${poppins600.className} space-y-5`}>
                    <p className={`text-[#4B4B4B]`}>Which sections of the dashboard do you feel unsatisfied with?</p>
                    <div className={`${poppins400.className} flex justify-between py-3 gap-3 px-5 text-[#4B4B4B]`}>
                        <div onClick={() => typeSelectHandler('video management')} className="flex gap-2 items-center cursor-pointer">
                            <div className={`w-5 h-5 flex-shrink-0 rounded-full flex justify-center items-center border ${type === 'video management' ? 'border-[#FC7B92]' : ''}`}>
                                {type === 'video management' && <div className='w-3 h-3 bg-[#FC7B92] rounded-full'></div>}
                            </div>
                            <p className='text-sm md:text-base'>Video management</p>
                        </div>
                        <div onClick={() => typeSelectHandler('subscription payment')} className="flex gap-2 items-center cursor-pointer">
                            <div className={`w-5 h-5 flex-shrink-0 rounded-full flex justify-center items-center border ${type === 'subscription payment' ? 'border-[#FC7B92]' : ''}`}>
                                {type === 'subscription payment' && <div className='w-3 h-3 bg-[#FC7B92] rounded-full'></div>}
                            </div>
                            <p className='text-sm md:text-base'>Subscription and Payment</p>
                        </div>
                    </div>
                    <p className={`text-[#4B4B4B]`}>Can you describe what you don’t like to help us to improve?</p>
                    <input type="text" name='message' value={message} onChange={onChange} className='w-full rounded-full border focus-within:outline-0 py-2 px-4 text-sm' />
                    <div className="flex justify-around py-3">
                        <button onClick={onCancelHandler} className='px-14 py-3 rounded-full border border-[#E1E1E1] hover:bg-[#E1E1E1] text-[#4B4B4B]'>Back</button>
                        <button onClick={onSubmitHandler} className='px-14 py-3 rounded-full border text-white bg-[#FC7B92] hover:bg-[rgb(255,85,116)]'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarPopup;
