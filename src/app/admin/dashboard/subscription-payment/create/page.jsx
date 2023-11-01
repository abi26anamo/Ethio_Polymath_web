'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { FaAngleLeft } from "react-icons/fa";
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { createProduct, reset } from '@/redux/features/subscription/subscriptionSlice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Header from "@/componenets/Header";

const poppins600 = Poppins({
    weight: ["600"],
    subsets: ['latin']
})

const poppins400 = Poppins({
    weight: ["400"],
    subsets: ['latin']
})

const SubscriptionSettingsPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [objectives, setSelectedObjectives] = useState(2)
    const [objectiveValues, setObjectiveValues] = useState(
        Array.from({ length: objectives }, () => ({ title: '' }))
    )
    const [inputValue, setInputValue] = useState({
        title: '',
        description: '',
        duration: '',
        time: '',
        price: '',
        lifetime: false
    })

    const { title, description, duration, time, price } = inputValue

    const { isProductCreated, isError, message } = useSelector((state) => state.subscription)

    useEffect(() => {
        if (isProductCreated) {
            toast.success(message)
            dispatch(reset())
            router.back()
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        setObjectiveValues((prevValues) => {
            // Keep the existing values for common objectives and add new ones if needed
            return Array.from({ length: objectives }, (item, index) => ({
                title: prevValues[index] ? prevValues[index].title : ''
            }));
        });
    }, [objectives, dispatch, router, isProductCreated, isError, message])

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setInputValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const objectiveClickHandler = (i) => {
        if (i === 'increase') {
            if (objectives < 5) setSelectedObjectives(objectives + 1)
        } else if (i === 'decrease') {
            if (objectives > 0) setSelectedObjectives(objectives - 1)
        }
    }

    const handleObjectiveChange = (index, value) => {
        const newObjectiveValues = [...objectiveValues];
        newObjectiveValues[index].title = value;
        setObjectiveValues(newObjectiveValues);
    }

    const onBackClickHandler = () => {
        router.back()
    }

    const completeHandler = () => {
        dispatch(createProduct({ ...inputValue, objectiveValues }))
    }

    const homepageClickHandler = () => {
      if (window.confirm("Do you want to exit?")) {
        router.push("/admin/dashboard/video-management");
      } else {
        console.log("CANCELED");
      }
    };

    return (
        <div className="fixed inset-0 bg-white overflow-y-auto">
            <button onClick={homepageClickHandler}>
              <Header />
            </button>
            <div className={`${poppins400.className} w-full flex flex-col items-center pb-20 mx-auto`}>
                <div className="flex flex-col justify-between w-1/4">
                    <h1 className={`${poppins600.className} text-3xl`}>Create a Product</h1>
                    <div className="space-y-2 py-3 w-full">
                        <p className={`${poppins600.className} text-xl`}>What’s the Title of Your New Subscription?</p>
                        <input type="text" className={`text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-xl w-1/2 py-4 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none placeholder:text-sm w-full`} placeholder="E.g. Add a title for your new subscription" name="title" id="title" value={title} onChange={onChangeHandler} />
                    </div>
                    <div className="space-y-2 py-3 w-full">
                        <p className={`${poppins600.className} text-xl`}>Add description to your subscription</p>
                        <textarea type="text" className={`text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-xl w-1/2 py-4 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none resize-none placeholder:text-sm w-full`} placeholder="Join our monthly subscription and enjoy exclusive access to our premium content, personalized recommendations, and member-only resources." name="description" id="description" value={description} onChange={onChangeHandler} cols="30" rows="3"></textarea>
                    </div>
                    <div className="space-y-2 py-3 w-full">
                        <p className={`${poppins600.className} text-xl`}>How much is your Product?</p>
                        <input type="text" className={`text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-xl w-1/2 py-4 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none placeholder:text-sm w-full`} placeholder="E.g. Let's say $15" name="price" id="price" value={price} onChange={onChangeHandler} />
                    </div>
                    <div className="space-y-2 py-3 flex items-center justify-between w-full">
                        <p className={`${poppins600.className} text-xl`}>Lifetime Member</p>
                        <div
                            // onClick={() => togglefreevideo(index)}
                            onClick={() => setInputValue((prev) => ({ ...prev, lifetime: !inputValue.lifetime, time: '' }))}
                            className={classNames(
                              "flex items-center w-11 h-6 my-8 py-1 px-1 rounded-full transition-all duration-500 cursor-pointer",
                              {
                                "bg-[#FC7B92]": inputValue.lifetime,
                                "bg-[#D9D9D9]": !inputValue.lifetime,
                              }
                            )}>
                            <span className={classNames(
                              "w-[18px] h-[18px] bg-white rounded-full transition-all duration-100 shadow-2xl",
                              {
                                "ml-[18px] flex-shrink-0": inputValue.lifetime,
                              }
                            )}></span>
                        </div>
                    </div>
                    {!inputValue.lifetime &&
                        <div className="space-y-2 py-3 w-full">
                            <p className={`${poppins600.className} text-xl`}>What’s the duration of your product?</p>
                            <div className="flex gap-2 items-center">
                                <input type="text" className={`text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-lg w-10 py-4 px-3 focus-within:border-[rgb(252,123,146)] focus-within:outline-none placeholder:text-sm`} placeholder='12' disabled={inputValue.lifetime ? true : false} name="time" id="time" value={time} onChange={onChangeHandler} />
                                <p className='text-[#4B4B4B]'>month</p>
                            </div>
                        </div>}
                    <div className="space-y-2 py-3 w-full">
                        <p className={`${poppins600.className} text-xl`}>What are some of perks you offer?</p>
                        <div className="py-4">
                            <div className="flex justify-between w-full">
                                <p className={`${poppins400.className} text-[#000000]`}>Number of perks</p>
                                <div className="flex justify-end items-center gap-10">
                                    <div onClick={() => objectiveClickHandler('decrease')} className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer">
                                        <p className="-mt-[0px]">-</p>
                                    </div>
                                    <p>{objectives}</p>
                                    <div onClick={() => objectiveClickHandler('increase')} className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer">
                                        <p className="-mt-[0px]">+</p>
                                    </div>
                                </div>
                            </div>
                            <p className={`${poppins400.className} text-sm text-[#C4C4C4]`}>
                              Note: the maximum amount of videos is 5.
                            </p>
                        </div>
                        <div className=" space-y-0">
                            {objectiveValues.map((objective, index) => (
                                <div key={index} className="space-y-1 py-4">
                                    <p className={`${poppins600.className} text-[#000000] text-sm`}>Perk detail</p>
                                    <input
                                        key={index}
                                        type="text"
                                        className={`${poppins400.className} text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-xl py-4 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none w-full`}
                                        placeholder={`E.g. save 20% than monthly`}
                                        name="objective"
                                        id={`objective_${index}`}
                                        value={objective.title}
                                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-1/2">
                    <button
                        onClick={onBackClickHandler}
                        className="px-6 border rounded-full py-4 flex justify-center gap-2 items-center text-sm hover:bg-[#2e2e2e] hover:text-white w-min duration-200"><FaAngleLeft /> Back</button>
                    <button
                        onClick={completeHandler}
                        className={`${poppins400.className} text-sm bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] py-4 px-6 transition-all rounded-full text-white duration-200`}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionSettingsPage