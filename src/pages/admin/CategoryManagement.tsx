import { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, Card, Tag } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { CategoryDetailType, CategoryStatus } from '@/types/model';
import { useManageCategory } from '@/hooks/useManageCategory';
import { CategoryRequest } from '@/types/dto';

const { Option } = Select;
const { TextArea } = Input;

const CategoryManagement = () => {
  const { categories, createCategory, updatedCategory, isLoading } = useManageCategory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDetailType | null>(null);
  const [form] = Form.useForm<CategoryRequest>();

  const handleCreate = async () => {
    await createCategory(form.getFieldsValue());
    setIsModalVisible(false);
  };

  const handleUpdate = async () => {
    if (editingCategory && editingCategory.id>0) {
      await updatedCategory(editingCategory.id, form.getFieldsValue());
    }
    setIsModalVisible(false);
  };

  const showCreateModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (category: CategoryDetailType) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
      parent: category.parent?.id,
      status: category.status,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: CategoryDetailType) => <span>{record.name}</span>,
    },
    {
      title: 'Parent Category',
      key: 'parentId',
      width: '150px',
      render: (_: any, record: CategoryDetailType) => record.parent?.name || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag>{status}</Tag>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '100px',
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '100px',
      render: (updatedAt: string) => updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A',
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
			render: (updateBy: string) => updateBy? updateBy : 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: CategoryDetailType) => (
        <Space size='small'>
          <Button icon={<EditOutlined />} size='small' onClick={() => showEditModal(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card className='mb-5'>
        <div className='flex items-center justify-end mb-5'>
          <Button type='primary' icon={<PlusOutlined />} onClick={showCreateModal}>
            Add Category
          </Button>
        </div>

        <Table
          dataSource={categories || []}
          columns={columns}
          rowKey='id'
          loading={isLoading}
          pagination={false}
        />
      </Card>

      {/* Modal for creating/editing categories */}
      <Modal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        open={isModalVisible}
        onOk={editingCategory ? handleUpdate : handleCreate}
        onCancel={handleCancel}
        okText={editingCategory ? 'Update' : 'Create'}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='name'
            label='Category Name'
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input placeholder='Enter category name' />
          </Form.Item>

          <Form.Item name='description' label='Description'>
            <TextArea rows={3} placeholder='Enter category description' />
          </Form.Item>

          <Form.Item name='parent' label='Parent Category'>
            <Select placeholder='Select parent category' allowClear showSearch>
              {categories?.map((category: CategoryDetailType) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='status'
            label='Status'
            initialValue='ACTIVE'
            rules={[{ required: true, message: 'Please select status' }]}
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
  );
};

export default CategoryManagement;
