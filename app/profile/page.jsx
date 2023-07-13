"use client"; // this is a client component

import LoginMiddleware from '@/Components/LoginMiddleware/LoginMiddleware'
import Profile from '@/pages/Profile/Profile'
import React, { useEffect, useState } from 'react'
const page = () => {
    const [user, setUser] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setUser(user)
        }
    }, [])
    return (
        <LoginMiddleware>
            <Profile user={user} />
        </LoginMiddleware>
    )
}

export default page