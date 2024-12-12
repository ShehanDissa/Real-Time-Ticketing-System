import React, { useEffect, useState } from 'react';
import { fetchHttpStats } from '../../services/HttpService';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import '../../sass/httpStats.scss';

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

    if (loading) return <CircularProgress color="primary" />; 
    if (error) return <Typography color="error">{error}</Typography>; 

    return (
        <Box className="http-stats-container">
            <Typography variant="h4" gutterBottom><h2>HTTP Stats Dashboard</h2></Typography>
            <Paper className="stats-card" elevation={3}>
                <Box className="stats-list">
                    <Typography variant="h6"><strong>Active Connections:</strong> {stats.activeConnections}</Typography>
                    <Typography variant="h6"><strong>System Uptime:</strong> {stats.uptime}</Typography>
                    <Typography variant="h6"><strong>Memory Used:</strong> {stats.memoryUsed}</Typography>
                    <Typography variant="h6"><strong>Total HTTP Requests:</strong> {stats.totalRequests}</Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default HttpStats;
