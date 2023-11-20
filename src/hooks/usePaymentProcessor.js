import { useContext } from "react"
import PaymentProcessorContext from "../context/PaymentProcessorProvider"

const usePaymentProcessor = () => {
    return useContext(PaymentProcessorContext)
}

export default usePaymentProcessor