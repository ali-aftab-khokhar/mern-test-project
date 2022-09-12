import React, { useRef } from 'react'
import constants from '../../constants'
import axios from 'axios'
import API from '../../api_config'

const EditComment = (props) => {
const commentRef = useRef()

const saveEdits = (e) => {
    const payload = {
        updatedComment: commentRef.current.value
    }
    axios.put(`${API}/comment/${e.target.value}`, payload)
    props.saveEdits()
}

    return (
        <div className='mb-4 w-100 ms-4 mb-3 mt-3'>
            <div className="input-group">
                <input type="text" className="form-control" ref={commentRef} placeholder={constants.add_new_comment} defaultValue={props.commentBody} />
                <div className="input-group-prepend">
                    <button className="input-group-text" id="inputGroupPrepend2" value={props.id} onClick={saveEdits}>{constants.edit_done}</button>
                </div>
            </div>
        </div>
    )
}

export default EditComment