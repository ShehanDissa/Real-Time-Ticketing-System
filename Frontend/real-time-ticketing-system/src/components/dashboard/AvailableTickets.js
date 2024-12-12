import React, { useState, useEffect } from 'react';
import { fetchAvailableTickets } from '../../services/TicketsService';
import { Box, Typography, Paper } from '@mui/material';
import '../../sass/availableTickets.scss';
import cardImg from '../../assests/WhatsApp Image 2024-11-25 at 11.02.59-1732518463485.jpeg';

const AvailableTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);

    const fetchTickets = async () => {
        try {
            const data = await fetchAvailableTickets();
            const sortedTickets = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTickets(sortedTickets);
        } catch (err) {
            setError('Error fetching available tickets. Please try again later.');
        }
    };

    useEffect(() => {
        fetchTickets().then(() => console.log('Tickets fetched'));
        const intervalId = setInterval(fetchTickets, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const images = [
        'https://via.placeholder.com/150/6a11cb',
        'https://via.placeholder.com/150/f093fb',
        'https://via.placeholder.com/150/4facfe',
        'https://via.placeholder.com/150/ff9a9e',
        'https://via.placeholder.com/150/a18cd1',
        cardImg,
    ];
    

    return (
        <Box className="available-tickets-container">
            <Typography variant="h4" className="heading">
                Available Tickets
            </Typography>
            {error ? (
                <Typography color="error">{error}</Typography>
            ) : tickets.length > 0 ? (
                <div className='ticCard'>
                    <Box className="tickets-scroller">
                        {tickets.map((ticket, index) => (
                            <Paper key={ticket.id} className="ticket-card">
                                <img
                                    src={images[index % images.length]}
                                    alt={`Ticket ${ticket.id}`}
                                    className="ticket-card-image"
                                />
                                <Typography className="ticket-card-id">
                                    <strong>ID:</strong> {ticket.id}
                                </Typography>
                                <Typography className="ticket-card-status">
                                    <strong>Status:</strong> {ticket.status}
                                </Typography>
                                <Typography className="ticket-card-date">
                                    <strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </div>
            ) : (
                <Typography>No tickets available.</Typography>
            )}
        </Box>
    );
};

export default AvailableTickets;
