import GoogleAutoPlace from '@/Components/GoogleAutoPlace/GoogleAutoPlace';
import Loader from '@/Components/Loader/Loader';
import MyToast from '@/Components/MyToast/MyToast';
import { AddEventMethod } from '@/hooks/events';
import { SingleImageUpload } from '@/hooks/requests';
import { Select } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import CustomButton from '../../Components/CustomButton/CustomButton'
import style from './addEvent.module.css'
const AddEvent = ({ user }) => {
    return (
        <div className={style.addEvent}>
            <div className={style.Hero}>
                <div className={style.HeroLeftSvg}>
                    <img src='/images/eventHero1.png' />
                </div>
                <div className={style.HeroRightSvg}>
                    <img src='/images/eventHero2.png' />
                </div>
                <div className={style.HeroText}>
                    <h1>Submit Event</h1>
                    <p>
                        All applications will be submitted for review to ensure that criteria have been satisfactorily met.
                        A Top Events Jamaica representative will be in touch with you within 7 days of submission.
                    </p>
                </div>
            </div>
            <SubmitForm user={user} />
        </div>
    )
}

const SubmitForm = ({ user }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [err, setErr] = useState(false)
    const [state, setState] = useState({
        name: '',
        shortDescription: '',
        // endDate: '',
        instagramLink: '',
        facebookLink: '',
        twitterLink: '',
        lastName: '',
        startDate: '',
        firstName: '',
        eventImage: '',
        nameOfOrganization: '',
        email: '',
        drive: '',
        ticketPrice: null,
        phoneNumber: '',
    })
    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }
    const [address, setAddres] = useState('')
    const [ticketOutletTemp, setOutletsTemp] = useState('')
    const [ticketOutlet, setOutlets] = useState([])
    const [category, setCategory] = useState('Entertainment')
    const [activity, setEventActivity] = useState('Family')
    const [parish, setEventParish] = useState('Clarendon Parish')
    const [startTime, setStartTimeEvent] = useState('3:15 PM')
    const [endTime, setEndTimeEvent] = useState('3:15 PM')
    const [phoneNumberType, setPhoneNumberType] = useState('')
    const [eventImage, setEventImage] = useState('')
    const [phoneNumber1, setPhoneNumber1] = useState('')
    // select dropdown values end

    const doSubmit = async () => {
        // if (state.startDate > state.endDate) {
        //     toast.error('End date should be greater than Start date')
        // } else {

        let selectData = { user: user?._id, eventImage, ticketOutlet, category, activity, parish, startTime, endTime, phoneNumberType, address }
        let data = { ...state, ...selectData }
        let success = await AddEventMethod(data, setLoading)
        if (success) {
            router.push('/')
        }
        // }

    }

    const typeOfEvents = [
        {
            value: 'Entertainment',
            label: 'Entertainment',
        },
        {
            value: 'Sports',
            label: 'Sports',
        },
        {
            value: 'Conference',
            label: 'Conferences',
        },
        {
            value: 'HealthandWellness',
            label: 'Health & Wellness',
        },
        {
            value: 'Shopping',
            label: 'Shopping',
        },
        {
            value: 'Food',
            label: 'Food',
        },
    ]

    const parishItems = [

        {
            value: 'Clarendon Parish',
            label: 'Clarendon Parish',
        },
        {
            value: 'Hanover Parish',
            label: 'Hanover Parish',
        },
        {
            value: 'Kingston Parish',
            label: 'Kingston Parish',
        },
        {
            value: 'Manchester Parish',
            label: 'Manchester Parish',
        },
        {
            value: 'Portland Parish',
            label: 'Portland Parish',
        },
        {
            value: 'St.Andrew Parish',
            label: 'St.Andrew Parish',
        },
        {
            value: 'St.Ann Parish',
            label: 'St.Ann Parish',
        },
        {
            value: 'St.Catherine Parish',
            label: 'St.Catherine Parish',
        },
        {
            value: 'St.Elizabeth Parish',
            label: 'St.Elizabeth Parish',
        },
        {
            value: 'St.James Parish',
            label: 'St.James Parish',
        },
        {
            value: 'St.Mary Parish',
            label: 'St.Mary Parish',
        },
        {
            value: 'St.Thomas Parish',
            label: 'St.Thomas Parish',
        },
        {
            value: 'Trelawny Parish',
            label: 'Trelawny Parish',
        },
        {
            value: 'Westmoreland Parish',
            label: 'Westmoreland Parish',
        },
    ]

    const startTimeItems = [
        {
            value: '3:15 PM',
            label: '3:15 PM',
        },
        {
            value: '3:30 PM',
            label: '3:30 PM',
        },
        {
            value: '3:45 PM',
            label: '3:45 PM',
        },
        {
            value: '4:00 PM',
            label: '4:00 PM',
        },
        {
            value: '4:15 PM',
            label: '4:15 PM',
        },
        {
            value: '4:30 PM',
            label: '4:30 PM',
        },
        {
            value: '4:45 PM',
            label: '4:45 PM',
        },
        {
            value: '5:00 PM',
            label: '5:00 PM',
        },
        {
            value: '5:15 PM',
            label: '5:15 PM',
        },
        {
            value: '5:30 PM',
            label: '5:30 PM',
        },
        {
            value: '5:45 PM',
            label: '5:45 PM',
        },
        {
            value: '6:00 PM',
            label: '6:00 PM',
        },
        {
            value: '6:15 PM',
            label: '6:15 PM',
        },
        {
            value: '6:30 PM',
            label: '6:30 PM',
        },
        {
            value: '6:45 PM',
            label: '6:45 PM',
        },
        {
            value: '7:00 PM',
            label: '7:00 PM',
        },
        {
            value: '7:15 PM',
            label: '7:15 PM',
        },
        {
            value: '7:30 PM',
            label: '7:30 PM',
        },
        {
            value: '7:45 PM',
            label: '7:45 PM',
        },
        {
            value: '8:00 PM',
            label: '8:00 PM',
        },
        {
            value: '8:10 PM',
            label: '8:10 PM',
        },
        {
            value: '8:30 PM',
            label: '8:30 PM',
        },
        {
            value: '8:45 PM',
            label: '8:45 PM',
        },
        {
            value: '9:00 PM',
            label: '9:00 PM',
        },
        {
            value: '9:15 PM',
            label: '9:15 PM',
        },
        {
            value: '9:30 PM',
            label: '9:30 PM',
        },
        {
            value: '9:45 PM',
            label: '9:45 PM',
        },
        {
            value: '10:00 PM',
            label: '10:00 PM',
        },
        {
            value: '10:15 PM',
            label: '10:15 PM',
        },
        {
            value: '10:30 PM',
            label: '10:30 PM',
        },
        {
            value: '10:45 PM',
            label: '10:45 PM',
        },
        {
            value: '11:00 PM',
            label: '11:00 PM',
        },
        {
            value: '11:15 PM',
            label: '11:15 PM',
        },
        {
            value: '11:45 PM',
            label: '11:45 PM',
        },
        {
            value: '12:00 AM',
            label: '12:00 AM',
        },
        {
            value: '1:00 AM',
            label: '1:00 AM',
        },
        {
            value: '1:15 AM',
            label: '1:15 AM',
        },
        {
            value: '1:30 AM',
            label: '1:30 AM',
        },
        {
            value: '1:45 AM',
            label: '1:45 AM',
        },
        {
            value: '2:00 AM',
            label: '2:00 AM',
        },
        {
            value: '2:15 AM',
            label: '2:15 AM',
        },
        {
            value: '2:30 AM',
            label: '2:30 AM',
        },
        {
            value: '3:45 AM',
            label: '3:45 AM',
        },
        {
            value: '3:00 AM',
            label: '3:00 AM',
        },
        {
            value: '3:15 AM',
            label: '3:15 AM',
        },
        {
            value: '3:30 AM',
            label: '3:30 AM',
        },
        {
            value: '3:45 AM',
            label: '3:45 AM',
        },
        {
            value: '4:00 AM',
            label: '4:00 AM',
        },
        {
            value: '4:15 AM',
            label: '4:15 AM',
        },
        {
            value: '4:30 AM',
            label: '4:30 AM',
        },
        {
            value: '4:45 AM',
            label: '4:45 AM',
        },
        {
            value: '5:00 AM',
            label: '5:00 AM',
        },
        {
            value: '5:15 AM',
            label: '5:15 AM',
        },
        {
            value: '5:30 AM',
            label: '5:30 AM',
        },
        {
            value: '5:45 AM',
            label: '5:45 AM',
        },
        {
            value: '6:00 AM',
            label: '6:00 AM',
        },
        {
            value: '6:15 AM',
            label: '6:15 AM',
        },
        {
            value: '6:30 AM',
            label: '6:30 AM',
        },
        {
            value: '6:45 AM',
            label: '6:45 AM',
        },
        {
            value: '7:00 AM',
            label: '7:00 AM',
        },
        {
            value: '7:15 AM',
            label: '7:15 AM',
        },
        {
            value: '7:30 AM',
            label: '7:30 AM',
        },
        {
            value: '7:45 AM',
            label: '7:45 AM',
        },
        {
            value: '8:00 AM',
            label: '8:00 AM',
        },
        {
            value: '8:15 AM',
            label: '8:15 AM',
        },
        {
            value: '8:30 AM',
            label: '8:30 AM',
        },
        {
            value: '8:45 AM',
            label: '8:45 AM',
        },
        {
            value: '9:00 AM',
            label: '9:00 AM',
        },
        {
            value: '9:15 AM',
            label: '9:15 AM',
        },
        {
            value: '9:30 AM',
            label: '9:30 AM',
        },
        {
            value: '9:45 AM',
            label: '9:45 AM',
        },
        {
            value: '10:00 AM',
            label: '10:00 AM',
        },
        {
            value: '10:15 AM',
            label: '10:15 AM',
        },
        {
            value: '10:30 AM',
            label: '10:30 AM',
        },
        {
            value: '10:45 AM',
            label: '10:45 AM',
        },
        {
            value: '11:00 AM',
            label: '11:00 AM',
        },
        {
            value: '11:15 AM',
            label: '11:15 AM',
        },
        {
            value: '11:30 AM',
            label: '11:30 AM',
        },
        {
            value: '11:45 AM',
            label: '11:45 AM',
        },
        {
            value: '12:00 AM',
            label: '12:00 AM',
        },


    ]

    return (
        <>
            <MyToast />
            {
                loading
                    ?
                    <Loader />
                    :
                    <div className={style.bg}>
                        <div className={style.SubmitForm}>
                            <div className={style.SubmitFormWrapper}>
                                <h5>Event Information</h5>
                                <p>Please fill out this event application form carefully.</p>
                                <div className='form-group mt-5 mb-5'>
                                    <label>Name of Event **</label>
                                    <input className='form-control' name="name" value={state.name} onChange={handleChange} />
                                    <img src='/SVG/yellow.png' className={style.yellow} />
                                    {err && state.name.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Event Name is required</label>}
                                </div>
                                <div className='form-group mt-5 mb-5'>
                                    <label>Short description of the event **</label>
                                    <textarea className='form-control' name="shortDescription" value={state.shortDescription} onChange={handleChange} />
                                    {err && state.shortDescription.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Write Short description </label>}
                                </div>
                                <div className={`form-group mt-5 mb-5 ${style.selectDropDown}`}>
                                    <label>Type of Event</label>
                                    <img src='/icons/arrowDown.png' />
                                    <select class="form-control" onChange={(e) => setCategory(e.target.value)} id="exampleFormControlSelect1">
                                        {
                                            typeOfEvents.map((i, ind) => (
                                                <option value={i.value} key={ind}>{i.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className={`form-group mt-5 mb-5 ${style.selectDropDown}`}>
                                    <label>Event Activity</label>
                                    <img src='/icons/arrowDown.png' />
                                    <select class="form-control" onChange={(e) => setEventActivity(e.target.value)} id="exampleFormControlSelect1">
                                        <option value={'Family'} >Family Friendly</option>
                                        <option value={'Adult'} >Adults</option>
                                    </select>
                                </div>
                                <div className={`form-group mt-5 mb-5 ${style.selectDropDown}`}>
                                    <label>Event Parish</label>
                                    <img src='/icons/arrowDown.png' />
                                    <select class="form-control" onChange={(e) => setEventParish(e.target.value)} id="exampleFormControlSelect1">
                                        {
                                            parishItems.map((i, ind) => (
                                                <option value={i.value} key={ind}>{i.label}</option>
                                            ))
                                        }
                                    </select>

                                </div>
                                <div className='form-group mt-5 mb-5'>
                                    <label>Event Street Address **</label>
                                    {/* <input placeholder='Event Street Address' className='form-control' name="address" value={state.address} onChange={handleChange} />
                                    {err && state.address.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Street Address is required</label>} */}
                                    <GoogleAutoPlace setAddres={setAddres} address={address} />
                                </div>
                                <div className='form-group mt-5 mb-5'>
                                    <label>Start Date of Event **</label>
                                    <input type={'date'} className='form-control' name="startDate" value={state.startDate} onChange={handleChange} />
                                    {err && state.startDate.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Start Date is required</label>}
                                </div>
                                <div className={`form-group mt-5 mb-5 ${style.selectDropDown}`}>
                                    <label>Start Time of Event</label>
                                    <img src='/icons/arrowDown.png' />
                                    <select class="form-control" onChange={(e) => setStartTimeEvent(e.target.value)} id="exampleFormControlSelect1">
                                        {
                                            startTimeItems.map((i, ind) => (
                                                <option value={i.value} key={ind}>{i.label}</option>
                                            ))
                                        }
                                    </select>
                                    {/* startTimeItems */}
                                </div>
                                {/* <div className='form-group mt-5 mb-5'>
                                    <label>End Date of Event **</label>
                                    <input type={'date'} placeholder='01/10/2023' className='form-control' name="endDate" value={state.endDate} onChange={handleChange} />
                                    {err && state.endDate.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Start Date is required</label>}
                                </div> */}
                                {/* <div className={`form-group mt-5 mb-5 ${style.selectDropDown}`}>
                                    <label>End Time of Event</label>
                                    <img src='/icons/arrowDown.png' />
                                    <select class="form-control" onChange={(e) => setEndTimeEvent(e.target.value)} id="exampleFormControlSelect1">
                                        {
                                            startTimeItems.map((i, ind) => (
                                                <option value={i.value} key={ind}>{i.label}</option>
                                            ))
                                        }
                                    </select>

                                </div> */}
                                <div className='form-group mt-5 mb-5'>
                                    <label>Social media</label>
                                    <div className='row'>
                                        <div className='col-lg-4'>
                                            <label style={{ color: '#B8136A' }}>Instagram : @</label>
                                            <input className='form-control' name="instagramLink" value={state.instagramLink} onChange={handleChange} />
                                        </div>
                                        <div className='col-lg-4'>
                                            <label style={{ color: '#B8136A' }}>Facebook : @</label>
                                            <input className='form-control' name="facebookLink" value={state.facebookLink} onChange={handleChange} />
                                        </div>
                                        <div className='col-lg-4'>
                                            <label style={{ color: '#B8136A' }}>Twitter : @</label>
                                            <input className='form-control' name="twitterLink" value={state.twitterLink} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`form-group mt-5 mb-5 ${style.ticketOutlet}`}>
                                    {/* <img src='/icons/plus-circle.png' /> */}
                                    <label>Ticket Outlets</label>
                                    <div className={style.ticketOutletBox}>
                                        {
                                            ticketOutlet?.map((i, index) => (
                                                <div key={index} className={style.ticketOutletBoxWrapper}>
                                                    <AiOutlineCloseCircle size={14} onClick={() => {
                                                        let check = ticketOutlet.filter((c) => c !== i)
                                                        setOutlets(check)
                                                    }} />
                                                    <b>{i}</b>
                                                </div>
                                            ))
                                        }
                                        <div className={style.ticketOutletBoxWrapperInput}>
                                            <input value={ticketOutletTemp} onChange={(e) => setOutletsTemp(e.target.value)} className='form-control' placeholder='Type Outlet Hit Enter' onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    setOutlets((prev) => [...prev, e.target.value])
                                                    setOutletsTemp('')
                                                }
                                            }} />
                                        </div>
                                    </div>
                                    {/* <input className='form-control' name="ticketPrice" value={state.ticketPrice} onChange={handleChange} /> */}
                                    {err && state.startDate.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Ticket Price is required</label>}
                                </div>
                                <div className='form-group mt-5 mb-5'>
                                    <label>Ticket Price **</label>
                                    <input type={'number'} className='form-control' name="ticketPrice" value={state.ticketPrice} onChange={handleChange} />
                                    {err && state.startDate.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Ticket Price is required</label>}
                                </div>
                                <div className='form-group mt-5 mb-5'>
                                    <label>{uploadLoading ? 'Please wait' : eventImage ? 'Uploaded' : 'Upload Event Image **'}</label>
                                    <input onChange={async (e) => {
                                        let image = e.target.files[0]
                                        let res = await SingleImageUpload(image, setUploadLoading)
                                        if (res) {
                                            console.log(res)
                                            setEventImage(res)
                                        }
                                    }} type="file" className='form-control' style={{ paddingTop: 3 }} />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <img src='/SVG/purpleLine.png' className={style.PurpleLineBottom} />
                                    <label>
                                        {`Promoter's information`}
                                    </label>
                                    <div className='form-group mt-5 mb-5'>
                                        <label>First Name **</label>
                                        <input className='form-control' name="firstName" value={state.firstName} onChange={handleChange} />
                                        {err && state.firstName.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>First Name is required</label>}
                                    </div>
                                    <div className='form-group mt-5 mb-5'>
                                        <label>Last Name **</label>
                                        <input className='form-control' name="lastName" value={state.lastName} onChange={handleChange} />
                                        {err && state.lastName.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Last Name is required</label>}
                                    </div>
                                    <div className='form-group mt-5 mb-5'>
                                        <label>Name of Organisation **</label>
                                        <input className='form-control' name="nameOfOrganization" value={state.nameOfOrganization} onChange={handleChange} />
                                        {err && state.nameOfOrganization.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Name of Organisation is required</label>}
                                    </div>
                                    <div className='form-group mt-5 mb-5'>
                                        <label>Email Address **</label>
                                        <input className='form-control' name="email" value={state.email} onChange={handleChange} />
                                        {err && state.email.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Email is required</label>}
                                    </div>
                                    <div className='form-group mt-5 mb-5'>
                                        <label>Primary Phone Pumber **</label>
                                        <div className='row no-gutters'>
                                            <div className='col-lg-2 col-md-2 col-3'>
                                                <div className={`form-group ${style.selectDropDown}`}>
                                                    <img src='/icons/arrowDown.png' style={{ top: 17, right: 10 }} />
                                                    <Select
                                                        labelInValue
                                                        defaultValue={{
                                                            label: 'Landline',
                                                        }}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        onChange={(e) => setPhoneNumberType(e.key)}
                                                        options={[
                                                            {
                                                                value: 'Landline',
                                                                label: 'Landline',
                                                            },
                                                            {
                                                                value: 'Mobile',
                                                                label: 'Mobile',
                                                            },

                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                            <div className={`col-lg-2 col-md-2 col-3 ${style.landLines}`}>
                                                <div className={`form-group ${style.selectDropDown}`}>
                                                    <img src='/icons/arrowDown.png' style={{ top: 17, right: 10 }} />
                                                    <Select
                                                        labelInValue
                                                        defaultValue={{
                                                            label: '1-876',
                                                        }}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        onChange={(e) => setPhoneNumber1(e.key)}
                                                        options={[
                                                            {
                                                                value: '1-876',
                                                                label: '1-876',
                                                            },
                                                            {
                                                                value: '1-658',
                                                                label: '1-658',
                                                            },

                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-lg-8 col-md-8 col-6'>
                                                <div className={style.landLine}>
                                                    <input className='form-control' name='phoneNumber' value={state.phoneNumber} onChange={handleChange} placeholder='XXXXXXX' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group mt-5 mb-5'>
                                        <label>Google Drive Link for all permits and documents</label>
                                        <input className='form-control' name="drive" value={state.drive} onChange={handleChange} />
                                        {/* {err && state.drive.length <= 0 && <label className='text-center w-100 pt-2' style={{ color: 'red' }}>Drive is required</label>} */}
                                    </div>
                                    <div className='form-group mt-5 mb-5'>
                                        <label>OR</label>
                                    </div>
                                    <div className='form-group mt-5 mb-5'>
                                        <label>Upload a document</label>
                                        <input type="file" className='form-control' accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf" style={{ paddingTop: 3 }} />
                                    </div>
                                </div>
                                <div className={'form-group'}>
                                    <CustomButton customCLass={style.loginBtn} onClick={() => doSubmit()} btnStyle={{ background: '#B8136A', color: '#fff', width: 160, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title="Submit Event" />
                                </div>

                            </div>

                        </div>
                    </div>
            }
        </>
    )
}


export default AddEvent