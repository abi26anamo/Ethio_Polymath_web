import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Poppins } from 'next/font/google'
import { toast } from 'react-toastify'

const poppins400 = Poppins({
    weight: ["400"],
    subsets: ['latin']
})

const poppins600 = Poppins({
    weight: ["600"],
    subsets: ['latin']
})

const Dropzone = ({ className, file, setFile }) => {
    const [rejected, setRejected] = useState(null)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        const acceptedType = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif']
        if (acceptedFiles?.length) {
            const acceptedFile = acceptedFiles[0]
            if (acceptedType.includes(acceptedFile.type)) {
                setFile(Object.assign(acceptedFile, { preview: URL.createObjectURL(acceptedFile) }))
                setRejected(null)
            } else {
                toast.error('File not supported')
                setRejected('File not supported')
                setFile(null)
            }
        }

        if (rejectedFiles?.length) {
            console.log('File not supported')
            // setRejected('File not supported')
        }
    }, [setFile])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop
    })

    useEffect(() => {
        // Revoke the data uri to avoid memory leaks
        return () => file && URL.revokeObjectURL(file.preview)
    }, [file])

    const removeFile = () => {
        setFile(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Handle the file submission here if needed.
    }

    return (
        <form onSubmit={handleSubmit}>
            <div
                {...getRootProps({
                    className: className
                })}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-4 cursor-pointer">
                    {isDragActive ? (
                        <p>Drop the file here ...</p>
                    ) : (
                        <div className="space-y-4 flex flex-col items-center">
                            <button className="flex gap-2 text-xs border border-[#E5E5E5] hover:bg-[#2e2e2e] hover:text-white w-full py-4 px-8 justify-center items-center rounded-xl duration-200"><Image src='/assets/icons/upload.svg' width={100} height={100} alt='upload' className='w-4 h-4' /> Upload</button>
                            <p className={`${poppins400.className} text-sm`}>Drag & drop here</p>
                        </div>
                    )}
                </div>
            </div>
            {file &&
                <section className="mt-10">
                  <div className="flex gap-4">{/* Display buttons if needed */}</div>
                    <ul className="mt-6 grid grid-cols-1 gap-10">
                        {file && (
                            <li key={file.name} className="relative h-32 rounded-md shadow-lg">
                                <Image
                                    src={file.preview}
                                    alt={file.name}
                                    width={100}
                                    height={100}
                                    onLoad={() => {
                                        URL.revokeObjectURL(file.preview)
                                    }}
                                    className="h-full w-full object-contain rounded-md"
                                />
                                <button
                                    type='button'
                                    className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                                    onClick={removeFile}
                                >
                                    X
                                </button>
                                <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                                    {file.name}
                                </p>
                            </li>
                        )}
                    </ul>
                </section>}
        </form>
    )
}

export default Dropzone