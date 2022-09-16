import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import constants from '../../constants'
import contextAPI from '../../contextState/contextAPI'
import Header from '../../component/Header/Header'
import API from '../../api_config'
import useFetch from '../../api_hooks/useFetch'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import EditComment from '../../component/comment/EditComment'
import AddNewComment from '../../component/comment/AddNewComment'

const Comment = () => {
    const params = useParams()
    const [commentsData] = useFetch(`${params.id}/comments`)
    const [post] = useFetch(`post/${params.id}/comments`)
    const context = useContext(contextAPI)
    const navigate = useNavigate()
    const [editToggle, setEditToggle] = useState(false)
    const [activeCommentId, setActiveCommentId] = useState("")

    const addNewComment = (body, email) => {
        const payload = {
            commentBody: body,
            commentBy: email
        }
        if (context.email) {
            axios.post(`${API}/${params.id}/comments`, payload)
                .then((res) => {
                    if (res.status === 200) {
                        alert('Commented')
                    }
                    else {
                        alert('Something Error')
                    }
                })
        }
    }

    const deleteHandler = (e) => {
        const id = e.target.value
        axios.delete(`${API}/comment/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert('Deleted')
                }
                else {
                    alert('Something Error')
                }
            })
    }

    const editHandler = (e) => {
        setActiveCommentId(e.target.value)
        setEditToggle(!editToggle)
    }

    const saveEdits = (e) => {
        setEditToggle(!editToggle)
    }

    const goBackHandler = () => {
        navigate(-1)
    }

    return (
        <div>
            <Header header={constants.comments} />
            <div className='p-4'>
                <button className='btn btn-dark' onClick={goBackHandler}>{constants.go_back}</button>
            </div>
            <div>
                <div className="card m-5">
                    <h1 className='p-3'>{constants.post}</h1>
                    {
                        post ?
                            <div className="card-body pb-5">
                                <h5 className="card-title">{post[0].title}</h5>
                                <p className="card-text">{post[0].body}</p>
                            </div>
                            : <div>
                                <h5>{constants.loading}</h5>
                            </div>
                    }

                    <div className='pb-5'>
                        <h2 className='p-4'>{constants.comments}</h2>
                        {
                            commentsData ? commentsData.map((comm) => {
                                return (<div className='w-50 p-3 ms-3 b-2 mb-4' key={comm._id}>
                                    <div className='d-flex'>
                                        <div className='w-75'>
                                            <div className='pt-1'>
                                                <h6>{comm.commentByName}</h6>
                                            </div>
                                            <div className='ps-3'>
                                                {comm.commentBody}
                                            </div>
                                        </div>
                                        {
                                            comm.commentBy === context.email ?
                                                <div className='text-end p-2 d-flex'>
                                                    <button className='btn btn-warning' value={comm._id} onClick={editHandler}>
                                                        {constants.edit}<BiEdit className='mb-1 h5 icons' />
                                                    </button>
                                                    <button className='btn btn-danger ms-2' value={comm._id} onClick={deleteHandler}>
                                                        {constants.delete}<AiFillDelete className='mb-1 h5 icons' />
                                                    </button>
                                                </div>
                                                : null
                                        }
                                    </div>
                                    {
                                        editToggle && activeCommentId === comm._id ?
                                            <EditComment saveEdits={saveEdits} commentBody={comm.commentBody} id={comm._id} />
                                            : null
                                    }
                                </div>)
                            }) : <div className='ps-5'> {constants.loading} </div>
                        }
                    </div>

                    {
                        context.email ?
                            <AddNewComment addNewComment={addNewComment} />
                            : null
                    }

                </div>
            </div>
        </div>
    )
}

export default Comment