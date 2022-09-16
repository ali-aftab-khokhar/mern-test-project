import React, { useRef, useState } from 'react'
import constants from '../../constants'
import { ImCancelCircle } from 'react-icons/im'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineArrowRight } from 'react-icons/ai'

const AddNewPost = (props) => {
    const [addNewPost, setAddNewPost] = useState(false)
    const postTitleRef = useRef()
    const postBodyRef = useRef()

    const publishPost = () => {
        props.publishPost(postTitleRef.current.value, postBodyRef.current.value)
        openOrCloseModal()
    }

    const openOrCloseModal = () => {
        setAddNewPost(!addNewPost)
    }

    return (
        <div className='ms-2'>
            <button className='btn ms-5 btn-outline-dark mt-5 pt-3 ps-5 pe-5' onClick={openOrCloseModal} >
                {
                    !addNewPost ?
                        <div className='d-flex pt-1'>
                            <p>{constants.create_new_post}</p> <AiOutlinePlus className='ms-2 mt-0 h4 icons' />
                        </div>
                        : <div className='d-flex pt-1'>
                            <p>{constants.close_the_dialog}</p> <ImCancelCircle className='ms-2 mt-0 h4 icons' />
                        </div>
                }
            </button>

            {
                addNewPost ?
                    <div className='w-75 justify-content-center align-items-center ms-5 mt-5'>
                        <div className='mb-3 ms-3 font-weight-bold'>{constants.new_post}</div>
                        <div className="form-group mb-4">
                            <input type="text" className="form-control ms-3" ref={postTitleRef} name="title" placeholder={constants.title} />
                        </div>
                        <div className="form-group mb-4">
                            <textarea rows='4' type="text" className="form-control ms-3" ref={postBodyRef} name="body" placeholder={constants.body} />
                        </div>
                        <button className='btn ms-3 btn-outline-dark' onClick={publishPost} >
                            {constants.publish_the_post} <AiOutlineArrowRight className='ms-0 mb-0 h5 icons' />
                        </button>
                    </div>
                    : null
            }
        </div>
    )
}

export default AddNewPost