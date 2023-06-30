import React, { useEffect, useRef } from "react"
import LuckyExcel from "luckyexcel"
import { Button, message, Upload } from "antd"
export default function ExcelPage({ excelData }) {
  const inputexcel = useRef()
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
    luckysheet.setRangeValue(data, { range: "A1:B2" })
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
