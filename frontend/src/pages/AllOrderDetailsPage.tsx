import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleOrder from '../components/singleOrder';
import { Order } from "../components/singleOrder";

const AllOrderDetails: React.FC = () => {
    const [orderNumber, setOrderNumber] = useState<string>('');
    const [orderData, setOrderData] = useState<Order[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // State for sorting order

    // Fetch all order data of current page or fetch a single order based on the input orderNumber.
    const fetchData = async (orderNumber: string) => {
        try {
            const response = await axios.get<any>('http://localhost:5000/shipments', {
                params: {
                    orderNumber: orderNumber
                }
            });

            if (response.data && response.data.data) {
                let orders = response.data.data;

                // Sort orders based on selected sorting order (date)
                orders.sort((a: Order, b: Order) => {
                    if (sortOrder === 'asc') {
                        return new Date(a.start).getTime() - new Date(b.start).getTime();
                    } else {
                        return new Date(b.start).getTime() - new Date(a.start).getTime();
                    }
                });

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

    // Fetch data when currentPage or sortOrder changes
    useEffect(() => {
        fetchData(orderNumber);
    }, [currentPage, sortOrder]); // Include sortOrder in dependencies

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNumber(event.target.value);
        // Reset current page to 1 when searching for a new order
        setCurrentPage(1);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const page = parseInt(event.target.value, 10);
        setCurrentPage(page);
    };

    return (
        <div className="allOrderDetailsPage">
            <center><h1>ABC Fashion Shipments</h1></center>
            <div className="filterSection">
                <div className= "filterSection">
                    <input
                        type="text"
                        placeholder="Please enter your tracking number"
                        value={orderNumber}
                        onChange={handleInputChange}
                    />
                    <button onClick={() => fetchData(orderNumber)}>Search</button>
                </div>
                <div className="sortSection">
                    <label>Sort order by start date: </label>
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>
            {orderData ? (
                <div>
                    <div className="allOrders">
                        {orderData.map((order, index) => (
                            <SingleOrder key={index} order={order} index={index + 1 + (currentPage - 1) * 10}/>
                        ))}
                    </div>
                    <div className="pageNavigationSection">
                        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
                        <div>
                            <label>Go to Page:</label>
                            <input
                                type="number"
                                min={1}
                                max={totalPages}
                                value={currentPage}
                                onChange={handlePageInputChange}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AllOrderDetails;
