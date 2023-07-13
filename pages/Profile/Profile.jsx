import CustomButton from '@/Components/CustomButton/CustomButton'
import Loader from '@/Components/Loader/Loader'
import MyToast from '@/Components/MyToast/MyToast'
import { SingleImageUpload } from '@/hooks/requests'
import { updatePassword, updateProfile } from '@/hooks/user'
import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { FiTrash2 } from 'react-icons/fi'
import style from './profile.module.css'
const Profile = ({ user }) => {
    const [loading, setLoading] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastName] = useState('')
    const [profile_image, setProfileImage] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (user?._id) {
            user?.firstname && setFirstname(user?.firstname)
            user?.lastname && setLastName(user?.lastname)
            user?.email && setEmail(user?.email)
        }
    }, [user?._id])

    const updateUser = async () => {
        const data = { firstname, lastname, email, profile_image }
        updateProfile(data, user?._id, setLoading)
    }

    // ================== change password ===================//
    const [oldpassword, setOldpassword] = useState('')
    const [newpassword, setNewpassword] = useState('')

    const changePassword = async () => {
        const data = { oldpassword, newpassword }
        updatePassword(data, user?._id, setLoading)
    }

    return (
        <>
            <MyToast />
            {
                loading
                    ?
                    <Loader />
                    :
                    <div className={style.profile}>
                        <div className={style.profileWrapper}>
                            <BiArrowBack size={30} className={style.backArrow} onClick={() => {
                                window.location.assign("/")
                            }} />
                            <div className='row'>
                                <div className={`col-lg-6 col-12 ${style.left}`}>
                                    <b>Personal Information</b>
                                    <div className='form-group mt-3'>
                                        <label>First Name</label>
                                        <input name='firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)} className='form-control' />
                                    </div>
                                    <div className='form-group mt-3'>
                                        <label>Last Name</label>
                                        <input name='lastname' value={lastname} onChange={(e) => setLastName(e.target.value)} className='form-control' />
                                    </div>
                                    <div className='form-group mt-3'>
                                        <label>Email</label>
                                        <input disabled name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' />
                                    </div>
                                    <div className={'form-group'}>
                                        <CustomButton onClick={() => updateUser()} customCLass={style.loginBtn} btnStyle={{ background: '#B8136A', color: '#fff', width: 360, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title="Update Profile Info" />
                                    </div>
                                    <b>Change Password</b>
                                    <div className='form-group mt-3'>
                                        <label>Old password</label>
                                        <input type={'password'} onChange={(e) => setOldpassword(e.target.value)} className='form-control' />
                                    </div>
                                    <div className='form-group mt-3'>
                                        <label>New password</label>
                                        <input type={'password'} onChange={(e) => setNewpassword(e.target.value)} className='form-control' />
                                    </div>
                                    <div className={'form-group'}>
                                        <CustomButton onClick={() => changePassword()} customCLass={style.loginBtn} btnStyle={{ background: '#B8136A', color: '#fff', width: 360, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title="Update password" />
                                    </div>
                                </div>
                                <div className={`col-lg-6 col-12 ${style.right}`}>
                                    <strong>Upload Logo or Avatar</strong>
                                    {
                                        profile_image
                                            ?
                                            <label htmlFor="upload">
                                                <div className={style.profileImg}>
                                                    <FiTrash2 onClick={() => setProfileImage('')} />
                                                    <img src={profile_image} />
                                                </div>
                                            </label>
                                            :
                                            <>
                                                <input type="file" multiple id='upload' onChange={async (e) => {
                                                    let image = e.target.files[0]
                                                    let res = await SingleImageUpload(image, setLoading)
                                                    if (res) {
                                                        console.log(res)
                                                        setProfileImage(res)
                                                    }
                                                }} />
                                                <label htmlFor='upload'>
                                                    <div className={style.upload}>
                                                        <p>{`Please upload the image of size 1 MB `}</p>
                                                        <p>or</p>
                                                        <u>
                                                            Browse Image
                                                        </u>
                                                        <strong>
                                                            Supports JPG and PNG
                                                        </strong>
                                                    </div>
                                                </label>
                                            </>
                                    }
                                    <div className={style.size}>
                                        <p>Upload your logo or avatar. The file size must be less than --MB.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Profile