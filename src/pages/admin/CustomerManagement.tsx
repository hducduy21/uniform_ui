import type React from 'react';
import { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Form,
  Select,
  Input,
  FormInstance,
} from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { UserDetailType } from '@/types/model';
import { mockUsers } from '@/data/mock';
const { Option } = Select;

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    width: '100px',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    width: '100px',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    width: '100px',
    render: (e: string) => {
        return <Tag>{e}</Tag>
    }
  },
  {
    title: 'Birth Date',
    dataIndex: 'birthday',
    key: 'birthday',
    render: (dateOfBirth: string) => {
      const date = new Date(dateOfBirth);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    },
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createAt: string) => {
      const date = new Date(createAt);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    },
  },
  {
    title: 'Locked',
    dataIndex: 'locked',
    key: 'locked',
    render: (locked: boolean) => {
      return <Tag color={locked ? 'red' : 'green'}>{locked ? 'Locked' : 'Unlocked'}</Tag>;
    },
  },
  {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
    render: (enabled: boolean) => {
      return <Tag color={enabled ? 'green' : 'red'}>{enabled ? 'Enabled' : 'Disabled'}</Tag>;
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
        <Button type='primary' color='red' className='text-small' >
          Lock Account
        </Button>
    ),
  },
];

type FilterType = {
  category: string | undefined;
  status: string | undefined;
  minPrice: string | undefined;
  maxPrice: string | undefined;
  code: string | undefined;
  sortBy: string | undefined;
};

const CustomerManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<UserDetailType[]>(mockUsers);

  const [filters, setFilters] = useState({
    category: undefined,
    status: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    code: undefined,
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
      code: undefined,
      sortBy: undefined,
    });
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
        setSelectedRowKeys={setSelectedRowKeys}
      />

      {/* Product Table */}
      <div className='flex-1 w-full h-full overflow-hidden'>
        <Table
          rowKey='id'
          rowSelection={rowSelection}
          columns={columns}
          dataSource={users}
          pagination={false}
          scroll={{ y: 'calc(100vh - 200px)' }}
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
  return (
    <Form
      form={form}
      className='flex flex-row gap-2 justify-evenly'
      layout='vertical'
      initialValues={filters}
    >
      <Form.Item className='flex-1' name='email'>
        <Input placeholder='Search by email' />
      </Form.Item>

      <Form.Item className='flex-1' name='phoneNumber'>
        <Input placeholder='Search by phone number' />
      </Form.Item>


      <Form.Item className='flex-1' name='locked'>
        <Select placeholder='Account locked' allowClear>
            <Option value={true}>Locked</Option>
            <Option value={false}>Unlocked</Option>
        </Select>
      </Form.Item>

      <Form.Item className='flex-1' name='enabled'>
        <Select placeholder='Account enabled' allowClear>
            <Option value={true}>Enable</Option>
            <Option value={false}>Disable</Option>
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
  setSelectedRowKeys,
}: {
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (value: React.Key[]) => void;
}) => {
  return (
    <div className='mb-4 rounded bg-[#f0f7ff] px-2 py-4'>
      <Space className='flex flex-row items-center justify-between w-full'>
        <div>Selected {selectedRowKeys.length} items</div>
        <div className='flex gap-3'>
          <Button disabled={selectedRowKeys.length == 0} onClick={() => setSelectedRowKeys([])}>
            Clear Selection
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default CustomerManagement;
