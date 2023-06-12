import react, { lazy } from "react"
import { Navigate } from "react-router-dom"
import Layout from "@/pages/Layout"
const Home = lazy(() => import("@/pages/Home"))
const Drag = lazy(() => import("@/pages/Drag"))
const Test = lazy(() => import("@/pages/Test"))

export const userLayoutRouter = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/drag",
        element: <Drag />,
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]
