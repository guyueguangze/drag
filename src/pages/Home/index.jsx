import React, { useState } from "react"
import GridLayout from "react-grid-layout"
import styles from "./index.module.scss"
import ChartView from "./components/ChartView"
import GateVew from "./components/GateView"
import { useSelector, useDispatch } from "react-redux"
import GateCompontent from "./components/GateView/components/GateCompontent"
import { dragSelAreSlice } from "@/store/drag"
import NewChart from "./components/NewChart"
export default function Home() {
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
    { i: "axisTableX", x: 0, y: 1, w: 9, h: 3 },
    { i: "axisTableY", x: 0, y: 4, w: 9, h: 3 },
    { i: "dataTable", x: 0, y: 6, w: 9, h: 8 },
    { i: "dataTable", x: 0, y: 6, w: 9, h: 8 },
    { i: "chartView", x: 9, y: 1, w: 15, h: 20 },
    { i: "newChart", x: 0, y: 14, w: 9, h: 9 },
  ]
  const dragMouseUp = () => {
    dispatch(dragSelAreSlice.actions.closeDragSvg())
  }
  console.log(isDragAre, 9977)
  return (
    <div style={{ position: "relative" }} className={styles.root}>
      <GridLayout
        draggableHandle=".panelDragHandle"
        className="layout"
        layout={layout}
        cols={nbCols}
        rowHeight={rowHeight}
        width={document.body.offsetWidth}
        margin={[horizontalMargin, verticalMargin]}
        resizeHandles={["se"]}
        autoSize={false}
        compactType={null}
        containerPadding={[0, 0]}
      >
        <div className="panelDragHandle" key="menuBar">
          menuBar
        </div>
        <div className="panelDragHandle" key="axisTableX">
          axisTableX
        </div>
        <div className="panelDragHandle" key="axisTableY">
          axisTableY
        </div>
        <div className="panelDragHandle" key="dataTable">
          dataTable
        </div>
        <div className="panelDragHandle" key="newChart">
          <NewChart />
        </div>
        <div key="chartView">
          <div
            style={{ width: 500, height: 50 }}
            className="panelDragHandle"
          ></div>
          <GateVew />
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
