import React, { useState } from "react"
import { Input, Button, Form } from "antd"
export default function Test() {
  const [price, setPrice] = useState(0)
  const [amount, setAmount] = useState(0)
  const HandleDowmPrice = () => {
    setPrice(price + 1)
  }
  const HandleUpPrice = () => {
    setPrice(price - 1)
  }
  return (
    <div>
      <Form
        initialValues={{
          price: 0,
        }}
      >
        <Form.Item name="price">
          <Input
            value={price}
            addonBefore={<a onClick={HandleDowmPrice}>-</a>}
            addonAfter={<a onClick={HandleUpPrice}>+</a>}
            placeholder="价格"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "10px" }} name="price">
          <Input value={amount} placeholder="份数" />
        </Form.Item>
        <Form.Item style={{ marginBottom: "10px" }}>
          <Button htmlType="submit" type="primary">
            加入自选
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
