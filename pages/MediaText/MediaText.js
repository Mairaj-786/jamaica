"use client"; // this is a client component
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import style from './mediaText.module.css'
import { BiEditAlt } from 'react-icons/bi'
import CustomButton from '@/Components/CustomButton/CustomButton'
import { baseUrl, fetcherToken } from '@/hooks/baseUrl';
import { updateImageSliderMethod } from '@/hooks/admin';
import MyToast from '@/Components/MyToast/MyToast';
import { SingleImageUpload } from '@/hooks/requests';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
const MediaText = () => {
    const { data, error, isLoading } = useSWR(`${baseUrl}/get-home/63ef601322eb85ddf61c27a6`, fetcherToken)
    const [loading, setLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [home_image, setHome_image] = useState([])
    const [myIndex, setMyIndex] = useState(false)


    useEffect(() => {
        if (data?._id) {
            setTitle(data?.title)
            setDescription(data?.description)
            setHome_image(data?.home_image)
        }
    }, [data?._id])

    const doUpdate = () => {
        let data = { title, description, home_image }
        updateImageSliderMethod(data, setLoading)
    }

    const [rowsToDisplayForDasktop, setRowsToDisplayForDasktop,] = useState(3)
    const [rowsToDisplayForMobile, setRowsToDisplayForMobile,] = useState(6)

    // =========================== Handle Delete slide ============================/
    



    return (
        <>
            <MyToast />
            <div className={style.main}>
                <div className='mb-4'>
                    <b>
                        Home Page Title
                    </b>
                    <div className={style.mainTitle}>
                        {/* <h2>{data?.title}</h2> */}
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' />
                        <BiEditAlt size={20} />
                    </div>
                </div>
                <div className='mb-4'>
                    <b>
                        Home Page Text
                    </b>
                    <div className={style.mainPageText}>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} className='form-control' />
                        {/* <p>{data?.description}</p> */}
                        <BiEditAlt size={20} />
                    </div>
                </div>

                <div className='mb-4'>
                    <b>
                        Home page Slider Images Max Image size 1MB (Size = 1440 × 810)
                    </b>
                    <div className={style.mainPageSlider}>
                        <div className='row m-auto'>
                            {
                                home_image?.slice(0, rowsToDisplayForDasktop).map((_i, index) => (
                                    <div className='col-lg-4' key={index} >
                                        <b>Slide {index + 1}</b>
                                        <br />
                                        {/* <div style={{ position: 'relative' }}>
                                            <AiFillDelete className={style.delete} onClick={() => handleDelete(_i, index)} />
                                        </div> */}
                                            <img src={_i} />
                                        <br />
                                        <label htmlFor='updateSlide' onClick={() => setMyIndex(index)}>
                                            <p>Change Image</p>
                                        </label>
                                        <input style={{ display: 'none' }} onChange={async (e) => {
                                            let image = e.target.files[0]
                                            home_image[myIndex] = 'https://codemyui.com/wp-content/uploads/2015/09/spinner-loader-animation.gif'
                                            let res = await SingleImageUpload(image, setImageLoading)
                                            if (res) {
                                                home_image[myIndex] = res
                                            }
                                        }} type={'file'} id="updateSlide" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* <div className={'form-group'}>
                        <CustomButton customCLass={style.loginBtn} onClick={() => doUpdate()} btnStyle={{ background: '#13B8A0', color: '#fff', width: 110, margin: '10px 0 0 auto', textAlign: 'center', fontWeight: '400' }} title={loading ? 'Please wait...' : 'Update'} />
                    </div> */}
                </div>
                <div className='mb-4'>
                    <b>
                        Home page Slider Images For Mobile Max Image size 1MB (Size = 390 x 370)
                    </b>
                    <div className={style.mainPageSlider}>
                        <div className='row m-auto'>
                            {
                                data?.home_image?.slice(3, rowsToDisplayForMobile).map((_i, index) => (
                                    <div className='col-lg-4' key={index} >
                                        <b>Slide {index + 1}</b>
                                        <br />
                                        <img src={_i} />
                                        <br />
                                        <label htmlFor='updateSlide' onClick={() => setMyIndex(index += 3)}>
                                            <p>Change Image</p>
                                        </label>
                                        <input style={{ display: 'none' }} onChange={async (e) => {
                                            let image = e.target.files[0]
                                            home_image[myIndex] = 'https://codemyui.com/wp-content/uploads/2015/09/spinner-loader-animation.gif'
                                            let res = await SingleImageUpload(image, setImageLoading)
                                            if (res) {
                                                home_image[myIndex] = res
                                            }
                                        }} type={'file'} id="updateSlide" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={'form-group'}>
                        <CustomButton customCLass={style.loginBtn} onClick={() => doUpdate()} btnStyle={{ background: '#13B8A0', color: '#fff', width: 110, margin: '10px 0 0 auto', textAlign: 'center', fontWeight: '400' }} title={loading ? 'Please wait...' : 'Update'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MediaText