import React, { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Nacbar"
import Content from "./components/Content"
import Footer from "./components/Footer"
export default function Layout() {
  const menus = [
    { label: "首页", path: "/home" },
    { label: "A", path: "/A" },
    { label: "B", path: "/B" },
    { label: "C", path: "/C" },
    { label: "D", path: "/D" },
    { label: "E", path: "/E" },
  ]
  return (
    <div>
      <Navbar menus={menus} />
      <Content>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Content>
      <Footer />
    </div>
  )
}
