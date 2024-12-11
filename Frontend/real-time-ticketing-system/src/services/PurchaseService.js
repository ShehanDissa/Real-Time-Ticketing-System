import axios from 'axios';

const API_URL = 'http://localhost:8080/purchase';
const token = localStorage.getItem('accessToken');

const fetchPurchasedTickets = async () => {
    try {
        const response = await axios.get(`${API_URL}/all?pageNumber=1`, {
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

const fetchPurchasedTicketCount = async () => {
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

export { fetchPurchasedTicketCount, fetchPurchasedTickets };
