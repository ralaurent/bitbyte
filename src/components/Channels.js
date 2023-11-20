import React, {} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../global.css';

function Channels ({ data, className }){

    let navigate = useNavigate()
    let location = useLocation()

    const handleChildClick = (e) => {
        e.stopPropagation()
        navigate('/categories/')
    }

    return(
        <channels className={className}>
            {data.map((channel) => (
            <div onClick={() => navigate('/username')} key={channel.id} className='wrapper'>
            <div className='spacing'>
                <div className='thumbnail'>
                    <div className='loader'></div>
                    <div className='live-tag'>LIVE</div>
                    <div className='views-tag channels'>{channel.views} viewers</div>
                </div>
                <div>
                    <div className='avi'>
                        <div className='loader'></div>
                    </div>
                    {channel.username}
                </div>
                <div>{channel.streamTitle}</div>
                <div onClick={handleChildClick}>{channel.category}</div>
                <div>
                    {channel.tags.map((tag, index) => (
                        <div key={index} className='panel'>
                            <div className='loader'></div>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            </div>
            ))}
        </channels>
    )
}

export default Channels