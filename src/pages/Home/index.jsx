import React, { useState, useRef } from "react"
import GridLayout from "react-grid-layout"
import styles from "./index.module.scss"
import ChartView from "./components/ChartView"
import GateVew from "./components/GateView"
import { useSelector, useDispatch } from "react-redux"
import GateCompontent from "./components/GateView/components/GateCompontent"
import { dragSelAreSlice } from "@/store/drag"
import NewChart from "./components/NewChart"
import Scatter from "./components/Scatter"
import Bar from "./components/Bar"
import Candlestick from "./components/CandleStick"
import Editor from "@monaco-editor/react"
import { Button, Upload } from "antd"
import { OutTable, ExcelRenderer } from "react-excel-renderer"
import * as XLSX from "xlsx"
export default function Home() {
  const inputRef = useRef()

  const { isDragAre, top, left, width, height, jianx, jiany } = useSelector(
    (s) => s.dragSleAreData
  )
  const { selGateData } = useSelector((s) => s.gatesData)
  // console.log(isDragAre, top, left, selGateData, 888)
  const dispatch = useDispatch()

  const nbRows = 24
  const nbCols = 24
  const verticalMargin = 4 // Vertical margin between panels
  const horizontalMargin = 4 // Horizontal margin between panels
  const rowHeight = Math.floor(
    Math.max(
      (document.body.offsetHeight - verticalMargin) / nbRows - verticalMargin,
      21
    )
  )
  const layout = [
    { i: "menuBar", x: 0, y: 0, w: 24, h: 1, static: true },
    { i: "newChart", x: 0, y: 1, w: 9, h: 6 },
    { i: "axisTableX", x: 0, y: 8, w: 9, h: 6 },
    { i: "axisTableY", x: 0, y: 8, w: 9, h: 6 },
    { i: "dataTable", x: 0, y: 15, w: 9, h: 6 },
    { i: "chartView", x: 9, y: 1, w: 15, h: 12 },
    { i: "code", x: 9, y: 12, w: 15, h: 12 },
  ]
  const dragMouseUp = () => {
    dispatch(dragSelAreSlice.actions.closeDragSvg())
  }
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
  const [newChartData, setNewChartData] = useState({
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
  })

  const exportFile = () => {
    inputRef.current.click()
  }
  const handleImport = (event) => {
    const fileObj = event.target.files[0]
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err)
      } else {
        console.log(fileObj, "fileObj")
        console.log(resp, "resp")
        const jsonData = JSON.stringify(resp)

    const blob = new Blob([jsonData], { type: "application/json" })

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "excel.json"
    link.click()
      }
    })
  }
  const [dataSource, setDataSource] = useState([])
  const dataSourceToData = (arr) => {
    let newArr = arr.map((item) => {
      delete item.__EMPTY
      return item
    })
    let data = [...newArr.map((item, index) => ({ ...item, key: index }))]
    console.log(data, 33)
  }
  const importXLsx = (file) => {
    // 创建一个file读取器
    const fileReader = new FileReader()
    // 文件读取完毕后的回调，
    fileReader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, {
        type: "binary",
      })
      const wsname = workbook.SheetNames[0]
      const sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
      // console.log(JSON.stringify(sheetJson), "sheetJson")
      // 将数据转换为Table组件所需格式
      const ds = dataSourceToData(sheetJson)
      setDataSource(ds)
    }
    // 以二进制字符串的形式读取本地文件
    fileReader.readAsBinaryString(file)
    // 阻止Upload组件的上传逻辑
    return false
  }
  const UploadProps = {
    accept: ".xlsx",
    // 文件上传之前的回调
    beforeUpload: importXLsx,
  }
  return (
    <div style={{ position: "relative" }} className={styles.root}>
      <GridLayout
        draggableHandle=".panelDragHandle"
        className="layout"
        layout={layout}
        cols={nbCols}
        rowHeight={rowHeight}
        width={document.body.offsetWidth}
        // margin={[horizontalMargin, verticalMargin]}
        resizeHandles={["se"]}
        autoSize={false}
        compactType={null}
        // containerPadding={[0, 0]}
      >
        <div className="menuBar" key="menuBar">
          Quantum finance
        </div>
        <div className="panelDragHandle" key="newChart">
          {/* <Upload {...UploadProps}>
            <Button>导入文件</Button>
          </Upload> */}
          <Button onClick={exportFile}>导入文件</Button>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleImport}
          />
          <NewChart sett={sett} newChartData={sett} />
        </div>
        <div className="panelDragHandle" key="axisTableX">
          <Scatter />
        </div>
        <div className="panelDragHandle" key="axisTableY">
          <Bar />
        </div>
        <div className="panelDragHandle" key="dataTable">
          <Candlestick />
        </div>

        <div className="chartView" key="chartView">
          <GateVew />
        </div>
        <div className="code" key="code">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            theme="vs-dark"
          />
        </div>
      </GridLayout>
      {isDragAre && (
        <svg
          onMouseUp={dragMouseUp}
          width={width}
          height={height}
          style={{
            position: "absolute",
            top: top,
            left: left,
          }}
        >
          <g transform={`translate(${-jianx},${-jiany})`}>
            {selGateData.map((item, index) => (
              <GateCompontent
                jianx={jianx}
                jiany={jiany}
                key={index}
                index={index}
                gate={item}
              />
            ))}
          </g>

          <rect
            fill="transparent"
            width={width}
            height={height}
            stroke="green"
          ></rect>
        </svg>
      )}
    </div>
  )
}
