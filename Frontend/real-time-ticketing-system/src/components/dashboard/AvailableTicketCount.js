import React, {useEffect, useState} from 'react';
import {fetchAvailableTicketCount} from '../../services/TicketsService';

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
                Available Ticket Count:{' '}
                {error ? error : availableTicketCount !== null ? availableTicketCount : 'Loading...'}
            </h1>
        </div>
    );
};

export default AvailableTicketCount;
