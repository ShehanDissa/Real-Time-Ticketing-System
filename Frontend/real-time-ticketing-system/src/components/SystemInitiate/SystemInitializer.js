import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import '../../sass/ticketInitializerForm.scss';

const API_URL = 'http://localhost:8080/tickets';
const token = localStorage.getItem('accessToken');

function TicketInitializerForm({ onInitiateSuccess }) {
    const [formData, setFormData] = useState({
        totalTickets: '',
        ticketReleaseRate: '',
        customerRetrievalRate: '',
        maxTicketCapacity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/initialize`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    totalTickets: parseInt(formData.totalTickets),
                    ticketReleaseRate: parseInt(formData.ticketReleaseRate),
                    customerRetrievalRate: parseInt(formData.customerRetrievalRate),
                    maxTicketCapacity: parseInt(formData.maxTicketCapacity)
                })
            });

            if (response.ok) {
                localStorage.setItem('isInitialized', true);
                localStorage.setItem('totalTickets', formData.totalTickets);
                localStorage.setItem('ticketReleaseRate', formData.ticketReleaseRate);
                localStorage.setItem('customerRetrievalRate', formData.customerRetrievalRate);
                localStorage.setItem('maxTicketCapacity', formData.maxTicketCapacity);
                onInitiateSuccess();
            } else {
                alert('Failed to initialize. Please check your inputs.');
            }
        } catch (error) {
            console.error('Error initializing:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <Box
            component="form"
            className="ticket-initializer-form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
        >
            <Typography className="form-title">
                <h2>INITIALIZE TICKETS</h2>
            </Typography>
            <TextField
                fullWidth
                type="number"
                id="totalTickets"
                name="totalTickets"
                label="Total Tickets"
                value={formData.totalTickets}
                onChange={handleChange}
                required
                margin="normal"
                className="form-field"
            />
            <TextField
                fullWidth
                type="number"
                id="ticketReleaseRate"
                name="ticketReleaseRate"
                label="Ticket Release Rate"
                value={formData.ticketReleaseRate}
                onChange={handleChange}
                required
                margin="normal"
                className="form-field"
            />
            <TextField
                fullWidth
                type="number"
                id="customerRetrievalRate"
                name="customerRetrievalRate"
                label="Customer Retrieval Rate"
                value={formData.customerRetrievalRate}
                onChange={handleChange}
                required
                margin="normal"
                className="form-field"
            />
            <TextField
                fullWidth
                type="number"
                id="maxTicketCapacity"
                name="maxTicketCapacity"
                label="Max Ticket Capacity"
                value={formData.maxTicketCapacity}
                onChange={handleChange}
                required
                margin="normal"
                className="form-field"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="form-button"
            >
                Initialize
            </Button>
        </Box>
    );
}

export default TicketInitializerForm;
