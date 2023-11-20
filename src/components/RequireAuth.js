import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setIsVisible } = useAuth()
    const location = useLocation()

    useEffect(() => {
        if(auth?.roles?.find(role => allowedRoles?.includes(role))){
            if(auth?.user){
                setIsVisible(false)
            }
            return
        }
        setIsVisible(true)
    }, [location])

    return(
        <Outlet/>
    )
}

export default RequireAuth