import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/home.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])