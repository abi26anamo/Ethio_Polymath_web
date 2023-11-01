"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import Dropzone from '@/componenets/Dropzone'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createHub, reset } from '@/redux/features/hub/hubSlice'
import ClosePopup from '@/componenets/ClosePopup'
import { Steps } from '@/componenets'
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


const HubCoverImagePage = () => {
  const router = useRouter()
    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = useState("4");

    const handleStepClick = (stepNum) => {
        const data = {
            ...sessionData,
            file
        }
        sessionStorage.setItem('data', JSON.stringify(data))
      setActiveStep(stepNum);
    };

    const sessionData = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')) : null
    const [closeMessage, setCloseMessage] = useState(false)

    const [file, setFile] = useState(sessionData ? sessionData?.file : null)

    const [error, setError] = useState(null)
    const [fileError, setFileError] = useState('')
    const [categoryError, setCategoryError] = useState('')

    const { isHubCreated, message, isError } = useSelector((state) => state.hub)

    const [objectiveValues, setObjectiveValues] = useState(sessionData ? sessionData?.objectiveValues : [])
    const [learningObjective, setLearningObjective] = useState(sessionData ? sessionData?.learningObjective : [])
   
    useEffect(() => {
        if (isHubCreated) {
          sessionStorage.clear();
          toast.success(message);
          dispatch(reset());
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } else if (isError) {
          toast.error(message);
        dispatch(reset());
        }
      
      
        if (file) {
          setFileError('');
        }
      }, [file, isHubCreated, message, router, isError, dispatch, sessionData]);
      

    const toogleCloseMessage = () => {
        setCloseMessage(!closeMessage)
    }      

    const completeHandler = () => {
        const data = {
            ...sessionData,
            file
        }
        sessionStorage.setItem('data', JSON.stringify(data))
        router.push('/admin/dashboard/video-management')
    }

    const onBackClickHandler = () => {
        const data = {
            ...sessionData,
            file
        }
        sessionStorage.setItem('data', JSON.stringify(data))
        router.push('/admin/dashboard/content-assistant/create/hub-general-information')
    }

    const submitHandler = () => {

        var title = sessionData.title;
        var description = sessionData.description;
        var selectedCategory = sessionData.selectedCategory;
        var learnings = sessionData.learnings;
        var objectives = sessionData.objectives;
        
        const hasEmptyTitleObj = learningObjective.some(objective => !objective.title);
        const hasEmptyTitle = objectiveValues.some(objective => !objective.title);
        const hasEmptyThumbnail = objectiveValues.some(objective => !objective.thumbnail);
        const hasEmptyVideo = objectiveValues.some(objective => !objective.videoValues.videoURL);

        if (hasEmptyTitleObj) {
            const updatedLearningObjectives = learningObjective.map((objective, index) => ({
                ...objective,
                titleError: objective.title ? '' : 'Title is required.'
            }));
            setLearningObjective(updatedLearningObjectives);
        }

        if (hasEmptyTitle || hasEmptyThumbnail || hasEmptyVideo) {
            const updatedObjectives = objectiveValues.map((objective, index) => ({
                ...objective,
                titleError: objective.title ? '' : 'Title is required.',
                thumbnailError: objective.thumbnail ? '' : 'Thumbnail is required.',
                videoError: objective.videoValues.videoURL ? '' : 'Video is required.'
            }));
            setObjectiveValues(updatedObjectives);
        }  
        
        if (title===null) {
            setError(prev => ({
                ...prev,
                title: true
            }));
        }
        if (description === null) {
            setError(prev => ({
                ...prev,
                description: true
            }));
        }
        if (!selectedCategory) {
            setCategoryError('Please select a category');
        }

        if (!file) {
            setFileError('Please select a file');
        }
        if (
            !hasEmptyTitleObj &&
            !(hasEmptyTitle || hasEmptyThumbnail || hasEmptyVideo) &&
            title.length >= 1 &&
            description.length >= 1 &&
            selectedCategory &&
            file
        ) {
            const data = {
                title,
                objectives,
                objectiveValues,
                description,
                learnings,
                learningObjective,
                selectedCategory,
                file
            }
            dispatch(createHub(data))
           
        } else {
            toast.error('Please fill all the fields')
        }
    }
    const saveHandler = () => {
        setCloseMessage(!closeMessage)
    }
  return (
    <div className={`fixed overflow-y-auto inset-0 bg-white ${poppins400.className}`}>
            <div className="flex justify-between items-center">
                <button onClick={saveHandler}>
                    <Header />
                </button>
                <button onClick={saveHandler} className={`${poppins400.className} text-xs hover:bg-[#2e2e2e] hover:text-white border py-3 px-6 mx-4 mt-2 transition-all rounded-full duration-200`}>
                    Save and Exit
                </button>
            </div>
          <div className="min-h-[90vh] flex justify-center pb-12">
          <div className="flex flex-col justify-end items-end w-[450px]">
                    <button onClick={onBackClickHandler} className="px-6 border rounded-full py-4 flex justify-center gap-2 items-center text-sm hover:bg-[#2e2e2e] hover:text-white w-min duration-200"><FaAngleLeft /> Back</button>
          </div>

          <div className="w-1/2 flex flex-col justify-between items-center">
            <div className="space-y-0 pt-10 max-w-6xl pb-20 w-3/4 mx-auto">
                            <p className={`${poppins600.className} text-xl`}>Upload cover photo for your new Hub</p>
                            <p className={`${poppins400.className} w-full flex-shrink-0 text-[#C4C4C4] text-sm pb-2`}>Most importantly. Don’t forget about the cover photo.</p>
                            <Dropzone file={file} setFile={setFile} className={`${poppins400.className} text-sm border border-[#E5E5E5] w-full h-96 flex flex-col items-center justify-center rounded-3xl`} />
                            {fileError && <p className='text-xs text-red-500'>Please choose a cover</p>}
                  </div>
                  <Steps activeStep={activeStep} onStepClick={handleStepClick} />
           

          </div>
          <div className="flex flex-col px-3 w-[450px] justify-end ">

            <button onClick={submitHandler} className="px-8 w-max border rounded-full py-4 flex justify-center gap-2 items-center text-sm bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] text-white duration-200">Publish</button>
            </div>
        </div>
        {closeMessage && <ClosePopup onClose={toogleCloseMessage} onSubmit={completeHandler} />}

    </div>
  );
};

export default HubCoverImagePage;     