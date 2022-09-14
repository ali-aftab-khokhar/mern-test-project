import React, { useContext, useState } from 'react'
import constants from '../../constants'
import contextAPI from '../../contextState/contextAPI'
import Header from '../../component/Header/Header'
import useFetch from '../../api_hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import PostCard from '../../component/posts/PostCard'
import AddNewPost from '../../component/posts/AddNewPost'
import { toast } from 'react-toastify';
import postService from '../../services/postMethod'
import deleteService from '../../services/deleteMethod'

const Post = () => {
    const [data] = useFetch('posts')
    const context = useContext(contextAPI)
    const [isLoggedIn] = useState(context.isLoggedIn)
    const navigate = useNavigate()

    const logoutHandle = () => {
        context.logout()
        toast.success('Logged Out')
        navigate('/')
    }

    const deleteThePost = (e) => {
        const id = e.target.value
        deleteService(`posts/${id}`)
    }

    const publishPost = (title, body) => {
        const payload = {
            title: title,
            body: body,
            email: isLoggedIn.email,
            name: isLoggedIn.name
        }
        if (payload.email) {
            postService(payload, 'Posted', 'posts')
        }
    }

    const loginHandle = () => {
        navigate('/')
    }

    return (
        <div>
            <Header header={constants.posts} />
            <div>
                {
                    isLoggedIn.email ?
                        <div>
                            <button className='btn btn-dark ms-5 mt-5' onClick={logoutHandle}>{constants.logout}</button>
                            <AddNewPost publishPost={publishPost} />
                        </div>
                        : <button className='btn btn-dark ms-5 mt-5' onClick={loginHandle}>{constants.login}</button>
                }
            </div>

            <div className='w-100 p-5 d-flex align-items-center justify-content-center'>
                <PostCard allPosts={data} currentUser={isLoggedIn} deleteThePost={deleteThePost} />
            </div>
        </div>
    )
}

export default Post