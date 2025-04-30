# Balance Service Microservice

This project is part of a microservices architecture challenge focused on Event-Driven Architecture. The Balance Service consumes Kafka events from the Wallet Core service, updates account balances in MongoDB, and provides a REST endpoint to query current account balances.

## Project Overview

The system consists of two main microservices:
- **Wallet Core** (implemented in Go): Manages wallet transactions and publishes events
- **Balance Service** (implemented in TypeScript): Consumes transaction events and maintains updated account balances

This repository implements the Balance Service microservice component. The Wallet Core is a clone of [https://github.com/devfullcycle/fc-eda](https://github.com/devfullcycle/fc-eda).

## Architecture

The system follows an Event-Driven Architecture:
1. Wallet Core processes transactions and publishes events to Kafka
2. Balance Service consumes these events and updates MongoDB with current account balances
3. Balance Service exposes a REST API to query current balances

## Features

- Kafka event consumption from Wallet Core
- MongoDB persistence for account balances
- REST API endpoint to query balances
- Automated database seeding
- Complete Docker deployment

## Technologies Used

- **Backend**: TypeScript, Node.js
- **Database**: MongoDB
- **Message Broker**: Apache Kafka
- **Containerization**: Docker and Docker Compose

## Project Structure

```
balance-service/
├── src/
│   ├── config/             # Configuration files
│   ├── controllers/        # REST API controllers
│   ├── models/             # MongoDB schema models
│   ├── kafka/              # Kafka consumer implementation
│   ├── repositories/       # Data access layer
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic layer
│   ├── utils/              # Utility functions
│   └── main.ts             # Application entry point
├── Dockerfile              # Docker configuration for service
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── request.http            # HTTP request examples for testing
```

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Running the Application

1. Clone this repository
2. From the root directory, run:

```bash
docker-compose up -d
```

This will start all required services:
- MongoDB (for Balance Service)
- MySQL (for Wallet Core)
- Zookeeper and Kafka (for event communication)
- Wallet Core service
- Balance Service

The system performs automatic database migrations and seeds both databases with initial test data.

### API Endpoints

#### Balance Service (Port 3003)
- **GET /balances/:account_id** - Returns the current balance for the specified account

You can use the provided `request.http` file to test the API endpoints directly.

## Testing the Flow

1. Create a transaction in Wallet Core
2. The transaction event is published to Kafka
3. Balance Service consumes the event and updates the balance
4. Query the updated balance via the Balance Service API

## Troubleshooting

If you encounter any issues:

1. Check that all containers are running:
```bash
docker-compose ps
```

2. View logs for a specific service:
```bash
docker-compose logs balance-wallet
```

3. Ensure Kafka is properly connected:
```bash
docker-compose logs kafka
```

## License

This project is part of a coding challenge and is provided for educational purposes.
