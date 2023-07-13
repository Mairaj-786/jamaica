"use client"; // this is a client component

import AdminLayout from '@/Components/AdminLayout/AdminLayout'
import AdminSetting from '@/pages/AdminSetting/AdminSetting'
import React, { useEffect, useState } from 'react'

const Setting = () => {
    const [user, setUser] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setUser(user)
        }
    }, [])
    return (
        <AdminLayout children={<AdminSetting user={user} />} />
    )
}

export default Setting