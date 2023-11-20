import React, { useEffect, useState, useRef } from 'react';
import { Search, PanelLeftClose, PanelLeftOpen, Grip, RadioTower, ChevronRight, ChevronLeft } from 'lucide-react';
import { ConsoleView, isMobile }  from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom'
import { dataCategories, dataFeatured, dataChannels } from '../utils/data';
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import '../global.css';

function Forbidden() {

    let navigate = useNavigate()
    let location = useLocation()

    return (
      <>
      <container>
          <Header/>
          <content>
            <forbidden>
                <div>
                    <img className='forbidden-404' src='https://i.ibb.co/QkNLw4k/Group-780.png' alt="404 Image"/>
                    <h1>Oops, Something went wrong</h1>
                    <h3>We can't find the page you're looking for</h3>
                    <button onClick={() => navigate('/')} className='border'>Return to home</button>
                </div>
            </forbidden>
            {/* <Footer/> */}
          </content>
      </container>
      </>
    )
}

export default Forbidden;