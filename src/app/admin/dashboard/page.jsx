'use client'
import SIdebarHeader from '@/componenets/SIdebarHeader'
import SubscriptionPopup from '@/componenets/SubscriptionPopup'
import React, { useState } from 'react'

const DashboardPage = () => {
  const [sidebarPopup, setSidebarPopup] = useState(false)
  const toggleSidebarPopup = () => {
    setSidebarPopup(!sidebarPopup)
  }
  return (
    <div className='flex flex-col h-full'>
      <SIdebarHeader title="Dashboard" toggleSidebarPopup={toggleSidebarPopup} />
      
      <div className="flex-1 flex items-center justify-center">
        <p className='text-[#666666]'>Welcome to Dashboard</p>
      </div>
      <div className="absolute z-50">
        {sidebarPopup && <SubscriptionPopup onClose={toggleSidebarPopup} />}
      </div>
    </div>
  )
}

export default DashboardPage