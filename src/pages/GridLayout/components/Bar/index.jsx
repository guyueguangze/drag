import React, { useRef, useEffect } from "react"
import * as echarts from "echarts"
import domtoimage from "dom-to-image-more"
export default function Bar() {
  const bar = useRef()
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  }
  useEffect(() => {
    var myChart = echarts.getInstanceByDom(bar.current)

    if (myChart == null) {
      myChart = echarts.init(bar.current)
    }
    myChart.setOption(option)
  }, [])
  const onMouseDown = () => {
    // console.log(99)
    // const barDom = document.querySelector(".bar")
    // domtoimage
    //   .toPng(barDom)
    //   .then(function (dataUrl) {
    //     var img = new Image()
    //     img.onload = function () {
    //       img.style.position = "fixed"
    //       img.style.cursor = "pointer"
    //       img.style.pointerEvents = "none"
    //       // img.style.display = "none"
    //       document.body.appendChild(img)
    //       img.src = dataUrl
    //       document.addEventListener("mousemove", function (e) {
    //         img.style.left = `${e.pageX - 16}px`
    //         img.style.top = `${e.pageY - 16}px`
    //         img.style.display = "block"
    //       })
    //     }
    //     console.log(img, 66)
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error)
    //   })
    // document.addEventListener("mousemove", function (e) {})
  }
  return (
    <div
      onMouseDown={onMouseDown}
      style={{ width: "100%", height: "100%" }}
      ref={bar}
      className="bar"
    ></div>
  )
}
