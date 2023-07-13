import CustomButton from '@/Components/CustomButton/CustomButton'
import { Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import { SingleImageUpload } from '@/hooks/requests';

import style from './setting.module.css'
import { updateProfile } from '@/hooks/user';
import MyToast from '@/Components/MyToast/MyToast';
const AdminSetting = ({ user }) => {
    const [loading, setLoading] = useState(false)

    const [firstname, setFirstname] = useState('')
    const [profile_image, setProfile_image] = useState('')
    const [lastname, setLastname] = useState('')
    const [oldpassword, setCurrentPassword] = useState('')
    const [newpassword, setCofirmPassword] = useState('')
    const doReset = async () => {
        const data = { firstname, lastname, profile_image, oldpassword, newpassword }
        updateProfile(data, user?._id, setLoading)
    }
    useEffect(() => {
        if (user?._id) {
            user?.firstname && setFirstname(user?.firstname)
            user?.lastname && setLastname(user?.lastname)
        }
    }, [user?._id])
    return (

        <div className={style.setting}>
            <MyToast />
            <div className='row w-75'>
                <div className='col-lg-12'>
                    {
                        profile_image ?
                            <Avatar style={{ width: 150, height: 150, objectFit: 'cover' }} src={profile_image} />
                            :
                            user?.profile_image
                                ?
                                <Avatar style={{ width: 150, height: 150, objectFit: 'cover' }} src={user?.profile_image} />
                                :
                                <Avatar style={{ width: 150, height: 150, objectFit: 'cover' }} src='https://gcavocats.ca/wp-content/uploads/2018/09/man-avatar-icon-flat-vector-19152370-1.jpg' />

                    }
                    <label htmlFor='profile' style={{ width:180}}>
                        <p>Change Profile Picture</p>
                    </label>
                    <input id='profile' type={'file'} style={{ display: 'none' }} onChange={async (e) => {
                        let image = e.target.files[0]
                        setProfile_image('https://codemyui.com/wp-content/uploads/2015/09/spinner-loader-animation.gif')
                        let res = await SingleImageUpload(image, setLoading)
                        if (res) {
                            console.log(res)
                            setProfile_image(res)
                        }
                    }} />
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>First Name</label>
                        <input value={firstname} onChange={(e) => setFirstname(e.target.value)} className='form-control' />
                    </div>
                </div>
                <div className='col-lg-6 mt-2 mb-2'>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input value={lastname} onChange={(e) => setLastname(e.target.value)} className='form-control' />
                    </div>
                </div>
                <div className='col-lg-6 mt-2 mb-2'>
                    <div className='form-group'>
                        <label>Old Password</label>
                        <input type={'password'} value={oldpassword} onChange={(e) => setCurrentPassword(e.target.value)} className='form-control' />
                    </div>
                </div>
                <div className='col-lg-6 mt-2 mb-2'>
                    <div className='form-group'>
                        <label>New Password</label>
                        <input type={'password'} value={newpassword} onChange={(e) => setCofirmPassword(e.target.value)} className='form-control' />
                    </div>
                </div>
                <div className='col-lg-6 mt-2 mb-2'>
                    <div className={'form-group'}>
                        <CustomButton customCLass={style.loginBtn} onClick={() => doReset()} btnStyle={{ background: '#13B8A0', color: '#fff', width: 200, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title={loading ? 'Please wait...' : 'Save Changes'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSetting