import React, { useContext, useState } from 'react'
import constants from '../../constants'
import contextAPI from '../../contextState/contextAPI'
import EditPost from './EditPost'
import { FaComments } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import './Icon.css'
import { useNavigate } from 'react-router-dom'

const PostCard = (props) => {
    const context = useContext(contextAPI)
    const navigate = useNavigate()
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
                                <button className="btn btn-dark" value={post._id} onClick={openComments}>
                                    {constants.comments}<FaComments className='ms-2 mb-0 h5 icons' />
                                </button>
                            </div>
                            {
                                props.currentUser.email === post.ownerEmail ?
                                    <div className='text-end p-3'>
                                        <button className='btn btn-warning' value={post._id} onClick={editHandler}>
                                            {constants.edit}<BiEdit className='ms-2 mb-0 h5 icons' />
                                        </button>
                                        <button className='btn btn-danger ms-2' value={post._id} onClick={props.deleteThePost}>
                                            {constants.delete}<AiFillDelete className='ms-2 mb-0 h5 icons' />
                                        </button>
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