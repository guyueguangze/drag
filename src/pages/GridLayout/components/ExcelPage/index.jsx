import React, { useEffect, useRef } from "react"
import LuckyExcel from "luckyexcel"
import { Button, message, Upload } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { dragSelAreSlice } from "@/store/drag"
export default function ExcelPage({ excelData }) {
  const inputexcel = useRef()
  const { isUpdateExcel } = useSelector((s) => s.dragSleAreData)
  const { selGateData } = useSelector((s) => s.gatesData)
  const dispatch = useDispatch()

  useEffect(() => {
    const luckysheet = window.luckysheet
    const options = {
      container: "luckysheet", // 设定DOM容器的id
      title: "Luckysh", // 设定表格名称
      lang: "zh", // 设定表格语言

      // 更多其他设置...
    }
    luckysheet.create({
      options,
    })
  }, [])
  useEffect(() => {
    if (excelData) {
      LuckyExcel.transformExcelToLucky(
        excelData,
        function (exportJson, luckysheetfile) {
          //Get the worksheet data after conversion
          console.log(exportJson, 33)
          window.luckysheet.destroy()
          luckysheet.create({
            container: "luckysheet", // luckysheet is the container id
            data: exportJson.sheets,
            title: exportJson.info.name,
            userInfo: exportJson.info.creator,
            lang: "zh", // 设定表格语言
            showtoolbarConfig: {
              pivotTable: false, //'数据透视表'
              // protection: false, // '工作表保护'
              print: false, // '打印'
              image: false, // 插入图片
            },
            showinfobar: false,
          })
        }
      )
    }
  }, [excelData])
  useEffect(() => {
    if (isUpdateExcel) {
      // dispatch(dragSelAreSlice.actions.updateExcel(true))
      console.log(selGateData)
      let excelGateData = []
      for (let index = 0; index < selGateData.length; index++) {
        excelGateData.push([
          {
            m: selGateData[index].name,
            ct: {
              fa: "General",
              t: "g",
            },
            v: selGateData[index].name,
          },
          {
            m: selGateData[index].x,
            ct: {
              fa: "General",
              t: "g",
            },
            v: selGateData[index].x,
          },
          {
            m: selGateData[index].y,
            ct: {
              fa: "General",
              t: "g",
            },
            v: selGateData[index].y,
          },
        ])
      }
      // console.log(selGateData.length)
      // console.log(excelGateData, 88)
      luckysheet.setRangeValue(excelGateData, {
        range: `A1:C${selGateData.length}`,
      })

      dispatch(dragSelAreSlice.actions.updateExcel(false))
    }
  }, [isUpdateExcel])
  const luckyCss = {
    margin: "0px",
    padding: "0px",
    position: "absolute",
    width: "100%",
    height: "100%",
    left: "0px",
    top: "20px",
  }
  const excelImport = () => {
    inputexcel.current.click()
  }
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    LuckyExcel.transformExcelToLucky(
      file,
      function (exportJson, luckysheetfile) {
        //Get the worksheet data after conversion
        console.log(exportJson, 33)
        window.luckysheet.destroy()
        luckysheet.create({
          container: "luckysheet", // luckysheet is the container id
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.creator,
          lang: "zh", // 设定表格语言
          showtoolbarConfig: {
            pivotTable: false, //'数据透视表'
            // protection: false, // '工作表保护'
            print: false, // '打印'
            image: false, // 插入图片
          },
          showinfobar: false,
        })
      }
    )
  }
  const onClick = () => {
    const data = [
      [
        {
          m: "value1",
          ct: {
            fa: "General",
            t: "g",
          },
          v: "value1",
        },
        {
          m: "value3",
          ct: {
            fa: "General",
            t: "g",
          },
          v: "value3",
        },
      ],
      [
        {
          m: "value2",
          ct: {
            fa: "General",
            t: "g",
          },
          v: "value2",
        },
        // {
        //   m: "5",
        //   ct: {
        //     fa: "General",
        //     t: "g",
        //   },
        //   v: "5",
        // },
      ],
      [
        {
          m: "value2",
          ct: {
            fa: "General",
            t: "g",
          },
          v: "value2",
        },
        {
          m: "value4",
          ct: {
            fa: "General",
            t: "g",
          },
          v: "value4",
        },
      ],
    ]
    luckysheet.setRangeValue(data, { range: "A1:B3" })
  }

  return (
    <div className="ecxel">
      <Button onClick={onClick}></Button>
      {/* <input
        ref={inputexcel}
        onChange={handleFileUpload}
        accept=".xlsx,.xls,.csv"
        type="file"
        style={{ display: "none" }}
      />
      <Button onClick={excelImport}>导入</Button> */}
      <div style={luckyCss} id="luckysheet"></div>
    </div>
  )
}
