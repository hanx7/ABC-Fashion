import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Customer {
    name: string;
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
}

interface Order {
    id: string;
    start: string;
    carrier: string;
    status: string;
    customer: Customer;
    orderNumber: string;
}

const OrderDetails: React.FC = () => {
    const [orderNumber, setOrderNumber] = useState<string>('');
    const [orderData, setOrderData] = useState<Order[] | null>(null);

    const fetchData = async (orderNumber: string) => {
        try {
            const response = await axios.get<any>('http://localhost:5000/shipments', {
                params: {
                    orderNumber: orderNumber
                }
            });

            if (response.data) {
                setOrderData(response.data.data);
            } else {
                setOrderData(null);
            }
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchData(orderNumber); // Fetch data when the component mounts
    }, []); // Empty dependency array ensures useEffect runs only once

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNumber(event.target.value);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Please enter your order number"
                    value={orderNumber}
                    onChange={handleInputChange}
                />
                <button onClick={() => fetchData(orderNumber)}>Fetch Order</button>
            </div>
            {orderData ? (
                <div>
                    <h2>Order Details</h2>
                    {orderData.map((order, index) => (
                        <div key={index}>
                            <h3>Order {index + 1}</h3>
                            <p>Order Number: {order.orderNumber}</p>
                            <p>Start Date: {order.start}</p>
                            <p>Carrier: {order.carrier}</p>
                            <p>Status: {order.status}</p>
                            <p>Customer: {order.customer.name}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OrderDetails;
