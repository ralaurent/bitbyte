import React, { useEffect, useState, useRef } from 'react';
import { Search, PanelLeftClose, PanelLeftOpen, Grip, RadioTower, ChevronRight, ChevronLeft } from 'lucide-react';
import { ConsoleView, isMobile }  from 'react-device-detect';
import { dataCategories, dataFeatured, dataChannels } from '../utils/data';
import Header from './Header'
import Sidebar from './Sidebar'
import Channels from './Channels'
import Auth from './Auth'
import Footer from './Footer'
import '../global.css';

function Categories() {
  const [type, setType] = useState(true)

    return (
      <>
      <container>
          <Header/>
          <Sidebar/>
          <content>
            <section>
              <div className='categories header'>
                <div className='wrapper'>
                  <div className='thumbnail'>
                    <div className='loader'></div>
                  </div>
                </div>
                <div>
                  <h1 className='h1 adj'>Specific Category</h1>
                  <div>
                    <h2 className='h2 adj'>1,789 viewers</h2>
                    <h2 className='h2 adj'>8,908 Followers</h2>
                  </div>
                  <div>
                    <div className='panel large'>
                        <div className='loader'></div>
                        Genre
                    </div>
                    <div className='panel large'>
                        <div className='loader'></div>
                        Genre
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className='thin'>
              <filter>
                <div>
                  <div onClick={() => setType(true)} className={type ? null : 'deselected'}>Live Channels</div>
                  <div onClick={() => setType(false)} className={!type ? null : 'deselected'}>Clips</div>
                </div>
              </filter>
            </section>
            <section>
                <Channels data={dataChannels}/>
            </section>
            <Footer/>
          </content>
            <Auth/>
      </container>
      </>
    )
}

export default Categories;