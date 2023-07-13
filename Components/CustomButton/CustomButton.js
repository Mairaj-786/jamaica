import React from 'react'
import style from './customButton.module.css'
const CustomButton = (props) => {
    return (
        <div onClick={props.onClick} className={`${style.customButton} ${props.customCLass}`} style={props.btnStyle}>{props.icon && <span style={props.style}>{props.icon}</span>} {props.title}</div>
    )
}

export default CustomButton