"use client"; // this is a client component
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import style from './mediaText.module.css'
import { BiEditAlt } from 'react-icons/bi'
import CustomButton from '@/Components/CustomButton/CustomButton'
import { baseUrl, fetcherToken } from '@/hooks/baseUrl';
import { updateImageSliderMethod, updateInstaPost } from '@/hooks/admin';
import MyToast from '@/Components/MyToast/MyToast';
import { SingleImageUpload } from '@/hooks/requests';
import MyModal from '@/Components/MyModal/MyModal';
import { Input } from 'antd';
const Instagram = () => {
    const { data, error, isLoading } = useSWR(`${baseUrl}/instagram`, fetcherToken)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setImageLoading] = useState(false)
    const [selected, setSelected] = useState([])
    const [postUrl, setPostUrl] = useState('')

    useEffect(() => {
        if (selected.postUrl) {
            setPostUrl(selected.postUrl)
        }
    }, [selected])


    const doUpdate = async () => {
        let data = { postUrl, imgUrl: selected.imgUrl }
        console.log(data)
        let res = await updateInstaPost(data, selected._id)
        if (res) {
            setIsModalOpen(false)
        }
    }

    return (
        <>
            <MyToast />
            <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} content={
                <>
                    <div>
                        <img src={selected?.imgUrl} style={{ width: 200, height: 200, objectFit: 'contain' }} />
                        <label htmlFor='updateSlide'>
                        </label>
                        <input style={{ display: 'none' }} onChange={async (e) => {
                            let image = e.target.files[0]
                            selected.imgUrl = 'https://codemyui.com/wp-content/uploads/2015/09/spinner-loader-animation.gif'
                            let res = await SingleImageUpload(image, setImageLoading)
                            if (res) {
                                // setSelected((prev) => [{ ...prev, imgUrl: res }])
                                selected.imgUrl = res
                            }
                        }} type={'file'} id="updateSlide" />
                    </div>
                    <div className='d-flex mt-2 mb-2'>
                        <Input value={postUrl} onChange={(e) => setPostUrl(e.target.value)} />
                    </div>
                    <div className={'form-group'}>
                        <CustomButton customCLass={style.loginBtn} onClick={() => doUpdate()} btnStyle={{ background: '#13B8A0', color: '#fff', width: 110, textAlign: 'center', fontWeight: '400' }} title={'Update'} />
                    </div>
                </>
            } />
            <div className={style.main}>
                <div className='mb-4'>
                    <b>
                        Instagram Top Events
                    </b>
                    <div className={style.mainPageSlider}>
                        <div className='row m-auto'>
                            {
                                data?.map((_i, index) => (
                                    <div className='col-lg-3' key={index} >
                                        <img src={_i.imgUrl} />
                                        <br />
                                        <label htmlFor='updateSlide' onClick={() => {
                                            setIsModalOpen(true)
                                            setSelected(_i)
                                        }}>
                                            <p>Change Image</p>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* <div className={'form-group'}>
                        <CustomButton customCLass={style.loginBtn} onClick={() => doUpdate()} btnStyle={{ background: '#13B8A0', color: '#fff', width: 110, margin: '10px 0 0 auto', textAlign: 'center', fontWeight: '400' }} title={'Update'} />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Instagram