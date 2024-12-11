import axios from 'axios';

// Login user function
const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', {
            userName: username,
            password: password,
        });
        console.log(response.data);

        return response.data.token;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('Invalid credentials');
        }
        throw new Error(error.message || 'Something went wrong');
    }
};

// Register user function
const registerUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/register', {
            userName: username,
            password: password,
        });
        console.log(response.data);

        return response.data; // Assuming the backend sends a success message
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw new Error('User already exists');
        }
        throw new Error(error.message || 'Something went wrong');
    }
};

// Export both functions
export { loginUser, registerUser };
