"use client"; // this is a client component
import { FaRegWindowClose } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import CustomButton from '../CustomButton/CustomButton';
import MyModal from '../MyModal/MyModal'
import style from './subsribe.module.css'
import { updateProfile } from '@/hooks/user';
const Subsribe = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [loading, setLoading] = useState(false)
    const [subs, setSubs] = useState(false)
    const [toggle, setToggle] = useState(true)



    const doSubs = async () => {
        setLoading(true)
        let data = { notifications: toggle }
        const success = await updateProfile(data, user?._id, setLoading)
        if (success) {
            setSubs(true)
            setTimeout(() => {
                setIsModalOpen(false)
            }, 2000);
        }
    }

    return (
        <div className={style.main}>

            <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} content={
                <div className={style.Subsribe}>
                    <FaRegWindowClose onClick={() => setIsModalOpen(false)} />
                    <img src='/images/blackLogo.png' />
                    <div className={style.forget}>
                        <img onClick={() => setToggle(!toggle)} src={!toggle ? '/icons/uncheck.png' : '/icons/check-square.png'} style={{ width: 25, height: 25, objectFit: 'contain', cursor: 'pointer' }} />
                        <b>Yes, I Want To Receive Top Events Jamaica Emails</b>
                    </div>
                    <div className={'form-group'}>
                        <CustomButton customCLass={style.loginBtn} onClick={() => doSubs()} btnStyle={{ background: '#B8136A', color: '#fff', width: 360, margin: '10px 0', textAlign: 'center', fontWeight: '500' }} title={loading ? 'Please wait...' : subs ? 'Subscribed' : 'Subscribe'} />
                    </div>
                </div>
            } />
        </div>
    )
}

export default Subsribe