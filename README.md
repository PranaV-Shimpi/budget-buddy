# Budget Buddy Platform

Track your finances, income, and expenses with the best UI featuring numerous charts and easy access to all your transactions. Budget Buddy is your go-to platform for managing your personal finances efficiently.

- Live Link: [https://bb-budget-buddy.netlify.app/](https://bb-budget-buddy.netlify.app/)
- Source Code: [https://github.com/PranaV-Shimpi/budget-buddy/](https://github.com/PranaV-Shimpi/budget-buddy/)

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Component Overview](#component-overview)
- [Firebase Configuration](#firebase-configuration)
- [Contributing](#contributing)


## Demo
![Login](https://github.com/user-attachments/assets/bf6925c8-f898-4237-8208-90c59718252c)
![Toasters](https://github.com/user-attachments/assets/a205d2b2-20a7-4c22-a71f-2c6703271f7b)
![Dashboard](https://github.com/user-attachments/assets/4dd91ced-b05c-451f-b992-73d5fdf01e8d)
![Transactions](https://github.com/user-attachments/assets/ed6cdc11-77af-4ec4-988d-f0fbd58ce118)



## Features

- Track finances, income, and expenses with a user-friendly UI.
- Detailed charts for better financial insights.
- Easy access to all transactions in one place.
- Firebase for authentication and user data handling:
  - Login
  - Register
  - Reset password functionality
- Pagination for optimized transaction handling.
- Search transactions by name or categories (income/expense).
- Sort transactions by amount and date.
- Real-time data updates.
- Import transactions from CSV.
- Export transactions to CSV.

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PranaV-Shimpi/budget-buddy.git
   cd budget-buddy
   ```

2. Install dependencies:
   ```bash
   npm install
   or
   yarn install
   ```

## Usage
1. Start the development server:
   ```bash
   npm start
   or
   yarn start
   ```
2. Open http://localhost:3000 to view the application in your browser.

## Firebase Configuration

   ```bash
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

## Component Overview

### SignUp / SignIn
- User Authentication: Using Firebase for user authentication, including login, register, and reset password functionalities.

### Dashboards
- Overview: Displays a summary of your finances with charts and key metrics.
- Income and Expense Charts: Visual representations of your income and expenses over time.
- Category Breakdown: Pie charts and line graphs showing the distribution of your spending by category.

### Transaction Management
- Pagination: Efficiently handle large numbers of transactions.
- Search: Easily search for transactions by name or category (income/expense).
- Sorting: Sort transactions by amount and date.
- Real-time Data: All data updates in real time for the most accurate financial tracking.
- CSV Import/Export: Import transactions from a CSV file and export them back into CSV.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

# Follow me On

[![LinkedIn](https://img.shields.io/static/v1.svg?label=connect&message=@PranaVShimpi&color=grey&logo=linkedin&style=flat&logoColor=white&colorA=blue)](https://www.linkedin.com/in/pranav-shimpi/) 

--- 
   
<p align="center">
 Made with ❤️ by  PranaV Shimpi 
</p>
