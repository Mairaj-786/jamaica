"use client"; // this is a client component

import AdminLayout from '@/Components/AdminLayout/AdminLayout'
import AdminManagement from '@/pages/AdminManagement/AdminManagement'
import React, { useState } from 'react'

const page = () => {
    const [search, setSearch] = useState('')
    return (
        <AdminLayout setSearch={setSearch} children={<AdminManagement search={search} />} />
    )
}

export default page