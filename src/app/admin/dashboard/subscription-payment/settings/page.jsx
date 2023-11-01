'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { reset, subscriptionSetting } from '@/redux/features/subscription/subscriptionSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Header from "@/componenets/Header";
import { FaAngleLeft } from "react-icons/fa";

const poppins600 = Poppins({
    weight: ["600"],
    subsets: ['latin']
})

const poppins400 = Poppins({
    weight: ["400"],
    subsets: ['latin']
})

const subscriptionsItems = [
    {
        title: '1 Month Premium Subscription',
        description: 'Join our monthly subscription and enjoy exclusive access to our premium content, personalized recommendations, and member-only resources.',
        price: '88',
        time: '1',
        subDuration: 'every month',
        offers: ['Get exclusive access to premium content', 'Join a community of like-minded individuals', 'Access member-only resources and tools', 'Choose from flexible subscription options to fit your needs and budget', 'Experience a seamless and user-friendly platform'],
        lifetime: false,
        recommanded: false
    },
    {
        title: '12 Months Premium Subscription',
        description: 'Join our monthly subscription and enjoy exclusive access to our premium content, personalized recommendations, and member-only resources.',
        price: '880',
        time: '12',
        subDuration: 'every 12 month',
        offers: ['Get exclusive access to premium content', 'Join a community of like-minded individuals', 'Access member-only resources and tools', 'Choose from flexible subscription options to fit your needs and budget', 'Experience a seamless and user-friendly platform'],
        lifetime: false,
        recommanded: true
    },
    {
        title: 'Lifetime Member ',
        description: 'Join our monthly subscription and enjoy exclusive access to our premium content, personalized recommendations, and member-only resources.',
        price: '1888',
        time: 'lifetime',
        subDuration: 'once',
        offers: ['Get exclusive access to premium content', 'Join a community of like-minded individuals', 'Access member-only resources and tools', 'Choose from flexible subscription options to fit your needs and budget', 'Experience a seamless and user-friendly platform'],
        lifetime: true,
        recommanded: false
    }
]

const SubscriptionSettingsPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [subscriptions, setSubscriptions] = useState(subscriptionsItems)
    const [selectedSubscription, setSelectedSubscription] = useState('monthly')
    const [objectives, setSelectedObjectives] = useState(2)
    const [objectiveValues, setObjectiveValues] = useState(
        Array.from({ length: objectives }, () => ({ title: '' }))
    )
    const [inputValue, setInputValue] = useState({
        title: '',
        description: '',
        duration: '',
        price: '',
        time: '',
        lifetime: false
    })

    const { title, description, duration, time, price } = inputValue

    const { isSubscriptionSetting, isError, message } = useSelector((state) => state.subscription)

    useEffect(() => {
        if (isSubscriptionSetting) {
            toast.success(message)
            dispatch(reset())
            router.back()
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        }
    }, [dispatch, isSubscriptionSetting, isError, message, router])

    useEffect(() => {
        setObjectiveValues((prevValues) => {
            // Keep the existing values for common objectives and add new ones if needed
            return Array.from({ length: objectives }, (item, index) => ({
                title: prevValues[index] ? prevValues[index].title : ''
            }));
        });
    }, [objectives])

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

    const selectedSubscriptionHandler = (selected) => {
        setSelectedSubscription(selected)
        setInputValue((prev) => ({
            ...prev,
            title: selected.title,
            description: selected.description,
            duration: selected.subDuration,
            time: selected.time,
            lifetime: selected.lifetime,
            price: selected.price
        }))
        setSelectedObjectives(selected.offers.length)
        // selected.offers.map(item => )
        setObjectiveValues((prevValues) => {
            return selected.offers.map((item, index) => ({
                title: item
            }));
        });

    }

    const recommendationHandler = () => {
        const tempData = [...subscriptions]
        const temp = tempData.map(item => ({ ...item, recommanded: item.title === selectedSubscription.title ? true : false }));
        setSubscriptions(temp)
    }

    const archiveSubscriptionHandler = () => {
        const tempData = [...subscriptions]
        const temp = tempData.filter(item => item.title !== selectedSubscription.title)
        setSubscriptions(temp)
    }

    const onBackClickHandler = () => {
        router.back()
    }

    const completeHandler = () => {
        dispatch(subscriptionSetting({...inputValue, selectedSubscription, objectives, objectiveValues}))
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
                <div className="max-w-6xl space-y-10 min-w-[800px]">
                    <h1 className={`${poppins600.className} text-3xl`}>Subscription Settings</h1>
                    <div className="flex justify-between items-center">
                        <h2 className={`${poppins600.className} text-xl text-center`}>Subscription Managemant</h2>
                        <div className="flex gap-3">
                            <button
                                onClick={archiveSubscriptionHandler}
                                className="px-6 py-3 text-sm rounded-full border border-[#FB4C4C] text-[#FB4C4C] hover:bg-[#FB4C4C] hover:text-white duration-200">Archive</button>
                            <div
                                onClick={recommendationHandler}
                                className="p-[1px] bg-gradient-to-r from-[#FC7B92] to-[#7256FF] rounded-full">
                                <button className="px-6 py-3 text-sm rounded-full bg-white hover:bg-transparent hover:text-white duration-200">Set as Recommendation</button>
                            </div>
                        </div>
                    </div>
                    <div className={`flex gap-4 justify-center`}>
                        {subscriptions && subscriptions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => selectedSubscriptionHandler(item)}
                                className={`p-[1px] w-1/2 shadow-[0_0px_20px_0px_rgba(0,0,0,0.05)] rounded-3xl cursor-pointer h-min ${
                                    item.title === selectedSubscription.title
                                      ? "bg-gradient-to-b from-[#FC7B92] to-[#7256FF] bg-[#FBFBFF]"
                                      : ""
                                  } ${
                                    item.recommanded && "-mt-0"
                                  } hover:bg-gradient-to-b from-[#FC7B92] to-[#7256FF] transition-all`}>
                                <div
                                    className={`p-8 space-y-2 text-center bg-white rounded-3xl`}>
                                    {item.recommanded &&
                                        <div className="flex justify-center">
                                            <p className="bg-[#2e2e2e] py-2 px-3 rounded-lg text-white text-xs w-min text-center">Recommended</p>
                                        </div>}
                                    <p className={`${poppins600.className} text-xl`}>{item.title}</p>
                                    <p className={`${poppins400.className} text-sm text-[#C4C4C4] pb-2`}>{item.description}</p>
                                    <p className="text-5xl pb-0">${item.price}</p>
                                    <p className="text-[#C4C4C4] text-sm">{item.subDuration}</p>
                                    <ul className="text-left space-y-4 py-3">
                                        {item.offers.map((list, index) => (
                                            <li key={index} className="flex gap-2 text-sm"> <span className="text-[#FC7B92]">&#10004;</span> <span>{list}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <p className={`${poppins600.className} text-xl`}>What’s the Title of Your New Subscription?</p>
                        <input type="text" className={`text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-xl w-1/2 py-4 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none placeholder:text-sm`} placeholder="E.g. Give a title for your new subscription" name="title" id="title" value={title} onChange={onChangeHandler} />
                    </div>
                    <div className="space-y-2">
                        <p className={`${poppins600.className} text-xl`}>Add description to your subscription</p>
                        <textarea type="text" className={`text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-xl w-1/2 py-2 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none resize-none placeholder:text-sm`} placeholder="E.g. Add description to your subscription" name="description" id="description" value={description} onChange={onChangeHandler} cols="30" rows="3"></textarea>
                    </div>
                    <div className="space-y-2 py-3">
                        <p className={`${poppins600.className} text-xl`}>How much is your Product?</p>
                        <input type="text" className={`text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-xl w-1/2 py-4 px-4 focus-within:border-[rgb(252,123,146)] focus-within:outline-none placeholder:text-sm`} placeholder="E.g. Give a price to the product" name="price" id="price" value={price} onChange={onChangeHandler} />
                    </div>

                    <div className="space-y-2 py-3 flex items-center justify-between w-1/2">
                        <p className={`${poppins400.className} text-xl`}>Lifetime Member</p>
                        <div
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
                        <div className="space-y-2 py-3">
                            <p className={`${poppins600.className} text-xl`}>What’s the duration of your product?</p>
                            <div className="flex gap-2 items-center">
                                <input type="text" className={`text-[#4B4B4B] text-sm border border-[#E5E5E5] rounded-lg w-10 py-4 px-3 focus-within:border-[rgb(252,123,146)] focus-within:outline-none placeholder:text-sm`} placeholder='1' name="time" id="time" value={time} disabled={inputValue.lifetime ? true : false} onChange={onChangeHandler} />
                                <p className="text-[#4B4B4B] text-sm">month</p>
                            </div>
                        </div>}
                    <div className="space-y-2 py-3 w-1/2">
                        <p className={`${poppins600.className} text-xl`}>What are some of perks you offer?</p>
                        {/* <p className={`${poppins400.className} text-xs text-[#C4C4C4] py-1`}>Let’s define some learning objectives for users.</p> */}
                        <div className="py-4">
                            <div className="flex justify-between w-full">
                                <p className={`${poppins400.className} text-[#000000]`}>Number of perks</p>
                                <div className="flex justify-end items-center gap-10">
                                    <div onClick={() => objectiveClickHandler('decrease')} className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer">
                                        <p className='-mt-[0px]'>-</p>
                                    </div>
                                    <p>{objectives}</p>
                                    <div onClick={() => objectiveClickHandler('increase')} className="w-6 h-6 border border-[#FC7B92] text-[#FC7B92] rounded-full flex justify-center items-center cursor-pointer">
                                        <p className='-mt-[0px]'>+</p>
                                    </div>
                                </div>
                            </div>
                            <p className={`${poppins400.className} text-xs text-[#C4C4C4] py-1`}>Note: the maximum amount of perks is 5.</p>
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
                    <div className="flex justify-between">
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
        </div>
    )
}

export default SubscriptionSettingsPage