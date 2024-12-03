import { useState } from 'react';
import './App.css';
import AvailableTicketCount from "./components/dashboard/AvailableTicketCount";
import AvailableTickets from "./components/dashboard/AvailableTickets";
import PurchasedTickets from "./components/dashboard/PurchasedTickets";
import HttpStats from "./components/dashboard/HttpStats";
import PurchasedTicketCount from "./components/dashboard/PurchasedTicketCount";
import Login from "./components/login/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="App">
            <header className="App-header">
                RealtimeTicketingSystem
            </header>
            {isLoggedIn ? (
                <>
                    <AvailableTicketCount />
                    <AvailableTickets />
                    <HttpStats />
                    <PurchasedTicketCount />
                    <PurchasedTickets />
                </>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;
