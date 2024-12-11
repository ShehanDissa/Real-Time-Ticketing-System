import React, { useEffect, useState } from 'react';
import { fetchAvailableTicketCount } from '../../services/TicketsService';
import '../../sass/availableTicketCount.scss';

const AvailableTicketCount = () => {

    const [availableTicketCount, setAvailableTicketCount] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const count = await fetchAvailableTicketCount();
            setAvailableTicketCount(count);
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
        <div className="ticket-count-container">
            <h1 className="ticket-count-header">
                Available Ticket Count:{' '}
                {error ? (
                    <span className="error-message">{error}</span>
                ) : availableTicketCount !== null ? (
                    <span>{availableTicketCount}</span>
                ) : (
                    <span>Loading...</span>
                )}
            </h1>
        </div>
    );
};

export default AvailableTicketCount;
