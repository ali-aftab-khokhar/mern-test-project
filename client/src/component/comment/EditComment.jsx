import React, { useRef } from 'react'
import constants from '../../constants'
import putService from '../../services/putMethod'

const EditComment = (props) => {
const commentRef = useRef()

const saveEdits = (e) => {
    const id = e.target.value
    const payload = {
        updatedComment: commentRef.current.value
    }
    putService(payload, 'Updated', `comment/${id}`)
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