import MyToast from '@/Components/MyToast/MyToast'
import { SendContactMessage } from '@/hooks/requests'
import React, { useState } from 'react'
import CustomButton from '../../Components/CustomButton/CustomButton'
import style from './contact-us.module.css'
const ContactUs = () => {

    const [err, setErr] = useState(false)
    const [state, setState] = useState({
        email: '',
        name: '',
        message: ''
    })
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const doSubmit = async () => {
        if (state.email.length == 0 || state.name.length == 0 || state.message.length == 0) {
            setErr(true)
        } else {
            let success = await SendContactMessage(state, setState)
        }

    }
    return (
        <>
            <MyToast />
            <div className={style.bg}>
                <div className={style.main}>
                    <div className={style.mainWrapper}>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className={style.mainWrapperText}>
                                    <h1>Contact Us</h1>
                                    <p>
                                        Thank you for visiting our site. We hope that the experience was enjoyable. If you’d like to get in touch with us, please complete the form below.
                                        Don’t stop now, keep checking for top weekly and monthly events.
                                    </p>
                                    <div className={style.mainWrapperBottomText}>
                                        <b>
                                            Your Name
                                        </b>
                                        <input className='form-control' name="name" value={state.name} onChange={handleChange} />
                                        {err && state.name.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Name is required</label>}

                                    </div>
                                    <div className={style.mainWrapperBottomText}>
                                        <b>
                                            Your Email
                                        </b>
                                        <input className='form-control' name="email" value={state.email} onChange={handleChange} />
                                        {err && state.email.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Email is required</label>}

                                    </div>
                                    <div className={style.mainWrapperBottomText}>
                                        <b>
                                            Your Message
                                        </b>
                                        <textarea className='form-control' name='message' value={state.message} onChange={handleChange} />
                                        {err && state.message.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Write some words</label>}

                                    </div>
                                    <div className={'form-group'}>
                                        <CustomButton customCLass={style.loginBtn} onClick={() => doSubmit()} btnStyle={{ background: '#B8136A', color: '#fff', width: 120, margin: '10px 0', textAlign: 'center', fontWeight: '500' }} title="Submit" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs
