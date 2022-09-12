import React from 'react'

const Header = (props) => {
  return (
    <div className='text-center bg-dark text-light p-4'>
        <h1>{ props.header }</h1>
    </div>
  )
}

export default Header