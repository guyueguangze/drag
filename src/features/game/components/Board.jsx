import React from "react"
import Square from "./Square"
import { useSelector } from "react-redux"
export default function Board() {
  const game = useSelector((state) => state.game)
  console.log(game)
  return <div>Board</div>
}
