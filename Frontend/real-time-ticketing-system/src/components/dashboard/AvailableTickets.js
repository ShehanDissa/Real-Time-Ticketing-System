import React, { useState, useEffect } from 'react';
import {fetchAvailableTickets} from '../../services/TicketsService';

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
        <div>
            <h1>Available Tickets</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : tickets.length > 0 ? (
                <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f2f2f2' }}>{ticket.id}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f2f2f2' }}>{ticket.status}</td>
                                <td style={{ padding: '8px', borderBottom: '1px solid #f2f2f2' }}>
                                    {new Date(ticket.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No tickets available.</p>
            )}
        </div>
    );
};

export default AvailableTickets;

