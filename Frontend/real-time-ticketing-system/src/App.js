import { useState } from 'react';
// import './App.css';
import './sass/app.scss';
import AvailableTicketCount from "./components/dashboard/AvailableTicketCount";
import AvailableTickets from "./components/dashboard/AvailableTickets";
import PurchasedTickets from "./components/dashboard/PurchasedTickets";
import HttpStats from "./components/dashboard/HttpStats";
import PurchasedTicketCount from "./components/dashboard/PurchasedTicketCount";
import BuyTicket from "./components/dashboard/BuyTicket";
import Login from "./components/login/Login";
import TicketManager from "./components/dashboard/TicketManager";
import SystemInitializer from "./components/SystemInitiate/SystemInitializer";
import { TextField, Button, Typography, Box } from '@mui/material';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInitiated, setIsInitiated] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleInitiateSuccess = () => {
        setIsInitiated(true);
    }

    return (
        <div className="App2">
            <header className="App-header">
                
            </header>
            {isLoggedIn ? (
                <>
                    {isInitiated ? (
                        <>
                            <div className="status-message">System is initiated</div>
                            <AvailableTicketCount />
                            <AvailableTickets />
                            <HttpStats />
                            <PurchasedTicketCount />
                            <PurchasedTickets />
                            <TicketManager />
                            <BuyTicket />
                        </>
                    ) : (
                    <SystemInitializer onInitiateSuccess={handleInitiateSuccess}/>
                    )}
                </>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;