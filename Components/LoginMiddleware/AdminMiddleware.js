"use client"; // this is a client component
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AdminMiddleware = ({ children }) => {
    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log('mairajas', user)
        if (!user) {
            router.push('/')
        } else if (user?.role == "USER") {
            router.push('/')
        }
    }, [])
    return (
        <div>{children}</div>
    )
}

export default AdminMiddleware