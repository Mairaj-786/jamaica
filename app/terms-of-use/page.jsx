"use client"; // this is a client component

import Footer from '@/Constants/Footer/Footer';
import Navbar from '@/Constants/Navbar/Navbar';
import TermsUse from '@/pages/TermsUse/TermsUse'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <TermsUse />
        <Footer />
    </div>
  )
}

export default page