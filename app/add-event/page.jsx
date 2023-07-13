"use client"; // this is a client component

import LoginMiddleware from '@/Components/LoginMiddleware/LoginMiddleware';
import Footer from '@/Constants/Footer/Footer';
import Navbar from '@/Constants/Navbar/Navbar';
import AddEvent from '@/pages/AddEvent/AddEvent'
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
        <div>
            <LoginMiddleware>
                <Navbar />
                <AddEvent user={user} />
                <Footer />
            </LoginMiddleware>
        </div>
    )
}

export default page