import React, { useEffect, useState } from 'react';
import { fetchHttpStats } from '../../services/HttpService';

const HttpStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadStats = async () => {
        try {
            const fetchedStats = await fetchHttpStats();
            setStats(fetchedStats);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStats().then(r => console.log('HTTP stats fetched'));

        const intervalId = setInterval(loadStats, 5000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <div>Loading stats...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>HTTP Stats Dashboard</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div><strong>Active Connections:</strong> {stats.activeConnections}</div>
                <div><strong>System Uptime:</strong> {stats.uptime}</div>
                <div><strong>Memory Used:</strong> {stats.memoryUsed}</div>
                <div><strong>Total HTTP Requests:</strong> {stats.totalRequests}</div>
            </div>
        </div>
    );
};

export default HttpStats;
