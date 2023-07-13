import React from 'react'
import style from './reset.module.css'
import CustomButton from '../../Components/CustomButton/CustomButton';
import { useState } from 'react';
import MyToast from '@/Components/MyToast/MyToast';
import { toast } from 'react-toastify';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { doResetPassword } from '@/hooks/user';


const ResetPassword = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    let token = searchParams.get('token')
    console.log(token)
    const [err, setErr] = useState(false)
    const [state, setState] = useState({
        password: '',
        confirmPassword: '',
        token
    })
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const doReset = () => {
        if (state.password.length == 0 || state.confirmPassword.length == 0) {
            setErr(true)
        } else if (state.password !== state.confirmPassword) {
            toast.error('Password not match ')
        }
        else {
            doResetPassword(state, router)
        }
    }
    return (
        <>
            <MyToast />
            <div className={style.form}>
                <div className={style.formWrapper}>
                    <img src='/images/blackLogo.png' />
                    <b className='pb-4 pt-4'>Reset Password</b>
                    <div className='form-group'>
                        <label>Type your new password</label>
                        <input name='password' value={state.password} onChange={handleChange} type={'password'} className='form-control' />
                        {err && state.password.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Password is required</label>}

                    </div>
                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input name='confirmPassword' value={state.confirmPassword} onChange={handleChange} type={'password'} className='form-control' />
                        {err && state.confirmPassword.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Confirm password is required</label>}

                    </div>
                    <div className={'form-group'}>
                        <CustomButton customCLass={style.loginBtn} onClick={() => doReset()} btnStyle={{ background: '#B8136A', color: '#fff', width: 360, margin: '10px 0', textAlign: 'center', fontWeight: 'bold' }} title="Reset" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword