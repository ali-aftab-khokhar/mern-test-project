import React, { createContext, useEffect, useState } from 'react'
import contextAPI from './contextAPI'

const ContextState = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState({name: '', email: '', id: '', posts: []})

    useEffect(() => {
        setIsLoggedIn(isLoggedIn)
    }, [isLoggedIn])

    return (
        <contextAPI.Provider value={isLoggedIn}>
            {props.children}
        </contextAPI.Provider>
    )
}

export default ContextState