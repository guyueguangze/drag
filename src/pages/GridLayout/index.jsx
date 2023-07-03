import React, { useEffect, useRef, useState } from "react"
import GridLayout from "react-grid-layout"
import styles from "./index.module.scss"
import Editor from "@monaco-editor/react"
import { Button, message, Upload } from "antd"
import ExcelPage from "./components/ExcelPage"
import Bar from "./components/Bar"
import Candlestick from "./components/CandleStick"
import Scatter from "./components/Scatter"
import GateVew from "./components/GateView"
import LineStack from "./components/LineStack"
import GateCompontent from "./components/GateView/components/GateCompontent"
import { useSelector, useDispatch } from "react-redux"
import { dragSelAreSlice } from "@/store/drag"

export default function GridLayoutPage() {
  const inputexcel = useRef()
  const { isDragAre, isShwoDrag, top, left, width, height, jianx, jiany } =
    useSelector((s) => s.dragSleAreData)
  const { selGateData } = useSelector((s) => s.gatesData)
  const dispatch = useDispatch()
  const dragMouseUp = (e) => {
    dispatch(dragSelAreSlice.actions.closeDragSvg())

    let mouseX = e.clientX // 鼠标相对于窗口的X坐标
    let mouseY = e.clientY // 鼠标相对于窗口的Y坐标
    let luckysheet = document.getElementById("luckysheet")
    let luckysheetRect = luckysheet.getBoundingClientRect() // 获取元素的边界框信息
    let luckysheetLeft = luckysheetRect.left // 元素左边界的X坐标
    let luckysheetTop = luckysheetRect.top // 元素上边界的Y坐标
    let luckysheetRight = luckysheetRect.right // 元素右边界的X坐标
    let luckysheetBottom = luckysheetRect.bottom // 元素下边界的Y坐标
    if (
      mouseX >= luckysheetLeft &&
      mouseX <= luckysheetRight &&
      mouseY >= luckysheetTop &&
      mouseY <= luckysheetBottom
    ) {
      // console.log("鼠标在元素内")
      dispatch(dragSelAreSlice.actions.updateExcel(true))
    }
  }
  const nbRows = 24
  const nbCols = 24
  const verticalMargin = 4 // Vertical margin between panels
  const horizontalMargin = 4 // Horizontal margin between panels
  const rowHeight = Math.floor(
    Math.max(
      (document.body.offsetHeight - verticalMargin) / nbRows - verticalMargin,
      21
    )
  ) // Cannot go below 21 otherwise some panels become unusable

  const layout = [
    { i: "menuBar", x: 0, y: 0, w: 24, h: 1, static: true },
    { i: "excel", x: 0, y: 1, w: 9, h: 10 },
    { i: "Candlestick", x: 0, y: 11, w: 9, h: 7 },
    { i: "bar", x: 0, y: 18, w: 9, h: 6 },
    { i: "gateView", x: 9, y: 1, w: 10, h: 17 },
    { i: "editor", x: 19, y: 1, w: 5, h: 17 },
    {
      i: "Scatter",
      x: 9,
      y: 18,
      w: 8,
      h: 6,
    },
    {
      i: "LineStack",
      x: 17,
      y: 18,
      w: 7,
      h: 6,
    },
  ]
  // 调整组件大小
  const updateLayout = (e) => {
    // console.log(e)
  }
  // 导入文件
  const excelImport = () => {
    inputexcel.current.click()
  }
  const [excelData, setExcelData] = useState(null)
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setExcelData(file)
  }
  const excelOnMouseUp = () => {
    console.log(8888)
  }

  return (
    <div style={{ position: "relative" }} className={styles.root}>
      <GridLayout
        className="layout"
        draggableHandle=".panelDragHandle"
        layout={layout}
        cols={nbCols}
        rowHeight={rowHeight}
        width={document.body.offsetWidth}
        containerPadding={[0, 0]}
        margin={[horizontalMargin, verticalMargin]}
        onLayoutChange={updateLayout}
        resizeHandles={["se"]}
        autoSize={false}
        compactType={null}
      >
        <div key="menuBar" className="title ">
          <span> Quantum finance</span>
          <span>
            <input
              ref={inputexcel}
              onChange={handleFileUpload}
              accept=".xlsx,.xls,.csv"
              type="file"
              style={{ display: "none" }}
            />
            <Button onClick={excelImport}>导入文件</Button>
          </span>
        </div>

        <div key="gateView" className="panel ">
          <div
            style={{
              width: "100%",
              height: 30,
              backgroundColor: "rgb(186, 186, 192)",
            }}
            className="dragDiv panelDragHandle"
          ></div>
          <GateVew />
        </div>
        <div key="editor" className="panel panelDragHandle">
          <Editor defaultValue="// Code editing" />
        </div>
        <div
          onMouseUp={excelOnMouseUp}
          style={{ zIndexL: 100000 }}
          key="excel"
          className="panel panelDragHandle excel"
        >
          <ExcelPage excelData={excelData} />
        </div>

        <div key="Candlestick" className="panel panelDragHandle">
          <Candlestick />
        </div>
        <div key="bar" className="panel scrollY panelDragHandle">
          <Bar></Bar>
        </div>
        <div key="Scatter" className="panel scrollY panelDragHandle">
          <Scatter></Scatter>
        </div>
        <div key="LineStack" className="panel scrollY panelDragHandle">
          <LineStack></LineStack>
        </div>
      </GridLayout>
      {isDragAre && isShwoDrag && (
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
