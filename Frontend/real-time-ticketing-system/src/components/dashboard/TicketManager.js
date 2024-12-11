import { useState } from "react";
import Customer from "../../services/CustomerService";
import Vendor from "../../services/VendorService";
import '../../sass/ticketManager.scss';

const customerRetrievalRate = localStorage.getItem('customerRetrievalRate') || 100;
const ticketReleaseRate = localStorage.getItem('ticketReleaseRate') || 100;

const TicketManager = () => {
    const [customers, setCustomers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const startCustomers = () => {
        if (isRunning) return;

        setIsRunning(true);

        const newCustomers = [];
        for (let i = 0; i < 5; i++) {
            newCustomers.push({
                id: i,
                retrievalRate: customerRetrievalRate,
            });
        }
        setCustomers(newCustomers);
    };

    const startVendor = () => {
        if (isRunning) return;

        setIsRunning(true);

        const newVendors = [];
        for (let i = 0; i < 5; i++) {
            newVendors.push({
                id: i,
                count: ticketReleaseRate,
            });
        }
        setVendors(newVendors);
    }

    const stopCustomers = () => {
        setIsRunning(false);
        setCustomers([]);
    };

    const stopVendors = () => {
        setIsRunning(false);
        setVendors([]);
    }

    const start = () => {
        startCustomers();
        startVendor();
    }

    const stop = () => {
        stopCustomers();
        stopVendors();
    }

    const handleCustomerCompletion = (id) => {
        console.info(`Customer ${id} completed.`);
    };

    const handleVendorCompletion = (id) => {
        console.info(`Vendor ${id} completed.`);
    }

    return (
        <div className="ticket-manager">
            <button onClick={start} disabled={isRunning} className="start-stop-button">
                Start System
            </button>
            <button onClick={stop} disabled={!isRunning} className="start-stop-button">
                Stop System
            </button>

            <div className="customer-list">
                {customers.length === 0 ? (
                    <p>No customers available.</p>
                ) : (
                    <div className="scrollable-list">
                        {customers.map((customer) => (
                            <Customer
                                key={customer.id}
                                id={customer.id}
                                retrievalRate={customer.retrievalRate}
                                onCompletion={handleCustomerCompletion}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="vendor-list">
                {vendors.length === 0 ? (
                    <p>No vendors available.</p>
                ) : (
                    <div className="scrollable-list">
                        {vendors.map((vendor) => (
                            <Vendor
                                key={vendor.id}
                                id={vendor.id}
                                count={vendor.count}
                                onCompletion={handleVendorCompletion}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketManager;
