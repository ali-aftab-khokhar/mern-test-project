import React from 'react'
import { FcLike } from 'react-icons/fc'

const LikePost = (props) => {
    const dislikeThePost = (e) => {
        props.dislikeThePost(e.target.value)
    }

    return (
        <div>
        <button className='btn ms-3 btn-outline-danger pt-2' value={props.id} onClick={dislikeThePost}>
                {props.count}<FcLike className='ms-2 mt-1 h5 icons' />
            </button>
        </div>
    )
}

export default LikePost