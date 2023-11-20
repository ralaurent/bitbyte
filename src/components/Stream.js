import React, { useEffect, useState, useRef } from 'react';
import { PanelRightClose, PanelRightOpen, LockKeyhole, Turtle, Settings, Pause, Volume2, GalleryVertical, PictureInPicture, Fullscreen, BadgeCheck, Users2, Share2 } from 'lucide-react';
import { ConsoleView, isMobile }  from 'react-device-detect';
import { dataCategories, dataFeatured, dataChannels, dataChats } from '../utils/data';
import { generateRandomColor } from '../utils/GenerateColor';
import Header from './Header'
import Sidebar from './Sidebar'
import Auth from './Auth'
import Footer from './Footer'
import PaymentProcessor from "../payment/PaymentProcessor"
import usePaymentRouter from '../hooks/usePaymentRouter';
import usePaymentProcessor from '../hooks/usePaymentProcessor';
import '../global.css';

function Stream() {
    const paymentRouter  = usePaymentRouter()
    const { paymentDisplay, setPaymentDisplay, paymentIsLoading, setPaymentIsLoading } = usePaymentProcessor()
    const [type, setType] = useState(true)
    const [chatIsOpen, setChatIsOpen] = useState(true)

    useEffect(() => {
        console.log()
    })

    const sendTip = (tip = 1) => {
        console.log(window.location.pathname.split("/")[1])
        if(tip && tip != 0){
            const data = { model: window.location.pathname.split("/")[1], tip: tip } 
            paymentRouter(data, success)  
        }
    }

    const success = () => {
        console.log("Successfully completed the transaction!")
    }

    return (
      <>
      <container>
          <Header/>
          <Sidebar/>
          <content>
            <stream>
                <div>
                    <div className='backdrop'>
                            <PanelRightOpen onClick={() => setChatIsOpen(true)} className={!chatIsOpen ? 'icons expand' : 'invisible'}/>
                        <div className='video-player'>
                            <div className='controls'>
                                <div>
                                    <Pause className='icons control'/>
                                    <Volume2 className='icons control'/>
                                    <div>LIVE</div>
                                </div>
                                <div>
                                    <div>13:36:07</div>
                                    <GalleryVertical className='icons control'/>
                                    <PictureInPicture className='icons control'/>
                                    <Fullscreen className='icons control'/>
                                </div>
                            </div>
                            <div className='loader'></div>
                        </div>
                    </div>
                    <section className='medium'>
                        <div className='info'>
                            <div>
                                <div>
                                    <div className='avi large'>
                                        <div className='live tag'>LIVE</div>
                                        <div className='avi wrapper'>
                                            <div className='loader'></div>
                                        </div>
                                    </div>
                                    <div className='user-info'>
                                        <div>
                                            Username
                                            <BadgeCheck className='icons badge'/>
                                        </div>
                                        <div>Stream name</div>
                                        <div>
                                            Main genre 
                                            <div>
                                            {dataCategories[0].genres.map((genre, index) => (
                                            <div key={index} className='panel'>
                                                <div className='loader'></div>
                                                {genre}
                                            </div>
                                            ))}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Users2 className='icons'/>
                                    <div>87,587</div>
                                    <h3>viewers</h3>
                                    <button className='border'>
                                        <Share2 className='icons'/>
                                    </button>
                                </div>
                            </div>
                            <section>
                                <div className='more-info'>
                                    <div>
                                        <div>About Username</div>
                                        <div>98,656 followers</div>
                                        <div>This is an intentionally elongated description...</div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <filter>
                                    <div>
                                    <div onClick={() => setType(true)} className={type ? null : 'deselected'}>Videos</div>
                                    <div onClick={() => setType(false)} className={!type ? null : 'deselected'}>Clips</div>
                                    </div>
                                </filter>
                            </section>

                        </div>
                        <section></section>
                    </section>
                </div>
                {chatIsOpen ?
                    <div>
                        <div>
                            <PanelRightClose onClick={() => setChatIsOpen(false)} className={chatIsOpen ? 'icons chat' : 'invisible'}/>
                            <div>Chat</div>
                        </div>
                        <div>
                            {dataChats.map((chat) => (
                                <div className='feed'>
                                    <div>
                                        <span style={{ color: generateRandomColor()}}>{chat.username} 
                                        <span>:</span>
                                        </span>
                                        {chat.message}
                                    </div>
                                </div>
                            )) }
                        </div>
                        <div>
                            <chat>
                                <input disabled={true} className='chat-input' placeholder='Disabled chat'></input>
                                <LockKeyhole className='icons lock'/>
                            </chat>
                            <div className='dock'>
                                <button className='border disable'>
                                    <Turtle className='icons'/>
                                    Slow mode enabled
                                </button>
                                <button className='border fill'>
                                    <Settings className='icons'/>
                                </button>
                                <button onClick={sendTip} className='theme disabled'>Send</button>
                            </div>
                        </div>
                    </div> 
                    :
                    null

                }
            </stream>
          </content>
          <Auth/>
          <PaymentProcessor/>
      </container>
      </>
    )
}

export default Stream;