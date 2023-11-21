import React, { useEffect, useState, useRef } from 'react';
import { Search, PanelLeftClose, PanelLeftOpen, Grip, RadioTower, ChevronRight, ChevronLeft, X, ChevronsUpDown } from 'lucide-react';
import { ConsoleView, isMobile }  from 'react-device-detect';
import { dataCategories, dataFeatured, dataChannels } from '../utils/data';
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import '../global.css';

function Auth() {
    const { isVisible, setIsVisible, setAuth } = useAuth()
    const [type, setType] = useState(true)

    const handleAuth = () => {
        let user = "user"
        let roles = [2000]
        let accessToken = "ZHaCRwaf-W1y=t6YaaMgiYFhwmqu2WOGGq1OWw6ISy872RtzXmMI3?ghNEDpzn8//FExTDxFAvGsqDCEgEIz2=oouZotlv19wH3p18?wdtIWy69s?hdu7rq-U0a!-mZCY0wOo5jFx2PVz36ar5nd=C3Qo=gZ?dTOVi7QjML?sdGSM0C!Bqxo39NzKMeVgEi71=F=w8cBcCGUcs!he?pL7uYGNqCHajySylVL1egZ/TwPSB?G9RaNoGqs8-2/uDmV"
        let csrfToken = "BW=dJRUfHRcJG00BpDjbdjPCGKl-blIrvP?lWgMNDx95dVIvjAEbdA64gG6g9ig/W-pu7VKzKqt2CgsIHbuRaRu-/3ojgXdoxSiAW2XlQmT1wedFL6hqBIbOKSwfnyKZnE3/oyyXUJivrw/GqSt5wLNETJfGOWUvDDez!DzCI?v2SkmEO/Kuq37jjOf5s0G9bO6-ufpGRvle-ivWMUzYcULyw9VIvbaSkcO7ntbpY0/aoqlog8Ds=zp?a2O0CxNh"
        setAuth({ user, roles, accessToken, csrfToken })
        setIsVisible(false)
    }
    
    return(
        <modal className={isVisible ? '' : 'invisible'}>
            <div className='popup'>
                <div>
                    <button className='border close'>
                        <X onClick={() => setIsVisible(false)}/>
                    </button>
                    <img className="logo" src='https://i.ibb.co/1ZJMJPC/Group-781-1.png' alt='BitByte Logo'/>
                    <filter>
                        <div>
                        <div onClick={() => setType(true)} className={type ? null : 'deselected'}>Log In</div>
                        <div onClick={() => setType(false)} className={!type ? null : 'deselected'}>Sign In</div>
                        </div>
                    </filter>
                    {type ? 
                        <div className='forms'>
                            <div>
                                <div className='forms title'>Email or username</div>
                                <input placeholder='you@example.com' className='forms input'></input>
                            </div>
                            <div>
                                <div className='forms title'>Password</div>
                                <input className='forms input'></input>
                            </div>
                            <button onClick={handleAuth} className='theme submit'>Log In</button>
                            <divider></divider>
                            <button className='border fill submit'>
                                <img className='i' src='https://i.ibb.co/BjMsCcp/Google-G-Logo-1.png' alt='Log in with Google'/>
                                Log in with Google
                                <div className='loader'></div>
                            </button>
                            <button className='border fill submit'>
                                <img className='i' src='https://i.ibb.co/DPXQn9G/Vectorized-Apple-gray-logo-2.png' alt='Log in with Apple'/>
                                Log in with Apple
                                <div className='loader'></div>
                            </button>
                        </div>
                        :
                        <div className='forms'>
                            <div>
                                <div className='forms title'>Email</div>
                                <input placeholder='you@example.com' className='forms input'></input>
                            </div>
                            <div>
                                <div className='forms title'>Birthdate</div>
                                <div className='forms date'>
                                    <div>Month
                                        <ChevronsUpDown className='icons small'/>
                                    </div>
                                    <div>Day
                                        <ChevronsUpDown className='icons small'/>
                                    </div>
                                    <div>Year
                                        <ChevronsUpDown className='icons small'/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='forms title'>Username</div>
                                <input className='forms input'></input>
                            </div>
                            <div>
                                <div className='forms title'>Password</div>
                                <input className='forms input'></input>
                            </div>
                            <div>
                                <div className='forms title'>Confirm Password</div>
                                <input className='forms input'></input>
                            </div>
                            <button onClick={handleAuth} className='theme submit'>Sign In</button>
                            <divider></divider>
                            <button className='border fill submit'>
                                <img className='i' src='https://i.ibb.co/BjMsCcp/Google-G-Logo-1.png' alt='Sign in with Google'/>
                                Sign in with Google
                                <div className='loader'></div>
                            </button>
                            <button className='border fill submit'>
                                <img className='i' src='https://i.ibb.co/DPXQn9G/Vectorized-Apple-gray-logo-2.png' alt='Sign in with Apple'/>
                                Sign in with Apple
                                <div className='loader'></div>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </modal>
    )
}
  
export default Auth;