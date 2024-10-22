# Personal Financial Records API

This is a RESTful API to manage personal financial records, allowing users to record income and expenses, retrieve transactions, and view summaries.

## Technologies

- Node.js
- Express.js
- SQLite (via Sequelize)

## Setup

1. Clone this repository.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the server:

    ```bash
    npm start
    ```

## API Endpoints

### Add a New Transaction

- **POST** `/transactions`
- **Request Body**:

    ```json
    {
      "type": "income",
      "category": "Salary",
      "amount": 5000,
      "date": "2024-10-22",
      "description": "Monthly salary"
    }
    ```

- **Response**:

    ```json
    {
      "id": 1,
      "type": "income",
      "category": "Salary",
      "amount": 5000,
      "date": "2024-10-22",
      "description": "Monthly salary"
    }
    ```

### Get All Transactions

- **GET** `/transactions`

- **Response**:

    ```json
    [
      {
        "id": 1,
        "type": "income",
        "category": "Salary",
        "amount": 5000,
        "date": "2024-10-22",
        "description": "Monthly salary"
      },
      {
        "id": 2,
        "type": "expense",
        "category": "Groceries",
        "amount": 100,
        "date": "2024-10-22",
        "description": "Weekly groceries"
      }
    ]
    ```

### Get Transaction by ID

- **GET** `/transactions/:id`

### Update a Transaction

- **PUT** `/transactions/:id`

### Delete a Transaction

- **DELETE** `/transactions/:id`

### Get Summary of Income and Expenses

- **GET** `/summary`

- **Response**:

    ```json
    {
      "totalIncome": 5000,
      "totalExpense": 200,
      "balance": 4800
    }
    ```

---

## Future Improvements

- Add user authentication with JWT.
- Implement pagination for large transaction lists.
- Generate monthly and category-based spending reports.




http://localhost:3000/transactions
this is the body 
{
  "type": "income",
  "category": "Salary",
  "amount": 5000,
  "date": "2024-10-22",
  "description": "Monthly salary"
}

the output for the transactions api 

[
    {
        "id": 1,
        "type": "income",
        "category": "Salary",
        "amount": 5000,
        "date": "2024-10-22",
        "description": "Monthly salary",
        "createdAt": "2024-10-22T17:32:02.557Z",
        "updatedAt": "2024-10-22T17:32:02.557Z"
    }
]


http://localhost:3000/summary

{
    "totalIncome": 5000,
    "totalExpense": null,
    "balance": 5000
}