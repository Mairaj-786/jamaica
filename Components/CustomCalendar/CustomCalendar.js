import { baseUrl, fetcherToken } from '@/hooks/baseUrl'
import { Divider, Skeleton } from 'antd'
import React, { useState } from 'react'
import { areDatesTheSame, DAYS, getDateObj, getDaysInMonth, getSortedDays, MONTHS } from '../../Constants/utils'
import MyModal from '../MyModal/MyModal'
import style from './calendar.module.css'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'


const CustomCalendar = ({ startingDate, eventObj }) => {
  const router = useRouter()
  const [id, setId] = useState('')
  const { data, error, isLoading } = useSWR(`${baseUrl}/events/get-event/${id}`, fetcherToken)
  const startDate = data?.startDate
  const endDate = data?.endDate

  const [currentMonth, setCurrentMonth] = useState(startingDate.getMonth())
  const [currentYear, setCurrentYear] = useState(startingDate.getFullYear())
  const DAYSINMONTH = getDaysInMonth(currentMonth, currentYear)
  console.log(currentMonth)

  const range = (end) => {
    const { result } = Array.from({ length: end }).reduce(({ result, current }) => ({
      result: [...result, current],
      current: current + 1
    }), { result: [], current: 1 })
    return result;
  }

  // ======================= get Next month begin =====================//
  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1)
    } else {
      setCurrentMonth(0)
      setCurrentYear((prev) => prev + 1)
    }
  }

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1)
    } else {
      setCurrentMonth(11)
      setCurrentYear((prev) => prev - 1)
    }
  }
  // ======================= get Next month end =====================//
  const [isModalOpen, setIsModalOpen] = useState(false)
  // ======================= get Next month end =====================//
  return (
    <>
      <MyModal width={700} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} content={
        <div className={style.calendarSingleData}>
          <div className={style.calendarSingleDataWrapper}>
            <div className='row'>
              <div className='col-lg-5 col-md-5 col-12'>
                <div className={style.calendarSingleDataLeftContainer}>
                  {
                    isLoading
                      ?
                      <div style={{ width: 300, height: 300 }}>
                        <Skeleton active />
                      </div>
                      :
                      <img src={data?.eventImage} />
                  }
                </div>
              </div>
              <div className='col-lg-5 col-md-5 col-12 ml-auto'>
                {
                  isLoading
                    ?
                    <Skeleton active />
                    :
                    <div className={style.calendarSingleDataRightContainer}>
                      <div className={style.calendarSingleDataRightContainerTitle}>
                        <h5 style={{ opacity: .8 }}>Title</h5>
                        <b className='ml-2 mr-2'>:</b>
                        <h5>{data?.name}</h5>
                      </div>
                      <div className={style.calendarSingleDataRightContainerTitle}>
                        <strong style={{ opacity: .8 }}>Date</strong>
                        <b className='ml-2 mr-2'>:</b>
                        <strong>{startDate?.slice(7, 10)}th {startDate?.slice(4, 8)} - {endDate?.slice(7, 10)}th {endDate?.slice(4, 8)}</strong>
                      </div>
                      <div className={style.calendarSingleDataRightContainerTitle}>
                        <strong style={{ opacity: .8 }}>Category</strong>
                        <b className='ml-2 mr-2'>:</b>
                        <strong>{data?.category}</strong>
                      </div>
                      <div className={style.calendarSingleDataRightContainerTitle}>
                        <strong style={{ opacity: .8 }}>Time</strong>
                        <b className='ml-2 mr-2'>:</b>
                        <strong>{`${data?.startTime} - ${data?.endTime}`}</strong>
                      </div>
                      <div className={style.calendarSingleDataRightContainerViewDetail}>
                        <Divider />
                        <b onClick={() => router.push(`/event/${id}`)}>View Details</b>
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      } />
      < div className={style.control} >
        <div onClick={() => {
          // alert(MONTHS[currentMonth - 1])
          prevMonth()
        }} style={{ zIndex: 2, cursor: 'pointer' }}>
          <img src='/icons/arrows.png' style={{ width: 15, height: 15, objectFit: 'contain', zIndex: 99999 }} />
          <span>{MONTHS[currentMonth - 1] == undefined ? `December ${currentYear - 1}` : `${MONTHS[currentMonth - 1]} ${currentYear}`}</span>
        </div>
        <div className={style.centerDate}>
          <b>{MONTHS[currentMonth]}</b>
          <p>{currentYear}</p>
        </div>
        <div onClick={() => nextMonth()} style={{ cursor: 'pointer' }}>
          {/* <span>{MONTHS[currentMonth + 1]} {currentYear}</span> */}
          {/* <span>{MONTHS[currentMonth + 1] == undefined ? 'January' : MONTHS[currentMonth + 1]} {currentYear}</span> */}
          <span>{MONTHS[currentMonth + 1] == undefined ? `January ${currentYear + 1}` : `${MONTHS[currentMonth + 1]} ${currentYear}`}</span>


          <img src='/icons/arrows.png' style={{ width: 15, height: 15, objectFit: 'contain', transform: 'rotate(300deg)' }} />
        </div>
      </div >
      <ul className={style.days}>
        {
          getSortedDays(currentMonth, currentYear).map((d, index) => (
            <li key={index}>
              {d}
            </li>
          ))
        }
      </ul>
      <div className={style.UpcomingEventsWrapperCard}>
        <div className='row no-gutters seven-cols'>
          {
            range(DAYSINMONTH).map((i, index) => (
              <div className='col-md-1 col-1' key={index}>
                <div style={{ background: areDatesTheSame(new Date(), getDateObj(i, currentMonth, currentYear)) && '#DF9411' }} className={style.UpcomingEventsCard}>
                  <span>{i}</span>
                  {
                    eventObj.map((ev, index) => {
                      const startDate = ev?.startDate
                      const endDate = ev?.endDate
                      return (
                        areDatesTheSame(getDateObj(i, currentMonth, currentYear), ev.date) && (
                          <div style={{ cursor: 'pointer' }} onClick={() => {
                            setId(ev.id)
                            setIsModalOpen(true)
                          }} key={index}>
                            <strong>{ev.title}</strong>
                            <div className={`pt-2 ${style.calendarDates}`}>
                              <p>{startDate?.slice(7, 10)}th {startDate?.slice(4, 8)} - {endDate?.slice(7, 10)}th {endDate?.slice(4, 8)}</p>
                            </div>
                            <Divider />
                          </div>
                        )
                      )
                    }
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default CustomCalendar