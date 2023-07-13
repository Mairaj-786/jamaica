"use client"; // this is a client component

import React, { useEffect, useState } from 'react'
import style from './adminlayout.module.css'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import { Avatar } from 'antd';
import AdminMiddleware from '../LoginMiddleware/AdminMiddleware';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import AdminDrawer from '../AdminDrawer/AdminDrawer';
import Image from 'next/image';


const AdminLayout = ({ children, setSearch }) => {
  const router = useRouter()
  const [toggle, setToggle] = useState(false)
  const [open, setOpen] = useState(false)
  const pathName = usePathname()


  const [user, setUser] = useState([])

  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('user'))
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])


  const navItems = [
    {
      id: 1,
      title: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      id: 2,
      title: 'Event Management',
      path: '/admin/event-management'
    },
    {
      id: 3,
      title: 'User Management',
      path: '/admin/user-management'
    },
    {
      id: 5,
      title: 'Admin Management',
      path: '/admin/management'
    },
    {
      id: 7,
      title: 'Media and Text',
      path: '/admin/media-and-text'
    },
    {
      id: 9,
      title: 'Instagram Posts',
      path: '/admin/instagram'
    },
    {
      id: 8,
      title: 'News Management',
      path: '/admin/news'
    },
    {
      id: 4,
      title: 'Settings',
      path: '/admin/settings'
    },
    {
      id: 6,
      title: 'Logout',
      path: '/login'
    },
  ]
  const navItemsForSubAdmin = [
    {
      id: 1,
      title: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      id: 2,
      title: 'Event Management',
      path: '/admin/event-management'
    },
    {
      id: 3,
      title: 'User Management',
      path: '/admin/user-management'
    },
    {
      id: 7,
      title: 'Media and Text',
      path: '/admin/media-and-text'
    },
    {
      id: 8,
      title: 'News Management',
      path: '/admin/news'
    },
    {
      id: 4,
      title: 'Settings',
      path: '/admin/settings'
    },
    {
      id: 6,
      title: 'Logout',
      path: '/login'
    },
  ]



  return (
    <AdminMiddleware>
      <AdminDrawer setOpen={setOpen} open={open} user={user} />
      <div className={style.dashboard}>
        <div className={style.sidebar}>
          <div className={style.sidebarWrapper}>
            <Link href={'/'} className={style.sidebarLogo} role="button">
              <img src="/images/colo-logo.png" alt="" />
            </Link>
            <div className={style.sidebarLinks}>
              {
                user?.role == 'ADMIN' ? navItems.map((i, index) => (
                  <li onClick={() => router.push(i?.path)} key={index} className={i.path == pathName ? style.active : ''}>
                    <Link href={`${i.path}`} style={{ color: i.id == 6 && 'red' }} onClick={() => {
                      if (i.id === 6) {
                        localStorage.removeItem('user')
                        localStorage.removeItem('token')
                      }
                    }}>{i.title}</Link>
                  </li>
                )
                )
                  :
                  navItemsForSubAdmin.map((i, index) => (
                    <li onClick={() => router.push(i?.path)} key={index} className={i.path == pathName ? style.active : ''}>
                      <Link href={`${i.path}`} style={{ color: i.id == 6 && 'red' }} onClick={() => {
                        if (i.id === 6) {
                          localStorage.removeItem('user')
                          localStorage.removeItem('token')
                        }
                      }}>{i.title}</Link>
                    </li>
                  )
                  )
              }
            </div>
          </div>
        </div>
        <div className={style.main}>
          <div className="row">
            <div className="col-lg-12">
              <div className={style.header}>
                <div className={style.headerLeft}>
                  <input type="text" className={style.search} placeholder="Type to search." onChange={(e) => setSearch(e.target.value)} />
                  <div className={style.mobileNav}>
                    {
                      toggle
                        ?
                        <input type="text" className={style.searchMobile} placeholder="Type to search ..." onChange={(e) => setSearch(e.target.value)} />
                        :
                        <img src="/images/Logo.png" alt="" className={style.headerLeftLogo} />
                    }
                  </div>
                  <div className={style.headerLefticon}>
                    {
                      toggle
                        ?
                        <AiOutlineClose className='role-button' color='#fff' fontSize={18} onClick={() => {
                          setToggle(false)
                        }} />
                        :
                        <img src='/icons/search.png' className={style.searchicon} onClick={() => {
                          setToggle(true)
                        }} />
                    }
                  </div>
                </div>
                <GiHamburgerMenu color='#fff' className={style.ham} onClick={() => setOpen(true)} />
                <div className={style.headerRight}>
                  <img
                    src={user?.profile_image}
                    alt="Picture of the author"
                  />

                  {/* <Avatar style={{ width: 50, height: 50, objectFit: 'cover' }} src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iS8pcZQodP8Y/v1/1200x-1.jpg" /> */}
                </div>
              </div>
            </div>
            <div className={`col-lg-11 m-auto mt-4 ${style.mainContent}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </AdminMiddleware>
  )
}

export default AdminLayout