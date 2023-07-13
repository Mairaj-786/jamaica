"use client"; // this is a client component
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const LoginMiddleware = ({ children }) => {
    const [token, setToken] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(token)
        if (!token) {
            router.push('/login')
        }else{
            
        }
    }, [])
    return (
        <div>{children}</div>
    )
}

export default LoginMiddleware