import React from 'react'
import style from './loader.module.css'
const Loader = () => {
  return (
    <div className={style.loader}>
      <div className={style.loaderWrapper}>
        <img src="https://i.pinimg.com/originals/df/d2/68/dfd2683c9701642c776e31d3b0d603a9.gif" alt="" />
      </div>
    </div>
  )
}

export default Loader