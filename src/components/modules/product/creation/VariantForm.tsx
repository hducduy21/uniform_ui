import { useState } from "react"
import {
  Card,
  Typography,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  InputNumber,
  Upload,
  Tooltip,
  Row,
  Col,
  Input,
} from "antd"
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import type { UploadFile } from "antd"
import { ProductVariantType } from "@/types/model"
import useVariant from "@/hooks/useVariant"

const {  Text } = Typography

const VariantsForm = ({id}: {id: string}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingVariant, setEditingVariant] = useState<ProductVariantType | null>(null)
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
	const {variant} = useVariant(id)

  const showEditModal = (variant: ProductVariantType) => {
    setEditingVariant(variant)
    form.setFieldsValue({
      price: variant.costPrice,
    })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditingVariant(null)
    form.resetFields()
    setFileList([])
  }


  const columns = [
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size: string) => <Tag>{size}</Tag>,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: color,
              border: "1px solid #d9d9d9",
            }}
          />
          <span style={{ textTransform: "capitalize" }}>{color}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "costPrice",
      key: "costPrice",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => stock || 0,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? (
          <img src={image || "/placeholder.svg"} alt="Variant" style={{ width: 40, height: 40, objectFit: "cover" }} />
        ) : (
          <Text type="secondary">No image</Text>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ProductVariantType) => (
        <Space size="small">
          <Tooltip title="Edit variant">
            <Button icon={<EditOutlined />} size="small" onClick={() => showEditModal(record)} />
          </Tooltip>
          <Tooltip title="Delete variant">
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <Card>

      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        Manage your product variants based on size and color combinations. You can edit price, stock, and add specific
        images for each variant.
      </Text>

      <Table dataSource={variant || []} columns={columns} rowKey="id" pagination={false} bordered />

      <Modal title="Edit Variant" open={isModalVisible} onCancel={handleCancel} okText="Save">
        {editingVariant && (
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Size">
                  <Input value={editingVariant.size} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Color">
                  <Input value={editingVariant.color} disabled />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter price" }]}>
              <InputNumber
                min={0}
                step={0.01}
                precision={2}
                style={{ width: "100%" }}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </Form.Item>

            <Form.Item name="stock" label="Stock" rules={[{ required: true, message: "Please enter stock quantity" }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Variant Image">
              <Upload
                fileList={fileList}
                beforeUpload={() => {
                  return false
                }}
                maxCount={1}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Card>
  )
}

export default VariantsForm
