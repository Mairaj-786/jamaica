"use client"; // this is a client component
import useSWR from 'swr'
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import CustomButton from '../../Components/CustomButton/CustomButton'
import CustomCalendar from '../../Components/CustomCalendar/CustomCalendar'
import EventView from '../../Components/EventView/EventView'
import SelectButtonView from '../../Components/SelectButtonView/SelectButtonView'
import { MOCKEVENTS } from '../../Constants/utils'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import style from './home.module.css'
import { baseUrl, fetcher, fetcherToken } from '@/hooks/baseUrl';
import Loader from '@/Components/Loader/Loader';
import Subsribe from '@/Components/Subsribe/Subsribe';
import { getAllEvents } from '@/hooks/events';
import Link from 'next/link';

const Home = () => {
    const [events, setEvents] = useState([])
    const { data, error, isLoading } = useSWR(`${baseUrl}/get-home`, fetcher)

    // ==================== get current logged in user in state begin ===================================//
    const [user, setUser] = useState([])
    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser) {
            setUser(currentUser)
        }
    }, [])
    // ==================== get current logged in user in state end ===================================//

    useEffect(() => {
        const getApproveEvents = async () => {
            let res = await getAllEvents()
            let approvedEvents = res?.filter((i) => i.status == 'Approved' && i.topevent == true)
            setEvents(approvedEvents)
        }
        getApproveEvents()
    }, [])

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

    const [rowsToDisplayForDasktop, setRowsToDisplayForDasktop] = useState(3)
    const [rowsToDisplayForMobile, setRowsToDisplayForMobile] = useState(6)

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <div className={style.bg}>
                        <div className={style.sliderForDesktop}>
                            <img src='/backgrounds/home-red.png' className={style.homeBg} />
                            <Carousel preventMovementUntilSwipeScrollTolerance={true} swipeScrollTolerance={50} showStatus={false} showThumbs={false} showArrows={false} autoPlay={true} infiniteLoop={true}>
                                {
                                    data[0]?.home_image?.slice(0, rowsToDisplayForDasktop).map((i, index) => (
                                        <div key={index}>
                                            {/* <div className={style.home} style={{ backgroundImage: "url(/backgrounds/bgMobile.png)" }}> */}
                                            <div className={style.home} style={{ backgroundImage: "url(" + i + ")" }}>
                                                <div className={style.homeWrapper}>
                                                    <img src='/Text/heroText.png' style={{ width: 300, height: 340, objectFit: 'contain', marginLeft: -200 }} />
                                                    <div className={style.homeWrapperText}>
                                                        <b>{data[0]?.title}</b>
                                                        <div style={{ lineHeight: '5px', paddingTop: 30, textAlign: 'start' }}>
                                                            <p style={{ width: 500, lineHeight: 1 }}>
                                                                {/* {data[0]?.description} */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>
                        <div className={style.sliderForMobile}>
                            <img src='/backgrounds/home-red.png' className={style.homeBg} />
                            <Carousel preventMovementUntilSwipeScrollTolerance={true} swipeScrollTolerance={50} showStatus={false} showThumbs={false} showArrows={false} autoPlay={true} infiniteLoop={true}>
                                {
                                    data[0]?.home_image?.slice(3, rowsToDisplayForMobile).map((i, index) => (
                                        <div key={index}>
                                            {/* <div className={style.home} style={{ backgroundImage: "url(/backgrounds/bgMobile.png)" }}> */}
                                            <div className={style.home} style={{ backgroundImage: "url(" + i + ")" }}>
                                                <div className={style.homeWrapper}>
                                                    <img src='/Text/heroText.png' style={{ width: 300, height: 340, objectFit: 'contain', marginLeft: -200 }} />
                                                    <div className={style.homeWrapperText}>
                                                        <b>{data[0]?.title}</b>
                                                        <div style={{ lineHeight: '5px', paddingTop: 30, textAlign: 'start' }}>
                                                            <p style={{ width: 500, lineHeight: 1 }}>
                                                                {data[0]?.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>
                        {
                            user?.notifications === false
                            &&
                            <Subsribe user={user} />
                        }
                        <UpcomingEvents events={events} />
                        <Trending events={events} />
                        <ExploreEventsInstagram />
                        <LatestNewsfromJamaicaEvents />
                    </div>
            }
        </>
    )
}

const UpcomingEvents = ({ events }) => {
    let temp = [];
    const findDate = events?.map((i) => {
        let startDate = i.startDate
        let endDate = i.endDate
        let id = i._id
        let date = new Date(i.startDate)
        let title = i.name
        temp.push({ id, date, title, startDate, endDate })
    })
    console.log('data', temp)

    return (
        <div className={style.UpcomingEvents}>
            <div className={style.UpcomingEventsWrapper}>
                <h2>Upcoming Events</h2>
                <CustomCalendar eventObj={temp} startingDate={new Date()} />
            </div>

        </div>
    )
}

const Trending = ({ events }) => {
    const [toggle, setToggle] = useState(1)

    return (
        <div className={style.Trending}>
            <div className={style.Border}>
            </div>
            <div className={style.TrendingHeader}>
                <h3>What is Trending?</h3>
                <SelectButtonView toggle={toggle} setToggle={setToggle} />
            </div>
            <div className='mt-5'>
                {
                    toggle == 2
                        ?
                        <div className='row'>
                            {
                                events?.map((i, index) => (
                                    <div className='col-lg-4 col-md-4 col-6' key={index}>
                                        <EventView data={i} toggle={toggle} />
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div>
                            {
                                events?.map((i, index) => (
                                    <div key={index}>
                                        <EventView data={i} toggle={toggle} top />
                                    </div>
                                ))
                            }
                        </div>

                }

            </div>

        </div>
    )
}

const ExploreEventsInstagram = () => {
    const { data, error, isLoading } = useSWR(`${baseUrl}/instagram`, fetcherToken)
    console.log('dasd', data)
    return (
        <div className={style.Explore}>

            <div className={style.ExploreWrapper}>
                <h1>
                    Explore the Latest Events on Instagram
                </h1>
                <div className='row'>
                    {
                        data?.map((_i, index) => (
                            <div className='col-lg-3 col-md-6 col-6' role="button" key={index}>
                                <div className={style.ExploreWrapperSlideImg}>
                                    <Link href={_i?.postUrl} target="_blank">
                                        <img src={_i?.imgUrl} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={'form-group'}>
                    <CustomButton onClick={() => {
                        window.open('https://www.instagram.com/topeventsjamaica/', "_blank")
                    }} customCLass={style.loginBtn} btnStyle={{ background: '#B8136A', color: '#fff', width: 260, marginTop: '50px', textAlign: 'center', fontWeight: '400' }} title="Follow us on Instagram" />
                </div>
                <div className={style.myBorder}>
                </div>
            </div>
        </div>
    )
}

const LatestNewsfromJamaicaEvents = () => {
    const { data, error, isLoading } = useSWR(`${baseUrl}/news/get-news`, fetcherToken)
    const router = useRouter()
    const [rowsToDisplay, setRowsToDisplay] = useState(3)
    return (
        <div className={style.latestNews}>
            <div className={style.latestNewsWrapper}>
                <h1>
                    Latest News from Jamaica Events
                </h1>
                {
                    data?.slice(0, rowsToDisplay).map((i, index) => (
                        <div className={`form-group ${style.latestNewsWrapperNews}`} key={index}>
                            <h3>{i?.title}</h3>
                            <p>{i?.description}</p>
                            {/* <Link href={`/news/${i._id}`}> */}
                            <b onClick={() => {
                                window.location.assign(`/news/${i._id}`)

                            }}>
                                Read more...
                            </b>
                            {/* </Link> */}
                        </div>
                    ))
                }
                {/* <img src='/backgrounds/top.png' className={style.topDesignLates} /> */}
                {
                    data?.length > 3
                        &&
                        rowsToDisplay === 3
                        ?
                        data?.length > 3
                        &&
                        <div className={'form-group'}>
                            <CustomButton onClick={() => setRowsToDisplay(data?.length)} customCLass={style.loginBtn} btnStyle={{ background: '#B8136A', color: '#fff', width: 155, marginTop: '50px', textAlign: 'center', fontWeight: '400' }} title="More News" />
                        </div>
                        :
                        data?.length > 3
                        &&
                        <div className={'form-group'}>
                            <CustomButton onClick={() => setRowsToDisplay(3)} customCLass={style.loginBtn} btnStyle={{ background: '#B8136A', color: '#fff', width: 155, marginTop: '50px', textAlign: 'center', fontWeight: '400' }} title="Less News" />
                        </div>
                }
            </div>
        </div>
    )
}

export default Home
