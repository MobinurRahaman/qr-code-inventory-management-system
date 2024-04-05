<div align='center'>

<h1>QR Code Inventory Management System</h1>
<p>Track inventory using QR codes for rapid scanning and management.</p>

<h4> <a href=https://qr-code-inventory-management-system-client.vercel.app/>View Demo</a> <span> · </span> <a href="https://github.com/MobinurRahaman/qr-code-inventory-management-system/blob/master/README.md"> Documentation </a> <span> · </span> <a href="https://github.com/MobinurRahaman/qr-code-inventory-management-system/issues"> Report Bug </a> <span> · </span> <a href="https://github.com/MobinurRahaman/qr-code-inventory-management-system/issues"> Request Feature </a> </h4>

</div>

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
- [Environment Variables](#key-environment-variables)
  - [Client](#client-client)
  - [Server](#server-server)
- [Getting Started](#toolbox-getting-started)
  - [Installation](#gear-installation)
  - [Run Locally](#running-run-locally)
- [Deployment](#triangular_flag_on_post-deployment)

## :star2: About the Project

Revolutionize your inventory management with our QR Code Inventory Management System. Easily track and manage your inventory by scanning QR codes. Streamline your operations, minimize errors, and increase efficiency.

## :key: Environment Variables

### Client (client/)

The following environment variable is required in the client folder:

- `VITE_API_BASE_URL`: This variable should be set to the base URL of the API endpoint. It's used by the client to communicate with the server.

To set up this variable, create a `.env` file in the `client/` directory and add the following line:
VITE_API_BASE_URL=https://your-api-base-url.com/api

Make sure to replace `https://your-api-base-url.com/api` with the actual base URL of your API.

### Server (server/)

The following environment variables are required in the server folder:

- `MONGO_URI`: This variable should be set to the connection URI for your MongoDB database.

- `JWT_SECRET`: This variable should be set to the secret key used for signing JSON Web Tokens (JWTs) for authentication.

To set up these variables, create a `.env` file in the `server/` directory and add the following lines:
MONGO_URI=your-mongo-db-uri
JWT_SECRET=your-jwt-secret

Replace `your-mongo-db-uri` with the actual connection URI for your MongoDB database, and `your-jwt-secret` with the secret key you want to use for JWT signing.

**Note**: An example .env file is provided as .env.example in both the client/ and server/ directories. Make sure not to commit your `.env` files with sensitive information to your version control system.

## :receipt: Schema Diagram

![Schema Diagram](https://github.com/MobinurRahaman/qr-code-inventory-management-system/blob/main/resources/Schema-Diagram.png)

## :toolbox: Getting Started

### :gear: Installation

This project uses Yarn as package manager

```bash
npm install --global yarn
```

Install dependencies

```bash
yarn install
```

### :running: Run Locally

Clone the project

```bash
git clone https://github.com/MobinurRahaman/qr-code-inventory-management-system
```

```bash
cd qr-code-inventory-management-system
```

Install dependencies

```bash
yarn install
```

```bash
yarn add -D concurrently -W
```

Add .env files in both client/ and server/ directories as described in the [Environment Variables](https://github.com/MobinurRahaman/qr-code-inventory-management-system?tab=readme-ov-file#key-environment-variables) section

Start the server

```bash
yarn run start:dev
```

## :triangular_flag_on_post: Deployment

To deploy this project run

```bash
yarn deploy
```
