"use client"; // this is a client component

import 'bootstrap/dist/css/bootstrap.css'
import Navbar from '@/Constants/Navbar/Navbar'
import './globals.css'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
