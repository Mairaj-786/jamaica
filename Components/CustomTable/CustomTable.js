"use client"; // this is a client component

import React, { useState } from 'react'
import style from './custom-table.module.css'
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight, BsFillTrashFill } from 'react-icons/bs'
import { Checkbox } from 'antd';
import { deleteAdminMethod, deleteEventMethod, deleteNewsMethod, deleteUserMethod } from '@/hooks/user';
import MyToast from '../MyToast/MyToast';
import { useRouter } from 'next/navigation';

const CustomTable = (props) => {
    const router = useRouter()
    // pagination
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 8;
    const pagesVisited = pageNumber * usersPerPage;

    const pageCount = Math.ceil(props.data?.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    // ============================== doDeleteUser from user management begin===============================================//
    const doDeleteUser = async (data) => {
        let text;
        if (confirm("Are you sure!") == true) {
            text = "You pressed OK!";
            let succes = await deleteUserMethod(data._id)
            if (succes) {
                let check = props?.data?.filter((i) => i._id !== data._id)
                props.setUsers(check)
            }
        } else {
            text = "You canceled!";
        }

    }
    // ============================== doDeleteUser from user management end===============================================//
    // ============================== doDeleteUser from user management begin===============================================//
    const doDeleteAdmin = async (data) => {
        let text;
        if (confirm("Are you sure!") == true) {
            text = "You pressed OK!";
            let succes = await deleteAdminMethod(data._id)
            if (succes) {
                let check = props?.data?.filter((i) => i._id !== data._id)
                props.setUsers(check)
            }
        } else {
            text = "You canceled!";
        }

    }
    // ============================== doDeleteUser from user management end===============================================//
    // ============================== doDeleteNews from news management begin===============================================//
    const doDeleteNews = async (data) => {
        let text;
        if (confirm("Are you sure!") == true) {
            text = "You pressed OK!";
            let succes = await deleteNewsMethod(data._id)
            if (succes) {
                let check = props?.data?.filter((i) => i._id !== data._id)
                props.setUsers(check)
            }
        } else {
            text = "You canceled!";
        }

    }
    // ============================== doDeleteNews from news management end===============================================//

    // ============================== doDeleteEvents from user management begin===============================================//
    const doDeleteEvent = async (data) => {
        let text;
        if (confirm("Are you sure!") == true) {
            text = "You pressed OK!";
            let succes = await deleteEventMethod(data._id)
            if (succes) {
                let check = props?.data?.filter((i) => i._id !== data._id)
                if (check) {
                    location.reload()
                }
            }
        } else {
            text = "You canceled!";
        }
    }
    // ============================== doDeleteUser from user management end===============================================//


    const getMonthInLetters = (para) => {
        if (para == 1) {
            return "Jan"
        }
        else if (para == 2) {
            return "Feb"
        }
        else if (para == 3) {
            return "Mar"
        }
        else if (para == 4) {
            return "Apr"
        }
        else if (para == 5) {
            return "May"
        }
        else if (para == 6) {
            return "Jun"
        }
        else if (para == 7) {
            return "Jul"
        }
        else if (para == 8) {
            return "Aug"
        }
        else if (para == 9) {
            return "Sep"
        }
        else if (para == 10) {
            return "Oct"
        }
        else if (para == 11) {
            return "Nov"
        }
        else if (para == 12) {
            return "Dec"
        }
    }

    return (
        <>
            <MyToast />
            <div className={style.CustomTable}>
                <table class="table">
                    <thead>
                        <tr>
                            {
                                props.colums?.map((i, index) => (
                                    <th key={index}>{i.title}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {
                            // ============================================== Admin management =======================================//
                            props.adminManagement
                                ?
                                props.data?.filter((value) => {
                                    if (props.search == "") {
                                        return value;
                                    } else if (
                                        value?.firstname.toLowerCase().includes(props?.search?.toLowerCase())
                                    ) {
                                        return value;
                                    }
                                })?.slice(pagesVisited, pagesVisited + usersPerPage)?.map((_item, index) => (
                                    <tr key={index}>
                                        {
                                            props.check
                                                ?
                                                <td><Checkbox onChange={(e) => props.onChange(e, _item)}>{_item?.firstname}</Checkbox></td>
                                                :
                                                <td>{_item?.firstname}</td>
                                        }
                                        <td>{_item?.email}</td>
                                        <td style={{ color: _item?.role == 'ADMIN' ? '#13B8A0' : '#DF9411' }}>{_item?.role == 'ADMIN' ? 'Event Administrator' : 'Event Manager'}</td>
                                        <td style={{ color: '#B8136A', cursor: 'pointer' }} onClick={() => doDeleteAdmin(_item)}>Delete Admin</td>
                                        {/* <td style={{ color: '#B8136A', cursor: 'pointer' }}>View details</td> */}
                                    </tr>
                                ))
                                :
                                // ============================================== News management =======================================//

                                props?.newsManagement
                                    ?
                                    props.data?.filter((value) => {
                                        if (props.search == "") {
                                            return value;
                                        } else if (
                                            value?.title.toLowerCase().includes(props?.search?.toLowerCase())
                                        ) {
                                            return value;
                                        }
                                    })?.slice(pagesVisited, pagesVisited + usersPerPage)?.map((_item, index) => {
                                        const temp = _item?.createdAt
                                        const startDate = new Date(temp)

                                        return (
                                            <tr key={index}>
                                                <td>{`${getMonthInLetters(startDate.getMonth())}  ${startDate.getDate()}  ${startDate.getFullYear()}`}</td>
                                                <td>{_item?.title}</td>
                                                <td><img src={_item?.main_image} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 100 }} /></td>
                                                <td style={{ color: '#13B8A0', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => router.push(`/news/${_item._id}`)}>View Details</td>
                                                <td style={{ color: '#B8136A', cursor: 'pointer' }} onClick={() => doDeleteNews(_item)}>Delete News</td>
                                                {/* <td style={{ color: '#B8136A', cursor: 'pointer' }}>View details</td> */}
                                            </tr>
                                        )
                                    }
                                    )
                                    :
                                    // ============================================== Event management =======================================//
                                    props.eventManagement
                                        ?
                                        props.data?.filter((value) => {
                                            if (props.search == "") {
                                                return value;
                                            } else if (
                                                value?.name.toLowerCase().includes(props?.search?.toLowerCase())
                                            ) {
                                                return value;
                                            }
                                        })?.slice(pagesVisited, pagesVisited + usersPerPage)?.map((_item, index) => {
                                            let eventData = _item?.startDate
                                            return (
                                                <>
                                                    <tr key={index}>
                                                        <td>{_item.name}</td>
                                                        <td>{_item?.user?.firstname}</td>
                                                        <td>{eventData?.slice(4, 16)}</td>
                                                        <td style={{
                                                            color: _item.status == 'Approved' ? '#13B8A0' : _item.status == "Rejected" ? '#FF4242' : '#DF9411'
                                                            , fontWeight: '500'
                                                        }}>{_item?.status}</td>
                                                        <td style={{ color: '#B8136A', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => { doDeleteEvent(_item) }}><BsFillTrashFill fontSize={24} /></td>
                                                        <td style={{ color: '#B8136A', cursor: 'pointer' }} onClick={() => {
                                                            props.setEventModal(true)
                                                            props.setSelectedData(_item)
                                                        }}>View details</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                        )

                                        :
                                        props.userManagement
                                        &&
                                        props?.data?.filter((value) => {
                                            if (props.search == "") {
                                                return value;
                                            } else if (
                                                value?.firstname.toLowerCase().includes(props?.search?.toLowerCase())
                                            ) {
                                                console.log('value', value)
                                                return value;
                                            }
                                        })?.slice(pagesVisited, pagesVisited + usersPerPage)?.map((_item, index) => (
                                            <tr key={index}>
                                                <td>{_item.firstname}</td>
                                                <td>{_item?.lastname}</td>
                                                <td>{_item?.email}</td>
                                                <td style={{
                                                    color: !_item?.status == false ? '#13B8A0' : '#FF4242'
                                                    , fontWeight: '500'
                                                }}>{!_item?.status == false ? 'Active' : 'Inactive'}</td>
                                                <td style={{ color: '#B8136A', cursor: 'pointer' }} onClick={() => doDeleteUser(_item)}>Delete User</td>
                                            </tr>
                                        ))

                        }
                    </tbody>
                </table>
            </div>
            <div className={style.paginationbutton}>
                <ReactPaginate
                    previousLabel={<BsChevronLeft />}
                    nextLabel={<BsChevronRight />}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={style.paginationBttns}
                    previousLinkClassName={style.previousBttn}
                    nextLinkClassName={style.nextBttn}
                    disabledClassName={style.paginationDisabled}
                    activeClassName={style.paginationActive}
                />
            </div>
        </>
    )
}

export default CustomTable