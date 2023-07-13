"use client"; // this is a client component
import useSWR from 'swr'
import MyDrawer from '@/Components/MyDrawer/MyDrawer'
import Footer from '@/Constants/Footer/Footer'
import Navbar from '@/Constants/Navbar/Navbar'
import Home from '@/pages/Home/Home'
import React, { use, useState } from 'react'
import Head from './head'
import { baseUrl, config } from '@/hooks/baseUrl';


// async function getEvents() {
//   const res = await fetch(`${baseUrl}/events/get-events`, config)
//   return res.json()
// }

const page = () => {
  const [open, setOpen] = useState(false)

  // ========================== Home api data begin================================//
  // const events = use(getEvents())
  // let approvedEvents = events?.filter((i) => i.status == 'Approved' && i.topevent == true)
  // console.log('admin', approvedEvents)

  // ========================== Home api data end================================//



  return (
    <div>
      <Head name="Jamaica Event" />
      <Navbar setOpen={setOpen}  />

      <MyDrawer setOpen={setOpen} open={open} />
      <Home  />
      <Footer />

    </div>
  )
}




export default page