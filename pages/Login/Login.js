import React, { useEffect } from 'react'
import style from './login.module.css'
import { Checkbox } from 'antd'
import GoogleLogin from 'react-google-login'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { useState } from 'react'
import Link from 'next/link'
import { doSignIn, doSignUpWithGoogle } from '@/hooks/user'
import MyToast from '@/Components/MyToast/MyToast'
import { useRouter } from 'next/navigation'
import GoogleLoad from "../../Components/GoogleLoad"
const GAPI_CONFIG = {
  clientId:
    '136627394553-gfoiotc9iaubftfe3vi3ibdo0hmherj0.apps.googleusercontent.com',
  scope: 'email',
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const responseGoogle = (response) => {
    const firstname = response?.profileObj?.givenName
    const lastname = response?.profileObj?.familyName
    const email = response?.profileObj?.email
    const profile_image = response?.profileObj?.imageUrl
    const data = { firstname, lastname, email, profile_image }
    doSignUpWithGoogle(data, router)
  }
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }

  const [err, setErr] = useState(false)
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  function handleChange(evt) {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  const doLogin = async () => {
    if (state.email.length == 0 || state.password.length == 0) {
      setErr(true)
    } else {
      doSignIn(state, setLoading)
    }
  }


  return (
    <>
      <GoogleLoad />
      <MyToast />
      <div className={style.form}>
        <div className={style.formWrapper}>
          <img src='/images/blackLogo.png' />
          <b>Login</b>
          <GoogleLogin
            scope='email phone'
            render={(renderProps) => (
              <img
                onClick={renderProps.onClick}
                src='/icons/google.png'
                style={{
                  width: 360,
                  height: 40,
                  objectFit: 'fill',
                  cursor: 'pointer',
                  marginTop: '30px',
                }}
              />
            )}
            className={style.google}
            clientId={GAPI_CONFIG.clientId}
            buttonText='Login With Google'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          ,<div className={style.border}></div>
          <div className='form-group'>
            <label>Email</label>
            <input
              name='email'
              value={state.email}
              onChange={handleChange}
              className='form-control'
            />
            {err && state.email.length <= 0 && (
              <label
                className='text-center w-100 pt-2'
                style={{ color: 'red' }}
              >
                Email is required
              </label>
            )}
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              name='password'
              value={state.password}
              onChange={handleChange}
              type={'password'}
              className='form-control'
            />
            {err && state.password.length <= 0 && (
              <label
                className='text-center w-100 pt-2'
                style={{ color: 'red' }}
              >
                Password is required
              </label>
            )}
          </div>
          {/* <div className='form-group'> */}
          <div className={style.forget}>
            <Checkbox onChange={onChange} className={style.forgetCheck}>
              Remember Me
            </Checkbox>
            <Link href={'/forgot-password'}>
              <b>Forgot Password?</b>
            </Link>
          </div>
          {/* </div> */}
          <div className={'form-group'}>
            <CustomButton
              customCLass={style.loginBtn}
              onClick={() => doLogin()}
              btnStyle={{
                background: '#B8136A',
                color: '#fff',
                width: 360,
                margin: '10px 0',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              title={loading ? 'Please wait...' : 'Login'}
            />
          </div>
          <div className={'form-group'}>
            <p>
              {`Don't have account`} <Link href={'/signup'}>Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
