import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SuppliersList from "./pages/SuppliersList/SuppliersList.jsx";
import AddSupplier from "./pages/AddSupplier/AddSupplier.jsx";
import SupplierDetails from "./pages/SupplierDetails/SupplierDetails.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children : [
            {
                path: "/",
                element: <SuppliersList />
            },
            {
                path: "/add",
                element: <AddSupplier />
            },
            {
                path: "/details/:id",
                element: <SupplierDetails />
            },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,

)

