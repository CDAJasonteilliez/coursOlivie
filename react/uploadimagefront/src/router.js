import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { lazy } from 'react';
const Login = lazy(() => import("./pages/forms/Login/Login.js"));
const Register = lazy(() => import("./pages/forms/Register/Register.js"));
const Homepage = lazy(() => import("./pages/Homepage/Homepage.js"));
const Profile = lazy(() => import("./pages/Profile/Profile.js"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ]
    }
]);