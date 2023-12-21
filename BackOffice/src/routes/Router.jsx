import React from "react";
import Acceuil from "../components/Pages/Acceuil";  
import Login from "../components/Pages/Login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/v1.0.0/:name",
        element: <Acceuil/>
    },
    {
        path: "/v1.0.0/:name/:type",
        element: <Acceuil/>
    },
    {
        path: "/v1.0.0/:name/:type/:id",
        element: <Acceuil/>
    },
    {
        path: "/v1.0.0/:name/:type/:review_id/:comment_id",
        element: <Acceuil/>
    },
    {
        path: "/v1.0.0/Acceuil",
        element: <Acceuil/>
    },
    {
        path: "/v1.0.0/Login",
        element: <Login/>
    },
    {
        path: "/*",
        element: <Login/>
    },
    {
        path: "/v1.0.0/*",
        element: <Login/>
    }
]);

export default router;