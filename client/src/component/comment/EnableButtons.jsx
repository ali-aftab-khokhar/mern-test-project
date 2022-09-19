import React from 'react'
import constants from '../../constants'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

const EnableButtons = (props) => {
    return (
        <div>
            <button className='btn btn-warning' value={props.id} onClick={props.editHandler}>
                {constants.edit}<BiEdit className='mb-1 h5 icons' />
            </button>
            <button className='btn btn-danger ms-2' value={props.id} onClick={props.deleteHandler}>
                {constants.delete}<AiFillDelete className='mb-1 h5 icons' />
            </button>
        </div>
    )
}

export default EnableButtons