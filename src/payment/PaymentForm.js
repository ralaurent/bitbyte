import React, { useState, useEffect, useRef } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from 'axios'
import useAuth from "../hooks/useAuth"
import usePaymentProcessor from '../hooks/usePaymentProcessor';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import "./Payment.css"

function PaymentForm(props) {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const { paymentDisplay, setPaymentDisplay, paymentDisplayData, setPaymentDisplayData, paymentIsLoading, setPaymentIsLoading } = usePaymentProcessor()
  const [cardholderName, setCardholderName] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [clientSecret2, setClientSecret2] = useState('');
  const stripe = useStripe();
  const elements = useElements();    
  
  document.addEventListener("click", (e) => {
    if(e.target.className === "payment-overlay"){
      setPaymentDisplay(paymentDisplay => "none")
    } 
  })

  const onChangeCardholderName = async (inputValue) => {
    setCardholderName(inputValue)
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    if(paymentDisplay === "none") return

    const dataCheck = (data, string) => {
      if(data) return string
      else return null
    }

    const sendPaymentIntent = async () => {
      await axiosPrivate.post("/setupPayment", {
          username: auth?.user,
          recipient: paymentDisplayData.recipient,
          items: [dataCheck(paymentDisplayData?.photos, "photos"), dataCheck(paymentDisplayData?.chats, "chats"), dataCheck(paymentDisplayData?.liveChats, "liveChats")],
          tip: dataCheck(paymentDisplayData?.tip)
      })
      .then(response => {
        setClientSecret(response.data.message.paymentIntentSecret)
        setClientSecret2(response.data.message.setupIntentSecret)
      })
      .catch(err => {
        // notify()
      })
    }

    sendPaymentIntent()

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [paymentDisplay]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const addToBalance = async (payload) => {
    await axiosPrivate.post("/addToBalance", {
        paymentIntent: payload.paymentIntent,
    })
    .then(response => {
    })
    .catch(err => {
      // notify()
    })
  }

  const handlePaymentSubmit = async ev => {
   try{
    ev.preventDefault();
    setPaymentIsLoading(paymentIsLoading => true)
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setPaymentIsLoading(paymentIsLoading => false)
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      addToBalance(payload)
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      stripe.confirmCardSetup(clientSecret2, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName,
          },
        },
      })
      .then(function(result) {
        if (result.error) {
          setPaymentIsLoading(paymentIsLoading => false)
          return
        }
        else if (result.setupIntent) {
          setPaymentIsLoading(paymentIsLoading => false)
          props.onSuccess()
        }
      });
    }
   }catch(err){
    // notify()
   }
  };

  return (
        <div style={{display: paymentDisplay}} className="payment-overlay">
            <div className='payment-modal'>
                <div className='payment-modal-header'> 
                    <div className='payment-modal-header-text'>{paymentDisplayData?.header}</div>
                </div>
                {/* <div className="payment-modal-input-frame">
                  <input style={{fontFamily: 'Arial, sans-serif'}} type="payments" value={cardholderName} onChange={(e) => onChangeCardholderName(e.target.value)} placeholder={'Cardholder Name'} autoComplete="off" className='payment-modal-input'></input>
                </div> */}
                <form id="payment-form" onSubmit={handlePaymentSubmit}>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} type="stripe"/>
                <button style={{border: 'none', width: '100%', height: '40px', color: '#FFFFFF', backgroundColor: '#000', borderRadius: '5px', fontSize: '14px'}}
                    disabled={processing || disabled || succeeded}
                    id="submit"
                >
                    <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "Submit"
                    )}
                    </span>
                </button>
                </form>  
            </div>
        </div>
  );
}

export default PaymentForm