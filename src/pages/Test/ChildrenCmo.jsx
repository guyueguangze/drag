import React, { memo } from "react"

const ChildrenCmo = memo(function ChildrenCmo({ state }) {
  return (
    <div>
      <div className="aa">
        {console.log("ChildComponent Render")} {/* {1} */}
      </div>
      ChildrenCmo
    </div>
  )
})
export default ChildrenCmo
