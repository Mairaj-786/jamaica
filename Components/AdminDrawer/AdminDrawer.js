import { Button, Drawer } from 'antd';
import style from './myDrawer.module.css'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';

const AdminDrawer = (props) => {
    const pathName = usePathname()

    const onClose = () => {
        props.setOpen(false);
    };

    const navItems = [
        {
            id: 1,
            title: 'Dashboard',
            path: '/admin/dashboard',
        },
        {
            id: 2,
            title: 'Event Management',
            path: '/admin/event-management'
        },
        {
            id: 3,
            title: 'User Management',
            path: '/admin/user-management'
        },
        {
            id: 5,
            title: 'Admin Management',
            path: '/admin/management'
        },
        {
            id: 7,
            title: 'Media and Text',
            path: '/admin/media-and-text'
        },
        {
            id: 8,
            title: 'News Management',
            path: '/admin/news'
        },
        {
            id: 4,
            title: 'Settings',
            path: '/admin/settings'
        },
        {
            id: 6,
            title: 'Logout',
            path: '/login'
        },
    ]
    const navItemsForSubAdmin = [
        {
            id: 1,
            title: 'Dashboard',
            path: '/admin/dashboard',
        },
        {
            id: 2,
            title: 'Event Management',
            path: '/admin/event-management'
        },
        {
            id: 3,
            title: 'User Management',
            path: '/admin/user-management'
        },
        {
            id: 7,
            title: 'Media and Text',
            path: '/admin/media-and-text'
        },
        {
            id: 8,
            title: 'News Management',
            path: '/admin/news'
        },
        {
            id: 4,
            title: 'Settings',
            path: '/admin/settings'
        },
        {
            id: 6,
            title: 'Logout',
            path: '/login'
        },
    ]
    return (
        <>
            <Drawer width={300} title="Basic Drawer" onClose={onClose} placement="left" open={props.open}>
                <div className={style.sidebar}>
                    <div className={style.sidebarWrapper}>
                        <div className={style.sidebarLogo}>
                            <img src="/images/colo-logo.png" alt="" />
                        </div>
                        <div className={style.sidebarLinks}>
                            {
                                props?.user?.role == 'ADMIN' ?
                                    navItems.map((i, index) => (
                                        <li key={index} className={i.path == pathName ? style.active : ''}>
                                            <Link href={`${i.path}`} style={{ color: i.id == 6 && 'red' }} onClick={() => {
                                                if (i.id === 6) {
                                                    localStorage.removeItem('user')
                                                    localStorage.removeItem('token')
                                                }
                                            }}>{i.title}</Link>
                                        </li>
                                    ))
                                    :
                                    navItemsForSubAdmin.map((i, index) => (
                                        <li key={index} className={i.path == pathName ? style.active : ''}>
                                            <Link href={`${i.path}`} style={{ color: i.id == 6 && 'red' }} onClick={() => {
                                                if (i.id === 6) {
                                                    localStorage.removeItem('user')
                                                    localStorage.removeItem('token')
                                                }
                                            }}>{i.title}</Link>
                                        </li>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};
export default AdminDrawer;