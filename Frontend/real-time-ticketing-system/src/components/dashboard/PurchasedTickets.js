import React, { useState, useEffect } from 'react';
import {fetchPurchasedTickets} from '../../services/PurchaseService';

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
        <div>
            <h1>Purchased Tickets</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : tickets.length > 0 ? (
                <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Ticket ID</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Customer ID</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Purchased At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f2f2f2' }}>{ticket.ticketId}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f2f2f2' }}>{ticket.customerId}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f2f2f2' }}>
                                    {new Date(ticket.purchasedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No tickets purchased.</p>
            )}
        </div>
    );
};

export default PurchasedTickets;

