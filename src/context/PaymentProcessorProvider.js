import { createContext, useEffect, useState } from 'react'

const PaymentProcessorContext = createContext({})

export const PaymentProcessorProvider = ({ children }) => {
    const [paymentDisplay, setPaymentDisplay] = useState("none")
    const [paymentDisplayData, setPaymentDisplayData] = useState({})
    const [paymentIsLoading, setPaymentIsLoading] = useState(false)

    return(
        <PaymentProcessorContext.Provider value={{ paymentDisplay, setPaymentDisplay, paymentDisplayData, setPaymentDisplayData, paymentIsLoading, setPaymentIsLoading }}>
            {children}
        </PaymentProcessorContext.Provider>
    )
}
export default PaymentProcessorContext