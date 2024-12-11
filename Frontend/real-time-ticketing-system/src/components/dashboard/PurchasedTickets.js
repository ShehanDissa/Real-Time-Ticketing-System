import React, { useState, useEffect } from 'react';
import { fetchPurchasedTickets } from '../../services/PurchaseService';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import '../../sass/purchasedTickets.scss';

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
        fetchTickets().then(r => console.log('Tickets fetched'));

        const intervalId = setInterval(fetchTickets, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box className="purchased-tickets-container">
            <Typography variant="h4" gutterBottom>Purchased Tickets</Typography>
            {error ? (
                <Typography color="error">{error}</Typography>
            ) : tickets.length > 0 ? (
                <Paper className="tickets-table-paper" elevation={3}>
                    <div className="scrollable-table-container">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Ticket ID</strong></TableCell>
                                    <TableCell><strong>Customer ID</strong></TableCell>
                                    <TableCell><strong>Purchased At</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tickets.map(ticket => (
                                    <TableRow key={ticket.id}>
                                        <TableCell>{ticket.ticketId}</TableCell>
                                        <TableCell>{ticket.customerId}</TableCell>
                                        <TableCell>{new Date(ticket.purchasedAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            ) : (
                <Typography>No tickets purchased.</Typography>
            )}
        </Box>
    );
};

export default PurchasedTickets;
