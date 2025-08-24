# BlogCraft - Full-Stack Blogging Platform

A modern, full-featured blogging platform built with React frontend and Node.js + MongoDB backend.

## 🚀 Features

### Frontend (React)
- **Interactive Blog Cards** with hover effects and pop-ups
- **Responsive Design** that works on all devices
- **Search & Filter** functionality
- **User Authentication** (Login/Register)
- **Create & Edit Posts** with rich interface
- **Real-time Updates** with React Query
- **Modern UI** with Tailwind CSS

### Backend (Node.js + MongoDB)
- **RESTful API** with Express.js
- **MongoDB Database** with Mongoose ODM
- **User Authentication** with JWT
- **Input Validation** and sanitization
- **Error Handling** and logging
- **Security Features** (Helmet, CORS, Rate Limiting)
- **File Upload** support for images

### Core Functionality
- ✅ **Blog Cards** with background images, titles, descriptions
- ✅ **Hover Pop-ups** with detailed information
- ✅ **Dynamic UI** with smooth animations
- ✅ **Full CRUD** operations for blog posts
- ✅ **Category Management**
- ✅ **Search & Filtering**
- ✅ **User Authentication**
- ✅ **Comments System**
- ✅ **Like/View Tracking**
- ✅ **Responsive Design**

## 🛠 Tech Stack

**Frontend:**
- React 18
- React Router DOM
- React Query (Data fetching)
- Axios (HTTP client)
- Tailwind CSS (Styling)
- React Hook Form (Form handling)
- React Hot Toast (Notifications)
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt (Password hashing)
- Express Validator
- Helmet (Security)
- CORS
- Rate Limiting

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd fullstack-blog-platform
\`\`\`

### 2. Install Dependencies
\`\`\`bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
\`\`\`

### 3. Environment Setup

Create `.env` file in the `server` directory:
\`\`\`env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogcraft
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
\`\`\`

### 4. Start MongoDB
Make sure MongoDB is running on your system.

### 5. Run the Application
\`\`\`bash
# From the root directory, run both frontend and backend
npm run dev

# Or run them separately:
# Backend (from server directory)
npm run dev

# Frontend (from client directory)
npm start
\`\`\`

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs (with pagination, search, filter)
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/:id/like` - Like a blog
- `POST /api/blogs/:id/comments` - Add comment

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

## 🎨 Key Features Explained

### 1. Interactive Blog Cards
Each blog card includes:
- Background image with overlay
- Title and description
- Author information
- Read time and publish date
- Tags and category
- View and like counts
- Hover effects with detailed popup

### 2. Hover Pop-up Effects
When hovering over a card:
- Smooth animation with scale and shadow effects
- Detailed popup with full information
- Non-intrusive design that doesn't block interaction

### 3. Search & Filter System
- Real-time search across titles, descriptions, and content
- Category-based filtering
- Pagination for large datasets
- URL-based state management

### 4. User Authentication
- JWT-based authentication
- Protected routes for creating posts
- User context management
- Persistent login state

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables for API URL

### Backend (Heroku/Railway/DigitalOcean)
1. Set up MongoDB Atlas or your preferred database
2. Configure environment variables
3. Deploy the server directory
4. Update CORS settings for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please create an issue in the GitHub repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**
