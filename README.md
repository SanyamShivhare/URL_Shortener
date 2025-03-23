# URL Shortener

This project is a simple URL shortener service built using Node.js, Express, and MongoDB. It allows users to shorten long URLs and track visit history for each shortened URL.

## Approach

1. **Database**: MongoDB is used to store the original URL, the shortened URL identifier (`shortId`), and visit history (timestamps of visits).
2. **Backend**: Express.js is used to handle API requests and responses.
3. **Short ID Generation**: The `nanoid` library is used to generate unique short IDs for URLs.
4. **Redirection**: When a user accesses a shortened URL, the service redirects them to the original URL and logs the visit timestamp.

## Steps to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd URL_Shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB:
   - Ensure you have a MongoDB instance running.
   - Update the MongoDB connection string in the configuration file (e.g., `connect.js`).

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run on `http://localhost:8002`.

## Example API Requests and Responses

### 1. Shorten a URL
**Request**:
```http
POST /url
Content-Type: application/json

{
  "url": "https://example.com"
}
```

**Response**:
```json
{
  "shortId": "abc123",
  "redirectURL": "https://example.com",
  "visitHistory": []
}
```

### 2. Access a Shortened URL
**Request**:
```http
GET /url/abc123
```

**Response**:
Redirects to `https://example.com`.

### 3. Get Visit History
**Request**:
```http
GET /url/abc123/history
```

**Response**:
```json
{
  "shortId": "abc123",
  "redirectURL": "https://example.com",
  "visitHistory": [
    { "timestamp": 1698765432100 },
    { "timestamp": 1698765432200 }
  ]
}
```

## Notes
- Ensure your MongoDB connection string is valid and accessible.
- The project uses `nanoid` for generating unique short IDs.
