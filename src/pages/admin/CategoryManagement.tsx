import { useState } from "react"
import { Table, Button, Space, Modal, Form, Input, Select, Card, Tag, Popconfirm } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { CategoryDetailType, CategoryStatus } from "@/types/model"
import { mockCategories } from "@/data/mock"

const { Option } = Select
const { TextArea } = Input

const CategoryManagement = () => {
  const [categories, setCategories] = useState<CategoryDetailType[]>(mockCategories)
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryDetailType | null>(null)
  const [form] = Form.useForm()
  

  const showCreateModal = () => {
    setEditingCategory(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const showEditModal = (category: CategoryDetailType) => {
    setEditingCategory(category)
    form.setFieldsValue({
      name: category.name,
      description: category,
      parentId: category.parentId,
      status: category.status,
    })
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: CategoryDetailType) => (
        <span>
          {record.name}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Parent Category",
      key: "parentId",
      render: (_: any, record: CategoryDetailType) => record.parentId,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: CategoryDetailType) => (
        <Space size="small">
          <Button icon={<EditOutlined />} size="small" onClick={() => showEditModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Card className="mb-5">
        <div className="flex items-center justify-end mb-5">
          <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
            Add Category
          </Button>
        </div>

        <Table dataSource={categories} columns={columns} rowKey="id" loading={loading} pagination={{ pageSize: 10 }} />
      </Card>

			{/* Modal for creating/editing categories */}
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onCancel={handleCancel}
        okText={editingCategory ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Enter category description" />
          </Form.Item>

          <Form.Item name="parentId" label="Parent Category">
            <Select placeholder="Select parent category" allowClear showSearch optionFilterProp="children">
                {categories.map((category) => (
                    <Option key={category.id} value={category.id}>
                    {category.name}
                    </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            initialValue="active"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              {Object.values(CategoryStatus).map((status) => (
                <Option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CategoryManagement
