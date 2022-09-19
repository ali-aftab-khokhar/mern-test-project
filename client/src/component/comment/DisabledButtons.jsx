import React from 'react'
import constants from '../../constants'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

const DisabledButtons = () => {
    return (
        <div>
            <button className='btn btn-warning' disabled >
                {constants.edit}<BiEdit className='mb-1 h5 icons' />
            </button>
            <button className='btn btn-danger ms-2' disabled >
                {constants.delete}<AiFillDelete className='mb-1 h5 icons' />
            </button>
        </div>
    )
}

export default DisabledButtons