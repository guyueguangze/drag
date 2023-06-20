import React from "react"
import { BrowserRouter } from "react-router-dom"
import Router from "./routes"
import "../node_modules/react-grid-layout/css/styles.css"
import "../node_modules/react-resizable/css/styles.css"
export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
