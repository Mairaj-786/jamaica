import { useRouter } from 'next/navigation'
import React from 'react'
import CustomButton from '../../Components/CustomButton/CustomButton'
import style from './about.module.css'
const About = () => {
    const router = useRouter()
    return (
        <div className={style.bg}>
            <div className={style.main}>
                <div className={style.mainWrapper}>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <img src='/images/about.png' />
                        </div>
                        <div className='col-lg-8'>
                            <div className={style.mainWrapperText}>
                                <h1>About Us</h1>
                                <p>
                                    Top Events Jamaica is an initiative of The Ministry of Tourism Jamaica under the Tourism Enhancement Fund (TEF) and its division, Tourism Linkages Network (TLN). The primary drivers are our website and mobile app which are designed to share with the world the many unique offerings of our beautiful island – from Gastronomy to Health & Wellness, Entertainment, Sports, Shopping and Conferences.
                                </p>
                                <p>
                                    For decades, Jamaica has been positioned as an island paradise, known for its long stretches of white sand skirting crystal-clear waters under a warm tropical sun. Tourists flock here and mingle with the locals on beaches to get what is really just short of a glimpse of who we really are, and what we truly have to offer.
                                </p>
                                <p>
                                    Top Events Jamaica will bring to the forefront the many musts for visitors to the island. It will provide the world a new lens with which to view us…and learn that Jamaica is so much more than a sun, sand and sea destination.
                                </p>
                                <p>
                                    We say to you…come to Jamaica and experience the richness and vibrancy we have to offer.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={style.mainWrapperBottomText}>
                        <p>
                            Only events in Jamaica are listed on our site. There is no charge for listing events. However, there is a formal application process. We have developed a set of criteria which events are required to adhere to - criteria which ensures that interests of all stakeholder groups are considered. Submissions are made online and are subject to review by an Events Evaluation Committee within the Ministry. Only approved events are listed on the site.
                            The Ministry of Tourism is not liable for any incident that may arise from any event. Events are organized and executed by private individuals and organizations. Our purpose is to list and promote events for the enjoyment of visitors to our island.
                        </p>
                        <br />
                        <b>Please email us at : <a href='https://topeventjamaica@gmail.com/' target={'_black'}>topeventjamaica@gmail.com</a></b>
                        <div className={'form-group'}>
                            <CustomButton onClick={() => router.push('/signup')} customCLass={style.loginBtn} btnStyle={{ background: '#13B8A0', color: '#fff', width: 110, margin: '10px 0', textAlign: 'center', fontWeight: '400' }} title="Sign up" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About