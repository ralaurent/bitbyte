import React, { useEffect, useState, useRef } from 'react';
import { Search, PanelLeftClose, PanelLeftOpen, Grip, RadioTower, ChevronRight, ChevronLeft } from 'lucide-react';
import { ConsoleView, isMobile }  from 'react-device-detect';
import { dataCategories, dataFeatured, dataChannels } from '../utils/data';
import { useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Channels from './Channels'
import Auth from './Auth'
import Footer from './Footer'
import '../global.css';

function Home() {
    const [useChannels, setUseChannels] = useState(dataChannels)
    const [useMoreChannels, setUseMoreChannels] = useState(dataChannels)
    const [isShowingMore, setIsShowingMore] = useState(new Array(2).fill(false))

    const showMore = (setState, position) => {
        const newRecommemded = dataChannels.slice(0, 3).map(item => ({
            ...item,
            id: Math.floor(100 + Math.random() * 899)
        }))
        setState(dataChannels.concat(newRecommemded))
        setIsShowingMore(showing => {
            const newArray = [...showing]
            newArray[position] = true
            return newArray
        })
        console.log(isShowingMore)
    }

    useEffect(() => {
    })

    let navigate = useNavigate()
    let location = useLocation()

    const handleChildClick = (e) => {
        e.stopPropagation()
        navigate('/categories/')
    }

    return (
      <>
        <container>
            <Header/>
            <Sidebar/>
            <content>
                <section>
                    <h2>Featured Streams</h2>
                    <carousel>
                        {dataFeatured.map((featured) => (
                        <div onClick={() => navigate('/username')}  key={featured.id} className='wrapper'>
                            <div className="thumbnail">
                                <div className='loader'>
                                    <div className='live-tag'>LIVE</div>
                                    <div className='views-tag carousel'>{featured.views} viewers</div>
                                    <div className='popup'>
                                        <div className='popup-header'>
                                            <div className='popup-title'>
                                                <div className='avi'>
                                                    <div className='loader'></div>
                                                </div>
                                                {featured.username}
                                            </div>
                                            <ChevronRight className='icons'/>
                                        </div>
                                        <div className='popup-description'>{featured.description}</div>
                                    </div>
                                </div>
                            </div>
                            <div href=''>{featured.streamTitle}</div>
                            <div href=''>{featured.username}</div>
                            <div onClick={handleChildClick} href=''>{featured.category}</div>
                        </div>
                        ))}
                    </carousel>
                    <ChevronLeft className='move-left arrows'/>
                    <ChevronRight className='move-right arrows'/>
                </section>
                <divider></divider>
                <section>
                    <h2>Top Live Categories</h2>
                    <categories>
                        {dataCategories.map((category) => (
                        <div key={category.id} className='wrapper'>
                            <div onClick={() => navigate('/categories/')} className='thumbnail'>
                                <div className='loader'></div>
                            </div>
                            <div onClick={() => navigate('/categories/')} href=''>{category.categoryTitle}</div>
                            <div href=''>{category.viewers} viewers</div>
                            <div>
                                {category.genres.map((genre, index) => (
                                <div key={index} className='panel'>
                                    <div className='loader'></div>
                                    {genre}
                                </div>
                                ))}
                            </div>
                        </div>
                        ))}
                    </categories>
                </section>
                <divider></divider>
                <section>
                    <h2>Recommended Channels</h2>
                    <Channels data={useChannels} className={isShowingMore[0] ? '' : 'default'}/>
                </section> 
                <divider>
                    <div onClick={() => showMore(setUseChannels, 0)} className={isShowingMore[0] ? "invisible" :'show-more'}>Show more</div>
                </divider>
                <section>
                    <h2>More Recommended Channels</h2>
                    <Channels data={useMoreChannels} className={isShowingMore[1] ? '' : 'default'}/>
                </section>
                <divider>
                    <div onClick={() => showMore(setUseMoreChannels, 1)} className={isShowingMore[1] ? "invisible" :'show-more'}>Show more</div>
                </divider>
                <Footer/>
            </content>
            <Auth/>
        </container>
      </>
    );
  }
  
export default Home;