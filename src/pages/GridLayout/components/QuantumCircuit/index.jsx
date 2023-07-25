import React, { useState, useEffect, useRef } from "react"
import X from "./X"
import styles from "./index.module.scss"
import dragCircuit from "./qasm"
import { delGateDataContext } from "./context"
import { Button } from "antd"
let myquantionCircuit = new dragCircuit()

export default function DragCircuit() {
  const svgRef = useRef()
  const [circuit, setstateCircuit] = useState(myquantionCircuit.circuit)
  const circuitArray = circuit.map((gates) => [...gates])
  const maxqubit = findMaxQubit(circuitArray)
  let qubitLineArry = []
  for (let index = 0; index <= maxqubit; index++) {
    qubitLineArry.push(index)
  }
  if (qubitLineArry.length < 4) {
    qubitLineArry = [1, 2, 3, 4]
  }
  function findMaxQubit(circuit) {
    return circuit.reduce((max, gates) => {
      const maxQubit = gates.reduce(
        (gatesMax, gate) => Math.max(gatesMax, ...(gate.qubit || [])),
        0
      )
      return Math.max(maxQubit, max)
    }, 0)
  }
  const width =
    circuit.length * 50 + 500 > 1000 ? circuit.length * 50 + 500 : 1000
  const svgHeight =
    qubitLineArry.length * 40 + 300 > 600
      ? qubitLineArry.length * 40 + 300
      : 600
  const [dragGate, setDragGate] = useState(null)
  const drag = (gate) => {
    setDragGate(gate)
    const canvas = document.createElement("canvas") // 创建 Canvas 元素
    const ctx = canvas.getContext("2d")
    const svg = document.getElementById(gate) // 获取 SVG 元素
    const svgData = new XMLSerializer().serializeToString(svg) // 将 SVG 转换为字符串
    const img = new Image() // 创建新的 Image 对象
    img.onload = function () {
      canvas.width = svg.width.baseVal.value
      canvas.height = svg.height.baseVal.value
      ctx.drawImage(img, 0, 0) // 在 Canvas 上绘制图像
      // const link = document.createElement("a"); // 创建下载链接
      // link.download = "image.png";
      // link.href = canvas.toDataURL(); // 将 Canvas 转换为数据 URL
      // link.click(); // 触发下载
      img.style.position = "fixed"
      img.style.cursor = "pointer"
      img.style.pointerEvents = "none"
      img.style.display = "none"
      document.querySelector(".ant-layout-content").appendChild(img)
      document.addEventListener("mousemove", function (e) {
        img.style.left = `${e.pageX - 16}px`
        img.style.top = `${e.pageY - 16}px`
        img.style.display = "block"
      })
    }

    img.src = "data:image/svg+xml," + encodeURIComponent(svgData)
    document.addEventListener("mouseup", function (e) {
      if (img) {
        img.remove()
        setDragGate(null)

        // img.parentNode.removeChild(img)
      }
    })
    // console.log(gate)
  }
  // 真实修改
  let realChange = false
  let delX = 0
  const addCircuitGate = (e, gate) => {
    const svgRect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - svgRect.left
    const mouseY = e.clientY - svgRect.top
    const x =
      Math.ceil((mouseX - 131) / 48) < 0
        ? 0
        : Math.ceil((mouseX - 130) / 48 - 1)
    const y =
      Math.ceil((mouseY + 20) / 40 - 3) < 0
        ? 0
        : Math.ceil((mouseY + 20) / 40 - 3)
    delX = x
    if (dragGate == "cz") {
      myquantionCircuit.addGate({ name: dragGate, qubit: [y, y + 1] }, x)
      setstateCircuit(myquantionCircuit.circuit)
    } else if (dragGate === "u3") {
      myquantionCircuit.addGate({ name: dragGate, qubit: [y] }, x)
      setstateCircuit(myquantionCircuit.circuit)
    }
  }
  const dragChangeGate = (x, y, gate) => {
    const { qubit, name } = gate
    const czq1 = qubit[1] - qubit[0]
    if (gate.name == "cz") {
      myquantionCircuit.addGate({ name: "cz", qubit: [y, czq1 + y] }, x)
      setstateCircuit(myquantionCircuit.circuit)
    } else if (gate.name === "u3") {
      myquantionCircuit.addGate({ name: "u3", qubit: [y] }, x)
      setstateCircuit(myquantionCircuit.circuit)
    }
    setupdateCircuit(updateCircuit + 1)
  }
  const handleMouseDown = (e) => {
    realChange = true
    addCircuitGate(e)
  }

  const gate = {
    cz: "cz",
    u3: "u3",
  }
  const [updateCircuit, setupdateCircuit] = useState(0)
  const delGate = (x, dlgate) => {
    myquantionCircuit.removeGate(x, dlgate)
    setstateCircuit(myquantionCircuit.circuit)
    setupdateCircuit(updateCircuit + 1)
  }
  const [selectGate, setSelectGate] = useState()

  const selGate = (x, slgate) => {
    if (!slgate) {
      setSelectGate(null)
      return
    }
    const y = myquantionCircuit.selectGate(x, slgate)
    setSelectGate({ x, y })
  }
  const changeGate = (x, changeGate, changecontent) => {
    // console.log(x, changeGate, changecontent)
    myquantionCircuit.changeGate(x, changeGate, changecontent)
    setstateCircuit(myquantionCircuit.circuit)
    setupdateCircuit(updateCircuit + 1)
  }
  return (
    <div
      className="svg_content_f"
      // style={{
      //   overflow: "auto",
      //   height: 600,
      //   width: "100%",
      // }}
    >
      {/* <div
        style={{
          width: width,
          height: svgHeight,
        }}
        className="svg_content"
      > */}
      <svg
        ref={svgRef}
        id="my-svg"
        fill="transparent"
        onMouseUp={handleMouseDown}
        width={width}
        height={svgHeight}
      >
        {/* <rect
                fill="transparent"
                strokeWidth="2"
                stroke="black"
                width={width}
                height={svgHeight}
              ></rect> */}
        <g transform="translate(40,50)">
          {qubitLineArry.map((qubit, index) => (
            <g
              key={index}
              transform={`translate(60,${20 + index * 40 ? index * 40 : 0})`}
            >
              <g transform="translate(-14,4)">
                <text
                  x="38.4"
                  y="36"
                  dy=".3em"
                  fill="rgb(111, 111, 111)"
                  fontWeight="400"
                  textAnchor="end"
                  fontSize="14px"
                >
                  <tspan>q[{index}]</tspan>
                </text>
              </g>
              <line
                className="qubit"
                strokeWidth="2"
                x1="30"
                y1="40"
                x2={width - 80}
                y2="40"
                data-dis="0"
                stroke="#C4C4C4"
              ></line>
            </g>
          ))}
          {circuit.map((item, index) => (
            <delGateDataContext.Provider
              key={index}
              value={{
                selectGate,
                delGate,
                selGate,
                updateCircuit,
                changeGate,
                dragChangeGate,
              }}
            >
              <X key={index} x={index} item={item} />
            </delGateDataContext.Provider>
          ))}
        </g>
      </svg>
      {/* </div> */}
    </div>
  )
}
