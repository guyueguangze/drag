import React, { useState, useCallback } from "react"
import ChildrenCmo from "./ChildrenCmo.jsx"
import { Button, Tag, Divider } from "antd"
import styles from "./index.module.scss"
export default function Test() {
  const [count, setCount] = useState(0) //{1}
  const [random, setRandom] = useState(0) // { + 4}

  const memoizedFn = useCallback() // {+ 8}

  function childFn() {
    // {6}
  }
  return (
    <div className={styles.root}>
      <Button type="primary" onClick={() => setCount((o) => (o += 1))}>
        setCount
      </Button>
      <Button onClick={() => setRandom((o) => (o += 1))}>setRandom</Button>
      <ChildrenCmo state={random} fn={memoizedFn} />
      <div className="content">
        <svg width={200} height={200}></svg>
        <svg width={200} height={200}></svg>
        <svg className="floatsvg" width={200} height={200}></svg>
      </div>
    </div>
  )
}
