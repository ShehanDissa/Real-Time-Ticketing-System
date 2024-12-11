import React, { useState, useEffect } from 'react';
import { purchaseTicket } from '../../services/TicketsService';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../../sass/availableTickets.scss';

const BuyTicket = () => {
    const [error, setError] = useState(null);
    const [customerId, setCustomerId] = useState('');

    const purchaseTickets = async () => {
        try {
            const data = await purchaseTicket(1, customerId);
            console.log(data);
        } catch (err) {
            setError('Error fetching available tickets. Please try again later.');
        }
    };

    const handlecustomerIdChange = (e) => {
        setCustomerId(e.target.value);
    };
    

    return (
        <div>
    <button onClick={purchaseTickets}>Buy</button>
    <label htmlFor="customerId">Customer ID</label>
    <input
        type="text"
        id="customerId" 
        name="customerId" 
        onChange={handlecustomerIdChange} 
        placeholder="Enter your customer ID"  
    />
</div>

    );
};

export default BuyTicket;
