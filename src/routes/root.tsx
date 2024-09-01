import {createBrowserRouter} from "react-router-dom";
import SigninPage from "../pages/signin/signin.page";
import SignupPage from "../pages/signup/signup.page"
import DashboardPage from "../pages/dashboard/dashboard.page";
import EventDetailPage from "../pages/dashboard/event-detail.page";
import EventUpdatePage from "../pages/dashboard/event-update.page";
import EventCreatePage from "../pages/dashboard/event-create.page";


export const rootRouter = createBrowserRouter([
    {
        path: "/",
        element: <SigninPage />
    },
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
            {
                path: "/dashboard/event-detail/:id",
                element: <EventDetailPage/>
            },
            {
                path: "/dashboard/event-update/:id",
                element: <EventUpdatePage/>
            },
            {
                path: "/dashboard/event-create",
                element: <EventCreatePage/>
            }
        ]
    },
])