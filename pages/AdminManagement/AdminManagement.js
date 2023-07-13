"use client"; // this is a client component

import CustomButton from '@/Components/CustomButton/CustomButton'
import CustomTable from '@/Components/CustomTable/CustomTable'
import MyModal from '@/Components/MyModal/MyModal';
import MyToast from '@/Components/MyToast/MyToast';
import { AddAdminMethod, deleteMutiUserMethod } from '@/hooks/admin';
import { getAdmin, getUsers } from '@/hooks/user';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import style from './style.module.css'
const AdminManagement = ({ search }) => {
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedList, setSelectedList] = useState([])
    let check = true

    const onChange = (e, data) => {
        if (e.target.checked) {
            setSelectedList((prev) => [...prev, data])
        } else {
            let check = selectedList.filter((i) => i.id !== data.id)
            setSelectedList(check)
        }
    };

    // Admin management colums & table data
    const colums = [
        {
            id: 1,
            title: 'First Name'
        },
        {
            id: 2,
            title: 'Email'
        },
        {
            id: 3,
            title: 'Role'
        },
        {
            id: 4,
            title: 'Action'
        },
    ]

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUser = async () => {
            let succes = await getAdmin()
            if (succes) {
                setUsers(succes)
            }
        }
        getUser()
    }, [])


    // Add Admin section
    const [err, setErr] = useState(false)
    const [confirm, setConfirm] = useState('')
    const [role, setRole] = useState('')
    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }
    // ************************************** Add ADmin begin *********************************************//
    const addAdmin = async () => {
        if (state.email?.length == 0 || state.password?.length == 0 || state.firstname?.length == 0) {
            setErr(true)
        } else if (state.password !== confirm) {
            toast.error('Password not match')
        }
        else {
            let data = { ...state, role }
            console.log(data)
            let success = await AddAdminMethod(data, setLoading)
            if (success) {
                setIsModalOpen(false)
                setState({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                })
            }
        }
    }
    // ************************************** Add ADmin end*********************************************//

    // ============================== Delete Admin ==================//
    const deleteMultiUser = () => {
        deleteMutiUserMethod(selectedList)
    }

    return (
        <>
            <MyToast />
            <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} content={
                <div className={style.addAdmin}>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='form-group mb-5'>
                                <label>First Name</label>
                                <input className='form-control' name="firstname" value={state.firstname} onChange={handleChange} />
                                {err && state.firstname.length <= 0 && <label className=' w-100 pt-2' style={{ color: 'red', fontSize: 14 }}>firstname  is required</label>}
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='form-group mb-5'>
                                <label>Last Name</label>
                                <input className='form-control' name="lastname" value={state.lastname} onChange={handleChange} />
                                {err && state.lastname.length <= 0 && <label className=' w-100 pt-2' style={{ color: 'red', fontSize: 14 }}>lastname  is required</label>}
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='form-group mb-5'>
                                <label>Email</label>
                                <input className='form-control' name="email" value={state.email} onChange={handleChange} />
                                {err && state.email.length <= 0 && <label className=' w-100 pt-2' style={{ color: 'red', fontSize: 14 }}>Email is required</label>}
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='form-group mb-5'>
                                <label>Password</label>
                                <input type={'password'} className='form-control' name="password" value={state.password} onChange={handleChange} />
                                {err && state.password.length <= 0 && <label className=' w-100 pt-2' style={{ color: 'red', fontSize: 14 }}>Password is required</label>}
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='form-group mb-5'>
                                <label>Confirm Password</label>
                                <input type={'password'} className='form-control' name="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                                {err && confirm.length <= 0 && <label className=' w-100 pt-2' style={{ color: 'red', fontSize: 14 }}>Confirm Password is required</label>}
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className={`form-group ${style.selectDropDown}`}>
                                <label>Role</label>
                                <img src='/icons/arrowDown.png' />
                                <Select
                                    labelInValue
                                    defaultValue={{
                                        label: 'Role',
                                    }}
                                    style={{
                                        width: '100%',
                                        overflow: 'hidden'
                                    }}
                                    onChange={(e) => setRole(e.key)}
                                    options={[
                                        {
                                            value: 'ADMIN',
                                            label: 'Super Admin',
                                        },
                                        {
                                            value: 'SUBADMIN',
                                            label: 'Event Administrator',
                                        },
                                    ]}
                                />

                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className={'form-group'}>
                                <CustomButton customCLass={style.addAdminBtn} onClick={() => addAdmin()} btnStyle={{ background: '#13B8A0', color: '#fff', width: 120, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title={loading ? 'Please wait...' : 'Add Admin'} />
                            </div>
                        </div>
                    </div>
                </div>
            } />
            <div className={style.AdminManagement}>
                <div className={style.AdminManagementbuttons}>
                    <div className={'form-group'}>
                        <CustomButton onClick={() => setIsModalOpen(true)} customCLass={style.loginBtn} btnStyle={{ background: '#13B8A0', color: '#fff', width: 200, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title="Add New Admin" />
                    </div>
                    {/* <div className={'form-group'}>
                        <CustomButton onClick={deleteMultiUser} customCLass={style.loginBtn} btnStyle={{ background: '#FF4242', color: '#fff', width: 100, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title="Delete" />
                    </div> */}
                </div>
                <CustomTable setUsers={setUsers}  onChange={onChange} colums={colums} data={users} adminManagement={true} search={search} />
            </div>
        </>
    )
}

export default AdminManagement