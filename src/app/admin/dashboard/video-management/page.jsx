"use client"
import SIdebarHeader from '@/componenets/SIdebarHeader'
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image';
import DeletePopup from '@/componenets/DeletePopup';
import SubscriptionPopup from '@/componenets/SubscriptionPopup';
import DeleteHubPopup from '@/componenets/DeleteHubPopup';
import { FaTimes } from "react-icons/fa";
import Router from 'next/router';
import CreateUpcomingPopupPage from '@/componenets/CreateUpcomingPopup';
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getAllHubs, reset } from '@/redux/features/hub/hubSlice';
import { useSelector } from 'react-redux';
import { createUpcoming, deleteUpcoming, getUpcoming, resetUpcoming } from '@/redux/features/upcoming/upcomingSlice';
import { toast } from 'react-toastify';

const poppins600 = Poppins({
  weight: ["600"],
  subsets: ['latin']
})

const poppins400 = Poppins({
  weight: ["400"],
  subsets: ['latin']
})

const VideoManagementPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [sidebarPopup, setSidebarPopup] = useState(false)
  const [createUpcomingPopup, setCreateUpcomingPopup] = useState(false)
  const [deleteContentPopup, setContentDeletePopup] = useState(false)
  const [deleteHubPopup, setDeleteHubPopup] = useState(false)
  const [deleteContent, setDeleteContent] = useState(false)
  const [deleteHub, setDeleteHub] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [upcoming, setUpcoming] = useState([
    {
      id: 1,
      title: 'Financial 101',
      content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.'
    },
    {
      id: 2,
      title: 'Financial 102',
      content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.'
    }
  ])

  const [hub, setHub] = useState([
    {
      id: 1,
      title: 'Hub 01',
      content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
      rating: 5
    },
    {
      id: 2,
      title: 'Hub 02',
      content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
      rating: 4
    },
    {
      id: 3,
      title: 'Hub 03',
      content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
      rating: 0
    },
    {
      id: 4,
      title: 'Hub 04',
      content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
      rating: 3
    },
    {
      id: 5,
      title: 'Hub 05',
      content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
      rating: 5
    },
    {
      id: 6,
      title: 'Hub 06',
      content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
      rating: 1
    },
    {
      id: 7,
      title: 'Hub 07',
      content: 'This course provides an introduction to the principles and practices of computer programming. Students will learn how to design, implement, and test programs using a high-level programming language.',
      rating: 5
    }
  ])

  const { hubs } = useSelector((state) => state.hub)
  const { upcomings, isUpcomingCreated, isUpcomingDeleted, message } = useSelector((state) => state.upcoming)

  useEffect(() => {
    if (isUpcomingCreated) {
      toast.success('Upcoming created')
      setCreateUpcomingPopup(false)
      dispatch(resetUpcoming())
      dispatch(getUpcoming())
    } else if (isUpcomingDeleted) {
      toast.success(message)
      setContentDeletePopup(!deleteContentPopup)
      dispatch(resetUpcoming())
      dispatch(getUpcoming())
    }
    if (!hubs) dispatch(getAllHubs())
    if (!upcomings) dispatch(getUpcoming())
  }, [dispatch, hubs, upcomings, isUpcomingCreated, createUpcomingPopup, isUpcomingDeleted, message, deleteContentPopup])

  const contentDeleteHandler = (itemId) => {
    setContentDeletePopup(!deleteContentPopup)
    setDeleteContent(itemId)
  }

  const deleteContentHandler = (itemId) => {
    dispatch(deleteUpcoming(itemId))
    // const updatedItems = upcoming.filter((item) => item.id !== itemId);
    // setUpcoming(updatedItems)
    // setContentDeletePopup(!deleteContentPopup)
  }

  const hubDeleteHandler = (itemId) => {
    setDeleteHubPopup(!deleteHubPopup)
    setDeleteHub(itemId)
    // const updatedItems = hub.filter((item) => item.id !== itemId);
    // setHub(updatedItems)
  }
  const deleteHubHandler = (itemId) => {
    const updatedItems = hub.filter((item) => item.id !== itemId);
    setHub(updatedItems)
    setDeleteHubPopup(!deleteHubPopup)
  }

  const handleHover = (index) => {
    setHoveredIndex(index);
  }

  const toggleDeleteContentPopup = () => {
    setContentDeletePopup(!deleteContentPopup)
  }
  const toggleDeleteHubPopup = () => {
    setDeleteHubPopup(!deleteHubPopup)
  }

  const toggleSidebarPopup = () => {
    setSidebarPopup(!sidebarPopup)
  }

  const createUpcomingPopupHandler = () => {
    setCreateUpcomingPopup(!createUpcomingPopup)
  }

  const createNewUpcomingItem = (title, description) => {
    dispatch(createUpcoming({ title, description }))
    // const tempItems = [...upcoming]
    // const items = {
    //   id: uuidv4(),
    //   title,
    //   content: description
    // }
    // tempItems.push(items)
    // setUpcoming(tempItems)
    // setCreateUpcomingPopup(!createUpcomingPopup)
  }

  const singleHubClickHandler = (item) => {
    const name = item.title.trim().split(' ').join('_')
    router.push(`/admin/hub/settings/${item.id}`)
  }

  return (
    <div>
      <SIdebarHeader title="My Collection" toggleSidebarPopup={toggleSidebarPopup} />
      <div className="px-2 pb-4 space-y-2">
        <div className={`${upcoming.length < 1 && hub.length < 1 ? "flex flex-col justify-center items-center w-full h-96 text-[#C4C4C4] text-xl" : 'hidden'} ${poppins400.className}`}>
          <p>You don’t have any content now.</p>
          <p>Go upload some stuff.</p>
        </div>
        <div className={`${upcoming && upcoming.length > 0 ? '' : 'hidden'}`}>
          <div className="flex justify-between items-center pb-4">
            <p className={`${poppins600.className} text-lg 2xl:text-xl 3xl:text-2xl`}>Upcoming Content</p>
            <button onClick={createUpcomingPopupHandler} className="border rounded-full px-6 py-3 text-sm text-[#4B4B4B] hover:bg-[#2e2e2e] hover:text-white duration-200">Add Upcoming Content</button>
          </div>
          <div className="px-5 flex gap-3 flex-wrap">
            {upcomings && upcomings.length > 0 && upcomings.map((item, index) => (
              <div key={index} className="p-4 relative">
                <div className={`w-96 px-5 py-4 text-start space-y-2 ${poppins400.style} bg-[#FBFBFF] rounded-3xl`}>
                  <p className="flex gap-2 text-sm items-center text-[#9D8AFF] my-1">
                    <Image key={index} width={10} height={10} src="/assets/icons/verified.svg" alt="star" className='w-4 h-4' />
                    Coming Next Month
                  </p>
                  <p className={`${poppins600.className} text-[#4B4B4B] text-base`}>{item.title}</p>
                  <p className="text-[#C4C4C4] text-sm">{item.content}</p>
                </div>
                <button onClick={() => contentDeleteHandler(item.id)} className="absolute top-5 right-5 z-50 w-6 h-6 text-xs rounded-full flex items-center justify-center shadow-[_0px_0px_5px_0px_rgba(0,0,0,0.16)] bg-white font-bold">X</button>
              </div>
            ))}
          </div>
        </div>

        <div className={`${hubs && hubs.length > 0 ? '' : 'hidden'}`}>
          <div className="flex justify-between items-center py-4">
            <p className={`${poppins600.className} text-lg 2xl:text-xl 3xl:text-2xl`}>Hub Management</p>
          </div>
          <div className="px-5 flex gap-3 flex-wrap">
            {hubs && hubs.length > 0 && hubs.map((item, index) => (
              <div
                key={index}
                className={`p-4 relative h-auto`}
              >
                <div onMouseEnter={() => handleHover(index)}
                  onMouseLeave={() => handleHover(-1)}
                  onClick={() => singleHubClickHandler(item)}
                  className={`${hoveredIndex === index ? "bg-gradient-to-b from-[#FC7B92] to-[#694BFF]" : ''} p-[1px] cursor-pointer rounded-3xl`}>
                  <div className={`w-72 pb-2 text-start space-y-2 rounded-3xl overflow-hidden bg-white ${
                        hoveredIndex === index ? "" : "border"
                      }`}>
                        
                    <div className="w-full h-60 relative" style={{ backgroundImage: item.coverImage != "" ? `url(${item.coverImage})` : 'none',backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: 'bg-[#F9F9F9]' }}>
                      {/* Conditionally render the delete button based on the hoveredIndex */}
                      {hoveredIndex === index && (
                        <button
                          id='delete-button'
                          onClick={(event) => {
                            event.stopPropagation(); // Prevent click event from propagating
                            hubDeleteHandler(item.id);
                          }}
                          className="absolute top-2 right-2 z-50 w-8 h-8 rounded-full flex items-center justify-center shadow-[_0px_0px_10px_0px_rgba(0,0,0,0.16)] bg-white font-bold"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                    <p className="px-6 pt-2 text-black text-xl font-semibold">{item.title}</p>
                    <p className="text-[#C4C4C4] text-sm px-6 line-clamp-4">{item.introduction}</p>
                    <div className="flex gap-2 px-6 py-4">
                      {item.rating < 1 ? <div className="h-4 w-full text-xs text-gray-600">No review</div> : ''}
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <Image key={index} width={8} height={8} src="/assets/icons/star.svg" alt="star" className='w-3 h-3' />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >
      <div className="absolute z-50">
        {deleteContentPopup && <DeletePopup onClose={toggleDeleteContentPopup} deleteHandler={deleteContentHandler} deleteContent={deleteContent} title="Upcoming Content" />}
        {deleteHubPopup && <DeleteHubPopup onClose={toggleDeleteHubPopup} deleteHubHandler={deleteHubHandler} deleteHub={deleteHub} />}
        {sidebarPopup && <SubscriptionPopup onClose={toggleSidebarPopup} />}
        {createUpcomingPopup && <CreateUpcomingPopupPage onClose={createUpcomingPopupHandler} onCreate={createNewUpcomingItem} length={upcoming.length} />}
      </div>
    </div >
  )
}

export default VideoManagementPage