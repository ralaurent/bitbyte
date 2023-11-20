import React, { Component } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from './PaymentForm';
import usePaymentProcessor from '../hooks/usePaymentProcessor';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function PaymentProcessor(props) {
    return (
        <Elements stripe={promise}>
            <PaymentForm onSuccess={props.onSuccess} onReject={props.onReject}/>
        </Elements>
    )
}

export default PaymentProcessor