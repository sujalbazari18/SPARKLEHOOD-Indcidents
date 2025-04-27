# Incident Management Backend

This is the backend for the Incident Management system. It uses Node.js, Express, and MongoDB.

## Setup

### Prerequisites
- Node.js (v14 or later)
- MongoDB (installed locally or a MongoDB Atlas account)

### Installation
1. Install dependencies:
```
npm install
```

2. Set up MongoDB:
   
   **Local MongoDB Setup**:
   1. Install MongoDB: https://docs.mongodb.com/manual/installation/
   2. Start MongoDB service:
      - Windows: Run MongoDB as a service or use `mongod` command
      - macOS/Linux: `sudo systemctl start mongod` or `brew services start mongodb-community`
   3. Create a `.env` file in the root directory with:
      ```
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/incident-management
      ```

   **MongoDB Atlas Setup (Cloud)**:
   1. Create an account at https://www.mongodb.com/cloud/atlas
   2. Create a new cluster
   3. Create a database user
   4. Get your connection string from Atlas UI
   5. Create a `.env` file in the root directory with:
      ```
      PORT=5000
      MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/incident-management?retryWrites=true&w=majority
      ```

3. Seed the database with sample data:
```
npm run seed
```

## Running the Application

Development mode:
```
npm run dev
```

Production mode:
```
npm run build
npm start
```

## API Endpoints

- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/:id` - Get incident by ID
- `POST /api/incidents` - Create a new incident
- `PUT /api/incidents/:id` - Update an incident
- `DELETE /api/incidents/:id` - Delete an incident

## Database Structure

The MongoDB database contains a single collection called `incidents` with the following schema:

- `title` (String, required): The title of the incident
- `description` (String, required): Detailed description of the incident
- `severity` (String, enum: 'low', 'medium', 'high', default: 'medium'): The severity level
- `createdAt` (Date): Automatically generated timestamp of creation
- `updatedAt` (Date): Automatically generated timestamp of last update 