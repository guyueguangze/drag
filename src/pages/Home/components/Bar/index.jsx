import React, { useRef, useEffect } from "react"
import * as echarts from "echarts"
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

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      ref={bar}
      className="bar"
    ></div>
  )
}
