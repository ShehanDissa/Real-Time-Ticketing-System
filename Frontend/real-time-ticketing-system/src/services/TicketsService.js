import axios from 'axios';

const API_URL = 'http://localhost:8080/tickets';
const token = localStorage.getItem('accessToken');

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

const addTicket = async (count) => {
    try {
        const response = await axios.post(`${API_URL}/add`, count, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding ticket:', error);
        throw error;
    }
}

const purchaseTicket = async (retrievalRate,id) => {
    try {
        const response = await axios.post(`${API_URL}/remove`, { count:retrievalRate, customerId: id }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error purchasing ticket:', error);
        throw error;
    }
}



export { fetchAvailableTickets, fetchAvailableTicketCount, addTicket, purchaseTicket };
