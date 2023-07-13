import React, { useState } from 'react'
import style from './selectButton.module.css'
const SelectButtonView = (props) => {


    const selectView = [
        {
            id: 1,
            title: 'List View'
        },
        {
            id: 2,
            title: 'Grid View'
        },
    ]
    return (
        <>
            <div className={style.TrendingButtonView}>
                {
                    selectView.map((b, index) => (
                        <button key={index} className={props.toggle == b.id && style.activeViewBtn} onClick={() => props.setToggle(b.id)} style={{ borderTopRightRadius: b.id == 2 && 10, borderBottomRightRadius: b.id == 2 && 10, borderBottomLeftRadius: b.id == 1 && 10, borderTopLeftRadius: b.id == 1 && 10, }}>{b.title}</button>
                    ))
                }
            </div>
        </>
    )
}

export default SelectButtonView