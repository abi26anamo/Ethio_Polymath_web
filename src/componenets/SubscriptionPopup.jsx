import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google'
import { useDispatch } from 'react-redux';
import { createSubscription, reset } from '@/redux/features/subscription/subscriptionSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const poppins600 = Poppins({
    weight: ["600"],
    subsets: ['latin']
})

const poppins400 = Poppins({
    weight: ["400"],
    subsets: ['latin']
})

const SubscriptionPopup = ({ onClose }) => {
    const dispatch = useDispatch()

    const [selectedSubscription, setSelectedSubscription] = useState(null)

    const { isSubscriptionCreated, message, isError } = useSelector((state) => state.subscription)

    useEffect(() => {
        if (isSubscriptionCreated) {
            toast.success(message)
            dispatch(reset())
            onClose()
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        }
    }, [isSubscriptionCreated, isError, message, dispatch, onClose])
    const handleOnClose = (e) => {
        if (e.target.id) onClose()
    }

    const selectedSubscriptionHandler = (item) => {
        setSelectedSubscription(item)
    }

    const subscribeHandler = () => {
        dispatch(createSubscription(selectedSubscription))
    }

    const cancelHandler = () => {
        onClose()
    }

    return (
        <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex items-center justify-center px-2">
            <div className={`bg-[#FAFAFA] shadow-[0_0px_50px_0px_rgba(0,0,0,0.3)] rounded-3xl w-1/2 md:min-w-[450px] lg:min-w-[500px] xl:min-w-[550px] 2xl:min-w-[600px] 3xl:min-w-[650px] flex flex-col items-center gap-2 md:gap-3 lg:gap-6 px-8 py-16 z-50`}>
                <div className="flex flex-col justify-center space-y-4">
                    <p className={`${poppins600.className} text-xl text-center`}>Subscription</p>
                    <p className={`${poppins400.className} text-base max-w-2xl text-center`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in dolor et diam gravida commodo. Sed condimentum felis rhoncus venenatis convallis.</p>
                </div>
                <div className={`${poppins400.className} flex gap-4`}>
                    <div onClick={() => selectedSubscriptionHandler('item 1')} className={`rounded-3xl p-[1px] ${
                      selectedSubscription === "item 1"
                        ? "bg-gradient-to-b from-[#FF7B7B] to-[#8557ED] "
                        : "bg-white hover:bg-gradient-to-b from-[#FF7B7B] to-[#8557ED]"
                    } cursor-pointer w-80`}>
                        <div className="px-4 py-8 bg-white rounded-3xl space-y-8 h-full">
                          <div className="space-y-2">
                            <p className={`${poppins600.className} text-xl text-center`}>Individual Pro</p>
                            <p className="text-3xl text-center">$19.99</p>
                            <p className="text-center text-sm"><span className="font-bold">10,000</span> words/per month</p>
                          </div>
                          <div className="space-y-4">
                              <p className="text-[#4B4B4B] text-sm"><span className="text-[#FC7B92] px-2">&#10003;</span>Get exclusive access to premium content</p>
                              <p className='text-[#4B4B4B] text-sm'><span className='text-[#FC7B92] px-2'>&#10003;</span>Join a community of like-minded individuals</p>
                              <p className='text-[#4B4B4B] text-sm'><span className='text-[#FC7B92] px-2'>&#10003;</span>Access member-only resources and tools</p>
                          </div>
                        </div>
                    </div>
                    
                    <div onClick={() => selectedSubscriptionHandler('item 3')} className={`rounded-3xl p-[1px] ${
              selectedSubscription === "item 3"
                ? "bg-gradient-to-b from-[#FF7B7B] to-[#8557ED] "
                : "bg-white hover:bg-gradient-to-b from-[#FF7B7B] to-[#8557ED]"
            } cursor-pointer w-80`}>
                        <div className="px-4 py-8 bg-white rounded-3xl space-y-8 h-full">
                          <div className="space-y-2">
                            <p className={`${poppins600.className} text-xl text-center`}>Team Pro</p>
                            <p className="text-3xl text-center">$19.99</p>
                            <p className="text-center text-sm">
                              <span className="font-bold"></span> per member per month
                            </p>
                          </div>
                            <div className="space-y-2">
                                <p className='text-[#4B4B4B] text-sm'><span className='text-[#FC7B92] px-2'>&#10003;</span>Get exclusive access to premium content</p>
                                <p className='text-[#4B4B4B] text-sm'><span className='text-[#FC7B92] px-2'>&#10003;</span>Join a community of like-minded individuals</p>
                                <p className='text-[#4B4B4B] text-sm'><span className='text-[#FC7B92] px-2'>&#10003;</span>Access member-only resources and tools</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${poppins400.className} flex flex-col justify-center gap-4`}>
                    <div class="tooltip">
                        <button onClick={subscribeHandler} disabled={selectedSubscription === null ? true : false} className="bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] transition-all text-white py-3 px-16 rounded-full">Subscribe</button>
                        <span class={`${selectedSubscription === null ? 'tooltiptext' : 'hidden'}`}>Please select a subscription</span>
                    </div>
                    <button onClick={cancelHandler} className="text-gray-400 py-3 px-16 border hover:bg-gray-200 transition-all rounded-full">It's alright</button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPopup;
