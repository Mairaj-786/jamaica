"use client"; // this is a client component

import AdminLayout from '@/Components/AdminLayout/AdminLayout'
import NewsManagement from '@/pages/NewsManagement/NewsManagement';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [search, setSearch] = useState('')
    const [user, setUser] = useState([])

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser) {
            setUser(currentUser)
        }
    }, [])

    return (
        <AdminLayout setSearch={setSearch} user={user} children={<NewsManagement search={search} />} />
    )
}

export default page