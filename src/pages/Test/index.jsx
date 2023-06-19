import React from "react"
import { Workbook } from "@fortune-sheet/react"
import "@fortune-sheet/react/dist/index.css"
export default function NewChart() {
  const settings = {
    data: [
      {
        name: "Sheet1",
        celldata: [
          {
            r: 0,
            c: 0,
            v: {
              ct: { fa: "General", t: "g" },
              m: "value1",
              v: "value1",
            },
          },
          {
            r: 0,
            c: 1,
            v: {
              ct: { fa: "General", t: "g" },
              m: "value2",
              v: "value2",
            },
          },
        ],
      },
    ], // 表格数据
    onChange: (data) => {
      console.log(data)
    }, // onChange 事件
    lang: "zh", // 设定表格语言
    // 更多其他设置...
  }
  return <Workbook {...settings} />
}
