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
  message,
  FormInstance,
} from 'antd';
import { SearchOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import { ProductGeneralAdminType, ProductStatus } from '@/types/model';
import { useManageProduct } from '@/hooks/data/useManageProduct';
import useCategory from '@/hooks/data/useCategory';
const { Option } = Select;

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
          onClick={() => message.info(`View details for ${record.name}`)}
        >
          Detail
        </Button>
      </Space>
    ),
  },
];

type FilterType = {
  category: string | undefined;
  status: string | undefined;
  minPrice: string | undefined;
  maxPrice: string | undefined;
  search: string | undefined;
  sortBy: string | undefined;
};

const ProductManagement: React.FC = () => {
  const [form] = Form.useForm();
  const { products } = useManageProduct()
	console.log(products)

  const [filters, setFilters] = useState({
    category: undefined,
    status: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    search: undefined,
    sortBy: undefined,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleResetFilters = () => {
    form.resetFields();
    setFilters({
      category: undefined,
      status: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      search: undefined,
      sortBy: undefined,
    });
  };

  const handleBulkStatusUpdate = async (status: ProductStatus) => {
    console.log('Bulk update status:', status);
    console.log('Selected products:', selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div className='flex flex-col w-full h-full overflow-hidden'>
      {/* Filter Products */}
      <Filter form={form} filters={filters} handleResetFilters={handleResetFilters} />

      {/* Bulk Actions */}
      <BulkActions
        selectedRowKeys={selectedRowKeys}
        handleBulkStatusUpdate={handleBulkStatusUpdate}
        setSelectedRowKeys={setSelectedRowKeys}
      />

      {/* Product Table */}
      <div className='flex-1 w-full h-full overflow-hidden'>
        <Table
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
};

const Filter = ({ form, filters, handleResetFilters }: FilterProps) => {
	const {categories} = useCategory()
	
  return (
    <Form
      form={form}
      className='flex flex-row gap-2 justify-evenly'
      layout='vertical'
      initialValues={filters}
    >
      <Form.Item className='flex-1' name='search'>
        <Input placeholder='Enter product name' />
      </Form.Item>

      <Form.Item className='flex-1' name='category'>
        <Select placeholder='Select category' allowClear>
          {categories && categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item className='flex-1' name='status'>
        <Select placeholder='Select status' allowClear>
          {Object.values(ProductStatus).map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item className='flex-1' name='minPrice'>
        <InputNumber style={{ width: '100%' }} placeholder='Min' min={0} />
      </Form.Item>

      <Form.Item className='flex-1' name='maxPrice'>
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

      <Button icon={<ReloadOutlined />} onClick={handleResetFilters}>
        Reset
      </Button>

      <Button type='primary' icon={<SearchOutlined />} htmlType='submit'>
        Search
      </Button>
    </Form>
  );
};

const BulkActions = ({
  selectedRowKeys,
  handleBulkStatusUpdate,
  setSelectedRowKeys,
}: {
  selectedRowKeys: React.Key[];
  handleBulkStatusUpdate: (value: ProductStatus) => void;
  setSelectedRowKeys: (value: React.Key[]) => void;
}) => {
  return (
    <div className='mb-4 rounded bg-[#f0f7ff] px-2 py-4'>
      <Space className='flex flex-row items-center justify-between w-full'>
        <div>Selected {selectedRowKeys.length} items:</div>
        <div className='flex gap-3'>
          <Button
            type='primary'
            disabled={selectedRowKeys.length == 0}
            onClick={() => handleBulkStatusUpdate(ProductStatus.ACTIVE)}
          >
            Set Active
          </Button>
          <Button
            danger
            disabled={selectedRowKeys.length == 0}
            onClick={() => handleBulkStatusUpdate(ProductStatus.DELETED)}
          >
            Set Deleted
          </Button>
          <Button
            type='default'
            disabled={selectedRowKeys.length == 0}
            onClick={() => handleBulkStatusUpdate(ProductStatus.UPCOMING)}
          >
            Set Upcoming
          </Button>
          <Button
            style={{ backgroundColor: '#FFD700', borderColor: '#FFD700' }}
            onClick={() => handleBulkStatusUpdate(ProductStatus.FEATURED)}
            disabled={selectedRowKeys.length == 0}
          >
            Set Featured
          </Button>
          <Button disabled={selectedRowKeys.length == 0} onClick={() => setSelectedRowKeys([])}>
            Clear Selection
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default ProductManagement;
