# Futtech

Futtech is a locally hosted (German-based) website designed to display comprehensive information about various financial instruments. These include stocks, cryptocurrencies, exchange-traded commodities, funds, and more.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Version Control**: Git and GitHub
- **Docker** : DockerHub,DockerCompose,

---

## Reason Behind Technology Choices

### Frontend:

- **React.js**: Chosen for its component-based architecture, virtual DOM, and vast ecosystem that accelerates frontend development.
- **Tailwind CSS**: Enables fast, responsive, and utility-first design with minimal effort.

### Backend:

- **Node.js**: Handles asynchronous operations efficiently, ideal for scalable applications.
- **Express.js**: Lightweight and flexible, simplifying server-side logic implementation.

### Database:

- **MongoDB**: A NoSQL database offering flexibility and high performance, particularly for managing unstructured data.

---

## Project Features

- **Display Financial Instruments**:

  - Stock
  - Cryptocurrency
  - Exchange-traded commodity
  - Exchange-traded fund
  - Fund
  - Index
  - Commodity
  - Mutual fund

- **Responsive Design**: Optimized UI/UX for desktop, tablet, and mobile views.
- **Dynamic Data Rendering**: Interactive views for data visualization.
- **Dockerized Deployment**: Simplified setup and deployment using Docker and Docker Compose.

---

## Installation

### Without Docker

Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/FahdAzmy/Futtech-.git
   cd Futtech-
   ```

2. **Install Dependencies**:  
   Navigate to the respective directories (`frontend` and `backend`) and install dependencies using npm or yarn:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. **Set Up Environment Variables**:  
   Create a `.env` file in the `backend` directory and provide the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```

---

## Running the Application

1. **Start the Backend Server**:

   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend Server**:

   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**:  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Using Docker

#### Frontend

1. Use the following Dockerfile:

```dockerfile
# Build stage
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:1.21
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Build and run the image:

```bash
docker build -t financialwebsite-frontend .
docker run -d -p 3000:80 financialwebsite-frontend
```

#### Backend

1. Use the following Dockerfile:

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

2. Build and run the image:

```bash
docker build -t financialwebsite-backend .
docker run -d -p 4000:4000 financialwebsite-backend
```

### Using Docker Compose

1. Use the provided `docker-compose.yaml`:

```yaml
version: "3.8"

services:
  backend:
    image: fahdazmy/financialwebsite-backend:latest
    ports:
      - "4000:4000"
    depends_on:
      - mongo
    environment:
      - MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net"
    volumes:
      - ./Backend:/app

  frontend:
    image: fahdazmy/financialwebsite-frontend:latest
    ports:
      - "3000:80"
    volumes:
      - ./Frontend:/app

  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

2. Run all services:

```bash
docker-compose up --build
```

## Usage

1. Access the frontend at `http://localhost:3000`
2. Backend API is available at `http://localhost:4000`
3. MongoDB is running locally at `mongodb://localhost:27017`

## Project Structure

```
Futtech/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── dockerfile
├── docker-compose.yaml
└── README.md



---
```
