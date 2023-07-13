"use client"; // this is a client component

import React, { useEffect, useState } from 'react'
import CustomButton from '../../Components/CustomButton/CustomButton'
import style from './entertainment.module.css'
import SelectButtonView from '../../Components/SelectButtonView/SelectButtonView'
import { Slider, Checkbox, Skeleton, Select, Radio } from 'antd';
import EventView from '../../Components/EventView/EventView';
import CustomCalendar from '../../Components/CustomCalendar/CustomCalendar';
import { useRouter } from 'next/navigation';
const Entertainment = ({ events, setMinPrice, setMaxPrice, days, setDays, loading }) => {
    const router = useRouter()


    // =================Location for Filter data with Parish Location ==================
    const [location, setLocation] = useState('')
    // =================Location for Filter data with Parish Location ==================



    // ============filtered data=============
    let filterFamily = events?.filter((i) => i.activity == "Family")
    let filterAdult = events?.filter((i) => i.activity == "Adult")
    console.log('filterFamily', filterFamily)
    // ============filtered data=============
    const [active, setActive] = useState(0)
    const [toggle, setToggle] = useState(1)
    const tabList = [
        {
            id: 0,
            title: 'All'
        },
        {
            id: 1,
            title: 'Family Friendly'
        },
        {
            id: 2,
            title: 'Adults Only'
        },
    ]

    // ========================================= Events for Calendar View =================================//
    let temp = [];
    const findDate = () => {
        active == 0
            ?
            events?.filter((value) => {
                if (location == "") {
                    return value;
                } else if (
                    value?.parish?.toLowerCase().includes(location.toLowerCase())
                ) {
                    console.log('value', value)
                    return value;
                }
            })?.map((i) => {
                let id = i._id
                let startDate = i.startDate
                let endDate = i.endDate
                let date = new Date(i.startDate)
                let title = i.name
                temp.push({ id, date, title, startDate, endDate })

            })
            :
            active == 1
                ?

                filterFamily?.filter((value) => {
                    if (location == "") {
                        return value;
                    } else if (
                        value?.parish?.toLowerCase().includes(location.toLowerCase())
                    ) {
                        console.log('value', value)
                        return value;
                    }
                })?.map((i) => {
                    let id = i._id
                    let startDate = i.startDate
                    let endDate = i.endDate
                    let date = new Date(i.startDate)
                    let title = i.name
                    temp.push({ id, date, title, startDate, endDate })

                })
                :
                active == 2
                &&
                events?.filter((value) => {
                    if (location == "") {
                        return value;
                    } else if (
                        value?.parish?.toLowerCase().includes(location.toLowerCase())
                    ) {
                        console.log('value', value)
                        return value;
                    }
                })?.map((i) => {
                    let id = i._id
                    let startDate = i.startDate
                    let endDate = i.endDate
                    let date = new Date(i.startDate)
                    let title = i.name
                    temp.push({ id, date, title, startDate, endDate })

                })
    }

    useEffect(() => {
        findDate()
    }, [temp])
    // ========================================= Events for Calendar View =================================//

    const items = [
        {
            id: 1,
            img: 'https://propakistani.pk/wp-content/uploads/2021/12/events-2021-PP.jpg',
            date: new Date(2023, 1, 13),
        },
        {
            id: 2,
            img: 'https://uploads-ssl.webflow.com/5ff4e43997c4ec6aa5d646d1/603d547ed5c5fd6365dabbef_industry%20expert%20roundup%20-%20why%20are%20events%20important.png'
            , date: new Date(2023, 1, 21),
        },
        {
            id: 3,
            img: 'https://www1.chester.ac.uk/sites/default/files/styles/hero/public/Events%20Management%20festival%20image.jpg?itok=eJ3k-5R6',
            date: new Date(2023, 1, 13),
        },
    ]

    const [Categories, setCategories] = useState(true)
    const [admission, setAdmission] = useState(true)
    const [timeCat, setTimeCat] = useState(true)

    // ================ Get Time filter data begin ==================

    const timeItems = [
        {
            id: 1,
            title: 'tomorrow',
            label: 'Tomorrow'
        },
        {
            id: 2,
            title: 'nextWeek',
            label: 'Next Week'

        },
        {
            id: 3,
            title: 'nextMonth',
            label: 'Next Month'

        },
    ]

    const locationItems = [
        {
            value: '',
            label: 'All Location',
        },
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

    const handleTimeFilter = (item) => {
        if (days.includes(item.title)) {
            let check = days.filter((i) => i !== item.title)
            setDays(check)
        } else {
            setDays((prev) => [...prev, item.title])
        }
    }

    // ================ Get Time filter data end ==================


    return (
        <div className={style.bg}>
            <div className={style.entertainment}>
                <div className={style.entertainmentWrapper}>
                    <div className={style.heroText}>
                        <p>
                            Looking for high-energy action, maybe just a relaxing evening out, a day trip even, then you’ve come to the right place. The Jamaican entertainment scene is one reason why so many people keep coming back for more.
                        </p>
                        <a href='#/' className={'form-group mt-5'}>
                            <CustomButton customCLass={style.loginBtn} btnStyle={{ background: '#B8136A', color: '#fff', width: 160, margin: '10px 0', textAlign: 'center', fontWeight: '500', padding: 17, }} title="Browse Events" />
                        </a>
                    </div>
                </div>
            </div>
            <div className={style.filter} id='/'>
                <div className={style.filterHeader}>
                    <div className={style.filterHeaderLeftContainer}>
                        <div className='d-flex'>
                            <div className={style.filterHeaderLeftContainerLocation}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: 8, left: 17 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 0, justifyContent: 'space-between' }}>
                                            {
                                                !location
                                                &&
                                                <>
                                                    <img src='/icons/location1.png' style={{ width: 25, height: 25, marginRight: 9, paddingTop: 5, objectFit: 'contain' }} />
                                                    <b className={style.location}>All Locations</b>
                                                </>
                                            }
                                            {/* <img src='/icons/location2.png' style={{ width: 13, height: 12, marginLeft: 9, paddingTop: 5    , objectFit: 'contain' }} /> */}
                                        </div>
                                    </div>
                                    <select className={`form-control ${style.customSelect}`} onChange={(e) => setLocation(e.target.value)} id="exampleFormControlSelect1">
                                        {
                                            locationItems.map((i, ind) => (
                                                <option value={i.value} key={ind}>{i.value}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <SelectButtonView toggle={toggle} setToggle={setToggle} />
                        </div>
                        <div>
                            <div onClick={() => setToggle(3)} className={toggle == 3 ? style.filterHeaderLeftContainerCalendarViewActive : style.filterHeaderLeftContainerCalendarView}>
                                Calendar View
                            </div>
                        </div>
                    </div>
                    <div className={style.filterHeaderRightContainer}>
                        <div className={style.filterHeaderLeftContainerLocation}>
                            <Select
                                className={style.allLocation}
                                defaultValue={{
                                    label:
                                        <div style={{ position: 'relative' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: 30, justifyContent: 'space-between' }}>
                                                <b className={style.location}> Event Activity</b>
                                            </div>
                                        </div>,
                                }}
                                onChange={(e) => setActive(e)}
                                options={[

                                    {
                                        value: 0,
                                        label: 'All Activity',
                                    },
                                    {
                                        value: 1,
                                        label: 'Family Friendly',
                                    },
                                    {
                                        value: 2,
                                        label: 'Adults Only',
                                    },

                                ]}
                            />
                        </div>
                        {/* {
                            tabList.map((_item, index) => (
                                <li onClick={() => setActive(_item.id)} key={index} style={{ color: _item.id === active ? '#B8136A' : '#15303F' }}>
                                    {_item.title}
                                </li>
                            ))
                        } */}
                    </div>
                </div>
                <div className={style.border}>
                </div>
            </div>
            <div className={style.content}>
                <div className='row'>
                    {
                        toggle === 3
                            ?
                            ''
                            :
                            <div className='col-lg-2'>
                                <div>
                                    <div className='mb-3'>
                                        {/* <div className={style.menuHeader}>
                                            <h5>Categories</h5>
                                            {
                                                Categories
                                                    ?
                                                    <img className={style.openArrow} src='/icons/arrow.png' onClick={() => setCategories(!Categories)} />
                                                    :
                                                    <img className={style.rotateIcon} src='/icons/arrow.png' onClick={() => setCategories(!Categories)} />
                                            }
                                        </div> */}
                                        {/* {
                                            Categories
                                            &&
                                            <div className='row'>
                                                <div className='col-lg-12'>
                                                    <Checkbox onChange={(e) => console.log(e)}>Nightlife</Checkbox>
                                                </div>
                                                <div className='col-lg-12'>
                                                    <Checkbox onChange={(e) => console.log(e)}>Conventions</Checkbox>
                                                </div>
                                                <div className='col-lg-12'>
                                                    <Checkbox onChange={(e) => console.log(e)}>Brunches</Checkbox>
                                                </div>
                                                <div className='col-lg-12'>
                                                    <Checkbox onChange={(e) => console.log(e)}>Fundraiser</Checkbox>
                                                </div>


                                            </div>
                                        } */}
                                    </div>
                                    <div className='mb-3'>
                                        <div className={style.menuHeader}>
                                            <h5>Admission</h5>
                                            {
                                                admission
                                                    ?
                                                    <img className={style.openArrow} src='/icons/arrow.png' onClick={() => setAdmission(!admission)} />
                                                    :
                                                    <img className={style.rotateIcon} src='/icons/arrow.png' onClick={() => setAdmission(!admission)} />
                                            }
                                        </div>
                                        {
                                            admission
                                            &&
                                            <div className='row'>
                                                <div className='col-lg-12 ml-1'>
                                                    <div className={style.rangePrice}>
                                                        <b>$0</b>
                                                        <b>$35,000</b>
                                                    </div>
                                                    <div className={style.customRange}>
                                                        <Slider
                                                            trackStyle={{ background: 'red' }}

                                                            onChange={(e) => {
                                                                setMinPrice(e[0])
                                                                setMaxPrice(e[1])
                                                            }} max={35000} range defaultValue={[0, 35000]} />
                                                    </div>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                    <div className='mb-3'>
                                        <div className={style.menuHeader}>
                                            <h5>Time</h5>
                                            {
                                                timeCat
                                                    ?
                                                    <img className={style.openArrow} src='/icons/arrow.png' onClick={() => setTimeCat(!timeCat)} />
                                                    :
                                                    <img className={style.rotateIcon} src='/icons/arrow.png' onClick={() => setTimeCat(!timeCat)} />
                                            }
                                        </div>
                                        {
                                            timeCat
                                            &&
                                            <div className='row'>
                                                {
                                                    timeItems.map((i, index) => (
                                                        <div className='col-lg-12' key={index}>
                                                            <Checkbox value={i.title} onChange={(e) => handleTimeFilter(i)}>{i.label}</Checkbox>
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                        }
                                    </div>
                                </div>
                            </div>
                    }

                    <div className={`${toggle === 3 ? 'col-lg-12' : 'col-lg-10'} ${style.contentData}`}>
                        {
                            toggle === 3
                                ?
                                <CustomCalendar eventObj={temp} startingDate={new Date()} />
                                :
                                <div>
                                    {
                                        toggle == 2
                                            ?
                                            <div className='row'>
                                                {
                                                    active == 2 ? filterAdult?.filter((value) => {
                                                        if (location == "") {
                                                            return value;
                                                        } else if (
                                                            value?.parish?.toLowerCase().includes(location.toLowerCase())
                                                        ) {
                                                            console.log('value', value)
                                                            return value;
                                                        }
                                                    })?.map((i, index) => (
                                                        <div className='col-lg-4 col-md-4 col-6' key={index}>
                                                            {
                                                                loading
                                                                    ?
                                                                    <Skeleton active />
                                                                    :
                                                                    <EventView data={i} toggle={toggle} />
                                                            }
                                                        </div>
                                                    ))
                                                        :
                                                        active == 1 ?
                                                            filterFamily.filter((value) => {
                                                                if (location == "") {
                                                                    return value;
                                                                } else if (
                                                                    value?.parish?.toLowerCase().includes(location.toLowerCase())
                                                                ) {
                                                                    console.log('value', value)
                                                                    return value;
                                                                }
                                                            })?.map((i, index) => (
                                                                <div className='col-lg-4 col-md-4 col-6' key={index}>
                                                                    {
                                                                        loading
                                                                            ?
                                                                            <Skeleton active />
                                                                            :
                                                                            <EventView data={i} toggle={toggle} />
                                                                    }
                                                                </div>
                                                            ))
                                                            :
                                                            events?.filter((value) => {
                                                                if (location == "") {
                                                                    return value;
                                                                } else if (
                                                                    value?.parish?.toLowerCase().includes(location.toLowerCase())
                                                                ) {
                                                                    console.log('value', value)
                                                                    return value;
                                                                }
                                                            })?.map((i, index) => (
                                                                <div className='col-lg-4 col-md-4 col-6' key={index}>
                                                                    {
                                                                        loading
                                                                            ?
                                                                            <Skeleton active />
                                                                            :
                                                                            <EventView data={i} toggle={toggle} />
                                                                    }
                                                                </div>
                                                            ))
                                                }
                                            </div>
                                            :
                                            <div>
                                                {
                                                    active == 2 ?
                                                        filterAdult?.filter((value) => {
                                                            if (location == "") {
                                                                return value;
                                                            } else if (
                                                                value?.parish?.toLowerCase().includes(location.toLowerCase())
                                                            ) {
                                                                console.log('value', value)
                                                                return value;
                                                            }
                                                        })?.map((i, index) => (
                                                            <div key={index}>
                                                                {
                                                                    loading
                                                                        ?
                                                                        <Skeleton active />
                                                                        :
                                                                        <EventView data={i} toggle={toggle} />
                                                                }
                                                            </div>
                                                        ))
                                                        :
                                                        active == 1 ?
                                                            filterFamily?.filter((value) => {
                                                                if (location == "") {
                                                                    return value;
                                                                } else if (
                                                                    value?.parish?.toLowerCase().includes(location.toLowerCase())
                                                                ) {
                                                                    console.log('value', value)
                                                                    return value;
                                                                }
                                                            })?.map((i, index) => (
                                                                <div key={index}>
                                                                    {
                                                                        loading
                                                                            ?
                                                                            <Skeleton active />
                                                                            :
                                                                            <EventView data={i} toggle={toggle} />
                                                                    }
                                                                </div>
                                                            ))
                                                            :
                                                            events?.filter((value) => {
                                                                if (location == "") {
                                                                    return value;
                                                                } else if (
                                                                    value?.parish?.toLowerCase().includes(location.toLowerCase())
                                                                ) {
                                                                    console.log('value', value)
                                                                    return value;
                                                                }
                                                            })?.map((i, index) => (
                                                                <div key={index}>
                                                                    {
                                                                        loading
                                                                            ?
                                                                            <Skeleton active />
                                                                            :
                                                                            <EventView data={i} toggle={toggle} />
                                                                    }
                                                                </div>
                                                            ))
                                                }
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Entertainment