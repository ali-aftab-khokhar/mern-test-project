import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import constants from '../../constants'
import Header from '../Header/Header'
import axios from 'axios'
import API from '../../api_config'
import contextAPI from '../../contextState/contextAPI'

const Home = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const navigate = useNavigate()
    const context = useContext(contextAPI)

    const toCreateAnAccount = () => {
        navigate('/register')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        // registerUser()
        axios.post(`${API}/`, payload)
            .then((res) => {
                if (res.status === 200) {
                    context.name = res.data[0].name
                    context.email = res.data[0].email
                    context.id = res.data[0]._id
                    context.posts = res.data[0].posts
                    alert('Logged In')
                    navigate('/posts')
                }
                else {
                    alert('Something Error')
                }
            })
    }

    return (
        <div>
            <Header header={constants.app_title} />
            <div className='text-center mt-5 d-flex justify-content-center align-content-center'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label>{constants.email}</label>
                        <input type='email' className='form-control mt-2' placeholder={constants.enter_an_email} ref={emailRef} />
                    </div>
                    <div className='form-group mt-4'>
                        <label>{constants.password}</label>
                        <input type='password' className='form-control mt-2' placeholder={constants.enter_password} ref={passwordRef} />
                    </div>
                    <div>
                        <button type='submit' className='btn btn-outline-dark mt-4'>{constants.login}</button>
                    </div>
                    <div>
                        <button onClick={toCreateAnAccount} className="btn btn-dark mt-3">{constants.create_an_account}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home