# Crypto Price Alert System

## Overview

The Crypto Price Alert System is a React-based application designed to monitor cryptocurrency trends, visualize data, and send timely price alerts to users. It utilizes the CoinGecko API for real-time price data and EmailJS for automated email notifications when user-defined thresholds are exceeded.

---

## Key Features

- **Cryptocurrency Monitoring**: View trending cryptocurrencies and their live price updates.
- **Price Alerts**: Set custom thresholds to receive email notifications when prices cross predefined limits.
- **Data Visualization**: Analyze price trends with interactive bar charts powered by `ReactECharts`.
- **Secure Authentication**: User login and session management with `SuperTokens`.
- **Seamless Notifications**: Email alerts sent via `EmailJS`.

---

## Technologies Used

### Frontend
- **React**: For building a dynamic user interface.
- **AG-Grid**: To display cryptocurrency data in an intuitive, sortable, and searchable table.
- **ReactECharts**: For rendering interactive charts.
- **Axios**: For making API requests to fetch live data.

### Backend
- **Express**: Backend framework to manage server-side logic and API routes.
- **SuperTokens**: For secure user authentication and session management.

### Third-Party Integrations
- **CoinGecko API**: Provides real-time cryptocurrency price data.
- **EmailJS**: Facilitates automated email alerts.

---

## System Architecture

1. **Frontend**: A React SPA (Single Page Application) for data visualization, user interaction, and managing alerts.
2. **Backend**: Express server handling authentication, API routes, and business logic.
3. **Third-Party APIs**:
   - CoinGecko API for price data.
   - EmailJS for sending email notifications.

---

## Application Components

### Frontend
- **Dashboard.jsx**:
  - Fetches live data from CoinGecko API.
  - Displays data in a tabular format using `AG-Grid`.
  - Integrates `ReactECharts` for interactive visualizations.
  - Provides modal-based input for setting price thresholds.

- **ThresholdModal.jsx**:
  - User interface for entering custom price thresholds.
  - Features "Confirm" and "Cancel" buttons to save or discard thresholds.

- **SupertokensConfig.js**:
  - Configures secure user authentication using SuperTokens.
  - Manages app information and initializes authentication recipes.

### Backend
- Listens on port 3001 for client requests.
- Utilizes `supertokens-node` for authentication and session management.
- Handles REST API endpoints for fetching, saving, and monitoring data.

### Email Integration
- **emailHelper.js**:
  - Monitors cryptocurrency prices.
  - Sends email alerts via EmailJS when thresholds are exceeded.

---

## Setup and Installation

### Without Any Hassle
1. Just do 
npm i  
2. Followed by 
npm start 
It shall run both frontend and backend
### Frontend Setup

1. Navigate to the project folder:
cd crypto-dashboard

2. Install dependencies:
npm install

3. Start the development server:
npm start`

The frontend will be available at `http://localhost:3000`.

### Backend Setup

1. Navigate to the `backend` folder:
cd backend

2. Install dependencies:
npm install

3. Start the backend server:
npm start

The backend will be available at `http://localhost:3001`.

## Configuration

- **EmailJS**: You need to configure EmailJS to send emails. Replace the placeholders in the `emailHelper.js` file with your service ID, template ID, and user ID.
- **SuperTokens**: Replace the `apiDomain` and `websiteDomain` in the `SupertokensConfig.js` file with the appropriate URLs for your app.
- **SuperTokens ConfigurationURI**: Presently using `try.supertokens.com`

## Usage

1. When you log in, you will see a list of trending cryptocurrencies and their prices.
2. You can set a price alert for any cryptocurrency by clicking the "Set Alert" button.
3. A modal will appear where you can enter the threshold value for the selected coin.
4. Once the threshold is set, the app will monitor the coin prices. If the price exceeds the threshold, you will receive an email notification.

### Future Feature Additions & Improvements
1. Adopt Atomic Design for Frontend Architecture:

Break down the frontend into five distinct levels: Atoms, Molecules, Organisms, Templates, and Pages.
Benefits:
Improved reusability and scalability of components.
Easier debugging and testing of smaller, isolated components.
Example:
Create components like Button (Atom), PriceCard (Molecule), and CryptoDashboard (Organism).
Improve Text Formatting and Typography:

Use Material-UI's Typography components consistently for all textual content.
Define a global typography theme for font sizes, weights, and families to ensure uniformity across the app.
Add a responsive text scale for accessibility and cross-device compatibility.
Structure Backend for Better API Design:

Follow RESTful principles and design APIs that are consistent and easy to consume.
Consider moving to a modular architecture with separate controllers, services, and repositories for better code organization.
Adopt versioning (e.g., /api/v1/) to allow backward compatibility when making major changes.
Implement error handling middleware for standardized API responses.
Integrate Postman or Swagger for API Documentation:

2. Postman:
Create a collection for all API endpoints, including sample requests and responses.
Share Postman collections with team members for testing and collaboration.
Swagger/OpenAPI:
Use swagger-jsdoc or express-swagger-generator to automatically generate API documentation from your code.
Host Swagger UI with your backend for live, interactive API documentation.

3. Deploy on Amazon ECS:

Set up a CI/CD pipeline to build, test, and deploy Dockerized containers to ECS.
Use Fargate for serverless container orchestration to reduce operational overhead.
Add logging and monitoring using CloudWatch and X-Ray.
Example Deployment Flow:
Dockerize the application.
Push images to AWS Elastic Container Registry (ECR).
Use ECS tasks and services to deploy the application.
Implement ESLint for Better Coding Practices:

Add ESLint with a configuration like Airbnb, Prettier, or StandardJS.
Set up rules for consistent formatting, unused variables, and error detection.
Include ESLint in the pre-commit hooks using Husky to ensure code quality before changes are committed.
4. Benefits:
Reduces bugs and enforces coding standards.
Enhances team collaboration with consistent code.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


This Markdown file summarizes the key components and features of your app, along with instructions for setup and usage. You can update the placeholders like `<repo-url>` and `path/to/screenshot` with actual values.
