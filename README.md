# 🚀 TaskTidy - Enhanced Task Management Platform

A modern, feature-rich task management application built with React, Node.js, and MongoDB. TaskTidy helps you organize, track, and optimize your workflow for maximum productivity.

## ✨ Features

### 🎯 Core Task Management
- **Smart Task Creation**: Create tasks with titles, descriptions, priorities, categories, and due dates
- **Multiple Views**: List, Kanban board, Calendar, and Analytics views
- **Task Status Tracking**: Todo, In Progress, Review, Completed
- **Priority Levels**: Low, Medium, High, Urgent with color coding
- **Categories & Tags**: Organize tasks with custom categories and tags
- **Due Dates & Reminders**: Set due dates with overdue indicators
- **Progress Tracking**: Track completion progress with subtasks
- **Notes & Attachments**: Add detailed notes and file attachments

### 📊 Analytics & Insights
- **Real-time Analytics**: Visualize your productivity with interactive charts
- **Completion Trends**: Track task completion over time
- **Priority Distribution**: See how tasks are distributed by priority
- **Category Analysis**: Understand your task categories
- **Performance Metrics**: Monitor productivity trends and insights
- **Custom Time Ranges**: Analyze data for different periods

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Beautiful transitions with Framer Motion
- **Drag & Drop**: Intuitive Kanban board with drag and drop functionality
- **Interactive Charts**: Beautiful data visualizations with Recharts
- **Loading States**: Smooth loading indicators throughout the app

### 🔧 Advanced Features
- **Task Templates**: Create reusable templates for common workflows
- **Bulk Operations**: Select and perform actions on multiple tasks
- **Advanced Filtering**: Filter by status, priority, category, and date
- **Search Functionality**: Quick search across all tasks
- **Export/Import**: Backup and restore your data
- **Keyboard Shortcuts**: Power user shortcuts for efficiency
- **Real-time Updates**: Live updates with React Query

### 🏠 Beautiful Landing Page
- **Hero Section**: Compelling introduction with call-to-action
- **Feature Showcase**: Highlight key features with icons and descriptions
- **Testimonials**: Social proof from satisfied users
- **Pricing Plans**: Transparent pricing with feature comparison
- **FAQ Section**: Common questions and answers
- **Contact Form**: Easy way to get in touch
- **Responsive Footer**: Complete site navigation

## 🛠 Tech Stack

### Frontend
- **React 19**: Latest React with modern features
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Server state management
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icons
- **Recharts**: Interactive charts and visualizations
- **Date-fns**: Modern date utility library
- **@dnd-kit**: Drag and drop functionality

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication and authorization
- **bcryptjs**: Password hashing
- **Express Validator**: Input validation
- **Helmet**: Security middleware
- **Rate Limiting**: API protection
- **CORS**: Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tasktidy.git
   cd tasktidy
   ```

2. **Install backend dependencies**
   ```bash
   cd tasktidy-backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../tasktidy-frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` files in both backend and frontend directories:

   **Backend (.env)**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Start the development servers**

   **Backend**
   ```bash
   cd tasktidy-backend
   npm run dev
   ```

   **Frontend**
   ```bash
   cd tasktidy-frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
tasktidy/
├── tasktidy-backend/
│   ├── models/
│   │   ├── Task.js          # Enhanced task model
│   │   ├── User.js          # User model with preferences
│   │   └── TaskTemplate.js  # Task template model
│   ├── server.js            # Enhanced Express server
│   └── package.json
├── tasktidy-frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/        # Authentication
│   │   │   ├── dashboard/   # Enhanced dashboard
│   │   │   ├── landing/     # Landing page
│   │   │   └── tasks/       # Task management
│   │   ├── shared/          # Shared components
│   │   └── app/             # App configuration
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PATCH /api/auth/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get all tasks with filtering
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/bulk` - Bulk operations

### Analytics
- `GET /api/analytics` - Get task analytics

### Templates
- `GET /api/templates` - Get task templates
- `POST /api/templates` - Create template
- `POST /api/templates/:id/create-task` - Create task from template

## 🎨 Key Features in Detail

### Enhanced Task Model
- **Priority Levels**: 4 priority levels with color coding
- **Status Tracking**: 4 status states for workflow management
- **Categories & Tags**: Flexible organization system
- **Due Dates**: With overdue detection and reminders
- **Time Tracking**: Estimated vs actual time tracking
- **Subtasks**: Break down complex tasks
- **Attachments**: File upload support
- **Notes**: Rich text notes for additional context
- **Progress Tracking**: Automatic progress calculation
- **Audit Trail**: Created, updated, and completed timestamps

### Multiple View Options
1. **List View**: Traditional task list with advanced filtering
2. **Kanban Board**: Drag and drop workflow management
3. **Calendar View**: Monthly calendar with task indicators
4. **Analytics Dashboard**: Comprehensive productivity insights

### Advanced Analytics
- **Completion Trends**: Visualize productivity over time
- **Priority Distribution**: Pie charts for task priorities
- **Category Analysis**: Bar charts for task categories
- **Status Distribution**: Overview of task statuses
- **Performance Metrics**: Key productivity indicators
- **Custom Time Ranges**: Flexible analysis periods

### Beautiful Landing Page
- **Modern Design**: Clean, professional appearance
- **Responsive Layout**: Works on all devices
- **Interactive Elements**: Smooth animations and transitions
- **Feature Highlights**: Clear value proposition
- **Social Proof**: Customer testimonials
- **Clear CTAs**: Multiple conversion opportunities

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive validation on all inputs
- **Rate Limiting**: Protection against abuse
- **CORS Configuration**: Secure cross-origin requests
- **Helmet Security**: Additional security headers
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Backend Deployment
1. Set up your MongoDB database
2. Configure environment variables
3. Deploy to your preferred hosting platform

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Recharts](https://recharts.org/) - Chart library
- [Lucide](https://lucide.dev/) - Icon library
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Web framework

---

**TaskTidy** - Transform your productivity with intelligent task management! 🚀 