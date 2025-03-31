import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CreateJob from "../pages/CreateJob";
import MyJobs from "../pages/MyJobs";
import SalaryPage from "../pages/SalaryPage";
import UpdateJobs from "../pages/UpdateJobs";
import Login from "../pages/Login";
import JobDetails from "../pages/JobDetails";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { path: "/", element: <Home /> },
            { path: "/post-job", element: <CreateJob /> },
            { path: "/my-job", element: <MyJobs /> },
            { path: "/salary", element: <SalaryPage /> },
            { path: "/edit-job/:id", element: <UpdateJobs />, loader: ({params}) => fetch(`http://localhost:3000/all-jobs/${params.id}`) },
            { path: "/job/:id", element: <JobDetails /> },

        ]
    },
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/sign-up",
        element:<Signup />
    }
]);

export default router