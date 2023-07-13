"use client"; // this is a client component

import MyDrawer from '@/Components/MyDrawer/MyDrawer';
import Footer from '@/Constants/Footer/Footer'
import Navbar from '@/Constants/Navbar/Navbar'
import { baseUrl, config } from '@/hooks/baseUrl';
import Entertainment from '@/pages/Entertainment/Entertainment'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import Head from '../head'


const page = () => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [allEvents, setAllEvents] = useState([])

    const searchParams = useSearchParams()
    let tempdata = searchParams.get('name')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(10000000)
    const [days, setDays] = useState([])
    console.log('days', days)

    const data = {
        "category": [tempdata],
        "minprice": minPrice,
        "maxprice": maxPrice,
    }
    const dataWeekMonth = {
        "category": [tempdata],
        "minprice": minPrice,
        "maxprice": maxPrice,
        "date": days
    }

    useEffect(() => {
        setLoading(true)
        const getEvents = async () => {
            try {
                const res = await axios.post(`${baseUrl}/events/get-approved-events`, days.length > 0 ? dataWeekMonth : data, config)
                setAllEvents(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log({ error })
            }
        }
        getEvents()
    }, [tempdata, minPrice, maxPrice, days])
    return (
        <div>
            <Head name="Jamaica Event--Entertainment" />
            <Navbar setOpen={setOpen} />
            <MyDrawer setOpen={setOpen} open={open} />
            <Entertainment events={allEvents} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} days={days} setDays={setDays} loading={loading} />
            <Footer />
        </div>
    )
}

export default page