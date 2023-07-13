"use client"; // this is a client component

import AdminLayout from '@/Components/AdminLayout/AdminLayout'
import EventManagement from '@/pages/EventManagement/EventManagement'
import React, { useState } from 'react'

const page = () => {
    const [search, setSearch] = useState('')

    return (
        <AdminLayout setSearch={setSearch} children={<EventManagement search={search} />} />
    )
}

export default page