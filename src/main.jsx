import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "antd/dist/reset.css"
import "normalize.css"
import "./index.scss"
// import { RecoilRoot } from "recoil"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"
import { Provider } from "react-redux"
import store from "./store"
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
