import Link from 'next/link'
import React from 'react'

const Steps = ({ activeStep, onStepClick }) => {
  const steps = [
    {
      num: "1",
      href: "/admin/dashboard/content-assistant/create/hub-title-creation"
    },
    {
      num: "2",
      href: "/admin/dashboard/content-assistant/create/hub-episode-creation"
    },
    {
      num: "3",
      href: "/admin/dashboard/content-assistant/create/hub-general-information"
    },
    {
      num: "4",
      href: "/admin/dashboard/content-assistant/create/hub-cover-image"
    }
  ]

  return (
    <div className='flex justify-center gap-4'>
      {steps.map((step) => (
        <Link href={step.href} key={step.num}>
          <div
            onClick={() => {
              onStepClick(step.num)
            }}
            className={`h-10 w-10 rounded-full ${step.num === activeStep ? 'bg-[rgb(255,85,116)] text-white' : 'bg-[rgb(249,249,249)] text-black'} hover:bg-[rgb(255,85,116)]  flex items-center justify-center cursor-pointer`}
          >
            {step.num}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Steps
