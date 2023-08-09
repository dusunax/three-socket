import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./MainPage";
import EnterRoomPage from "./EnterRoomPage";
import RoomPage from "./RoomPage";
import CreateRoomPage from "./CreateRoomPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "enter",
    element: <EnterRoomPage />,
  },
  {
    path: "create",
    element: <CreateRoomPage />,
  },
  {
    path: "room/:id",
    element: <RoomPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
