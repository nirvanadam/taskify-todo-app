import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage2 from "./pages/HomePage2";
import ErrorPage from "./pages/ErrorPage";
import SearchPage from "./pages/SearchPage";
import MainLayout from "./layouts/MainLayout";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Bungkus dengan MainLayout
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <HomePage2 /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
