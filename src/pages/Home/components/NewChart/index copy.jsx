import React, { useState, useRef } from "react"
import { Workbook } from "@fortune-sheet/react"
import "@fortune-sheet/react/dist/index.css"
import { useSelector } from "react-redux"
const bb = {
  data: [
    {
      name: "Sheet1",
      celldata: [
        {
          r: 0,
          c: 0,
          v: {
            ct: { fa: "General", t: "g" },
            m: "value5",
            v: "value5",
          },
        },
      ],
    },
  ],
}
export default function NewChart({ newChartData }) {
  const sheet = useRef()
  console.log(newChartData, 9999)
  const { selGateData } = useSelector((s) => s.gatesData)
  const [excelData, setExcelData] = useState([
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
      ],
    },
  ])
  const [sett, setsett] = useState({
    data: [
      {
        name: "Sheet1",
        celldata: [
          {
            r: 0,
            c: 0,
            v: {
              ct: { fa: "General", t: "g" },
              m: "value2",
              v: "value2",
            },
          },
        ],
      },
    ],
  })
  const onMouseEnter = () => {
    let data = JSON.parse(JSON.stringify(selGateData))
    let data1 = []
    for (let index = 0; index < data.length; index++) {
      data1.push({
        r: 0,
        c: index,
        v: {
          ct: { fa: "General", t: "g" },
          m: data[index].name,
          v: data[index].name,
        },
      })
    }
    setsett({
      data: [
        {
          name: "Sheet1",
          celldata: data1,
        },
      ],
    })
    setExcelData(data1)
  }
  const onClick = () => {
    sheet.current?.applyOp(1, 1, {
      m: 8888,
      ps: {
        value: 8888,
      },
    })
    console.log(55)
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <button onClick={onClick}>change</button>
      <Workbook ref={sheet} {...newChartData} />
    </div>
  )
}
