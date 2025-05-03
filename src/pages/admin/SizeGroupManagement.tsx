import { useState } from "react"
import { Table, Button, Space, Modal, Form, Input, Typography, Card, Tag, Popconfirm} from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"
import type { SizesType } from "@/types/model"
import { mockSizeGroups } from "@/data/mock"

const { Title } = Typography

const SizeGroupManagement = () => {
  const [sizeGroups, setSizeGroups] = useState<SizesType[]>(mockSizeGroups)
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingSizeGroup, setEditingSizeGroup] = useState<SizesType | null>(null)
  const [form] = Form.useForm()

  const showCreateModal = () => {
    setEditingSizeGroup(null)
    form.resetFields()
    form.setFieldsValue({
      elements: [""],
    })
    setIsModalVisible(true)
  }

  const showEditModal = (sizeGroup: SizesType) => {
    setEditingSizeGroup(sizeGroup)
    form.setFieldsValue({
      name: sizeGroup.sizeTitle,
      elements: sizeGroup.elements,
    })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "sizeTitle",
      key: "sizeTitle",
      width: "20%",
    },
    {
      title: "Elements",
      dataIndex: "elements",
      key: "elements",
      render: (elements: string[]) => (
        <div className="flex flex-wrap gap-2">
          {elements.map((element, index) => (
            <Tag key={index} color="blue">
              {element}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_: any, record: SizesType) => (
        <Space size="small">
          <Button icon={<EditOutlined />} size="small" onClick={() => showEditModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this size group?"
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={2}>Size Group Management</Title>

      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4"
        >
          <span>Manage size groups for product variants</span>
          <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
            Add Size Group
          </Button>
        </div>

        <Table dataSource={sizeGroups} columns={columns} rowKey="id" loading={loading} pagination={false} />
      </Card>

      <Modal
        title={editingSizeGroup ? "Edit Size Group" : "Add Size Group"}
        open={isModalVisible}
        onCancel={handleCancel}
        okText={editingSizeGroup ? "Update" : "Create"}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Size Group Name"
            rules={[{ required: true, message: "Please enter size group name" }]}
          >
            <Input placeholder="Enter size group name (e.g., Adult Standard, Kids)" />
          </Form.Item>

          <Typography.Text strong>Size Elements</Typography.Text>
          <Typography.Paragraph type="secondary" className="mb-4">
            Add all sizes that belong to this group (e.g., S, M, L, XL)
          </Typography.Paragraph>

          <Form.List name="elements">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item key={field.key} className="mb-2">
                    <Space>
                      <Form.Item
                        {...field}
                        noStyle
                        rules={[
                          {
                            required: true,
                            message: "Please enter size or delete this field",
                          },
                        ]}
                      >
                        <Input placeholder="Enter size (e.g., S, M, L)" className="w-[200px]" />
                      </Form.Item>

                      {fields.length > 1 && (
                        <Button type="text" icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} />
                      )}

                      {index === fields.length - 1 && (
                        <Button type="dashed" icon={<PlusCircleOutlined />} onClick={() => add()}></Button>
                      )}
                    </Space>
                  </Form.Item>
                ))}

                {fields.length === 0 && (
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Size
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  )
}

export default SizeGroupManagement
