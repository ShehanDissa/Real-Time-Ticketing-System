import React, { useState, useEffect } from 'react';
import { fetchAvailableTickets } from '../../services/TicketsService';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../../sass/availableTickets.scss';

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
        fetchTickets().then(r => console.log('Tickets fetched'));

        const intervalId = setInterval(fetchTickets, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box className="available-tickets-container">
            <Typography variant="h4" gutterBottom><h2>Available Tickets</h2></Typography>
            {error ? (
                <Typography color="error">{error}</Typography>
            ) : tickets.length > 0 ? (
                <TableContainer component={Paper} className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map(ticket => (
                                <TableRow key={ticket.id}>
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>{ticket.status}</TableCell>
                                    <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No tickets available.</Typography>
            )}
        </Box>
    );
};

export default AvailableTickets;
