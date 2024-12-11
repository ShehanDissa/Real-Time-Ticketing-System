import {useEffect} from "react";
import {addTicket} from "./TicketsService";

const Vendor = ({ id, count, onCompletion }) => {
    useEffect(() => {
        let isRunning = true;

        const addTickets = async () => {
            try {
                console.info(
                    `Vendor ${id} started. Count: ${count}`
                );

                while (isRunning) {
                    const response = await addTicket(count);

                    console.info(`Vendor ${id} response:`, response);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
            } catch (error) {
                console.error(`Vendor ${id} encountered an error:`, error.message);
            } finally {
                console.info(`Vendor ${id} stopped.`);
                onCompletion(id);
            }
        };

        addTickets().then(r => console.log(r));

        return () => {
            isRunning = false;
        };
    }, [id, count, onCompletion]);

    return <p>Vendor {id} is running...</p>;
}

export default Vendor;
