import { createBrowserRouter } from "react-router-dom";

import Root from "@/routes/Root";
import Home from "@/routes/Home";
import Estimate from "@/routes/Estimate";
import Merge from "@/routes/Merge";

export default createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "merge",
        element: <Merge />,
      },
      {
        path: "estimate",
        element: <Estimate />,
      },
    ],
  },
]);
