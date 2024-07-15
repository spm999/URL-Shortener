# URL Shortener

A URL Shortener application built using the MERN stack (MongoDB, Express, React.js, Node.js), SHORTid, and JWT. This application allows users to shorten long URLs, manage their web links, and view analytics for their shortened URLs.

## Features
1. Shorten URLs: Users can shorten long URLs easily.
2. User Authentication: Users can sign up, log in, and manage their account.
3. RL Management: Users can view, edit, and delete their shortened URLs.
4. Analytics: Users can see the analytics for their shortened URLs, such as the number of clicks.
5. Data Storage: Long and short URLs are stored in MongoDB.
   
## Technologies Used
1. Frontend: React.js
2. Backend: Node.js, Express.js
3. Database: MongoDB
4. URL Shortening: SHORTid
5. Authentication: JSON Web Tokens (JWT)

## Installation

### Prerequisites
1. Node.js
2. MongoDB

### Backend Setup
1. **Clone the repository:**
```
git clone https://github.com/yourusername/url-shortener.git
cd server
```
2. **Install backend dependencies:**
```
npm install
```
3. **Create a .env file in the backend directory and add the following:**
```
JWT_SECRET=your_jwt_secret
```
4. **Start the backend server:**
```
npm start
```

The application will now be running on http://localhost:3000.

### Frontend Setup

1. **Navigate to the frontend directory:**
```
cd app
```
2. **Install frontend dependencies:**
```
npm install
```
3. Start the frontend development server:
```
npm run dev
```
The application will now be running on http://localhost:5173.

## Usage
1. ***Sign Up***: Create a new account by signing up.
2. ***Log In***: Log in to your account.
3. ***Shorten URL***: Enter a long URL to get a shortened version.
4. ***Manage URLs***: View, edit, and delete your shortened URLs.
5. ***View Analytics***: See the analytics for your shortened URLs.


## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, please open an issue or contact me at [msurya9701@gmail.com](Email)


***Backend hosted url***->https://url-shortener-tatk.onrender.com
