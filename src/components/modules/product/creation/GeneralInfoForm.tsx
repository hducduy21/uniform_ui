import type React from "react"
import { Form, Input, Select, InputNumber, Card, Row, Col, Typography } from "antd"
import { rootCategories, sizeOptions, colorOptions } from "@/data/mock"
import { ProductStatus } from "@/types/model"

const { TextArea } = Input
const { Option } = Select
const { Title } = Typography


const GeneralInfoForm: React.FC = () => {
  const [form] = Form.useForm()

  return (
    <Card>
      <Title level={4}>General Product Information</Title>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="code"
              label="Product Code"
              rules={[{ required: true, message: "Please enter product code" }]}
            >
              <Input placeholder="Enter product code" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter product description" }]}
        >
          <TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="material" label="Material">
              <Input placeholder="Enter product material" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select product status" }]}
            >
              <Select defaultValue={ProductStatus.UPCOMING} placeholder="Select product status">
                {Object.values(ProductStatus).map((status) => (
                    <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="categories"
          label="Categories"
          rules={[{ required: true, message: "Please select at least one category" }]}
        >
          <Select mode="multiple" placeholder="Select categories" style={{ width: "100%" }} optionFilterProp="label">
            {rootCategories.map((category) => (
              <Option key={category.id} value={category.id} label={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="price" label="Base Price" rules={[{ required: true, message: "Please enter product price" }]}>
          <InputNumber
            min={0}
            step={0.01}
            precision={2}
            style={{ width: "100%" }}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            placeholder="Enter base price"
          />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="sizeGroup"
              label="Available Sizes"
              rules={[{ required: true, message: "Please select at least one size" }]}
            >
              <Select mode="multiple" placeholder="Select sizes" style={{ width: "100%" }}>
                {sizeOptions.map((size) => (
                  <Option key={size.id} value={size.id}>
                    {size.sizeTitle}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="colorGroup"
              label="Available Colors"
              rules={[{ required: true, message: "Please select at least one color" }]}
            >
              <Select mode="multiple" placeholder="Select colors" style={{ width: "100%" }}>
                {colorOptions.map((color) => (
                  <Option key={color.id} value={color.id}>
                    {color.id}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default GeneralInfoForm
