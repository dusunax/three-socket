import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "about",
    element: <div>hello About</div>,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
