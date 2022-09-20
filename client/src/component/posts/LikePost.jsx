import React, { useState } from 'react'
import { FcLike } from 'react-icons/fc'

const LikePost = (props) => {
    const [count, setCount] = useState(props.count)
    
    const dislikeThePost = (e) => {
        props.dislikeThePost(e.target.value)
        setCount(count - 1)
    }

    return (
        <div>
        <button className='btn ms-3 btn-outline-danger pt-2' value={props.id} onClick={dislikeThePost}>
                {count}<FcLike className='ms-2 mt-1 h5 icons' />
            </button>
        </div>
    )
}

export default LikePost