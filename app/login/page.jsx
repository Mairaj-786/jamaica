"use client"; // this is a client component

import LoginMiddleware from '@/Components/LoginMiddleware/LoginMiddleware';
import Login from '@/pages/Login/Login'
import React from 'react'

function testing() {
    const iframeSrc = process.env.MAIAJRA; // Replace with your desired source URL

    return iframeSrc
}

const page = () => {

    const test = testing()
    return (
        // <Login />
        <div>
            <div dangerouslySetInnerHTML={{ __html: `<iframe src="${test}" frameborder="0"></iframe>` }} />
        </div>
    )
}

export default page