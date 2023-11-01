'use client'
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { reset, updateProfilePicture, updateProfileCover, updateCommunityInfo } from '@/redux/features/account/accountSlice'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
// import { usePathname, useRouter } from 'next/navigation'

const poppins400 = Poppins({
    weight: ["400"],
    subsets: ['latin']
})
const poppins600 = Poppins({
    weight: ["600"],
    subsets: ['latin']
})

const SettingsPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    // const currentRoute = usePathname()

    const { user, community, isUpdated, isCommunity, isError, message } = useSelector((state) => state.account)
    const creator = JSON.parse(localStorage.getItem('user'))
    const comm = creator.community
    //const userInfo = JSON.parse(creator.userInfo)

    const [profilePhoto, setProfilePhoto] = useState(creator.user.profilePicture)
    const [error, setError] = useState('')
    const [coverPhoto, setCoverPhoto] = useState(creator.user.profileCover)
    const [coverError, setCoverError] = useState('')
    const [inputValue, setInputValue] = useState({
        name: comm.communityName,
        self_introduction: comm.communityIntroduction,
        website: comm.communityURL
    })
    const initial = creator.user.username == null ? 'A': creator.user.username[0];

    useEffect(() => {
        if (isUpdated) {
            toast.success('Profile is successfully updated!')
            if(isCommunity){
                creator.community = community
            } else{
                creator.user = user
            }
            localStorage.setItem('user', JSON.stringify(creator))
            dispatch(reset())
            router.back()
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        }
    }, [isUpdated, router, dispatch, isError])

    const { name, self_introduction, website } = inputValue

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setInputValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const backButtonHandler = () => {
        router.back()
    }

    const handleProfileChange = (e) => {
        const selectedImage = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const imgFormData = new FormData()

        if (selectedImage && allowedTypes.includes(selectedImage.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
                setError('');
                imgFormData.append('imageFile', selectedImage)
                dispatch(updateProfilePicture(imgFormData));
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setProfilePhoto(null);
            setError('Please select a valid image (JPEG, PNG, or GIF).');
        }
    }

    const handleCoverChange = (e) => {
        const selectedImage = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const imgFormData = new FormData()

        if (selectedImage && allowedTypes.includes(selectedImage.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPhoto(reader.result);
                setCoverError('');
                imgFormData.append('imageFile', selectedImage)
                dispatch(updateProfileCover(imgFormData));
            };
            reader.readAsDataURL(selectedImage);
        } else {
            setCoverPhoto(null);
            setCoverError('Please select a valid image (JPEG, PNG, or GIF).');
        }
    }

    const completeHandler = () => {
        dispatch(updateCommunityInfo({ ...inputValue}))
        // router.back()
    }

    return (
        <div>
            <div className="flex justify-between items-center py-5">
                <button onClick={backButtonHandler} className='flex items-center gap-2'>
                    <Image width={10} height={10} src='/assets/icons/arrowLeft.svg' alt='arrow' className='w-3 h-3' />
                    <p className={`${poppins400.className}`}>Back</p>
                </button>
                <button onClick={completeHandler} className={`${poppins400.className} ext-white bg-[rgb(252,123,146)] hover:bg-[rgb(255,85,116)] py-2 px-6 transition-all rounded-full text-white`}>
                    Done
                </button>
            </div>
            <div className="w-[550px] space-y-12">
                <h1 className={`${poppins600.className} text-3xl`}>Basic Settings</h1>
                <div className="flex justify-between">
                    <div className='space-y-4'>
                        <p className={`${poppins600.className} text-2xl`}>Profile Photo</p>
                        {profilePhoto ?
                            <Image width={100} height={100} src={profilePhoto} alt="Selected" className="w-28 h-28 object-cover object-center rounded-full" /> :
                            (
                                <div className="w-28 h-28 object-cover object-center rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-5xl font-medium">
                                  {initial}
                                </div>
                              )}
                        {error && <p className='text-xs text-red-500'>{error}</p>}
                    </div>
                    <div className="">
                        <label htmlFor="imageInput" className="px-6 py-2 h-min rounded-full border border-[#C4C4C4] cursor-pointer">
                            Change Profile Picture
                        </label>
                        <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfileChange}
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className='space-y-4 w-full'>
                        <div className="flex justify-between items-center">
                            <p className={`${poppins600.className} text-2xl`}>Community Cover Photo</p>
                            <label htmlFor="coverImage" className="px-6 py-2 h-min rounded-full border border-[#C4C4C4] cursor-pointer">
                                Change Cover Picture
                            </label>
                            <input
                                id="coverImage"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleCoverChange}
                            />
                        </div>
                        <div className="">
                            {coverPhoto ?
                                <Image width={1000} height={1000} src={coverPhoto} alt="Selected" className="w-full h-72 object-cover object-center rounded-xl" /> :
                                <div className="w-full h-72 object-cover object-center rounded-xl bg-gray-100 flex items-center justify-center text-[#C4C4C4] text-xl font-semibold">
                                Stand out with an amazing cover photo 
                                </div>}
                            {coverError && <p className='text-xs text-red-500'>{coverError}</p>}
                        </div>
                    </div>

                </div>
                <div className="space-y-2">
                    <p className={`${poppins600.className} text-2xl`}>Community Name</p>
                    <input type="text" className={`${poppins400.className} text-[#4B4B4B] border border-[#E5E5E5] rounded-md w-full py-2 px-3 focus-within:border-[rgb(252,123,146)] focus-within:outline-none`} name="name" id="name" value={name} onChange={onChangeHandler} />
                </div>
                <div className="space-y-2">
                    <p className={`${poppins600.className} text-2xl`}>Community Bio</p>
                    <p className='w-full flex-shrink-0 text-[#C4C4C4] text-sm'>Ayo! Write something to make your course attractive.</p>
                    <textarea name="self_introduction" id="self_introduction" value={self_introduction} onChange={onChangeHandler} cols="30" rows="10" className={`${poppins400.className} text-[#4B4B4B] border border-[#E5E5E5] rounded-md w-full py-2 px-3 focus-within:border-[rgb(252,123,146)] focus-within:outline-none resize-none`}></textarea>
                </div>
                <div className="space-y-2">
                    <p className={`${poppins600.className} text-2xl`}>Website</p>
                    <input type="text" className={`${poppins400.className} text-[#4B4B4B] border border-[#E5E5E5] rounded-md w-full py-2 px-3 focus-within:border-[rgb(252,123,146)] focus-within:outline-none`} name="website" id="website" value={website} onChange={onChangeHandler} />
                </div>
            </div>
        </div>
    )
}

export default SettingsPage