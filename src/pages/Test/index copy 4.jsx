import React, { useRef, useEffect } from "react"
import dayjs from "dayjs"
import * as echarts from "echarts"

import { stoctData } from "@/pages/Home/excel"
export default function Test() {
  const Candlestick = useRef()
  const stoctDate = []
  for (let index = 0; index < stoctData.kLineData.length; index++) {
    // 转换为正常的时间
    var baseDate = new Date(1900, 0, 1) // 基准日期：1900 年 1 月 1 日
    var normalTime = new Date(
      baseDate.getTime() +
        (stoctData.kLineData[index][0] - 1) * 24 * 60 * 60 * 1000
    )
    let time = dayjs(normalTime).format("YYYY-MM-DD")
    stoctDate.push(time)
  }
  const newStoctData = JSON.parse(JSON.stringify(stoctData.kLineData))
  for (let index = 0; index < newStoctData.length; index++) {
    newStoctData[index].shift()
  }
  const n = 6
  let result = []
  const stoctLine = []
  for (let i = 0; i < newStoctData.length; i++) {
    // if (i == 1) return
    for (let j = 0; j < newStoctData[i].length; j += n) {
      const chunk = newStoctData[i].slice(j, j + n)

      result.push(chunk)
    }
    // console.log(result)
    stoctLine.push(result)
    result = []
  }
  let realStoctLine = []
  for (let i = 0; i < stoctLine[0].length; i++) {
    let temp = []
    for (let j = 0; j < stoctLine.length; j++) {
      temp.push(stoctLine[j][i])
    }
    realStoctLine.push(temp)
  }
  const upColor = "#ec0000"
  const upBorderColor = "#8A0000"
  const downColor = "#00da3c"
  const downBorderColor = "#008F28"
  const calculateMA = (dayCount, stoctDate) => {
    var result = []
    for (var i = 0, len = stoctDate.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-")
        continue
      }
      var sum = 0
      for (var j = 0; j < dayCount; j++) {
        sum += +stoctDate[i - j][1]
      }
      result.push(sum / dayCount)
    }
    return result
  }

  const option = {
    xAxis: {
      data: stoctDate,
    },
    yAxis: {},
    series: [
      {
        type: "candlestick",
        data: realStoctLine[20],
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

  // console.log(realStoctLine, "realStoctLine")
  // console.log(stoctLine, "stoctLine")
  return (
    <div style={{ width: "100%", height: "100%" }} ref={Candlestick}>
      Test555
    </div>
  )
}
