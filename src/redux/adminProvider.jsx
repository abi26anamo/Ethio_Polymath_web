'use client'

import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

export function AdminProvider({ children }) {
    const router = useRouter()

    const { user } = useSelector((state) => state.auth)

    if (!user) router.push('/login')

    return <div>{children}</div>
}