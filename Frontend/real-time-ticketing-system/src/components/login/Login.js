import { useState } from 'react';
import { loginUser, registerUser } from '../../services/AuthService';
import '../../sass/login.scss';
import { TextField, Button, Typography, Box } from '@mui/material';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign-Up
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // Success message for sign-up

    const handleSubmit = async () => {
        try {
            setError(''); // Clear previous errors
            setMessage(''); // Clear previous messages

            if (isSignUp) {
                // Sign Up logic
                const response = await registerUser(username, password);
                if (response.status === 'User Registered Successfully') {
                    setMessage('User registered successfully! You can now log in.');
                    setIsSignUp(false); // Redirect to login mode
                } else {
                    throw new Error(response.message || 'Registration failed');
                }
            } else {
                // Login logic
                const token = await loginUser(username, password);
                if (!token) {
                    throw new Error('Invalid token');
                }
                localStorage.setItem('accessToken', token);
                onLoginSuccess();
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box className="login-page">
            <Box className="modal-container">
                <Box className="left-section">
                    <Box className="logo">
                        <Typography variant="h4" className="welcome-title">Ticket Pulse</Typography>
                        <Typography className="welcome-subtitle">Online Ticketing System</Typography>
                    </Box>
                </Box>
                <Box className="right-section">
                    <Typography className="signin-title">SIGN IN</Typography>
                    {error && <Typography className="error-text">{error}</Typography>}
                    {message && <Typography className="success-text">{message}</Typography>}
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </Button>

                    <Typography className="toggle-text">
                        {isSignUp
                            ? 'Already have an account?'
                            : "Don't have an account?"}{' '}
                        <Button
                            className="link-button"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? 'Login' : 'Sign Up'}
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
