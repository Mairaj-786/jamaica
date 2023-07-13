"use client"; // this is a client component
import React, { useEffect, useState } from 'react'
import { Rate, Popover, Skeleton, Button } from 'antd';
import style from './single_event.module.css'
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Navbar from '@/Constants/Navbar/Navbar';
import MyDrawer from '@/Components/MyDrawer/MyDrawer';
import { AddReview, getEvents } from '@/hooks/events';
import MyToast from '@/Components/MyToast/MyToast';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import Loader from '@/Components/Loader/Loader';
const SingleEvent = ({ event, isloading }) => {

    const startDate = event?.startDate
    const endDate = event?.endDate
    const path = usePathname()
    const id = path.slice(7, 100)
    const [reviews, setReviewAll] = useState([])
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openDrawe, setOpenDrawer] = useState(false);
    const [user, setUser] = useState([])




    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            setUser(user)
        }
    }, [])
    // ======================= Add Review begin ==========================//
    const [review, setReview] = useState('')
    const [stars, setRate] = useState('')

    const doSubmit = async () => {
        if (user?._id) {
            const data = { review, stars, event: event?._id, user: user?._id }
            let success = await AddReview(data, setLoading)
            if (success) {
                getEvents(setReviewAll, id)
                setReview('')
                setRate(0)
            }
        } else {
            toast.error('Please Login first')
        }
    }
    // ======================= Add Review end ==========================//

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };


    useEffect(() => {
        getEvents(setReviewAll, id)
    }, [])


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC5_O_glkBNQmfXdOS7GyuRJKH7RqVPlbE',
    })


    if (!isLoaded) return <Loader />

    const center = {
        lat: parseFloat(event?.latitude),
        lng: parseFloat(event?.longitude)
    };
    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const MyMarker = () => {
        return (
            <Marker title={event?.name}
                style={{ width: 30, height: 30 }}

                position={center}
                icon='/icons/location_on (2).png'
            />
        )
    }




    return (
        <>
            <MyToast />
            <div className={style.bg}>
                <div className={style.single_event}>
                    <div className={style.single_event_wrapper}>
                        <div className='row'>
                            <div className='col-lg-3'>
                                <div className={style.single_event_wrapper_left_container}>
                                    {
                                        isloading
                                            ?
                                            <Skeleton active />
                                            :
                                            <img src={event?.eventImage} />
                                    }
                                    <div className={style.single_event_wrapper_left_container_date}>
                                        <b>Event Date</b>
                                        {/* <strong>{startDate?.slice(7, 10)}th {startDate?.slice(4, 8)} - {endDate?.slice(7, 10)}th {endDate?.slice(4, 8)}</strong> */}
                                        <strong>{startDate?.slice(7, 10)}th {startDate?.slice(4, 8)}</strong>
                                    </div>
                                    <div className={style.single_event_wrapper_left_container_date}>
                                        <b>Category</b>
                                        <strong>{event?.category == 'HealthandWellness' ? 'Health & Wellness' : event?.category}</strong>
                                    </div>
                                    {
                                        reviews?.reviews?.length > 0
                                        &&
                                        <div className={style.single_event_wrapper_left_container_date}>
                                            <b>Ratings</b>
                                            <strong>{reviews?.averageStars}</strong>
                                        </div>
                                    }

                                    <div className='mt-2'>
                                        <b className='pl-2'>Write an Event Review</b>
                                        <div className={style.addReviewInput}>
                                            <textarea value={review} onChange={(e) => setReview(e.target.value)} className='form-control' placeholder='This was a TOP Event...' />
                                            <div className={style.addReviewRate}>
                                                <Rate style={{ fontSize: 30 }} value={stars} onChange={(e) => setRate(e)} defaultValue={0} />
                                            </div>
                                        </div>
                                        <div className={'form-group'}>
                                            <CustomButton customCLass={style.loginBtn} onClick={() => doSubmit()} btnStyle={{ background: '#B8136A', color: '#fff', width: '100%', margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title={loading ? 'Please wait...' : 'Submit Review'} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-9'>
                                {
                                    isloading
                                        ?
                                        <Skeleton
                                            active
                                            avatar
                                            paragraph={{
                                                rows: 4,
                                            }}
                                        />
                                        :
                                        <div className={style.single_event_wrapper_right_container}>
                                            {
                                                event.topevent
                                                &&
                                                <img src='/icons/top-event.png' />
                                            }
                                            <div className={style.single_event_wrapper_right_container_title}>
                                                <b>{`${event?.name}`}</b>
                                                <div className={'form-group'}>
                                                    <Popover

                                                        content={
                                                            <div className={style.findTicket}>
                                                                <div className={style.findTicketWrapper}>

                                                                    <h2>{event?.ticketOutlet?.length > 0 ? 'Find Tickets here.' : 'No Tickets found'}</h2>
                                                                    {
                                                                        event?.ticketOutlet?.map((i, index) => (
                                                                            <div key={index} className={style.findTicketWrapperOutlet}>
                                                                                <b>Outlet # 1</b>
                                                                                <li><AiOutlineArrowRight size={23} /></li>
                                                                                <li>{i}</li>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        }
                                                        placement="bottom"
                                                        trigger="click"
                                                        open={open}
                                                        onOpenChange={handleOpenChange}
                                                    >
                                                        <CustomButton onClick={() => setOpen(true)} customCLass={style.loginBtn} btnStyle={{ background: '#13B8A0', color: '#fff', padding: '15px 0', width: 157, margin: '10px 0', textAlign: 'center', fontWeight: '400', fontSize: 14 }} title="Find Tickets" />

                                                    </Popover>
                                                </div>
                                            </div>
                                            <p className={style.date}>{startDate?.slice(7, 10)}th {startDate?.slice(4, 8)} - {endDate?.slice(7, 10)}th {endDate?.slice(4, 8)}</p>
                                            <div className={style.socialIcons}>
                                                {
                                                    event?.instagramLink
                                                    &&
                                                    <a href={event?.instagramLink}>
                                                        <img src='/icons/instagram.png' />
                                                    </a>
                                                }
                                                {
                                                    event?.facebookLink
                                                    &&
                                                    <a href={event?.facebookLink}>
                                                        <img src='/icons/facebook.png' />
                                                    </a>
                                                }
                                                {
                                                    event?.twitterLink
                                                    &&
                                                    <a href={event?.twitterLink}>
                                                        <img src='/icons/twitter.png' />
                                                    </a>
                                                }
                                            </div>
                                            <p>
                                                {event?.shortDescription}
                                            </p>
                                        </div>
                                }
                                <div className={style.map}>
                                    <div className={style.mapTitle}>
                                        <h5>Find the Venue</h5>
                                    </div>
                                    <div className={style.mapWrapper}>
                                        <GoogleMap zoom={12} center={center} mapContainerStyle={containerStyle}>
                                            <MyMarker />
                                        </GoogleMap>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        reviews?.reviews?.length == 0
                            ?
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
                                <b>No Reviews</b>
                            </div>
                            :
                            <div className={style.addReview}>
                                <Carousel preventMovementUntilSwipeScrollTolerance={true} swipeScrollTolerance={50} showStatus={false} showIndicators={false} showThumbs={false}>
                                    {
                                        Array.isArray(reviews?.reviews) &&
                                        reviews?.reviews?.map((_i, index) => (
                                            <div key={index} className={style.slider}>
                                                <b>Reviews</b>
                                                <div className={style.sliderName}>
                                                    <strong>{_i?.user?.firstname}</strong>
                                                    <Rate disabled value={_i?.stars} />
                                                </div>
                                                <p>
                                                    {_i?.review}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </Carousel>
                            </div>
                    }

                </div>
            </div>
        </>

    )
}

export default SingleEvent