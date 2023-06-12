import React, { useRef, memo } from "react"
import Cz from "../gates/Cz"
import I from "../gates/I"
import Pvz from "../gates/Pvz"
import Vz from "../gates/Vz"
import YGate from "../gates/YGate"
import Cgate from "../gates/Cgate"
import Xgate from "../gates/Xgate"
import SwapGate from "../gates/SwapGate"
import { useSelector, useDispatch } from "react-redux"
import { gatesSlice } from "@/store/gates"

const GateCompontent = memo(function GateCompontent({ gate, index, svgrect }) {
  const dispatch = useDispatch()
  let isDarag = false
  const onMouseDown = (e) => {
    isDarag = true
  }
  // const svgRect = document.querySelector(".svg").getBoundingClientRect()
  const move = (e) => {
    if (!isDarag) return
    let mouseDownX = e.clientX - svgrect.left
    let mouseDownY = e.clientY - svgrect.top
    dispatch(gatesSlice.actions.dragGate({ index, mouseDownX, mouseDownY }))
  }
  const up = (e) => {
    isDarag = false
  }
  document.addEventListener("mousemove", move)
  document.addEventListener("mouseup", up)

  const onMouseUp = (e) => {
    isDarag = false
  }
  return (
    <>
      <g
        onMouseDown={onMouseDown}
        // onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        key={index}
        transform={`translate(${gate.x - 16},${gate.y - 16})`}
      >
        {(() => {
          switch (gate.name) {
            case "cz":
              return <Cz />
            case "x":
              return <Xgate />
            case "i":
              return <I />
            case "pvz":
              return <Pvz />
            case "vz":
              return <Vz />
            case "y":
              return <YGate />
            case "cswap":
              if (index > 0) {
                return <SwapGate />
              }
              return <Cgate color={color} />
            case "cp":
              return <Cgate color={color} />
            case "cx":
              if (index > 0) {
                return <Xgate />
              }
              return <Cgate />

            default:
            // return <OtherGate name={gate?.name} />
          }
        })()}
      </g>
    </>
  )
})
export default GateCompontent
