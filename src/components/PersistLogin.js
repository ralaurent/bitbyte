import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import { Dots } from "react-activity";
import "react-activity/dist/library.css";


const PersistLogin = () => {
    const { auth, persist } = useAuth()
    const refresh = useRefreshToken()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true 

        const verifyRefreshToken = async () => {
            try{
                await refresh()
            }catch(err){
                // notify()
            }finally{
               isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

    return(
        <>
        {!persist
            ? <Outlet/>
            : isLoading
            ? <Dots animating={true} color={'#52FC18'} size={20} className='loading-spinner'/>
            : <Outlet/>
        }
        </>
    )
}

export default PersistLogin