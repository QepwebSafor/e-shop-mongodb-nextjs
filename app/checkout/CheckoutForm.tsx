"use client";
import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/hooks/useCart";

import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import formatPrice from "@/utils/formatPrice";
import { toast } from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";
interface CheckoutFormProps {
  clientSecret: String;
  handleSetPaymentSuccess: (value: boolean) => void;
}
const CheckoutForm:React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}: CheckoutFormProps) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();

  const stripe = useStripe();
  const elements = useElements();

  // const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required"
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold mt-4 mb-2">
        Address Information
      </h2>
      <AddressElement options={{
        
        mode: 'shipping',
       allowedCountries:['EU'],
    }} />
      <h2 className="font-semibold mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{layout: 'tabs'}} />
      <div className="py-4 text-center text-slate-700 text-2xl">

        Total: {formattedPrice}
      </div>
      <Button 
      
      disabled= { isLoading || !stripe || !elements} 
      label={isLoading ? "Procesing": "Pay now"}
      onClick={()=>{}}></Button>
      
    </form>
  );
};
export default CheckoutForm;
