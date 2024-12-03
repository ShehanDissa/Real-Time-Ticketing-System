import axios from 'axios';

const API_URL = 'http://localhost:8080/actuator';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaGVoYW4iLCJpYXQiOjE3MzMwNTYzMDksImV4cCI6MTczNDc4NDMwOX0.6Qufh3JtRMNOOtFdgiIUXI6ZQCHMPV_plP5E8nXjxls';

const fetchHttpStats = async () => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const [connectionsRes, uptimeRes, memoryRes, requestsRes] = await Promise.all([
            axios.get(`${API_URL}/metrics/tomcat.sessions.active.current`, { headers }),
            axios.get(`${API_URL}/metrics/process.uptime`, { headers }),
            axios.get(`${API_URL}/metrics/jvm.memory.used`, { headers }),
            axios.get(`${API_URL}/metrics/http.server.requests`, { headers }),
        ]);

        return {
            activeConnections: connectionsRes.data.measurements.find((m) => m.statistic === 'ACTIVE_TASKS')?.value || 0,
            uptime: (uptimeRes.data.measurements[0]?.value / 60).toFixed(2) + ' mins',
            memoryUsed: (memoryRes.data.measurements[0]?.value / (1024 * 1024)).toFixed(2) + ' MB',
            totalRequests: requestsRes.data.measurements.find((m) => m.statistic === 'COUNT')?.value || 0,
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw new Error('Failed to fetch stats');
    }
};

export { fetchHttpStats };
