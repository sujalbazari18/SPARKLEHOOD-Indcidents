# HumanChain AI Safety Incident Log API


A robust backend system for managing and tracking AI incidents, built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- Complete user authentication system with JWT
- Comprehensive incident reporting and management
- Role-based access control (user/admin)
- Advanced filtering and pagination for incidents
- Data validation middleware
- MongoDB database integration

## 🛠️ Technology Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js (v5.1.0)
- **Language**: TypeScript (v5.8.3)
- **Database**: MongoDB
- **Authentication**: JWT with bcrypt password hashing
- **Other key dependencies**:
  - cors - for handling cross-origin requests
  - dotenv - for environment variable management
  - mongoose - for MongoDB object modeling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (comes with Node.js)
- MongoDB (local installation or MongoDB Atlas account)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sujalbazari18/SPARKLEHOOD-Indcidents.git
   cd SPARKLEHOOD-Indcidents
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/incident-management
   JWT_SECRET=fearisreal
   ```

## 🗄️ Database Setup

### Option 1: Local MongoDB Setup
1. Install MongoDB Community Edition:
   - [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. Start MongoDB service:
   - **Windows**: Run MongoDB as a service or use `mongod` command
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. The application will automatically create the required collections when it first connects.

### Option 2: MongoDB Atlas (Cloud)
1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user with read/write privileges
4. Whitelist your IP address in the Network Access settings
5. Get your connection string from Atlas UI
6. Update the `.env` file with your MongoDB Atlas URI:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/incident-management?retryWrites=true&w=majority
   ```

## 📥 Seeding the Database

To populate the database with sample incidents:

```bash
npm run seed
```

This will add 5 sample incidents to get you started.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on the port specified in your `.env` file (default: 5000). You can access the API at `http://localhost:5000`.

## 🔑 Authentication

### Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepassword"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securepassword"
  }'
```

Upon successful login, you'll receive a JWT token to use for authenticated endpoints.

## 📚 API Endpoints

### Incidents

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/incidents` | Get all incidents (with filtering) | None |
| POST | `/api/incidents` | Create a new incident | Required |
| GET | `/api/incidents/:id` | Get incident by ID | Required |
| PUT | `/api/incidents/:id` | Update an incident | Required |
| DELETE | `/api/incidents/:id` | Delete an incident | Admin only |

### Example API Calls

#### Get All Incidents (with filtering)
```bash
# Basic fetch (no authentication needed)
curl http://localhost:5000/api/incidents

# With filters
curl "http://localhost:5000/api/incidents?severity=high&status=investigating&page=1&limit=10"
```

#### Create a New Incident
```bash
curl -X POST http://localhost:5000/api/incidents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "New Security Vulnerability",
    "description": "A potential SQL injection point was discovered in the login form",
    "severity": "high",
    "incidentType": "security_breach",
    "affectedSystems": ["Authentication Service", "User Database"]
  }'
```

#### Get Incident by ID
```bash
curl http://localhost:5000/api/incidents/60d21b4667d0d8992e610c85 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Update an Incident
```bash
curl -X PUT http://localhost:5000/api/incidents/60d21b4667d0d8992e610c85 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Security Vulnerability Update",
    "status": "mitigated",
    "resolutionNotes": "Applied patch to fix SQL injection vulnerability"
  }'
```

#### Delete an Incident (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/incidents/60d21b4667d0d8992e610c85 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🏗️ Project Structure

```
├── server.ts             # Entry point
├── src/
│   ├── app.ts            # Express app setup
│   ├── db.ts             # Database connection
│   ├── controllers/      # Route handlers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── seed.ts           # Database seeding
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Design Decisions & Implementation Notes

1. **TypeScript Integration**
   - Used TypeScript for type safety and better developer experience
   - Proper interfaces for request/response objects and MongoDB documents

2. **Authentication System**
   - JWT-based authentication for stateless API design
   - Password hashing with bcrypt for security
   - Role-based protection for sensitive endpoints

3. **MongoDB Schema Design**
   - Comprehensive incident schema with appropriate validation
   - Separate user model with role management
   - Pre-save hooks for password hashing

4. **Middleware Architecture**
   - Request validation middleware for data integrity
   - Authentication middleware for protected routes
   - Role verification for admin-only operations

5. **Error Handling**
   - Consistent error response format across the API
   - Proper status codes for different error scenarios

6. **Filtering and Pagination**
   - Flexible query parameters for filtering incidents
   - Pagination implementation for handling large datasets

## 📄 License

[MIT](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.