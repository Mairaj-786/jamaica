"use client"; // this is a client component

import Footer from '@/Constants/Footer/Footer';
import Navbar from '@/Constants/Navbar/Navbar';
import ContactUs from '@/pages/ContactUs/ContactUs'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar />
            <ContactUs />
            <Footer />
        </div>
    )
}

export default page