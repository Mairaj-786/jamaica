"use client"; // this is a client component

import AdminLayout from '@/Components/AdminLayout/AdminLayout'
import MediaText from '@/pages/MediaText/MediaText'
import React, { useState } from 'react'

const page = () => {
  const [search, setSearch] = useState('')
  return (
    <AdminLayout setSearch={setSearch} children={<MediaText search={search} />} />
  )
}

export default page