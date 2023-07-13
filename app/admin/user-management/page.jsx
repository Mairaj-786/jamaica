"use client"; // this is a client component

import AdminLayout from '@/Components/AdminLayout/AdminLayout'
import CustomTable from '@/Components/CustomTable/CustomTable'
import { baseUrl, fetcherToken } from '@/hooks/baseUrl';
import EventManagement from '@/pages/EventManagement/EventManagement'
import UserManagement from '@/pages/UserManagement/UserManagement'
import React, { useState } from 'react'
import useSWR from 'swr'


const page = () => {
    const [search, setSearch] = useState('')


    return (
        <AdminLayout setSearch={setSearch} children={<UserManagement search={search} />} />
    )
}

export default page