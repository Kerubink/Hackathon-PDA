import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/home.jsx";
import SearchPage from "../pages/AccommodationSearch/SearchAccommodation.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/search-for-accommodation",
                element: <SearchPage />
            }
        ]
    }
])