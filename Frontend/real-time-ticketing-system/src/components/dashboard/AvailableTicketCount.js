import React, { useEffect, useState } from 'react';
import { fetchAvailableTicketCount } from '../../services/TicketsService';
import '../../sass/availableTicketCount.scss';
import { Box, Typography, Paper, Grid, Card, CardContent, CardMedia, Divider } from '@mui/material';

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
        fetchData().then(() => console.log('Ticket count fetched'));

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className="ticket-card">
                <img 
                    src={require('../../assests/WhatsApp Image 2024-11-25 at 11.02.59-1732518463485.jpeg')}
                    className="ticket-card-image" 
                />
                <div className="ticket-card-content">
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
            </div>
            <Divider className='divider'></Divider>
        </div>
        
    );
};

export default AvailableTicketCount;
