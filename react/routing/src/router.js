import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Profile from './pages/Profile/Profile';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Legal from './pages/Legal/Legal';
import ProfileView from './pages/Profile/components/ProfileView';
import ProfileData from './pages/Profile/components/ProfileData';
import { articleLoader } from './loaders/homepageLoader';
import { userLoader } from './loaders/userLoader';
import { profileLoader } from './loaders/profileLoader';
import { lazy } from 'react';

const Homepage = lazy(() => import("./pages/Homepage/Homepage"));



export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: userLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                loader: articleLoader,
                element: <Homepage />
            },
            {
                path: "/profile",
                loader: profileLoader,
                element: <Profile />,
                children :  [
                    {
                        path: "",
                        element: <ProfileView />
                    },
                    {
                        path: "data",
                        element: <ProfileData />
                    },
                ]
            },
            {
                path: '/legal',
                element: <Legal />
            }
        ]
    }
]);