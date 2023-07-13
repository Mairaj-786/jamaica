import React from 'react'
import { Button, Modal } from 'antd';
import { useState } from 'react';

const MyModal = (props) => {

    const handleOk = () => {
        props.setIsModalOpen(false);
    };
    const handleCancel = () => {
        props.setIsModalOpen(false);
    };
    return (
        <>
            <Modal width={props.width} open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {props.content}
            </Modal>
        </>
    )
}

export default MyModal