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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    //Fetch all order data of current page or fetch a single order based on the input orderNumber.
    const fetchData = async (orderNumber: string) => {
        try {
            const response = await axios.get<any>('http://localhost:5000/shipments', {
                params: {
                    orderNumber: orderNumber
                }
            });

            if (response.data && response.data.data) {
                const orders = response.data.data;
                const totalOrders = orders.length;

                setTotalPages(Math.ceil(totalOrders / 10));

                // Paginate orders based on current page
                const startIndex = (currentPage - 1) * 10;
                const endIndex = Math.min(startIndex + 10, totalOrders);
                setOrderData(orders.slice(startIndex, endIndex));
            } else {
                setOrderData(null);
                setTotalPages(0);
            }
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    // Fetch data when currentPage changes
    useEffect(() => {
        fetchData(orderNumber);
    }, [currentPage]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNumber(event.target.value);
        // Reset current page to 1 when searching for a new order
        setCurrentPage(1);
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
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
                            <h3>Order {index + 1 + (currentPage - 1) * 10}</h3>
                            <p>Order Number: {order.orderNumber}</p>
                            <p>Start Date: {order.start}</p>
                            <p>Carrier: {order.carrier}</p>
                            <p>Status: {order.status}</p>
                            <p>Customer: {order.customer.name}</p>
                        </div>
                    ))}
                    <div>
                        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OrderDetails;
