"use client"; // this is a client component

import Footer from '@/Constants/Footer/Footer';
import Navbar from '@/Constants/Navbar/Navbar';
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy'
import React from 'react'

const Privary = () => {
    return (
        <div>
            <Navbar />
            <PrivacyPolicy />
            <Footer />
        </div>
    )
}

export default Privary