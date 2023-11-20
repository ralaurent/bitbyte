import React, { useEffect, useState, useRef } from 'react';
import { Search, PanelLeftClose, PanelLeftOpen, Grip, RadioTower, ChevronRight, ChevronLeft } from 'lucide-react';
import { isMobile }  from 'react-device-detect';
import useAuth from '../hooks/useAuth'
import useLogout from "../hooks/useLogout"
import { useLocation, useNavigate } from 'react-router-dom'
import { dataRecommended, dataCategories, dataFeatured, dataChannels } from '../utils/data';
import '../global.css';

function Header(){
    const { auth, setIsVisible } = useAuth()
    const logout = useLogout()

    let navigate = useNavigate()
    let location = useLocation()

    const handleLogout = async () => {
        await logout()
        window.location.reload()
    }

    return(
        <>
        <header>
        <nav className='left'>
            <img onClick={() => navigate('/')} className="logo" src="https://i.ibb.co/7nvPBJy/Group-765.png" alt="BitByte logo"/>
            <h3>Browse</h3>
            <div className='wrapper'>
                <Grip className='icons'/>
            </div>
        </nav>
        <searchbar>
            <Search className='icons searchbar'/>
            <input className='search-input' placeholder='Search'></input>
        </searchbar>
        <nav>
            {!auth?.user ?
            <>
                <button onClick={() => setIsVisible(true)} className='border'>Log In</button>
                <button onClick={() => setIsVisible(true)}  className='theme'>Sign Up</button>
            </>
            :
            <>
                <button onClick={handleLogout} className='theme'>Log Out</button>
            </>
            }
            <Search className='icons search'/>
        </nav>
        </header>
        </>
    )
}

export default Header