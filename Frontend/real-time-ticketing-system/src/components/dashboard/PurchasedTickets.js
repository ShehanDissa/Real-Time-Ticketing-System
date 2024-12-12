import React, { useState, useEffect } from 'react';
import { fetchPurchasedTickets } from '../../services/PurchaseService';
import { Box, Typography, Paper, Grid, Card, CardContent, CardMedia, Divider } from '@mui/material';
import '../../sass/purchasedTickets.scss';
import image from '../../assests/ticketImg.jpg'

const PurchasedTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);

    const fetchTickets = async () => {
        try {
            const data = await fetchPurchasedTickets();
            const sortedTickets = data.sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt));
            setTickets(sortedTickets);
        } catch (err) {
            setError('Error fetching purchased tickets. Please try again later.');
        }
    };

    useEffect(() => {
        fetchTickets();

        const intervalId = setInterval(fetchTickets, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box className="purchased-tickets-container">
            <Typography variant="h4" gutterBottom className="heading">
                Purchased Tickets
            </Typography>

            {error ? (
                <Typography color="error">{error}</Typography>
            ) : tickets.length > 0 ? (
                <Grid container spacing={3} className="tickets-grid">
                {tickets.map(ticket => (
        <Grid item xs={12} sm={6} md={4} key={ticket.id}>
            <Card className="ticket-card" elevation={3}>
                <CardMedia
                    component="img"
                    alt="Ticket Image"
                    height="140"
                    image={image}
                    className="ticket-image"
                />
                <CardContent>
                    <Typography variant="h6" className="ticket-id">
                        Ticket ID: {ticket.ticketId}
                    </Typography>
                    <Typography className="customer-id">
                        Customer ID: {ticket.customerId}
                    </Typography>
                    <Typography className="purchased-date">
                        Purchased At: {new Date(ticket.purchasedAt).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    ))}
</Grid>

            ) : (
                <Typography>No tickets purchased.</Typography>
            )}
        </Box>
    );
};

export default PurchasedTickets;
