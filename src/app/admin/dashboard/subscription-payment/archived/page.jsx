'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteArchivedList, getArchivedList, reset } from '@/redux/features/subscription/subscriptionSlice'
import { toast } from 'react-toastify'
import Header from "@/componenets/Header";
import { FaAngleLeft } from "react-icons/fa";

const poppins400 = Poppins({
    weight: ["400"],
    subsets: ['latin']
})

const poppins600 = Poppins({
    weight: ["600"],
    subsets: ['latin']
})

const lists = [
    {
        title: '1 Month Premium Subscription',
        text: 'every month',
        price: '88'
    },
    {
        title: '6 Month Premium Subscription',
        text: 'every 6 month',
        price: '480'
    },
    {
        title: '1 year Premium Subscription',
        text: 'every month',
        price: '800'
    },
    {
        title: 'Lifetime Premium Subscription',
        text: 'lifetime',
        price: '1888'
    }
]

const ArchivedPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [unarchiveList, setUnarchiveList] = useState()

    const { archiveList, isArchiveDeleted, isError, message } = useSelector((state) => state.subscription)

    useEffect(() => {
        if (isArchiveDeleted) {
            toast.success(message)
            dispatch(reset())
            dispatch(getArchivedList())
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        }
        dispatch(getArchivedList())
    }, [dispatch, isArchiveDeleted, isError, message])

    const unarchiveHandler = (item) => {
        // const tempItems = [...unarchiveList]
        // const res = tempItems.filter(i => i.price !== item.price)

        // setUnarchiveList(res)
        dispatch(deleteArchivedList(item))
    }

    const onBackClickHandler = () => {
        router.back()
    }

    const completeHandler = () => {
        router.back()
    }

    const homepageClickHandler = () => {
      if (window.confirm("Do you want to exit?")) {
        router.push("/admin/dashboard");
      } else {
        console.log("CANCELED");
      }
    };

    return (
        <div className="fixed h-full inset-0 bg-white overflow-y-auto">
          <button onClick={homepageClickHandler}>
            <Header />
          </button>
            <div className={`${poppins400.className} w-full h-full pt-20 flex flex-col items-center justify-between`}>
                <div className="w-1/2 space-y-6">
                    <h1 className={`${poppins600.className} text-3xl text-center`}>Archived</h1>
                    {archiveList && archiveList.map(list => (
                        <div key={list.price} className="flex justify-between items-center border rounded-3xl px-6 py-8">
                            <p className="text-sm">{list.title}</p>
                            <div className="flex gap-5 items-center">
                                <p className='flex items-center gap-2'><span className='text-xl'>${list.price}</span> <span className="text-[#4B4B4B] text-sm">{list.text}</span></p>
                                <button onClick={() => unarchiveHandler(list)} className="border border-white text-sm rounded-full px-4 py-2 text-[#4B4B4B] hover:text-[#FE6E6E] duration-200">Unarchived</button>
                            </div>
                        </div>
                    ))}
                    <div className="w-full flex justify-between py-20">
                        <button
                            onClick={onBackClickHandler}
                            className="px-6 border rounded-full py-4 flex justify-center gap-2 items-center text-sm hover:bg-[#2e2e2e] hover:text-white w-min duration-200"><FaAngleLeft /> Back</button>
                        <button
                            onClick={completeHandler}
                            className={`${poppins400.className} text-white text-sm bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] py-4 px-6 transition-all rounded-full duration-200`}>
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArchivedPage