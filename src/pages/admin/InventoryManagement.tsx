import { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Form,
  FormInstance,
} from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { ProductVariantType } from '@/types/model';
import { productVariantMock } from '@/data/mock';
import Color from '@/components/modules/product/Color';

type FilterType = {
  productCode: string | undefined;
  productName: string | undefined;
};


const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: (_: any, record: ProductVariantType) => <a>{record.product.name}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'costPrice',
    key: 'pricostPricece',
    render: (costPrice: number) => `$${costPrice.toFixed(2)}`,
  },
  {
    title: 'Size',
    dataIndex: 'size',
		width: "100px",
    key: 'size',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
		width: "100px",
		render: (color: string) => <Color size='md' color={color} />,
	},
	{
		title: 'Quantity',
		dataIndex: 'quantityInStock',
		key: 'quantityInStock',
		render: (quantityInStock: number) => (
			<Input type='number' defaultValue={quantityInStock}></Input>
		),
  },
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
		render: (_: any) => (
			<Button type='primary'>Update</Button>
		),
  },
];

export const InventoryManagement = () => {
  const [form] = Form.useForm();
  const [products] = useState<ProductVariantType[]>(productVariantMock);

  const [filters, setFilters] = useState({
    productCode: undefined,
    productName: undefined,
  });

  const handleResetFilters = () => {
    form.resetFields();
    setFilters({
      productCode: undefined,
      productName: undefined,
    });
  };
  return (
    <div className='flex flex-col w-full h-full overflow-hidden'>
      {/* Filter Products */}
      <Filter form={form} filters={filters} handleResetFilters={handleResetFilters} />

      {/* Product Table */}
      <div className='flex-1 w-full h-full overflow-hidden'>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={products}
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
  return (
    <Form
      form={form}
      className='flex flex-row gap-2 justify-evenly'
      layout='vertical'
      initialValues={filters}
    >
      <Form.Item className='flex-1' name='productCode'>
        <Input placeholder='Enter product code' />
      </Form.Item>

      <Form.Item className='flex-1' name='productName'>
        <Input placeholder='Enter product name' />
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
