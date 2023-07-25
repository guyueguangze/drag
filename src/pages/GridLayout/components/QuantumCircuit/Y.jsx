import React, { useContext, useEffect, useState } from "react"
import Cz from "./Gate/Cz"
import U3 from "./Gate/U3"
import { delGateDataContext } from "./context"
import { Button, Modal, Form, InputNumber, Drawer } from "antd"
import * as d3 from "d3"
export default function Y({ gate, x, y }) {
  const [form] = Form.useForm()
  let delx = x
  // const [selectGate, setselectGate] = useState(null)
  // 判断两个对象是否相等
  const {
    selectGate,
    delGate,
    selGate,
    updateCircuit,
    changeGate,
    dragChangeGate,
  } = useContext(delGateDataContext)
  // 删除这个门
  const delThisGate = () => {
    delGate(x, gate)
    selGate(x, null)
  }

  // 选中门
  const selectThisGate = (e) => {
    d3.select("#removesvg").remove()
    selGate(x, gate)
  }
  // 修改门
  const [isModalOpen, setIsModalOpen] = useState(false)
  const onFinish = (value) => {
    // console.log(value)
    let changeGateData
    if (value.end) {
      changeGateData = {
        name: value.name,
        qubit: [value.start, value.end],
      }
    } else {
      changeGateData = {
        name: value.name,
        qubit: [value.start],
      }
    }
    if (gate.qubit[0] == value.start && gate.qubit[1] == value.end) return
    changeGate(x, gate, changeGateData)
    form.resetFields()
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleContextMenu = (e) => {
    showModal()
  }
  let drag = false
  // 拖拽电路图内的门
  const dragUpGate = (e) => {
    selGate(x, gate)
    e.stopPropagation()
    if (e.button == 2) return
    drag = true
    const dragEleWidth = 36
    let dragEleHeight = 36
    let lineHeight = 0
    if (gate.qubit.length > 1) {
      dragEleHeight = (gate.qubit[1] - gate.qubit[0] + 1) * 36
      lineHeight = (gate.qubit[1] - gate.qubit[0]) * 40
    }
    let svg = d3
      .select("body")
      .append("svg")
      .attr("width", dragEleWidth)
      .attr("height", dragEleHeight)
      .attr("id", "movesvg")
    // const svg = d3.select("svg")

    let g = svg.append("g")
    // 创建rect元素，并设置其属性
    switch (gate?.name) {
      case "cz":
        for (let index = 0; index < gate?.qubit.length; index++) {
          let circle = g.append("circle")
          let cy = 16 + (gate.qubit[1] - gate.qubit[0]) * 40 * index
          circle
            .attr("cx", 16)
            .attr("cy", cy)
            .attr("r", 4)
            .attr("fill", "rgb(0, 45, 156)")
        }
        let line = g.append("line")
        line
          .attr("x1", 16)
          .attr("x2", 16)
          .attr("y1", 16)
          .attr("y2", lineHeight + 16)
          .attr("stroke", "rgb(0, 45, 156)")
          .attr("stroke-width", 2)
        break
      case "u3":
        g.append("rect")
          .attr("width", dragEleWidth)
          .attr("height", dragEleHeight)
          .style("fill", "rgb(0, 45, 160)")
        g.append("text")
          .attr("x", 8.21875)
          .attr("y", 21.5)
          .attr("fill", "#ffffff")
          .text("U3")
        break
      default:
        break
    }
    const svgNS = svg.node().namespaceURI
    svg.node().setAttributeNS(null, "style", "position: fixed")
    svg.node().style.display = "none"
    document.addEventListener("mousemove", function (e) {
      svg.node().style.cursor = "pointer"
      svg.node().style.left = `${e.clientX - 16}px`
      svg.node().style.top = `${e.clientY - 16}px`
      svg.node().style.display = "block"
      if (!drag) {
        svg.remove()
      }
    })
    svg.node().addEventListener("mouseup", function (e) {
      let mysvg = document.getElementById("my-svg")
      const mousex = e.clientX - mysvg.getBoundingClientRect().left
      const mousey = e.clientY - mysvg.getBoundingClientRect().top
      const x =
        Math.ceil((mousex - 131) / 48 - 1) < 0
          ? 0
          : Math.ceil((mousex - 130) / 48 - 1)
      const y =
        Math.ceil((mousey + 20) / 40 - 3) < 0
          ? 0
          : Math.ceil((mousey + 20) / 40 - 3)
      drag = false
      delGate(delx, gate)
      dragChangeGate(x, y, gate)
      selGate(x, null)
    })
  }

  const onMouseLeave = () => {
    if (!drag) {
      d3.select("#removesvg").remove()
    }
  }
  document.querySelector("body").addEventListener("mouseup", function (e) {
    drag = false
    d3.select("#removesvg").remove()
  })
  document.addEventListener("click", function () {
    drag = false
    d3.select("#removesvg").remove()
  })
  return (
    <g onMouseLeave={onMouseLeave} onMouseDown={dragUpGate} name={gate.name}>
      {gate &&
        gate.qubit.map((item, index) => (
          <g key={index} transform={`translate(0,${item * 40 + 24})`}>
            {(() => {
              switch (gate.name) {
                case "cz":
                  return <Cz />
                case "u3":
                  return <U3 />

                default:
                  return null
              }
            })()}
          </g>
        ))}
      {gate.qubit.length > 1 && (
        <line
          strokeWidth="2"
          stroke="rgb(0, 45, 156)"
          x1={16}
          x2={16}
          y1={gate.qubit[0] * 40 + 40}
          y2={gate.qubit[1] * 40 + 40}
        ></line>
      )}
      {selectGate?.x == x && selectGate?.y == y && (
        <g>
          <g onClick={delThisGate}>
            <g transform={`translate(-1,${gate.qubit[0] * 40 + 18})`}>
              <path
                d="M39 -3L45 3M45 -3L39 3 "
                strokeWidth="1"
                stroke="#434343"
                className="gate-del-icon"
              ></path>
              <circle
                r="7.5"
                cx="42"
                cy="0"
                strokeWidth="1"
                stroke="#e3e3e3"
                fill="transparent"
              ></circle>
            </g>
          </g>
          <g
            onClick={showModal}
            transform={`translate(-1,${gate.qubit[0] * 40 + 14})`}
          >
            <circle
              r="7.5"
              cx="0"
              cy="0"
              strokeWidth="1"
              stroke="#e3e3e3"
              fill="#ffffff"
            ></circle>
            <path
              d="M-1.5 -4L1.5 -4L1.5 4L0 6L-1.5 4ZM-1.5 -2L1.5 -2M-1.5 4 "
              fill="none"
              strokeWidth="1"
              stroke="#434343"
              transform="matrix(0.7071067811865476,0.7071067811865475,-0.7071067811865475,0.7071067811865476,0.7071067811865475,0.2928932188134524)"
            ></path>
          </g>
        </g>
      )}
      <g transform="translate(-2,-1)">
        <rect
          name={gate.name}
          onContextMenu={handleContextMenu}
          onClick={selectThisGate}
          strokeWidth="1"
          stroke={
            (selectGate?.x == x && selectGate?.y == y && "rgb(0, 45, 156)") ||
            "transparent"
          }
          width={36}
          height={(gate.qubit[1] - gate.qubit[0] + 1) * 36 || 36}
          y={gate.qubit[0] * 40 + 23}
          fill="transparent"
        ></rect>
      </g>
      <Drawer
        title="修改门"
        placement="left"
        closable={false}
        onClose={handleCancel}
        open={isModalOpen}
        key="left"
        width={200}
      >
        <Form
          initialValues={{
            name: gate?.name,
            start: gate.qubit[0],
            end: gate.qubit[1],
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="name"
            name="name"
            rules={[
              { required: true, message: "Please InputNumber  your username!" },
            ]}
          >
            <InputNumber disabled={true} />
          </Form.Item>
          {/* <div className="div">name</div> */}
          <Form.Item
            label="start"
            name="start"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please InputNumber  your username!",
              },
            ]}
          >
            <InputNumber min={0} type="number" />
          </Form.Item>
          {gate.qubit[1] && (
            <Form.Item
              label="end"
              name="end"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Please InputNumber  your username!",
                },
              ]}
            >
              <InputNumber min={0} type="number" />
            </Form.Item>
          )}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button onClick={handleOk} type="primary" htmlType="submit">
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </g>
  )
}
