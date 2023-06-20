import React, { useRef, useEffect } from "react"
import * as echarts from "echarts"
export default function Candlestick() {
  const Candlestick = useRef()
  const option = {
    xAxis: {
      data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
    },
    yAxis: {},
    series: [
      {
        type: "candlestick",
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42],
        ],
      },
    ],
  }
  useEffect(() => {
    var myChart = echarts.getInstanceByDom(Candlestick.current)

    if (myChart == null) {
      myChart = echarts.init(Candlestick.current)
    }
    myChart.setOption(option)
  }, [])

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      ref={Candlestick}
      className="Candlestick"
    ></div>
  )
}
