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
//
// import {
//     setKey,
//     setDefaults,
//     setLanguage,
//     setRegion,
//     fromAddress,
//     fromLatLng,
//     fromPlaceId,
//     setLocationType,
//     geocode,
//     RequestType,
// } from "react-geocode";



interface OrderProps {
    order: Order;
    index: number;
}

const SingleOrder: React.FC<OrderProps> = ({ order, index }) => {

    const [orderLocation, setOrderLocation] = useState<string>('');



    // geocode(RequestType.LATLNG, "48.8583701,2.2922926")
    //     .then(({ results }) => {
    //         const address = results[0].formatted_address;
    //         setOrderLocation(address)
    //         console.log(address);
    //     })
    //     .catch(console.error);
    return (
        <div className="singleOrder">
            <h3>Order {index}</h3>
            <p>Order Number: {order.orderNumber}</p>
            <p>Start Date: {new Date(order.start).toDateString()}</p>
            <p>Carrier: {order.carrier}</p>
            <p>Status: {order.status}</p>
            <p>Customer: {order.customer.name}</p>
            <p>Address: {order.customer.address}</p>
            <p>City: {order.customer.city}</p>
            <p>Country: {order.customer.country}</p>
            {/*<p>Location: {orderLocation}</p>*/}

            {/*<p>Latitude: {order.customer.lat}</p>*/}
            {/*<p>Longitude: {order.customer.long}</p>*/}
        </div>
    );
};

export default SingleOrder;
