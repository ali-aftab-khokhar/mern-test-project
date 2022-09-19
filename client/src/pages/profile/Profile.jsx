import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../api_hooks/useFetch'
import Header from '../../component/Header/Header'
import constants from '../../constants'
import contextAPI from '../../contextState/contextAPI'
import PostCard from '../../component/posts/PostCard'
import deleteService from '../../services/deleteMethod'

const Profile = () => {
    const context = useContext(contextAPI)
    const navigate = useNavigate()
    const [status, forceUpdate] = useState(false)
    const [myPosts] = useFetch(`profile/${context.isLoggedIn.id}`)

    useEffect(() => { }, [myPosts, status])

    const goBackHandler = () => {
        navigate('/posts')
    }

    const deleteThePost = (e) => {
        const id = e.target.value
        console.log(id)
        deleteService(`posts/${id}`)
        const indexOfObject = myPosts.findIndex(obj => { return obj._id === id; });
        myPosts.splice(indexOfObject, 1)
        forceUpdate(!status)

    }

    return (
        <div>
            <Header header={context.isLoggedIn.name} profile={context.isLoggedIn.email} />
            <div className='p-4'>
                <button className='btn btn-dark' onClick={goBackHandler}>{constants.posts}</button>
            </div>
            <div className='w-100 p-5 d-flex align-items-center justify-content-center'>
                {
                    myPosts ?
                        <PostCard allPosts={myPosts} currentUser={context.isLoggedIn} deleteThePost={deleteThePost} />
                        : <div>No Post Exists</div>
                }
            </div>
        </div>
    )
}

export default Profile