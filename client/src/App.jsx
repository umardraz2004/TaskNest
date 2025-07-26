import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import Root from "./Layouts/Root";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registration /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
