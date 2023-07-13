"use client"; // this is a client component

import CustomTable from '@/Components/CustomTable/CustomTable'
import MyModal from '@/Components/MyModal/MyModal';
import { baseUrl, fetcherToken } from '@/hooks/baseUrl';
import React, { useEffect, useState } from 'react'
import style from './event-management.module.css'
import { CSVLink } from "react-csv";
import { Radio, Select } from 'antd';
import useSWR from 'swr'
import './event-management.module.css'
import CustomButton from '@/Components/CustomButton/CustomButton';
import { updateStatusMethod } from '@/hooks/admin';
import MyToast from '@/Components/MyToast/MyToast';
import { useRouter } from 'next/navigation';


const EventManagement = ({ search }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectData, setSelectedData] = useState([])
  const [eventModal, setEventModal] = useState(false)
  const colums = [
    {
      id: 1,
      title: 'Event Name'
    },
    {
      id: 2,
      title: 'Submitted By'
    },
    {
      id: 3,
      title: 'Event Date'
    },
    {
      id: 4,
      title: 'Status'
    },
    {
      id: 'delete',
      title: 'Delete'
    },
    {
      id: 'view',
      title: ''
    },
  ]
  const { data, error, isLoading } = useSWR(`${baseUrl}/events/get-events`, fetcherToken)
  const [value, setValue] = useState(selectData?.status);
  const [topevent, setTopevent] = useState(selectData?.topevent);

  // =================== filter by status =======================//
  const [statusType, setStatusType] = useState('')
  const approved = data?.filter((i) => i?.status == "Approved")
  const Rejected = data?.filter((i) => i?.status == "Rejected")
  const Pending = data?.filter((i) => i?.status == "Pending")

  // =================== filter by status =======================//


  useEffect(() => {
    if (selectData?.status) {
      setValue(selectData?.status)
    }
    setTopevent(selectData?.topevent)
  }, [selectData])

  // ================== update status=========================//
  const updateStatus = async () => {
    const data = { 'status': value, topevent }
    let succes = await updateStatusMethod(data, setLoading, selectData._id)
    if (succes) {
      setEventModal(false)
    }
  }

  const userData =
    data?.map((i) => (
      { EventName: i?.name, Submitted_By: i?.user?.firstname, Status: i?.status }
    ))

  return (
    <div>
      <MyToast />
      {
        userData
        &&
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin:'10px 0' }}>
          <CSVLink title='Jamaica User List' data={userData} style={{ fontSize: 18 }}>Download Events List</CSVLink>
          <div>
            <Select
              labelInValue
              defaultValue={{
                label: 'Filter by Status',
              }}
              style={{
                width: '100%',
              }}
              onChange={(e) => setStatusType(e.key)}
              options={[

                {
                  value: 'All Events',
                  label: 'All Events',
                },
                {
                  value: 'Approved',
                  label: 'Approved',
                },
                {
                  value: 'Pending',
                  label: 'Pending',
                },
                {
                  value: 'Rejected',
                  label: 'Rejected',
                },

              ]}
            />
          </div>
        </div>
      }
      <MyModal isModalOpen={eventModal} setIsModalOpen={setEventModal} content={
        <>
          <div className={style.modalBody}>
            <img src={selectData?.eventImage} />
            <div>
              <div className={style.modalBodyDesc}>
                <strong>Title</strong>
                <span>:</span>
                <b>{selectData?.name}</b>
              </div>
              <div className={style.modalBodyDesc}>
                <strong>Category</strong>
                <span>:</span>
                <b style={{ textTransform: 'lowercase' }}>{selectData?.category}</b>
              </div>
              <div className={style.modalBodyDesc}>
                <strong>Activity</strong>
                <span>:</span>
                <b>{selectData?.activity}</b>
              </div>
              <div className={style.modalBodyDesc}>
                <strong>Email</strong>
                <span>:</span>
                <b style={{ fontWeight: 400, fontSize: 14, textTransform: 'lowercase' }}>{selectData?.user?.email}</b>
              </div>
              <div className={style.modalBodyDesc}>
                <strong>Author</strong>
                <span>:</span>
                <b >{selectData?.user?.firstname}</b>
              </div>
            </div>
          </div>
          <div className='mt-3 mb-4'>
            <Radio.Group name="value" onChange={(e) => setValue(e.target.value)} value={value}>
              <Radio value={'Approved'}>Approved</Radio>
              <Radio value={'Pending'}>Pending</Radio>
              <Radio value={'Rejected'}>Rejected</Radio>
            </Radio.Group>
            <br />
            <div className='mt-3'>
              <h5>Top Event</h5>
              <Radio.Group name="topevent" onChange={(e) => setTopevent(e.target.value)} value={topevent}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </div>
            <div className='d-flex'>
              <div className={'form-group mt-3'}>
                <CustomButton customCLass={style.loginBtn} onClick={() => updateStatus()} btnStyle={{ background: '#DF9411', color: '#fff', width: 160, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title={loading ? 'Please wait...' : 'Update Status'} />
              </div>
              <div className={'form-group mt-3 ml-4'}>
                <CustomButton customCLass={style.loginBtn} onClick={() => router.push(`/event/${selectData?._id}`)} btnStyle={{ background: '#13B8A0', color: '#fff', width: 160, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title={'View more details'} />
              </div>
            </div>
          </div>
        </>
      } />
      <CustomTable colums={colums} data={statusType == 'Approved' ? approved : statusType == 'Rejected' ? Rejected : statusType == 'Pending' ? Pending : data} eventManagement={true} search={search} setEventModal={setEventModal} setSelectedData={setSelectedData} isLoading={isLoading} />
    </div>
  )
}

export default EventManagement