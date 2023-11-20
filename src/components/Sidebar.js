import React, { useEffect, useState, useRef } from 'react';
import { Search, PanelLeftClose, PanelLeftOpen, Grip, Radio, ChevronRight, ChevronLeft, ChevronLast, ChevronFirst } from 'lucide-react';
import { isMobile }  from 'react-device-detect';
import { useLocation, useNavigate } from 'react-router-dom'
import { dataRecommended } from '../utils/data';
import '../global.css';

function Sidebar(){
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [useRecommended, setUseRecommended] = useState(dataRecommended)
    const [isShowingMore, setIsShowingMore] = useState(false)

    const showMore = () => {
       const newRecommemded = dataRecommended.map(item => ({
            ...item,
            id: Math.floor(100 + Math.random() * 899)
       }))
       setUseRecommended(dataRecommended.concat(newRecommemded))
       setIsShowingMore(true)
    }

    const showLess = () => {
        setUseRecommended(dataRecommended => dataRecommended.slice(0, 3))
        setIsShowingMore(false)
    }

    useEffect(() => {
        setIsCollapsed(isMobile)
    }, [])

    let navigate = useNavigate()
    let location = useLocation()
    
    return(
        <>
            {
                !isCollapsed
                ?
                <sidebar>
                    <div className='header'>
                        <h3>Recommended</h3>
                        <ChevronFirst className='icons' onClick={() => {setIsCollapsed(true)}}/>
                    </div>
                    {useRecommended.map((recommended) => (
                    <div onClick={() => navigate('/username')} key={recommended.id} className='tab'>
                        <div className='spacing'>
                            <div className='avi'>
                                <div className='loader'></div>
                            </div>
                            <div className='description'>
                                <div className='tab-header'>{recommended.username}</div>
                                <div className='tab-detail'>{recommended.genre}</div>
                            </div>
                            <div className='viewers'>
                                <div className='status'></div>
                                <div className='views'>{recommended.views}</div>
                            </div>
                        </div>
                    </div>
                    )) 

                    }
                    <div className='tab'>
                        <div className='wrapper'>
                            {isShowingMore ?
                                <div onClick={showLess} className='show-less'>Show less</div>
                                :
                                <div onClick={showMore} className='show-more'>Show more</div>
                            }
                        </div>
                    </div>
                </sidebar>
                :
                <sidebar className="collapsed">
                    <div className='tab collapsed'>
                        <ChevronLast className='icons chevron' onClick={() => {setIsCollapsed(false)}}/>
                    </div>
                    <div className='tab collapsed'>
                        <Radio className='icons tower'/>
                    </div>
                    {useRecommended.map((recommended) => (
                        <div onClick={() => navigate('/username')} key={recommended.id} className='tab collapsed'>
                            <div className='wrapper'>
                                <div className='avi'>
                                    <div className='loader'></div>
                                </div>
                            </div>
                    </div>
                    ))}
                    <divider></divider>
                :
            </sidebar>
        }
        </>
    )
}

export default Sidebar;