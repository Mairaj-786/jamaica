import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import style from './eventView.module.css'

const EventView = (props) => {
    const router = useRouter()
    return (
        <>
            {
                props.toggle == 1
                    ?
                    <>
                        <div className={style.EventView}>
                            <div className={style.EventViewImage} >
                                <Link href={`/event/${props.data._id}`}>
                                    <img src={props?.data?.eventImage} style={{ cursor: 'pointer' }} />
                                </Link>
                            </div>
                            <div className={style.EventViewDesc}>
                                <div className='d-flex justify-content-between  pb-2'>
                                    <Link href={`/event/${props.data._id}`}>
                                        <b>{props?.data?.name}</b>
                                    </Link>
                                    {
                                        props.top
                                        &&
                                        <img src='/icons/top-event.png' />
                                    }
                                </div>
                                <p>

                                    {props?.data?.shortDescription}
                                </p>

                            </div>
                        </div>
                        <div className={style.border}>
                        </div>
                    </>
                    :
                    <div className={style.GridView}>
                        <Link href={`/event/${props.data._id}`}>
                            <img src={props.data.eventImage} style={{ cursor: 'pointer' }} />
                        </Link>
                        <b>{props?.data?.name}</b>
                    </div>
            }
        </>
    )
}



export default EventView