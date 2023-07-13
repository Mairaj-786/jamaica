import React from 'react'
import CustomButton from '../../Components/CustomButton/CustomButton'
import style from './privacy_policy.module.css'
const PrivacyPolicy = () => {
    return (
        <div className={style.bg}>
            <div className={style.main}>
                <div className={style.mainWrapper}>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className={style.mainWrapperText}>
                                <h1>Privacy Policy</h1>
                                <p>
                                    Top Events Jamaica is an initiative of The Ministry of Tourism Jamaica under the Tourism Enhancement Fund (TEF) and its division, Tourism Linkages Network (TLN). The primary drivers are our website and mobile app which are designed to share with the world the many unique offerings of our beautiful island – from Gastronomy to Health & Wellness, Entertainment, Sports, Shopping and Conferences.
                                </p>
                                <div className={style.mainWrapperBottomText} style={{marginTop:-12, color:'#606060'}}>
                                    <b>
                                        Information Collection And Use
                                    </b>
                                </div>
                                <p>
                                    {`    While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you.Personally identifiable information may include, but is not limited to your name("Personal Information").
                                `}
                                </p>
                                <div className={style.mainWrapperBottomText} style={{marginTop:-12, color:'#606060'}}>
                                    <b>
                                        Log Data
                                    </b>
                                </div>
                                <p>
                                    {`
                                         Like many site operators, we collect information that your browser sends whenever you visit our Site
                                         This is called “Log Data” and may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.
                                         In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this information to help on - going marketing and promotional activities.
                                    `}
                                </p>
                                <div className={style.mainWrapperBottomText} style={{marginTop:-12, color:'#606060'}}>
                                    <b>
                                        Communications
                                    </b>
                                </div>
                                <p>
                                    We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that will improve our communication with our intended markets.
                                </p>
                                <div className={style.mainWrapperBottomText} style={{marginTop:-12, color:'#606060'}}>
                                    <b>
                                        Cookies
                                    </b>
                                </div>
                                <p>
                                    {`     Cookies are files with small amount of data, which may include an anonymous unique identifier.Cookies are sent to your browser from a web site and stored on your computer's hard drive.
                                    Like many sites, we use "cookies" to collect information.You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.However, if you do not accept cookies, you may not be able to use some portions of our Site.
                               `}
                                </p>
                                <div className={style.mainWrapperBottomText} style={{marginTop:-12, color:'#606060'}}>
                                    <b>
                                        Security
                                    </b>
                                </div>
                                <p>
                                    The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100 % secure.While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.

                                </p>
                                <div className={style.mainWrapperBottomText} style={{marginTop:-12, color:'#606060'}}>
                                    <b>
                                        Changes To This Privacy Policy
                                    </b>
                                </div>
                                <p>
                                    This Privacy Policy is effective as of February 19, 2019 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
                                    We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically.Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
                                    If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.
                                    If you have any questions about this Privacy Policy, please contact us at info @topeventsinjamaica.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
