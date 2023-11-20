import React, { useEffect, useState, useRef } from 'react'
import axios from '../api/axios'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import usePaymentProcessor from '../hooks/usePaymentProcessor';
import useAuth from './useAuth'

const usePaymentRouter = () => {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { paymentDisplay, setPaymentDisplay, paymentDisplayData, setPaymentDisplayData, paymentIsLoading, setPaymentIsLoading } = usePaymentProcessor()

    const paymentRouter = async (data, funct) => {
        try{
            setPaymentIsLoading(paymentIsLoading => true)
            await axiosPrivate.post("/paymentCheck", {
                username: auth?.user
            }) 
            .then(async function (response) {
                const dataCheck = (data, string) => {
                  if(data) return string
                  else return null
                }
                await axiosPrivate.post("/quickPayment", {
                    username: auth?.user,
                    recipient: data.recipient,
                    items: [dataCheck(data?.photos, "photos"), dataCheck(data?.chats, "chats"), dataCheck(data?.liveChats, "liveChats")],
                    tip: data?.tip || "0"
                }) 
                .then(async function (response) {
                    funct()
                    await axiosPrivate.post("/addToBalance", {
                        paymentIntent: response.data.message.paymentIntent,
                    })
                    .then(response => {
                        setPaymentIsLoading(paymentIsLoading => false)
                    })
                    .catch(err => {
                        setPaymentIsLoading(paymentIsLoading => false)
                        // notify()
                    })
                })
                .catch(function (error) {
                    setPaymentIsLoading(paymentIsLoading => false)
                    setPaymentDisplayData({ header: "Pay", recipient: data.recipient, photos: data.photos, chats: data.chats, liveChats: data.liveChats, tip: data.tip })
                    setPaymentDisplay(paymentDisplay => "flex") 
            })
            })
            .catch(function (error) {
                setPaymentIsLoading(paymentIsLoading => false)
                setPaymentDisplayData({ header: "Pay", recipient: data.recipient, photos: data.photos, chats: data.chats, liveChats: data.liveChats, tip: data.tip })
                setPaymentDisplay(paymentDisplay => "flex") 
            })
        }catch(err){
            setPaymentIsLoading(paymentIsLoading => false)
            // notify()
        }
    }
    return paymentRouter
}

export default usePaymentRouter