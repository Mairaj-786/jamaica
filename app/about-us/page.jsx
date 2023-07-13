"use client"; // this is a client component

import MyDrawer from '@/Components/MyDrawer/MyDrawer';
import Footer from '@/Constants/Footer/Footer'
import Navbar from '@/Constants/Navbar/Navbar'
import About from '@/pages/About/About'
import React, { useState } from 'react'

const page = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Navbar setOpen={setOpen} />
            <MyDrawer setOpen={setOpen} open={open} />
            <About />
            <Footer />
        </div>
    )
}

export default page