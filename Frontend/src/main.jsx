import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage.jsx";
import InstrumentPage from "./Pages/InstrumentPage.jsx";
import { InstrumentsProvider } from "./Contexts/AllInsurmentsContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/instrument/:symbol",
    element: <InstrumentPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InstrumentsProvider>
      <RouterProvider router={router} />
    </InstrumentsProvider>
  </StrictMode>
);
