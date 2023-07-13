import React from 'react'
import style from './forget.module.css'
import CustomButton from '../../Components/CustomButton/CustomButton';
import { useState } from 'react';
import { doForgotPassword } from '@/hooks/user';
import MyToast from '@/Components/MyToast/MyToast';
import { useRouter } from 'next/navigation';


const ForgotPassword = () => {
    const router = useRouter()
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [state, setState] = useState({
        email: '',
    })
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const doForget = async () => {
        if (state.email.length == 0) {
            setErr(true)
        } else {
            doForgotPassword(state, setSuccess, router, setLoading)

        }
    }
    return (
        <>
            <MyToast />
            <div className={style.form}>
                <div className={style.formWrapper}>
                    <img src='/images/blackLogo.png' />
                    <b>Forgot Password</b>

                    <div className='form-group'>
                        <label>Email</label>
                        <input name='email' value={state.email} onChange={handleChange} className='form-control' />
                        {err && state.email.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Email is required</label>}
                        {success && <label className='text-center w-100 mt-4 alert alert-success' style={{ color: 'green' }}>Please check email</label>}
                    </div>
                    <div className={'form-group'}>
                        <CustomButton customCLass={style.loginBtn} onClick={() => doForget()} btnStyle={{ background: '#B8136A', color: '#fff', width: 360, margin: '10px 0', textAlign: 'center', fontWeight: 'bold' }} title={loading ? 'Please wait' : "Submit"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword