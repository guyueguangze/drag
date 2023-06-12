import React from "react"
import styles from "./index.module.scss"
import componentList from "../../custom-component/component-list"
export default function ComponentList() {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("index", e.target.dataset.index)
  }
  return (
    <div className={styles.root}>
      <div onDragStart={handleDragStart} className="component-list">
        {componentList.map((item, index) => (
          <div key={index} className="list" draggable data-index={index}></div>
        ))}
        <div></div>
      </div>
    </div>
  )
}
