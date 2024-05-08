import React, {useState} from 'react';

interface Customer {
    name: string;
    address: string;
    city: string;
    country: string;
    lat: number;
    long: number;
}
export interface Order {
    id: string;
    start: string;
    carrier: string;
    status: string;
    customer: Customer;
    orderNumber: string;
}

interface OrderProps {
    order: Order;
    index: number;
}

const SingleOrder: React.FC<OrderProps> = ({ order, index }) => {

    return (
        <div className="singleOrder">
            <h3>{index}</h3>
            <p>Order Number: {order.orderNumber}</p>
            <p>Start Date: {new Date(order.start).toDateString()}</p>
            <p>Carrier: {order.carrier}</p>
            <p>Status: {order.status}</p>
            <p>Customer: {order.customer.name}</p>
            <p>Address: {order.customer.address}</p>
            <p>City: {order.customer.city}</p>
            <p>Country: {order.customer.country}</p>
        </div>
    );
};

export default SingleOrder;
