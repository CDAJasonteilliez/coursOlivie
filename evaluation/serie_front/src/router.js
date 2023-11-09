import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { lazy } from 'react';

const Homepage = lazy(() => import('./pages/Homepage/Homepage.js'));
const Login = lazy(() => import('./pages/Login/Login.js'));
const Register = lazy(() => import('./pages/Register/Register.js'));
const Profile = lazy(() => import('./pages/Profile/Profile.js'));
const Admin = lazy(() => import('./pages/Admin/Admin.js'));
const Details = lazy(() => import('./pages/Details/Details.js'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Homepage />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/admin',
                element: <Admin />,
            },
            {
                path: '/details',
                element: <Details />,
            },

        ]
    }
])