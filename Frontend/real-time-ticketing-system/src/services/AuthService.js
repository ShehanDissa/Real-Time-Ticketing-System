import axios from 'axios';

const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', {
            username,
            password,
        });

        return response.data.token;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Invalid credentials');
        }
        throw new Error(error.message || 'Something went wrong');
    }
};

export {loginUser}
