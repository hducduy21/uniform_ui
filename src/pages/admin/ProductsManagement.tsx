import type React from 'react';
import { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Form,
  Select,
  InputNumber,
  Input,
  FormInstance,
  Modal,
} from 'antd';
import { SearchOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import { ProductGeneralAdminType, ProductStatus } from '@/types/model';
import { useManageProduct } from '@/hooks/data/useManageProduct';
import useCategory from '@/hooks/data/useCategory';
import { FilterType } from '@/types/utils';
import Pagination from '@/components/Pagination';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const ProductManagement: React.FC = () => {
  const [form] = Form.useForm();

  const [filters, setFilters] = useState<FilterType>({
    category: undefined,
    status: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    search: undefined,
    sortBy: undefined,
    direction: undefined,
  });

  const { products, isLoading, isUpdating, updateFilters, updateBulkProduct } = useManageProduct({ filters });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate()

  const handleResetFilters = () => {
    const defaultFilters: FilterType = {
      category: undefined,
      status: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      search: undefined,
      sortBy: undefined,
      direction: undefined,
    }
    form.setFieldsValue(defaultFilters);
    setFilters(defaultFilters);
    updateFilters({
      filters: defaultFilters,
      pagination: { page: 1, size: 10 },
    });
  };

  const handleBulkStatusUpdate = async (status: ProductStatus) => {
    await updateBulkProduct({status: status, productIds: selectedRowKeys as string[]});
  };
  
  const applyFilters = () => {
    setFilters(form.getFieldsValue());
    updateFilters({ filters: form.getFieldsValue(), pagination: { page: 1, size: 10 } });
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const handlePageChange = (page: number) => {
    updateFilters({ filters, pagination: { page, size: 10 } });
    selectedRowKeys[0]
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ProductStatus) => {
        let color = 'default';
        switch (status) {
          case 'ACTIVE':
            color = 'green';
            break;
          case 'DELETED':
            color = 'red';
            break;
          case 'UPCOMING':
            color = 'blue';
            break;
          case 'FEATURED':
            color = 'gold';
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => rating.toFixed(1),
    },
    {
      title: 'Total Rates',
      dataIndex: 'totalRates',
      key: 'totalRates',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ProductGeneralAdminType) => (
        <Space size='middle'>
          <Button
            type='primary'
            icon={<EyeOutlined />}
            size='small'
            onClick={() => navigate(`/admin/products/${record.id}`)}
          >
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className='flex flex-col w-full h-full overflow-hidden'>
      {/* Filter Products */}
      <Filter
        form={form}
        filters={filters}
        columns={columns}
        applyFilters={applyFilters}
        handleResetFilters={handleResetFilters}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedRowKeys={selectedRowKeys}
        handleBulkStatusUpdate={handleBulkStatusUpdate}
        setSelectedRowKeys={setSelectedRowKeys}
      >
        <Pagination
          currentPage={(products?.number && products?.number + 1) || 1}
          totalPages={products?.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </BulkActions>

      {/* Product Table */}
      <div className='flex-1 w-full h-full overflow-hidden'>
        <Table
          loading={isLoading || isUpdating}
          rowKey='id'
          rowSelection={rowSelection}
          columns={columns}
          dataSource={products?.content || []}
          pagination={false}
          scroll={{ y: 'calc(100vh - 300px)' }}
        />
      </div>
    </div>
  );
};

type FilterProps = {
  form: FormInstance;
  filters: FilterType;
  handleResetFilters: () => void;
  applyFilters: () => void;
  columns: any[];
};

const Filter = ({ form, filters, handleResetFilters, applyFilters, columns }: FilterProps) => {
  const { categories } = useCategory();

  return (
    <Form
      form={form}
      className='flex flex-row gap-2 justify-evenly'
      layout='vertical'
      initialValues={filters}
    >
      <Form.Item className='flex-2' name='search'>
        <Input placeholder='Enter product name' />
      </Form.Item>

      <Form.Item className='flex-2' name='category'>
        <Select placeholder='Select category' allowClear>
          {categories &&
            categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item className='flex-2' name='status'>
        <Select placeholder='Select status' allowClear>
          {Object.values(ProductStatus).map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item className='flex-2' name='minPrice'>
        <InputNumber style={{ width: '100%' }} placeholder='Min' min={0} />
      </Form.Item>

      <Form.Item className='flex-2' name='maxPrice'>
        <InputNumber style={{ width: '100%' }} placeholder='Max' min={0} />
      </Form.Item>

      <Form.Item className='flex-1' name='sortBy'>
        <Select placeholder='Sort by' allowClear>
          {columns
            .filter((c) => c.key != 'action')
            .map((column) => (
              <Option key={column.key} value={column.key}>
                {column.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item className='flex-1' name='direction'>
        <Select placeholder='Direction' allowClear>
              <Option value={"ASC"}>Ascending</Option>
              <Option value={"DESC"}>Descending</Option>
        </Select>
      </Form.Item>

      <Button icon={<ReloadOutlined />} onClick={handleResetFilters}>
        Reset
      </Button>

      <Button type='primary' onClick={applyFilters} icon={<SearchOutlined />} htmlType='submit'>
        Search
      </Button>
    </Form>
  );
};

const BulkActions = ({
  selectedRowKeys,
  handleBulkStatusUpdate,
  setSelectedRowKeys,
  children,
}: {
  selectedRowKeys: React.Key[];
  handleBulkStatusUpdate: (value: ProductStatus) => void;
  setSelectedRowKeys: (value: React.Key[]) => void;
  children?: React.ReactNode;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState<ProductStatus | null>(null);

  const handleSetStatus = (status: ProductStatus) => {
    setStatus(status);
    setIsModalVisible(true);
  };
  const handleUpdate = async () => {
    if (status) {
      await handleBulkStatusUpdate(status);
      setSelectedRowKeys([]);
      setStatus(null);
      setIsModalVisible(false);
    }
  }
  
  return (
    <div className='px-2 py-0 mb-4 rounded'>
      <Space className='flex flex-row items-center justify-between w-full h-10'>
        <div className='flex gap-3'>
          <div>Selected {selectedRowKeys.length} items:</div>
          <Button
            type='primary'
            disabled={selectedRowKeys.length == 0}
            onClick={() => handleSetStatus(ProductStatus.ACTIVE)}
          >
            Set Active
          </Button>
          <Button
            danger
            disabled={selectedRowKeys.length == 0}
            onClick={() => handleSetStatus(ProductStatus.DELETED)}
          >
            Set Deleted
          </Button>
          <Button
            type='default'
            disabled={selectedRowKeys.length == 0}
            onClick={() => handleSetStatus(ProductStatus.UPCOMING)}
          >
            Set Upcoming
          </Button>
          <Button
            style={{ backgroundColor: '#FFD700', borderColor: '#FFD700' }}
            onClick={() => handleSetStatus(ProductStatus.FEATURED)}
            disabled={selectedRowKeys.length == 0}
          >
            Set Featured
          </Button>
          <Button disabled={selectedRowKeys.length == 0} onClick={() => setSelectedRowKeys([])}>
            Clear Selection
          </Button>
        </div>
        {children}
      </Space>

      <Modal
        title='Confirmation'
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure to set status to {status}?</p>
      </Modal>
    </div>
  );
};

export default ProductManagement;
