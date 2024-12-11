import {useEffect} from "react";
import {purchaseTicket} from "./TicketsService";

const Customer = ({ id, retrievalRate, onCompletion }) => {
    useEffect(() => {
        let isRunning = true;

        const removeTickets = async () => {
            try {
                console.info(
                    `Customer ${id} started. Retrieval Rate: ${retrievalRate}`
                );

                while (isRunning) {
                    const response = await purchaseTicket(retrievalRate, id);

                    console.info(`Customer ${id} response:`, response);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
            } catch (error) {
                console.error(`Customer ${id} encountered an error:`, error.message);
            } finally {
                console.info(`Customer ${id} stopped.`);
                onCompletion(id);
            }
        };

        removeTickets().then(r => console.log(r));

        return () => {
            isRunning = false;
        };
    }, [id, retrievalRate, onCompletion]);

    return <p>Customer {id} is running...</p>;
};

export default Customer;
