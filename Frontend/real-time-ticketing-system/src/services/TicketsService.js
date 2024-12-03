import axios from 'axios';

const API_URL = 'http://localhost:8080/tickets';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaGVoYW4iLCJpYXQiOjE3MzMwNTYzMDksImV4cCI6MTczNDc4NDMwOX0.6Qufh3JtRMNOOtFdgiIUXI6ZQCHMPV_plP5E8nXjxls';

const fetchAvailableTickets = async () => {
    try {
        const response = await axios.get(`${API_URL}/available`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching available tickets:', error);
        throw error;
    }
};

const fetchAvailableTicketCount = async () => {
    try {
        const response = await axios.get(`${API_URL}/count`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching available ticket count:', error);
        throw error;
    }
};

export { fetchAvailableTickets, fetchAvailableTicketCount };
