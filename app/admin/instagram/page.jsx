"use client"; // this is a client component

import AdminLayout from '@/Components/AdminLayout/AdminLayout'
import Instagram from '@/pages/Instagram/Instagram';
import React, { useState } from 'react'

const page = () => {
  const [search, setSearch] = useState('')
  return (
    <AdminLayout setSearch={setSearch} children={<Instagram search={search} />} />
  )
}

export default page