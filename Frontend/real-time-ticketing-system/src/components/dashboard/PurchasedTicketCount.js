import React, {useEffect, useState} from 'react';
import {fetchPurchasedTicketCount} from '../../services/PurchaseService';

const PurchasedTicketCount = () => {

    const [purchasedTicketCount, setPurchasedTicketCount] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const count = await fetchPurchasedTicketCount();
            setPurchasedTicketCount(count);
        } catch (err) {
            setError('Unable to fetch ticket count. Please try again.');
        }
    };

    useEffect(() => {
        // Fetch ticket count initially
        fetchData().then(r => console.log('Ticket count fetched'));

        // Set up interval to fetch ticket count every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>
                Purchased Ticket Count:{' '}
                {error ? error : purchasedTicketCount !== null ? purchasedTicketCount : 'Loading...'}
            </h1>
        </div>
    );
};

export default PurchasedTicketCount;
