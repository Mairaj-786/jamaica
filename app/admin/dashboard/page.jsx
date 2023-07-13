"use client"; // this is a client component

import AdminLayout from '@/Components/AdminLayout/AdminLayout'
import { baseUrl, fetcherToken } from '@/hooks/baseUrl';
import Dashboard from '@/pages/Dashboard/Dashboard'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'


const Admin = () => {
    const { data, error, isLoading } = useSWR(`${baseUrl}/get-words`, fetcherToken)
    console.log('data', data)
    const [user, setUser] = useState([])

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser) {
            setUser(currentUser)
        }
    }, [])
    return (
        <AdminLayout children={<Dashboard user={user} allwords={data?.words} />} />
    )
}

export default Admin