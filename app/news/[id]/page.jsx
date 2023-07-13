"use client"; // this is a client component
import Footer from '@/Constants/Footer/Footer'
import Navbar from '@/Constants/Navbar/Navbar'
import SingleNews from '@/pages/SingleNews/SingleNews'
import React, { use } from 'react'


const News = () => {
    return (
        <div>
            <Navbar />
            <SingleNews />
            <Footer />
        </div>
    )
}

export default News