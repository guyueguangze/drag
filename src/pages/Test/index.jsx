import React from "react"
import { Workbook } from "@fortune-sheet/react"
import "@fortune-sheet/react/dist/index.css"
export default function NewChart() {
  return (
    <div>
      NewChart
      <Workbook data={[{ name: "Sheet1" }]} />,
    </div>
  )
}
