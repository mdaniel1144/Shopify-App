import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import {FaTimes} from 'react-icons/fa';
import './Payment.css';

const Payment = ({setIsPayment}) => {
    const { user } = useContext(AuthContext);
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYear] = useState('');
    const [cardCVC, setCardCVC] = useState('');
    const [errors, setErrors] = useState({});

    const handlePay = async () => {
        if (validate()) {
            try {
                console.log(user);
                await axios.post('/payment', {
                    userId: user.id,
                    cart: cart,
                    isracard: 'd', // the cart object from the state
                });
                clearCart();
                navigate('/');
            } catch (error) {
                console.error('Payment failed:', error);
            }
        }
    };

    const validate = () => {
        const newErrors = {};
        const cardNumberRegex = /^[\d\s]{13,19}$/;
        const cardHolderRegex = /^[A-Za-z\s]+$/;
        const monthRegex = /^(0[1-9]|1[0-2])$/;
        const yearRegex = /^\d{2}$/;
        const cvcRegex = /^\d{3}$/;

        if (!cardHolder || !cardHolderRegex.test(cardHolder)) {
            newErrors.cardHolder = 'Card holder name must contain only letters and spaces.';
        }
        if (!cardNumber || !cardNumberRegex.test(cardNumber)) {
            newErrors.cardNumber = 'Card number must be 13-19 digits.';
        }
        if (!monthRegex.test(cardMonth) || !yearRegex.test(cardYear)) {
            newErrors.expiryDate = 'Expiry date must be valid.';
        } else {
            const currentYear = new Date().getFullYear().toString().slice(-2);
            const currentMonth = new Date().getMonth() + 1;
            const expMonth = parseInt(cardMonth, 10);
            const expYear = parseInt(cardYear, 10);

            if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                newErrors.expiryDate = 'Card has expired.';
            }
        }
        if (!cardCVC || !cvcRegex.test(cardCVC)) {
            newErrors.cardCVC = 'CVC must be exactly 3 digits.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatCardNumber = (number) => {
        return number.replace(/\d{4}(?=.)/g, "$& ");
    };

    return (
        <section>
            <div className='payment-close' onClick={(e)=>setIsPayment(false)}></div>
            <div className="payment-container">
                <button className='payment-button-back'  onClick={(e)=> setIsPayment(false)}><FaTimes style={{ height: '40px' ,width: '40px'}}/></button>
                <div className="form__container">
                    <h1 className="header">Credit Card Form</h1>

                    <form onSubmit={(e) => { e.preventDefault(); handlePay(); }}>
                        <div className="inputBox">
                            <span>Card Holder Name</span>
                            <input
                                type="text"
                                maxLength="30"
                                className="card-holder-input"
                                placeholder="John Doe"
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value)}
                            />
                            {errors.cardHolder && <p className="error">{errors.cardHolder}</p>}
                        </div>

                        <div className="inputBox">
                            <span>Card Number</span>
                            <input
                                type="text"
                                maxLength="19"
                                className="card-number-input"
                                placeholder="0000 0000 0000 0000"
                                value={formatCardNumber(cardNumber)}
                                onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ''))}
                            />
                            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
                        </div>

                        <div className="multi__box">
                            <div className="inputBox">
                                <span>Exp. (MM)</span>
                                <input
                                    type="text"
                                    maxLength="2"
                                    className="card-month-input"
                                    placeholder="00"
                                    value={cardMonth}
                                    onChange={(e) => setCardMonth(e.target.value)}
                                />
                                {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
                            </div>

                            <div className="inputBox">
                                <span>Exp. (YY)</span>
                                <input
                                    type="text"
                                    maxLength="2"
                                    className="card-year-input"
                                    placeholder="00"
                                    value={cardYear}
                                    onChange={(e) => setCardYear(e.target.value)}
                                />
                                {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
                            </div>

                            <div className="inputBox">
                                <span>CVC</span>
                                <input
                                    type="text"
                                    maxLength="3"
                                    className="card-cvc-input"
                                    placeholder="000"
                                    value={cardCVC}
                                    onChange={(e) => setCardCVC(e.target.value)}
                                />
                                {errors.cardCVC && <p className="error">{errors.cardCVC}</p>}
                            </div>
                        </div>

                        <button type="submit" className="pay-btn">Pay</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Payment;