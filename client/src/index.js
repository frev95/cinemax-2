// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

// import Home from "./Home";
// import Favorites from "./Favorites";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

/* ================= N.B: Par défaut, le port client est configuré à 3000 ================= */

import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles.css"
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/favorites",
        element: <Favorites />
    },
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
