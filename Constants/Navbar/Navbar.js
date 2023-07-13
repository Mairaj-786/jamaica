"use client"; // this is a client component

import React, { use, useEffect, useState } from 'react'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { AiOutlineClose } from 'react-icons/ai'
import { Dropdown, Space } from 'antd';
import style from './navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { doLogOut } from '@/hooks/user';
import useSWR from 'swr'
import { baseUrl, config, fetcherToken } from '@/hooks/baseUrl';


const Navbar = (props) => {
    const { data, error, isLoading } = useSWR(`${baseUrl}/events/get-events`, fetcherToken)
    let events = data?.filter((i) => i.status == 'Approved' && i.topevent == true)
    const [filterValue, setFilterValue] = useState('')
    const [user, setUser] = useState([])
    const router = useRouter();
    const [search, setSearch] = useState(false)
    const [fixed, Setfixed] = useState(0);

    // ==================== Navbar items arr===============================
    const navItems = [
        {
            id: 'Entertainment',
            title: 'Entertainment'
        },
        {
            id: 'Sports',
            title: 'Sports'
        },
        {
            id: 'Shopping',
            title: 'Shopping'
        },
        {
            id: 'Conference',
            title: 'Conferences'
        },
        {
            id: 'HealthandWellness',
            title: 'Health & Wellness'
        },
        {
            id: 'Food',
            title: 'Food'
        },
    ]

    // ==================== User Dropdown items===============================
    const items = [
        {
            label:
                <div>
                    <b className='text-capitalize'>{user?.firstname}</b>
                </div>,
            key: '1',
        },
        {
            label: <b style={{ opacity: .7 }}>{user?.email}</b>,
            key: '2',
        },
        {
            label: <Link href={'/admin/dashboard'}>{user?.role == 'ADMIN' ? 'Admin Dashboard' : user?.role == 'SUBADMIN' ? 'Admin Dashboard' : ''}</Link>,
            key: '4',
        },
        {
            label: <Link href={'/profile'}>Profile</Link>,
            key: '3',
        },
        {
            type: 'divider',
        },
        {
            label: <label style={{ width: '170px', cursor: 'pointer' }} onClick={() => doLogout()}>Logout</label>,
            key: '5',
        },
    ];
    // ==================== get navbar background on scroll begin ===================================//
    useEffect(() => {
        window.addEventListener('scroll', handlescroll)
    }, [])

    const handlescroll = () => {
        if (window.scrollY > 200) {
            Setfixed(true)
        } else {
            Setfixed(false)
        }
    }
    // ==================== get navbar background on scroll end ===================================//

    // ==================== get current logged in user in state begin ===================================//
    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser) {
            setUser(currentUser)
        }
    }, [])
    // ==================== get current logged in user in state end ===================================//

    // ==================== User LoggedOut begin===================================//
    const doLogout = () => {
        doLogOut(router)
    }
    // ==================== User LoggedOut end===================================//


    // ==================== get screen size ===================================//
    const [windowSize, setWindowSize] = useState("");
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [windowSize]);

    return (
        <div className={style.navbar} style={{ background: fixed ? '#fff' : '#000' }}>
            <div className={style.navbarWrapper}>
                <div className={style.hambar} onClick={() => props.setOpen(true)}>
                    <img src='/icons/align-right.png' />
                </div>
                <div className={fixed ? style.navbarWrapperLeftContainerFixed : style.navbarWrapperLeftContainer}>
                    <Link href={'/'}>
                        <div className={style.logo}>
                            {
                                windowSize?.innerWidth > 990
                                    ?
                                    fixed
                                        ?
                                        <img src='/images/fixedLogo.png' />
                                        :
                                        <img src='/images/Logo.png' />
                                    :
                                    <img src='/images/Logo.png' />

                            }
                        </div>
                    </Link>
                    {
                        !search
                        &&
                        <>
                            {
                                navItems.map((i, index) => (
                                    <li key={index}>
                                        <Link href={`/category?name=${i.id}`}>{i.title}</Link>
                                    </li>
                                ))
                            }
                        </>
                    }
                </div>
                {
                    search
                    &&
                    <div className={style.searchInput}>
                        <input placeholder='Type to search events.' className='form-control w-100' onChange={(e) => setFilterValue(e.target.value)} />
                        <div className={style.searchInputClose} onClick={() => setSearch(false)}>
                            <AiOutlineClose size={22} />
                        </div>
                        {/* ******************************************* Search data begin ******************************* */}
                        {
                            filterValue

                            &&
                            <div className={style.searchedEvents}>
                                <div className='row'>
                                    {
                                        events?.filter((value) => {
                                            if (filterValue == "") {
                                                return value;
                                            } else if (
                                                value?.name.toLowerCase().includes(filterValue?.toLowerCase())
                                            ) {
                                                return value;
                                            }
                                        })?.map((i, index) => (
                                            <div className='col-md-12' key={index}>
                                                <div className={style.searchedEventsItem} onClick={() => {
                                                    router.push(`event/${i._id}`)
                                                }}>
                                                    <img src={i?.eventImage} />
                                                    <b>{i?.name}</b>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                        {/* ******************************************* Search data end ******************************* */}

                    </div>
                }
                <div className={style.navbarWrapperRightContainer}>
                    {
                        search
                            ?
                            ''
                            :
                            !fixed
                                ?
                                <img src='/icons/search.png' className={style.search} onClick={() => setSearch(true)} />
                                :
                                <img src='/icons/searchFixed.png' className={style.search} onClick={() => setSearch(true)} />
                    }
                    {
                        user._id ?
                            <>
                                <CustomButton onClick={() => router.push('/add-event')} btnStyle={{ background: '#DF9411', marginLeft: search && 49 }} title="Submit Event" icon={<img src='/icons/submit.png' style={{ width: 25, height: 25, objectFit: 'contain' }} />} />
                                <Dropdown
                                    style={{ background: 'red' }}
                                    menu={{
                                        items,
                                    }}
                                    trigger={['click']}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <img src={user?.profile_image ? user?.profile_image : 'https://gcavocats.ca/wp-content/uploads/2018/09/man-avatar-icon-flat-vector-19152370-1.jpg'} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 100, cursor: 'pointer' }} />
                                        </Space>
                                    </a>
                                </Dropdown>
                                {/* <CustomButton  btnStyle={{ background: '#B8136A', marginLeft: search && 35, width: 80, textAlign: 'center' }} title="Logout" /> */}
                            </>
                            :
                            <>
                                <CustomButton onClick={() => router.push('/login')} btnStyle={{ background: '#B8136A', marginLeft: search && 35, width: 80, textAlign: 'center' }} title="Login" />

                                <CustomButton onClick={() => router.push('/add-event')} btnStyle={{ background: '#DF9411' }} title="Submit Event" icon={<img src='/icons/submit.png' style={{ width: 25, height: 25, objectFit: 'contain' }} />} />
                            </>
                    }
                </div>
                {
                    !search
                    &&
                    <img src='/icons/search.png' className={style.searchMobile} onClick={() => setSearch(true)} />
                }
            </div>
        </div>
    )
}
export default Navbar