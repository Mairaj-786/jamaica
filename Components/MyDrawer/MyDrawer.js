import { Avatar, Button, Drawer } from 'antd';
import style from './myDrawer.module.css'
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import CustomButton from '../CustomButton/CustomButton';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const MyDrawer = (props) => {
    const router = useRouter()
    const pathName = usePathname()
    const onClose = () => {
        props?.setOpen(false);
    };


    // ==================== get current logged in user in state begin ===================================//
    const [user, setUser] = useState([])

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser) {
            setUser(currentUser)
        }
    }, [])
    // ==================== get current logged in user in state end ===================================//

    const navItems = [
        {
            id: 'Entertainment',
            title: 'Entertainment'
        },
        {
            id: 'Sports',
            title: 'Sports'
        },
        {
            id: 'Conference',
            title: 'Conference'
        },
        {
            id: 'Health&Wellness',
            title: 'Health & Wellness'
        },
    ]
    const navItemsLoggedInAdmin = [
        {
            id: 'profile',
            title: 'Profile'
        },
        {
            id: 'dashboard',
            title: 'Dashboard'
        },
        {
            id: 'Entertainment',
            title: 'Entertainment'
        },
        {
            id: 'Sports',
            title: 'Sports'
        },
        {
            id: 'Conference',
            title: 'Conference'
        },
        {
            id: 'Health&Wellness',
            title: 'Health & Wellness'
        },
        {
            id: 'Foods',
            title: 'Foods'
        },
        {
            id: 'Shopping',
            title: 'Shopping'
        },
    ]
    const navItemsLoggedInUser = [
        {
            id: 'profile',
            title: 'Profile'
        },

        {
            id: 'Entertainment',
            title: 'Entertainment'
        },
        {
            id: 'Sports',
            title: 'Sports'
        },
        {
            id: 'Conference',
            title: 'Conference'
        },
        {
            id: 'Health&Wellness',
            title: 'Health & Wellness'
        },
        {
            id: 'Food',
            title: 'Food'
        },
        {
            id: 'Shopping',
            title: 'Shopping'
        },
    ]


    return (
        <>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={props.open}>
                <div className={style.header}>
                    <Image onClick={() => router.push('/')} height={130} width={130} style={{ objectFit: 'contain', cursor: 'pointer' }} alt='logo' src='/images/blackLogo.png' />
                    <AiOutlineClose size={24} onClick={onClose} />
                </div>
                {
                    user
                    &&

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                        <Avatar style={{ width: 100, height: 100, objectFit: 'cover' }} src={user?.profile_image ? user?.profile_image : 'https://gcavocats.ca/wp-content/uploads/2018/09/man-avatar-icon-flat-vector-19152370-1.jpg'} />
                        <b>{user?.firstname}</b>
                        <p>{user?.email}</p>
                    </div>
                }

                <div className={style.links}>
                    {
                        user?.role == 'ADMIN' && 'SUBADMIN'
                            ?
                            navItemsLoggedInAdmin.map((i, index) => (
                                <Link onClick={() => onClose()} href={i.id == 'profile' ? '/profile' : i.id == 'dashboard' ? '/admin/dashboard' : `/category?name=${i.id}`} activeClassName='active' key={index}><li>{i.title}</li></Link>
                            ))
                            :
                            user?.role == 'USER'
                                ?
                                navItemsLoggedInUser.map((i, index) => (
                                    <Link onClick={() => onClose()} href={i.id == 'profile' ? '/profile' : `/category?name=${i.id}`} activeClassName='active' key={index}><li>{i.title}</li></Link>
                                ))
                                :
                                navItems.map((i, index) => (
                                    <Link onClick={() => onClose()} href={`/category?name=${i.id}`} activeClassName='active' key={index}><li>{i.title}</li></Link>
                                ))
                    }
                </div>
                <div className={style.buttons}>
                    {/* <CustomButton btnStyle={{ background: '#DF9411', fontWeight: 'bold', width: 140, color: '#fff' }} title="Submit Event" icon="+" style={{ background: '#fff', color: '#000', padding: '0 5px', borderRadius: 100, fontSize: 14 }} /> */}
                    <CustomButton onClick={() => router.push('/add-event')} btnStyle={{ background: '#DF9411', width: 140, color: '#fff', fontWeight: 'bold' }} title="Submit Event" icon={<img src='/icons/submit.png' style={{ width: 25, height: 25, objectFit: 'contain' }} />} />
                    {
                        !user ?
                            <CustomButton onClick={() => {
                                router.push('/login')
                                onClose()
                            }} btnStyle={{ background: '#B8136A', color: '#fff', width: 140, margin: '10px 0', textAlign: 'center', fontWeight: 'bold' }} title="Login" />
                            :
                            <CustomButton onClick={() => {
                                router.push('/login')
                                onClose()
                                localStorage.removeItem('user')
                                localStorage.removeItem('token')
                            }} btnStyle={{ background: '#B8136A', color: '#fff', width: 140, margin: '10px 0', textAlign: 'center', fontWeight: 'bold' }} title="Logout" />
                    }
                </div>
            </Drawer>
        </>
    );
};
export default MyDrawer;