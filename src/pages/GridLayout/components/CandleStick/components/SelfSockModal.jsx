import React, { useState } from "react"
import { Select, Button, Space, Modal, Input, Table, Form } from "antd"

export default function SelfSockModal({
  selfStock,
  columns,
  isModalOpen,
  closeModal,
}) {
  //   const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOk = () => {
    // setIsModalOpen(false)
    closeModal()
  }
  const handleCancel = () => {
    // setIsModalOpen(false)
    closeModal()
  }
  return (
    <Modal
      forceRender={true}
      title="我的股票"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Table rowKey="name" dataSource={selfStock} columns={columns}></Table>
    </Modal>
  )
}
