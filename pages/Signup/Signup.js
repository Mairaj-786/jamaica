import React from 'react'
import style from './signup.module.css'
import { Checkbox } from 'antd';
import GoogleLogin from 'react-google-login';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { useState } from 'react';
import Link from 'next/link';
import { doSignUp } from '@/hooks/user';
import MyToast from '@/Components/MyToast/MyToast';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter()
    const responseGoogle = (response) => {
        console.log(response);
    }
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const [err, setErr] = useState(false)
    const [reType, setReType] = useState(false)
    const [retypePassword, setRetypePassword] = useState('')
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: "USER",

    })
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const doSignup = () => {
        if (state.email.length == 0 || state.password.length == 0 || state.firstname.length == 0 || state.lastname.length == 0) {
            setErr(true)
        } else if (state.password !== retypePassword) {
            setReType(true)
        }
        else {
            setErr(false)
            setReType(false)
            doSignUp(state, router)
        }
    }
    return (
        <>
            <MyToast />
            <div className={style.form}>
                <div className={style.formWrapper}>
                    <img src='/images/blackLogo.png' />
                    <b>Sign up</b>
                    <div className='form-group'>
                        <label>First Name</label>
                        <input name='firstname' value={state.firstname} onChange={handleChange} className='form-control' />
                        {err && state.firstname.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>First Name is required</label>}
                    </div>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input name='lastname' value={state.lastname} onChange={handleChange} className='form-control' />
                        {err && state.lastname.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Last Name is required</label>}

                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input name='email' value={state.email} onChange={handleChange} className='form-control' />
                        {err && state.email.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Email is required</label>}

                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input name='password' value={state.password} onChange={handleChange} type={'password'} className='form-control' />
                        {err && state.password.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Password is required</label>}

                    </div>
                    <div className='form-group'>
                        <label>Retype Password</label>
                        <input name='retypePassword' value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} type={'password'} className='form-control' />
                        {
                            reType
                                ?
                                reType && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Password not matched</label>
                                :
                                err && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Retype Password is required</label>

                        }

                    </div>
                    {/* <div className='form-group'> */}
                    {/* <div className={style.forget}>
                        <Checkbox onChange={onChange} className={style.forgetCheck}>Yes, I want to receive Top Events Jamaica emails
                        </Checkbox>
                    </div> */}
                    {/* </div> */}
                    <div className={'form-group'}>
                        <CustomButton customCLass={style.loginBtn} onClick={() => doSignup()} btnStyle={{ background: '#B8136A', color: '#fff', width: 360, margin: '10px 0', textAlign: 'center', fontWeight: 'bold' }} title="Sign up" />
                    </div>
                    {/* <div className={'form-group'}>
                    <Link to={'/register'}>Don't have account</Link>
                </div> */}
                    <div className={'form-group'}>
                        <p>Already have an account <Link href={'/login'}>Sign in</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup