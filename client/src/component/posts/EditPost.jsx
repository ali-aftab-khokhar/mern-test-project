import React, { useEffect, useRef, useState } from 'react'
import constants from '../../constants'
import './Icon.css'
import { BsCheckLg } from 'react-icons/bs'
import putService from '../../services/putMethod'

const EditPost = (props) => {
    const postTitleRef = useRef()
    const postBodyRef = useRef()

    const saveValues = (e) => {
        const payload = {
            title: postTitleRef.current.value,
            body: postBodyRef.current.value
        }
        putService(payload, 'Updated', `posts/${e.target.value}`)
        props.saveEdits()
    }

    return (
        <div>
            <div className='w-75 justify-content-center align-items-center ms-5 mt-5'>
                <div className='mb-3 ms-3 font-weight-bold'>{constants.edit_post}</div>
                <div className="form-group mb-4">
                    <input type="text" className="form-control ms-3" ref={postTitleRef} defaultValue={props.title} name="title" placeholder={constants.title} />
                </div>
                <div className="form-group mb-4">
                    <textarea rows='4' type="text" className="form-control ms-3" ref={postBodyRef} defaultValue={props.body} name="body" placeholder={constants.body} />
                </div>
                <button className='btn ms-3 mb-4 text-light bg-success' value={props.id} onClick={saveValues}>
                    {constants.edit_done} <BsCheckLg className='ms-1 pt-1 h5' />
                </button>
            </div>
        </div>
    )
}

export default EditPost