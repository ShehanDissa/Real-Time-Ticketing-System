# Real-Time Ticket Management System

This project is a **Real-Time Ticket Management System** designed with three main components:

- **Backend (Spring Boot)**: Located in the `Backend/RealtimeTicketingSystem` folder.
- **CLI Application (Maven Java Project)**: Located in the `frontend/RealtimeTicketingSystemCLI` folder.
- **React Frontend**: Located in the `frontend/realtime-ticketing-system` folder.

## Prerequisites

Ensure the following tools are installed on your system:

- Java Development Kit (JDK) 17 or higher
- Apache Maven 3.8+
- Node.js 18+ and npm 9+
- React.js 18+
- Docker (optional, if running via container)

## Backend (Spring Boot Application)

**Location**: `Backend/RealtimeTicketingSystem`

### Steps to Run:
1. Navigate to the `Backend/RealtimeTicketingSystem` directory:
   ```bash
   cd Backend/RealtimeTicketingSystem
   ```

2. Build the project using Maven:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`.

### Additional Notes:
- The backend uses an H2 in-memory database with persistence enabled.
- Configuration files for the database can be found in the `application.properties` file.

## CLI Application (Maven Java Project)

**Location**: `frontend/RealtimeTicketingSystemCLI`

### Steps to Run:
1. Navigate to the `frontend/RealtimeTicketingSystemCLI` directory:
   ```bash
   cd frontend/RealtimeTicketingSystemCLI
   ```

2. Build and run the application:
   ```bash
   mvn clean compile exec:java
   ```

3. Follow the CLI instructions to interact with the system.

### Features:
- Simulates ticket purchase and release operations.
- Interacts with the backend to manage real-time data.

## React Frontend

**Location**: `frontend/realtime-ticketing-system`

### Steps to Run:
1. Navigate to the `frontend/realtime-ticketing-system` directory:
   ```bash
   cd frontend/realtime-ticketing-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the application in your browser at `http://localhost:3000`.

### Features:
- A user-friendly interface for ticket management.
- Integrates with the backend to display real-time updates.


## Project Structure

```
Root Directory
├── Backend
│   └── RealtimeTicketingSystem
├── frontend
│   ├── RealtimeTicketingSystemCLI
│   └── realtime-ticketing-system
```
