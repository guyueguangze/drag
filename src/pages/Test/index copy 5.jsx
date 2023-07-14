import React, { useRef, useEffect, useState } from "react"
import dayjs from "dayjs"
import * as echarts from "echarts"
import { Select } from "antd"
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
      const temp = chunk[1] // 将第二项存储在临时变量中
      chunk[1] = chunk[3] // 将第四项赋值给第二项
      chunk[3] = temp

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
  let volume = []
  const [showStock, setShowStock] = useState(realStoctLine[0])

  const getVolume = (data) => {
    for (let index = 0; index < data.length; index++) {
      volume.push([
        index,
        data[index][5],
        data[index][0] > data[index][1] ? 1 : -1,
      ])
    }
    return volume
  }
  getVolume(showStock)

  const upColor = "#00da3c"
  const downColor = "#ec0000"
  const upBorderColor = "#8A0000"
  const downBorderColor = "#008F28"

  let selectStockData = []
  for (let index = 0; index < stoctData.stoctName.length; index++) {
    selectStockData.push({
      value: index,
      label: stoctData.stoctName[index],
    })
  }
  const calculateMA = (dayCount, data) => {
    var result = []
    for (var i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-")
        continue
      }
      var sum = 0
      for (var j = 0; j < dayCount; j++) {
        sum += data[i - j][1]
      }
      result.push(+(sum / dayCount).toFixed(3))
    }
    console.log(result)
    return result
  }
  useEffect(() => {
    var myChart = echarts.getInstanceByDom(Candlestick.current)

    if (myChart == null) {
      myChart = echarts.init(Candlestick.current)
    }
    myChart.setOption(option)
  }, [showStock])
  const selectStock = (value) => {
    setShowStock(realStoctLine[value])
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
      data: ["日K", "MA5", "MA10", "MA30", "MA60"],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      textStyle: {
        color: "#000",
      },
      position: function (pos, params, el, elRect, size) {
        const obj = {
          top: 10,
        }
        obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30
        return obj
      },
    },
    visualMap: {
      show: false,
      seriesIndex: 0,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: downColor,
        },
        {
          value: -1,
          color: upColor,
        },
      ],
    },

    grid: [
      {
        left: "10%",
        right: "8%",
        height: "50%",
      },
      {
        left: "10%",
        right: "8%",
        top: "63%",
        height: "16%",
      },
    ],
    xAxis: [
      {
        type: "category",
        data: stoctDate,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          z: 100,
        },
      },
      {
        type: "category",
        gridIndex: 1,
        data: stoctDate,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: "dataMin",
        max: "dataMax",
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 1,
        end: 60,
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: "slider",
        top: "85%",
        start: 1,
        end: 60,
      },
    ],

    series: [
      {
        name: "Volume",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volume,
      },
      {
        type: "candlestick",
        data: showStock,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: undefined,
          borderColor0: undefined,
        },
      },
      {
        name: "MA5",
        type: "line",
        data: calculateMA(5, showStock),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.5,
          width: 3,
        },
      },
      {
        name: "MA10",
        type: "line",
        data: calculateMA(10, showStock),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.5,
          width: 3,
        },
      },
      {
        name: "MA30",
        type: "line",
        data: calculateMA(30, showStock),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.5,
          width: 3,
        },
      },
      {
        name: "MA60",
        type: "line",
        data: calculateMA(60, showStock),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.5,
          width: 3,
        },
      },
    ],
  }
  return (
    <div style={{ width: 1000, height: 800 }} className="strok">
      <div className="aa">
        <Select
          defaultValue={selectStockData[0].value}
          title="选择股票"
          style={{
            width: 120,
          }}
          onChange={selectStock}
          options={selectStockData}
        />
      </div>
      <div style={{ width: 1000, height: 750 }} ref={Candlestick}></div>
    </div>
  )
}
