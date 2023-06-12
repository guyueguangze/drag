import React from "react"

export default function Editor() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas
        id="chartview-canvas"
        style={{ width: "100%", height: "100%", cursor: "crosshair" }}
      >
        Canvas not supported
      </canvas>
    </div>
  )
}
