import React from "react"
import { Layout, Space } from "antd"
import styles from "./index.module.scss"
import Editor from "./components/Editor"
import Left from "./components/Left"
import Top from "./components/Top"
export default function Drag() {
  const { Header, Footer, Sider, Content } = Layout
  const headerStyle = {
    textAlign: "center",
    color: "black",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#fff",
  }
  const contentStyle = {
    textAlign: "center",
    minHeight: 800,
    lineHeight: "120px",
    color: "black",
    backgroundColor: "#fff",
  }
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "black",
    backgroundColor: "#fff",
  }
  const footerStyle = {
    textAlign: "center",
    color: "black",
    backgroundColor: "#fff",
  }
  return (
    <div className={styles.root}>
      <Layout>
        <Header style={headerStyle}>
          <Top />
        </Header>
        <Layout hasSider>
          <Sider style={siderStyle}>
            <Left />
          </Sider>
          <Content style={contentStyle}>
            <Editor />
          </Content>
        </Layout>
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
    </div>
  )
}
