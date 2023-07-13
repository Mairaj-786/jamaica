"use client"; // this is a client component

import React, { use, useEffect, useState } from 'react'
import Footer from '@/Constants/Footer/Footer'
import { baseUrl, config } from '@/hooks/baseUrl';
import SingleEvent from '@/pages/SingleEvent/SingleEvent'
import { usePathname } from 'next/navigation';
import { getSingleEvents } from '@/hooks/events';
import Navbar from '@/Constants/Navbar/Navbar';
import MyDrawer from '@/Components/MyDrawer/MyDrawer';

// async function getSingleEvent() {
//     const path = usePathname()
//     const id = path.slice(7, 100)
//     const res = await fetch(`${baseUrl}/events/get-event/${id}`, config)
//     return res.json()
// }
// async function getReviews() {
//     const path = usePathname()
//     const id = path.slice(7, 100)
//     const res = await fetch(`${baseUrl}/events/get-reviews-of-event`, {
//         method: 'post',
//         headers: {
//             'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaHNpbjFAbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjoiNjNlMjJlZTFlZTg2ZmEyZDMwNjU4ZGM0IiwiaWF0IjoxNjc1NzkxMTkzfQ.VK_NSeq6DGFjXFPZjzpkb5cX3_VLDCadkb04HllrTps',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "event": id
//         })
//     });
//     return res.json()
// }


const page = () => {
    const [open, setOpen] = useState(false)
    const path = usePathname()
    const id = path.slice(7, 100)
    // const event = use(getSingleEvent())

    const [data, setData] = useState([])
    const [isloading, setIsLoading] = useState(false);


    useEffect(() => {
        const getSingle = async () => {
            let succes = await getSingleEvents(id, setIsLoading)
            if (succes) {
                setData(succes)
            }
        }
        getSingle()

    }, [])

    return (
        <div>
            <Navbar setOpen={setOpen} />
            <MyDrawer setOpen={setOpen} open={open} />
            <SingleEvent event={data} isloading={isloading} />
            <Footer />
        </div>
    )
}

export default page