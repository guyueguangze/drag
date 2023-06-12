import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import { circuits } from "./circuit"
let mouseDownX = 0
let mouseDownY = 0
let mouseUpX = 0
let mouseUpY = 0
let isSele = false
export default function ChartView() {
  const [isPanning, setisPanning] = useState(false)
  const [circuitData, setcircuitData] = useState(circuits)
  const [Boxselection, setBoxselection] = useState(null)
  const [BoxselectionWidth, setBoxselectionWidth] = useState(null)
  const [BoxselectionHeight, setBoxselectionHeight] = useState(null)
  const [BoxselectionCoordinate, setBoxselectionCoordinate] = useState(null)
  //   const [, set] = useState(initialState);

  const onMouseDown = (e, item) => {
    // const svgRect = e.currentTarget.getBoundingClientRect()
    // mouseX = e.clientX - svgRect.left
    // mouseY = e.clientY - svgRect.top
  }
  const svgMouseDown = (e) => {
    const svgRect = e.currentTarget.getBoundingClientRect()
    mouseDownX = e.clientX - svgRect.left
    mouseDownY = e.clientY - svgRect.top
    setBoxselectionCoordinate({ mouseDownX, mouseDownY })
    isSele = true
  }
  const svgMouseUp = (e) => {
    isSele = false
    var root = document.getElementById("my-svg")
    var rpos = root.createSVGRect()
    rpos.x = BoxselectionCoordinate.mouseDownX
    rpos.y = BoxselectionCoordinate.mouseDownY
    rpos.height = Boxselection.BoxselectionHeight
    rpos.width = Boxselection.BoxselectionWidth
    var list = root.getIntersectionList(rpos, null)
    for (var i = 0; i < list.length; i++) {
      if (i !== 0) {
        list[i].setAttributeNS(null, "fill", "green")
      }
      console.log(list[i])
      // 在这里写自己的代码，对选中的SVG元素进行操作
    }
    console.info(list)
    console.log(list)
    // var myrect = document.getElementById("myrect")
    // var rect = new SVGRect(75, 75, 150, 150)
    // var elements = svg.getIntersectionList(myrect, null)
    // for (var i = 0; i < elements.length; i++) {
    //   console.log(elements[i]) // 输出每个符合条件的 SVG 元素
    // }
    // const svgRect = e.currentTarget.getBoundingClientRect()
    // mouseUpX = e.clientX - svgRect.left
    // mouseUpY = e.clientY - svgRect.top
    // let BoxselectionWidth = mouseUpX - mouseDownX
    // let BoxselectionHeight = mouseUpY - mouseDownY
    // // setBoxselectionCoordinate({ mouseDownX, mouseDownY })
    // setBoxselection({ BoxselectionWidth, BoxselectionHeight })
  }
  const svgMouseMove = (e) => {
    if (!mouseDownX || !isSele) return
    const svgRect = e.currentTarget.getBoundingClientRect()
    let mouseMoveX = e.clientX - svgRect.left
    let mouseMoveY = e.clientY - svgRect.top
    let BoxselectionWidth = mouseMoveX - mouseDownX
    let BoxselectionHeight = mouseMoveY - mouseDownY
    setBoxselection({ BoxselectionWidth, BoxselectionHeight })
  }

  return (
    <div
      className="noselect"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* <canvas
        style={{ cursor: isPanning ? "grab" : "crosshair" }}
        id="chartview-canvas"
      >
        Canvas not supported
      </canvas> */}
      <svg
        id="my-svg"
        onMouseUp={svgMouseUp}
        onMouseDown={svgMouseDown}
        onMouseMove={svgMouseMove}
        width={800}
        height={700}
      >
        {Boxselection && BoxselectionCoordinate && (
          <g
            id="myrect"
            transform={`translate(${BoxselectionCoordinate.mouseDownX},${BoxselectionCoordinate.mouseDownY})`}
          >
            <rect
              stroke="skyblue"
              fill="none"
              width={Boxselection.BoxselectionWidth}
              height={Boxselection.BoxselectionHeight}
            ></rect>
          </g>
        )}

        {circuitData.map((item, index) => (
          <g
            id={index}
            transform={`translate(${item.x},${item.y})`}
            key={index}
            onMouseDown={(e) => onMouseDown(e, item)}
          >
            <circle key={index} r="6"></circle>
          </g>
        ))}
      </svg>
    </div>
  )
}
