import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Feed from './pages/Posts/Feed'
import Profile from './pages/Profile/Profile'
import Login from './pages/Auth/Login'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/Auth/Register'
import Home from './pages/Home'
function App() {

  const router= createBrowserRouter([
  {
  path: "/",
  element: <PublicRoute><Home /></PublicRoute>,},
  { path: '/register', element: <PublicRoute><AuthLayout><Register/></AuthLayout></PublicRoute> },
    { path: '/feed', element: <PrivateRoute>  <MainLayout><Feed /></MainLayout></PrivateRoute> },
    { path: '/login', element: <PublicRoute><AuthLayout><Login /></AuthLayout></PublicRoute> },
    { path: '/profile', element: <PrivateRoute><Profile /></PrivateRoute> }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
