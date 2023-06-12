import React, { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Nacbar"
import Content from "./components/Content"
import Footer from "./components/Footer"
export default function Layout() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <Navbar menus={menus} /> */}
      {/* <Content> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      {/* </Content> */}
    </div>
  )
}
