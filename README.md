# Async Statement API

This API allows users to asynchronously generate and download account statements in PDF format. The statement generation simulates interaction with a Core Banking system and notifies the user when the statement is ready for download.

## Prerequisites
Ensure you have the following installed:

``` 
Node.js (v20+)
NPM (v8+) 
```

## Installation
Clone the repository:

```
git clone https://github.com/taliha-arif/statement-api.git
cd async-statement-api
```

### Install dependencies:

```
npm install
```

## Running the Application
To run the app, use the following command:
```
npm start
```

This will start the server at http://localhost:3000.

## Testing
The project is set up with Jest for testing only for controller. To run the tests:

```
npm test
```

## API Endpoints

### Generate Statement

POST /api/statement/

Initiates the process of generating an account statement.

Request Body:

json
```
{
  "accountNumber": "1234567890",
  "fromDate": "2024-08-01",
  "toDate": "2024-08-31"
}
```
Response:

202 Accepted: The statement generation process has been initiated. Returns a job ID for tracking.

json
```
{
  "message": "Statement generation in progress",
  "jobId": "1695844727585"
}
```
### Download Statement
GET /api/statement/:jobId

Retrieves the generated PDF.

Response:

```
200 OK: Returns the statement as a PDF.
404 Not Found: If the statement is not available yet.
```
