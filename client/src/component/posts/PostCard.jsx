import React, { useContext, useState } from 'react'
import constants from '../../constants'
import EditPost from './EditPost'
import { FaComments } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import './Icon.css'
import { useNavigate } from 'react-router-dom'
import ContextAPI from '../../contextState/contextAPI'
import DisabledButtons from './DisabledButtons'
import LikePost from './LikePost'
import UnlikePost from './UnlikePost'
import putService from '../../services/putMethod'

const PostCard = (props) => {
    const navigate = useNavigate()
    const context = useContext(ContextAPI)
    const [editToggle, setEditToggle] = useState(false)
    const [activePostId, setActivePostId] = useState("")

    const openComments = (e) => {
        navigate(`/post/${e.target.value}/comments`)
    }

    const editHandler = (e) => {
        setActivePostId(e.target.value)
        setEditToggle(!editToggle)
    }

    const saveEdits = () => {
        setEditToggle(!editToggle)
    }

    const loginFirst = () => {
        navigate('/')
    }

    const dislikeThePost = (id) => {
        const payload = {
            id: id,
            email: context.isLoggedIn.email,
            todo: 'dislike'
        }
        putService(payload, 'Disliked', `post/lod/${id}`)
    }

    const likeThePost = (id) => {
        const payload = {
            id: id,
            email: context.isLoggedIn.email,
            todo: 'like'
        }
        putService(payload, 'Liked', `post/lod/${id}`)
    }

    return (
        <div className='justify-content-center w-100'>
            {
                props.allPosts ? props.allPosts.map((post) => {
                    
                    return (
                        <div className="card mb-3" key={post._id}>
                            <div className="card-body">
                                <h3 className='card-title'>{post.ownerName}</h3>
                                <h5 className="card-text">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                {
                                    context.isLoggedIn.email ?
                                        <div className='d-flex'>
                                            <button className="btn btn-dark" value={post._id} onClick={openComments}>
                                                {constants.comments}<FaComments className='ms-2 mb-0 h5 icons' />
                                            </button>
                                            <div>
                                                {
                                                    post.likes.includes(context.isLoggedIn.email)
                                                    ? <LikePost dislikeThePost={dislikeThePost} id={post._id} count={post.likes.length}/>
                                                    : <UnlikePost likeThePost={likeThePost} id={post._id} count={post.likes.length} />
                                                }
                                                
                                            </div>
                                        </div>
                                        : <div>
                                            <button className="btn btn-dark" value={post._id} onClick={loginFirst}>
                                                {constants.loginFirst}
                                            </button>
                                        </div>
                                }

                            </div>
                            {
                                props.currentUser.email === post.ownerEmail ?
                                    <div className='text-end p-3'>
                                        {
                                            post._id
                                                ? <div>
                                                    <button className='btn btn-warning' value={post._id} onClick={editHandler}>
                                                        {constants.edit}<BiEdit className='ms-2 mb-0 h5 icons' />
                                                    </button>
                                                    <button className='btn btn-danger ms-2' value={post._id} onClick={props.deleteThePost}>
                                                        {constants.delete}<AiFillDelete className='ms-2 mb-0 h5 icons' />
                                                    </button>
                                                </div>
                                                :
                                                <DisabledButtons />
                                        }
                                    </div>
                                    : null
                            }

                            {
                                props.currentUser.email === post.ownerEmail && activePostId === post._id && editToggle ?
                                    <EditPost saveEdits={saveEdits} title={post.title} body={post.body} id={post._id} />
                                    : null
                            }
                        </div>
                    )
                }) : <div>{constants.loading}</div>
            }
        </div>
    )
}

export default PostCard