import React, { useEffect, useState } from 'react';
import { fetchPurchasedTicketCount } from '../../services/PurchaseService';
import '../../sass/purchasedTicketCount.scss';
import { Card, CardContent } from '@mui/material';


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
        fetchData().then(r => console.log('Ticket count fetched'));

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Card className="ticket-count-card">
            <CardContent>
                <div className="ticket-count-container">
                    <h1 className="ticket-count-header">
                        Purchased Ticket Count:{' '}
                        {error ? (
                            <span className="error-message">{error}</span>
                        ) : purchasedTicketCount !== null ? (
                            <span>{purchasedTicketCount}</span>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </h1>
                </div>
            </CardContent>
</Card>

    );
};

export default PurchasedTicketCount;
