import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import contextAPI from '../../contextState/contextAPI'

const Header = (props) => {
  const context = useContext(contextAPI)
  const navigate = useNavigate()

  const toMyProfile = () => {
    navigate(`/profile/${context.isLoggedIn.id}`)
  }

  return (
    <div className='text-center bg-dark text-light p-4 d-flex'>
      <div className='w-75'>
        <h1>{props.header}</h1>
      </div>
      <div className='float-right text-center p-3'>
        {
          context.isLoggedIn.email ? <h4 onClick={toMyProfile}>{props.profile}</h4> : null
        }
      </div>
    </div>
  )
}

export default Header