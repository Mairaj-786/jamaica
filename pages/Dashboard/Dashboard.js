import CustomButton from '@/Components/CustomButton/CustomButton'
import React, { useEffect, useState } from 'react'
import style from './dashboard.module.css'
import { Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import MyModal from '@/Components/MyModal/MyModal'
import { SingleImageUpload } from '@/hooks/requests'
import MyToast from '@/Components/MyToast/MyToast'
import { addBadWordMethod, addNewsMethod, doSendEmail, updateBadWordMethod } from '@/hooks/admin'
import Loader from '@/Components/Loader/Loader'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { getAllEvents } from '@/hooks/events'
import { getAllUsers, getUsers } from '@/hooks/user'
import { toast } from 'react-toastify'
const Dashboard = ({ user, allwords }) => {

    // =================== Dirty words ===============================//
    const [allBadWords, setAllBadWords] = useState()
    useEffect(() => {
        if (allwords) {
            setAllBadWords(allwords)
        }
    }, [allwords])
    const updateBadWords = async () => {
        let data = { words: allBadWords }
        let success = await updateBadWordMethod(data, setLoading)
        if (success) {
            setToggle(false)
        }
    }
    // =================== Dirty words ===============================//
    // ========================== ADD BAD WORDS BEGIN ===================//
    const [words, setWords] = useState('')
    const [toggle, setToggle] = useState(false)

    const addBadWords = async () => {
        let data = { words }
        let success = await addBadWordMethod(data, setLoading)
        if (success) {
            await setWords('')
            allBadWords.push(words)
        }
    }
    // ========================== ADD BAD WORDS END ===================//

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenAddKeyWord, setIsModalOpenAddKeyWord] = useState(false)
    const [isModalOpenSendEmails, setIsModalOpenSendEmails] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)



    const [state, setState] = useState({
        title: '',
        description: '',
    })


    function handleChange(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }
    // ==============Get All Events & All Users=====================//

    const [events, setEvents] = useState([])
    const [approveEvents, setApproveEvents] = useState([])
    const [rejectedEvents, setRejectedEvents] = useState([])

    const [allUsers, setAllUsers] = useState([])
    const [activeUsers, setActiveUsers] = useState([])
    const [inactiveUsers, setInactiveUsers] = useState([])

    useEffect(() => {
        const getEvents = async () => {
            let resp = await getAllEvents(setEvents)
            if (resp) {
                let findApprove = resp.filter((i) => i.status == "Approved")
                let findRejected = resp.filter((i) => i.status == "Rejected")
                setApproveEvents(findApprove)
                setRejectedEvents(findRejected)
                setEvents(resp)
            }
        }
        getEvents()
        const getUser = async () => {
            let allusers = await getUsers()
            if (allusers) {
                let findApprove = allusers?.filter((i) => i?.status == true)
                let findRejected = allusers?.filter((i) => i?.status == false)
                setActiveUsers(findApprove)
                setInactiveUsers(findRejected)
                setAllUsers(allusers)
            }
        }
        getUser()
    }, [])

    // ==============Get All Events & All Users=====================//

    // ==============Chart=====================//
    const eventData = {
        labels: [
            'Total Events',
            'Approved ',
            'Rejected '
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [events?.length, approveEvents?.length, rejectedEvents?.length],
            backgroundColor: [
                '#B8136A',
                '#13B8A0',
                '#FF4242',
            ],
            hoverOffset: 4
        }]
    };
    const usersData = {
        labels: [
            'Total Users',
            'Inactive ',
            'Active ',
        ],
        datasets: [{
            label: 'My ',
            data: [allUsers?.length, activeUsers?.length, inactiveUsers?.length],
            backgroundColor: [
                '#01A1E2',
                '#CE42FF',
                '#DF9411',
            ],
            hoverOffset: 4
        }]
    };

    //line chart data
    const dataLine = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "2022",
                data: [10, 20, 55, 60, 20, 100, 50, 25, 70, 40, 10, 50],
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "2023",
                data: [20, 35, 40, 60, 50, 10, 50, 25, 90, 30, 120, 50],
                backgroundColor: "#13B8A0",
                borderColor: "lightgreen",
                fill: false,
                lineTension: 0,
                radius: 5
            }
        ]
    };
    const options = {
        responsive: true,
        title: {
            display: true,
            position: "top",
            text: "Line Graph",
            fontSize: 18,
            fontColor: "#111"
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 16
            }
        }
    };

    // =================== Send Emails =============
    const [body, setBody] = useState('')
    const sendEmail = async () => {
        if (body) {
            let res = await doSendEmail({ body }, setLoading)
            if (res) {
                setBody('')
                setIsModalOpenSendEmails(false)
            }

        } else {
            toast.error('Body is requiest')
        }
    }

    // =================== Send Emails =============







    return (
        <>
            <MyToast />
            
            <MyModal isModalOpen={isModalOpenSendEmails} setIsModalOpen={setIsModalOpenSendEmails}
                content={
                    <div className={style.addAdmin}>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='form-group '>
                                    <label>Description</label>
                                    <textarea name="description" value={body} onChange={(e) => setBody(e.target.value)} className='form-control' />
                                    {/* {err && state.firstName.length <= 0 && <label className=' w-100 pt-2' style={{ color: 'red', fontSize: 14 }}>firstName  is required</label>} */}
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className={'form-group'}>
                                    <CustomButton customCLass={style.addAdminBtn} onClick={sendEmail} btnStyle={{ background: '#B8136A', color: '#fff', width: 190, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title={loading ? 'Please wait...' : 'Send Email'} />
                                </div>
                            </div>
                        </div>
                    </div>
                } />
            <MyModal isModalOpen={isModalOpenAddKeyWord} setIsModalOpen={setIsModalOpenAddKeyWord} content={
                <div className={style.addAdmin}>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='form-group '>
                                {/* <label>Add words (Comma Seperated)</label> */}
                                <label>Add Bad word </label>
                                <textarea value={words} onChange={(e) => setWords(e.target.value)} className='form-control' />
                                <div className='row'>
                                    {
                                        allBadWords?.map((i, index) => (
                                            <div className='col-md-3' key={index}>
                                                <div className={style.badLetters}>
                                                    <b>{i}</b>
                                                    <AiOutlineCloseCircle onClick={() => {
                                                        let check = allBadWords?.filter((n) => n !== i)
                                                        setAllBadWords(check)
                                                        setToggle(true)
                                                    }} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* {err && state.firstName.length <= 0 && <label className=' w-100 pt-2' style={{ color: 'red', fontSize: 14 }}>firstName  is required</label>} */}
                            </div>
                        </div>
                        {
                            !toggle
                                ?
                                <div className='col-lg-12 '>
                                    <div className={'form-group'}>
                                        <CustomButton customCLass={style.addAdminBtn} onClick={addBadWords} btnStyle={{ background: '#B8136A', color: '#fff', width: 120, margin: '10px 0 0 auto', textAlign: 'center', fontWeight: '400' }} title={loading ? 'Wait...' : 'Save'} />
                                    </div>
                                </div>
                                :
                                <div className='col-lg-12 '>
                                    <div className={'form-group'}>
                                        <CustomButton customCLass={style.addAdminBtn} onClick={updateBadWords} btnStyle={{ background: '#DF9411', color: '#fff', width: 120, margin: '10px 0 0 auto', textAlign: 'center', fontWeight: '400' }} title={loading ? 'Please wait..' : 'Update words'} />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            } />
            <div>
                <div className="row">
                    <div className="col-lg-10 col-md-10">
                        <div className={style.charts}>
                            <div className='row m-auto'>
                                <div className='col-lg-6 col-md-6 col-12'>
                                    <div className={style.chartsWrapper}>
                                        <Pie data={eventData} style={{ width: '100%', height: '100%' }} />
                                    </div>
                                </div>
                                <div className='col-lg-6 col-md-6 col-12'>
                                    <div className={style.chartsWrapper}>
                                        <Pie data={usersData} style={{ width: '100%', height: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-12 ml-auto">
                        <div className='row'>
                            <div className='col-lg-12 mt-2'>
                                <div className={style.addNews}>
                                    <CustomButton onClick={() => setIsModalOpenSendEmails(true)} customCLass={style.loginBtn} btnStyle={{ background: '#13B8A0', color: '#fff', width: 120, margin: '0px 0', textAlign: 'center', fontWeight: '400' }} title="Send Emails" />
                                </div>
                            </div>
                            <div className='col-lg-12 mt-3'>
                                <div className={style.badWords}>
                                    <b>
                                        Add prohibited words to refrain from reviews.
                                    </b>
                                    <CustomButton onClick={() => setIsModalOpenAddKeyWord(true)} customCLass={style.loginBtn} btnStyle={{ background: '#DF9411', color: '#fff', width: 120, margin: '0px 0', textAlign: 'center', fontWeight: '400' }} title="Add Words" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.chartsWrapperLine}>
                    <Line options={options} data={dataLine} style={{ maxWidth: '100%', maxHeight: 300 }} />
                </div>
            </div>
        </>
    )
}

export default Dashboard