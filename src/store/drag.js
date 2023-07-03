import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  isShwoDrag: false,
  isDragAre: false,
  isUpdateExcel: false,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  jianx: 0,
  jiany: 0,
}
export const dragSelAreSlice = createSlice({
  name: "gates",
  initialState,
  reducers: {
    isDrag: (state, action) => {
      state.isDragAre = true
    },
    isShowDragView: (state, action) => {
      if (state.isShwoDrag) return
      state.isShwoDrag = true
    },
    drag: (state, action) => {
      // console.log(action.payload);
      const { top, left } = action.payload
      state.left = left
      state.top = top
    },
    setSvgData: (state, action) => {
      // console.log(action, "action")
      const { width, height } = action.payload
      state.width = width
      state.height = height
      // console.log(width, height, 55)
    },
    setGatecoorad: (state, action) => {
      const { mouseDownX, mouseDownY } = action.payload
      state.jianx = mouseDownX
      state.jiany = mouseDownY
    },
    closeDragSvg: (state, action) => {
      state.isDragAre = false
      state.isShwoDrag = false
    },
    updateExcel: (state, action) => {
      state.isUpdateExcel = action.payload
    },
  },
})
