import axios from 'axios'
import React, { useRef, useState, useContext, useEffect, useCallback } from 'react'
import { AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import constants from '../../constants'
import contextAPI from '../../contextState/contextAPI'
import Header from '../Header/Header'
import PostCard from './PostCard'
import API from '../../api_config'
import './Icon.css'

const Post = () => {
    // const [posts] = useFetch('posts')
    const [data, setData] = useState()
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const context = useContext(contextAPI)
    const [addNewPost, setAddNewPost] = useState(false)
    const postTitleRef = useRef()
    const postBodyRef = useRef()

    const logoutHandle = () => { }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${API}/posts`)
                .then((response) => {
                    setData(response.data)
                })
                .catch(() => console.log(constants.API_Error), [])
        }
        fetchData()
        console.log(data)
    }, [])

    const deleteThePost = (e) => {
        const id = e.target.value
        axios.delete(`${API}/posts/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert('Deleted')
                }
                else {
                    alert('Something Error')
                }
            })
    }

    const publishPost = (e) => {
        e.preventDefault()
        const payload = {
            title: postTitleRef.current.value,
            body: postBodyRef.current.value,
            email: context.email
        }
        if (payload.email) {
            axios.post(`${API}/posts`, payload)
                .then((res) => {
                    if (res.status === 200) {
                        alert('Posted')
                        setAddNewPost(!addNewPost)
                    }
                    else {
                        alert('Something Error')
                    }
                })
        }
        forceUpdate()
    }

    const openOrCloseModal = () => {
        setAddNewPost(!addNewPost)
        forceUpdate()
    }

    return (
        <div>
            <Header header={constants.posts} />
            <div>
                <div className='p-4'>
                    <button className='btn btn-dark' onClick={logoutHandle}>{constants.logout}</button>
                </div>
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
                </div>
            </div>

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

            <div className='w-100 p-5 d-flex align-items-center justify-content-center'>
                <PostCard allPosts={data} currentUser={context} deleteThePost={deleteThePost} />
            </div>
        </div>
    )
}

export default Post