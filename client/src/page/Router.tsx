import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./MainPage";
import EnterRoomPage from "./EnterRoomPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "enter",
    element: <EnterRoomPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
