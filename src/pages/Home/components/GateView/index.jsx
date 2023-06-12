import React, { useState, useEffect, useRef } from "react"
import GateCompontent from "./components/GateCompontent"
import { useSelector, useDispatch } from "react-redux"
import { gatesSlice } from "@/store/gates"
import { dragSelAreSlice } from "@/store/drag"
let mouseDownX = 0
let mouseDownY = 0
let selMouseDownX = 0
let selMouseDownY = 0
let mouseUpX = 0
let mouseUpY = 0

let isSele = false
export default function GateVew() {
  const dispatch = useDispatch()
  const [svgrect, setSvgrect] = useState(null)
  useEffect(() => {
    let svgrect = document.getElementById("mysvg").getBoundingClientRect()
    setSvgrect(svgrect)
  }, [])
  const { gateData } = useSelector((s) => s.gatesData)

  const [Boxselection, setBoxselection] = useState(null)
  const [BoxselectionCoordinate, setBoxselectionCoordinate] = useState(null)

  const svgMouseDown = (e) => {
    if (e.target.getAttribute("class") !== "svg") return
    // const svgRect = e.currentTarget.getBoundingClientRect()
    mouseDownX = e.clientX - svgrect.left
    mouseDownY = e.clientY - svgrect.top
    dispatch(dragSelAreSlice.actions.setGatecoorad({ mouseDownX, mouseDownY }))
    isSele = true
  }
  const svgMouseUp = (e) => {
    isSele = false

    mouseUpX = e.clientX - svgrect.left
    mouseUpY = e.clientY - svgrect.top
    let data = getSelectArea()
    dispatch(gatesSlice.actions.setSelGateData(data))
  }
  const svgMouseMove = (e) => {
    if (!mouseDownX || !isSele) return
    selMouseDownX = mouseDownX
    selMouseDownY = mouseDownY
    setBoxselectionCoordinate({ mouseDownX, mouseDownY })

    const svgRect = e.currentTarget.getBoundingClientRect()
    let mouseMoveX = e.clientX - svgRect.left
    let mouseMoveY = e.clientY - svgRect.top
    let BoxselectionWidth = mouseMoveX - mouseDownX
    let BoxselectionHeight = mouseMoveY - mouseDownY
    setBoxselection({ BoxselectionWidth, BoxselectionHeight })
  }
  const getSelectArea = () => {
    const result = []

    gateData.forEach((gate) => {
      if (
        mouseDownX <= gate.x &&
        mouseDownY <= gate.y &&
        gate.x <= mouseUpX &&
        gate.y <= mouseUpY
      ) {
        result.push(gate)
      }
    })
    return result
  }
  const onClick = (e) => {
    let rectLeft = BoxselectionCoordinate?.mouseDownX
    let rectTop = BoxselectionCoordinate?.mouseDownY
    const rectWidth = Boxselection?.BoxselectionWidth + 10
    const rectHeight = Boxselection?.BoxselectionHeight + 10
    let clickX = e.clientX - svgrect.left
    let clickY = e.clientY - svgrect.top
    if (
      clickX < rectLeft ||
      clickX > rectLeft + rectWidth ||
      clickY < rectTop ||
      clickY > rectTop + rectHeight
    ) {
      // setBoxselection(null)
      // setBoxselectionCoordinate(null)
      // console.log("Click outside the rectangle.")
    } else {
      // console.log("Click inside the rectangle.")
    }
  }

  const mouseDownSelAre = (e) => {
    e.stopPropagation()
    e.preventDefault()
    let width = Boxselection.BoxselectionWidth
    let height = Boxselection.BoxselectionHeight
    // let isDragAre = true

    dispatch(dragSelAreSlice.actions.setSvgData({ width, height }))
    dispatch(dragSelAreSlice.actions.isDrag())

    const drag = (e) => {
      let left = e.clientX
      let top = e.clientY

      dispatch(dragSelAreSlice.actions.drag({ top, left }))

      // let clickX = e.clientX - svgrect.left
      // let clickY = e.clientY - svgrect.top
    }
    document.addEventListener("mousemove", drag)
  }

  return (
    <div>
      <svg
        id="mysvg"
        className="svg"
        onMouseUp={svgMouseUp}
        onMouseDown={svgMouseDown}
        onMouseMove={svgMouseMove}
        onClick={onClick}
        width={800}
        height={700}
      >
        <g>
          {gateData.map((item, index) => (
            <GateCompontent
              svgrect={svgrect}
              key={index}
              index={index}
              gate={item}
            />
          ))}
        </g>
        {Boxselection && BoxselectionCoordinate && (
          <g
            id="myrect"
            transform={`translate(${BoxselectionCoordinate.mouseDownX},${BoxselectionCoordinate.mouseDownY})`}
          >
            <rect
              onMouseDown={mouseDownSelAre}
              stroke="skyblue"
              fill="transparent"
              width={Boxselection.BoxselectionWidth}
              height={Boxselection.BoxselectionHeight}
            ></rect>
          </g>
        )}
      </svg>
    </div>
  )
}
