import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { purchaseTicket } from '../../services/TicketsService';
import '../../sass/availableTickets.scss';

const BuyTicket = () => {
    const [error, setError] = useState(null);
    const [customerId, setCustomerId] = useState('');
    const [open, setOpen] = useState(false);

    const purchaseTickets = async () => {
        try {
            const data = await purchaseTicket(1, customerId);
            console.log(data);
            setOpen(false); // Close modal after successful purchase
        } catch (err) {
            setError('Error purchasing tickets. Please try again later.');
        }
    };

    const handleCustomerIdChange = (e) => {
        setCustomerId(e.target.value);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='buyTicketBtn'> 
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Buy Ticket
            </Button>

        <div>
            <Dialog open={open} onClose={handleClose} className='custom-modal'>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography className='buyTicketTxt'>Buy Ticket</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <TextField
                        label="Customer ID"
                        variant="outlined"
                        fullWidth
                        value={customerId}
                        onChange={handleCustomerIdChange}
                        placeholder="Enter your customer ID"
                        margin="normal"
                    />
                    {error && <Typography color="error">{error}</Typography>}
                </DialogContent>

                <DialogActions className='buyBtn'>
                    <Button onClick={purchaseTickets} color="primary" variant="contained" className='buyBtn'>
                        Buy
                    </Button>
                </DialogActions>
            </Dialog>
            </div>
        </div>
    );
};

export default BuyTicket;
