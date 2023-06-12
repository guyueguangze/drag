import React from "react"
import MarkLine from "./components/MarkLine"
import Grid from "./components/Grid"
import Area from "./components/Area"
import Shape from "./components/Shape"
import ContextMenu from "./components/ContextMenu"
import styles from "./index.module.scss"
export default function Editor() {
  return (
    <div className={styles.root}>
      <div className="editor">
        {/* <!-- 网格线 --> */}
        <Grid />
        {/* <!--页面组件列表展示--> */}
        <Shape>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Shape>
        {/* <!-- 右击菜单 --> */}
        <ContextMenu />
        {/* <!-- 标线 --> */}
        <MarkLine />
        {/* <!-- 选中区域 --> */}
        <Area />
      </div>
    </div>
  )
}
