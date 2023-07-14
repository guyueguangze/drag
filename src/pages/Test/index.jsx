import React from "react"
import { PyScriptProvider, PyScript } from "pyscript-react"
export default function Test() {
  return (
    <div>
      <PyScriptProvider>
        <PyScript>display("Hello world!")</PyScript>
      </PyScriptProvider>
    </div>
  )
}
