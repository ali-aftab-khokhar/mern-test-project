import React from 'react'
import { FcLikePlaceholder } from 'react-icons/fc'

const UnlikePost = (props) => {
    const likeThePost = (e) => {
        props.likeThePost(e.target.value)
    }

    return (
        <div>
            <button className='btn ms-3 btn-outline-danger pt-2' value={props.id} onClick={likeThePost}>
                {props.count}<FcLikePlaceholder className='ms-2 mt-1 h5 icons' />
            </button>
        </div>
    )
}

export default UnlikePost