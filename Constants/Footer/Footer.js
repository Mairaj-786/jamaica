import { Divider } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import style from './footer.module.css'
const Footer = () => {
    const router = useRouter()
    // ==================== get screen size ===================================//
    const [windowSize, setWindowSize] = useState("");
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [windowSize]);
    return (
        <>
            <div className={style.footer}>
                <div className={style.footerWrapper}>
                    <div className='row'>
                        <div className='col-lg-3 col-12' id={style.logo}>
                            <img src='/images/Logo.png' className={style.logo} />
                        </div>
                        <div id={style.BorderForMobile} className={`col-lg-3 col-12 ${windowSize?.innerWidth > 991 ? '' : 'order-3'}`}>
                            <div className={`form-group ${style.footerPara}`}>
                                <img src='/footer_logo/map.png' />
                                <div>
                                    <p>Tourism Enhancement Fund</p>
                                    <p>60 Knutsford Boulevard,</p>
                                    <p>Kingston 5,</p>
                                    <p>Jamaica, West Indies</p>
                                </div>
                            </div>
                            <div className={`form-group ${style.footerPara}`}>
                                {/* <img src='/footer_logo/phone.png' /> */}
                                <AiOutlineMail style={{ fontSize: 30, margin: '0 9px', color: '#fff' }} />
                                <div>
                                    <a style={{ color: '#fff', textDecorationLine: 'none' }} href='https://topeventjamaica@gmail.com/' target={'_blank'}>topeventjamaica@gmail.com </a>
                                </div>
                            </div>
                            <div className={`form-group ${style.footerPara}`} style={{ width: 180, display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                                <img role={'button'} src='/footer_logo/fb.png' onClick={() => {
                                    window.open('https://www.facebook.com/TopEventsJa', '_blank')
                                }} />
                                <img role={'button'} src='/footer_logo/insta.png' onClick={() => {
                                    window.open('https://www.instagram.com/topeventsjamaica/', '_blank')
                                }} />
                                <img role={'button'} src='/footer_logo/tw.png' onClick={() => {
                                    window.open('https://twitter.com/topeventsja', '_blank')
                                }} />
                            </div>
                        </div>
                        <div className='col-lg-3 col-12'>
                            <div className={`form-group ${style.footerPara}`} id={style.testing}>
                                <div>
                                    <p><a href='/category?name=Entertainment'>Entertainment</a></p>
                                    <p><a href='/category?name=Sports'>Sports</a></p>
                                    <p><a href='/category?name=Conferences'>Conferences</a></p>
                                    <p><a href='/category?name=health-wellness'>Health & Wellness</a></p>
                                    <p><a href='/category?name=Food'>Food</a></p>
                                    <p><a href='/category?name=Shopping'>Shopping</a></p>
                                    <p><a href='/category?name=Food'>Food</a></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 col-12'>
                            <div className={`form-group ${style.footerPara}`}>
                                <div>
                                    <p><a href='/about-us'>About Us</a></p>
                                    <p><a href='/privacy-policy'>Privacy Policy</a></p>
                                    <p><a href='/terms-of-use'>Terms of Use</a></p>
                                    <p><a href='/contact-us'>Contact us</a></p>
                                    <p><a href='/add-event'>Submit Event</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.footerLogoes}>
                <div className='row'>
                    <div className='col-lg-3 col-3'>
                        <a href='https://www.mot.gov.jm' target={'_blank'}>
                            <img src='/footer_logo/2.png' />
                        </a>
                    </div>
                    <div className='col-lg-3 col-3'>
                        <a href='https://tef.gov.jm' target={'_blank'}>
                            <img src='/footer_logo/4.png' />
                        </a>
                    </div>
                    <div className='col-lg-3 col-3'>
                        <a href='https://www.mot.gov.jm/page/tourism-linkages-network' target={'_blank'}>
                            <img src='/footer_logo/3.png' />
                        </a>
                    </div>
                    <div className='col-lg-3 col-3'>
                        <a href='https://www.visitjamaica.com' target={'_blank'}>
                            <img src='/footer_logo/1.png' />
                        </a>
                    </div>
                </div>
                <p>Copyright © 2019. Developed by Ministry of Tourism and Powered by Tourism Enhancement Fund</p>

            </div>
        </>
    )
}

export default Footer