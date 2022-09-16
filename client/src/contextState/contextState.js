import React, { useEffect, useState } from 'react'
import contextAPI from './contextAPI'

const ContextState = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState({name: '', email: '', id: ''})

    const login = (nameParam, emailParam, idParam) => {
        setIsLoggedIn({
            name: nameParam,
            email: emailParam,
            id: idParam
        })
    }

    const logout = () => {
        setIsLoggedIn({
            name: '',
            email: '',
            id: ''
        })
    }

    useEffect(() => {
        setIsLoggedIn(isLoggedIn)
    }, [isLoggedIn])

    return (
        <contextAPI.Provider value={{ isLoggedIn, login, logout }}>
            {props.children}
        </contextAPI.Provider>
    )
}

export default ContextState