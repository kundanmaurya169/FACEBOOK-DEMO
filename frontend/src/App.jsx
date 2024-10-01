import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Feed from './pages/Posts/Feed'
import Profile from './pages/Profile/Profile'
import Login from './pages/Auth/Login'
import PrivateRoute from './routes/PrivateRoute'
// import PublicRoute from './routes/PublicRoute'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/Auth/Register'
import Home from './pages/Home'
import CreatePost from './pages/Posts/CreatePost';

function App() {

  const router= createBrowserRouter([
    { path: "/", element: <Home />},
    { path: '/register', element: <AuthLayout><Register/></AuthLayout> },
    { path: '/feed', element:  <PrivateRoute> <MainLayout><Feed /></MainLayout></PrivateRoute> },
    { path: '/createpost', element:  <PrivateRoute> <MainLayout><CreatePost/></MainLayout></PrivateRoute> },
    { path: '/login', element: <AuthLayout><Login /></AuthLayout> },
    { path: '/profile', element: <PrivateRoute><MainLayout><Profile /></MainLayout></PrivateRoute>},
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
