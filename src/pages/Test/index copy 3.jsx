import React, { useRef, useEffect } from "react"
import dayjs from "dayjs"
import * as echarts from "echarts"

import { stoctData } from "@/pages/Home/excel"
export default function Test() {
  const Candlestick = useRef()

  // var excelTimeValue = 44580

  // // 转换为正常的时间
  // var baseDate = new Date(1900, 0, 1) // 基准日期：1900 年 1 月 1 日
  // var normalTime = new Date(
  //   baseDate.getTime() + (excelTimeValue - 1) * 24 * 60 * 60 * 1000
  // )
  const stoctDate = []
  for (let index = 0; index < stoctData.kLineData.length; index++) {
    var excelTimeValue = 44580

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
  const calculateMA = (dayCount) => {
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
    title: {
      text: "nsdk",
      left: 0,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["日K", "MA5", "MA10", "MA20", "MA30"],
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: stoctDate,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: "dataMin",
      max: "dataMax",
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 50,
        end: 100,
      },
      {
        show: true,
        type: "slider",
        top: "90%",
        start: 50,
        end: 100,
      },
    ],
    series: [
      {
        type: "candlestick",
        data: realStoctLine[10],
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
        markPoint: {
          label: {
            formatter: function (param) {
              return param != null ? Math.round(param.value) + "" : ""
            },
          },
          data: [
            {
              name: "Mark",
              coord: ["2013/5/31", 2300],
              value: 2300,
              itemStyle: {
                color: "rgb(41,60,85)",
              },
            },
            {
              name: "highest value",
              type: "max",
              valueDim: "highest",
            },
            {
              name: "lowest value",
              type: "min",
              valueDim: "lowest",
            },
            {
              name: "average value on close",
              type: "average",
              valueDim: "close",
            },
          ],
          tooltip: {
            formatter: function (param) {
              return param.name + "<br>" + (param.data.coord || "")
            },
          },
        },
        markLine: {
          symbol: ["none", "none"],
          data: [
            [
              {
                name: "from lowest to highest",
                type: "min",
                valueDim: "lowest",
                symbol: "circle",
                symbolSize: 10,
                label: {
                  show: false,
                },
                emphasis: {
                  label: {
                    show: false,
                  },
                },
              },
              {
                type: "max",
                valueDim: "highest",
                symbol: "circle",
                symbolSize: 10,
                label: {
                  show: false,
                },
                emphasis: {
                  label: {
                    show: false,
                  },
                },
              },
            ],
            {
              name: "min line on close",
              type: "min",
              valueDim: "close",
            },
            {
              name: "max line on close",
              type: "max",
              valueDim: "close",
            },
          ],
        },
      },
      {
        name: "MA5",
        type: "line",
        data: calculateMA(5),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA10",
        type: "line",
        data: calculateMA(10),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA20",
        type: "line",
        data: calculateMA(20),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA30",
        type: "line",
        data: calculateMA(30),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
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
