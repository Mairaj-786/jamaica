import React from 'react'
import CustomButton from '../../Components/CustomButton/CustomButton'
import style from './terms_use.module.css'
const TermsUse = () => {
    return (
        <>
            <div className={style.bg}>
                <div className={style.main}>
                    <div className={style.mainWrapper}>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className={style.mainWrapperText}>
                                    <h1>Terms Of Use</h1>
                                    <div className={style.mainWrapperBottomText} style={{ marginTop: -12, color: '#606060' }}>
                                        <b>
                                            Disclaimer
                                        </b>
                                    </div>
                                    <p>
                                        {`    Last updated: February 18, 2019
                                    The information contained on https://www.topeventsinjamaica.com website and Top Events Jamaica mobile app (the "Service") is for general information purposes only. Top Events Jamaica assumes no responsibility for errors or omissions in the contents on the Service. In no event shall Top Events Jamaica be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. Top Events Jamaica reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice. This Disclaimer for Top Events Jamaica has been created with the help of TermsFeed. Top Events Jamaica does not warrant that the website is free of viruses or other harmful components.
                                `}
                                    </p>
                                    <div className={style.mainWrapperBottomText} style={{ marginTop: -12, color: '#606060' }}>
                                        <b>

                                            External links disclaimer

                                        </b>
                                    </div>
                                    <p>
                                        https://www.topeventsinjamaica.com website and Top Events Jamaica mobile app may contain links to external websites that are not provided or maintained by or in any way affiliated with Top Events Jamaica Please note that the Top Events Jamaica does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TermsUse
