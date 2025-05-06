import {
  Form,
  Input,
  Select,
  InputNumber,
  Card,
  Row,
  Col,
  Typography,
  ColorPicker,
  Button,
  GetProp,
  ColorPickerProps,
  FormInstance,
} from 'antd';
import { ProductStatus } from '@/types/model';
import { colors } from '@/context/constant';
import Color from '../Color';
import { useEffect, useMemo, useState } from 'react';
import { ProductRequest } from '@/types/dto';
import { useSize } from '@/hooks/useSize';
import useCategory from '@/hooks/useCategory';
import { useManageProduct } from '@/hooks/useManageProduct';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

const GeneralInfoForm = ({
  form,
  submited = false,
  setSubmited,
  setId,
  setSubmiting,
}: {
  form: FormInstance<ProductRequest>;
  submited?: boolean;
  setSubmited?: () => void;
  setId?: (id: string) => void;
  setSubmiting?: (submiting: boolean) => void;
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>(
    form.getFieldValue('hexColors') || []
  );
  const [colorPicking, setColorPicking] = useState<Color>('#ffffff');
  const [colorPicked, setColorPicked] = useState<string[]>([]);
  const { sizes } = useSize();
  const { categories } = useCategory();
  const { createProduct, isLoading } = useManageProduct();

  //Update product when form values change
  useEffect(() => {
    form.setFieldValue('hexColors', [...selectedColors, ...colorPicked]);
  }, [colorPicked, selectedColors]);

  //Update submiting state when loading state changes
  useEffect(() => {
    setSubmiting?.(isLoading);
  }, [isLoading]);

  const hexString = useMemo<string>(
    () => (typeof colorPicking === 'string' ? colorPicking : colorPicking.toHexString()),
    [colorPicking]
  );

  const handleFinish = async () => {
    const idCreated = await createProduct(form.getFieldsValue());
    setId?.(idCreated);
    setSubmited?.();
    console.log('Created product with id:', idCreated);
  };

  return (
    <Card>
      {/* Title */}
      <Title level={4}>General Product Information</Title>
      <Form form={form} layout='vertical' onFinish={handleFinish} disabled={submited}>
        {/* Field product code and name */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name='code'
              label='Product Code'
              rules={[{ required: true, message: 'Please enter product code' }]}
            >
              <Input placeholder='Enter product code' />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name='name'
              label='Product Name'
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder='Enter product name' />
            </Form.Item>
          </Col>
        </Row>

        {/* Field product description */}
        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please enter product description' }]}
        >
          <TextArea rows={4} placeholder='Enter product description' />
        </Form.Item>

        {/* Field product material and status */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name='material' label='Material'>
              <Input placeholder='Enter product material' />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name='status'
              label='Status'
              rules={[{ required: true, message: 'Please select product status' }]}
              initialValue={ProductStatus.UPCOMING}
            >
              <Select placeholder='Select product status'>
                {Object.values(ProductStatus).map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Field product categories, price, size group and color group */}
        <Form.Item
          name='categoryId'
          label='Categories'
          rules={[{ required: true, message: 'Please select at least one category' }]}
        >
          <Select
            placeholder='Select categories'
            className='w-full'
            optionFilterProp='label'
          >
            {categories &&
              categories.filter(c => !c.isRoot).map((category) => (
                <Option key={category.id} value={category.id} label={category.name}>
                  {category.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        {/* Field price */}
        <Form.Item
          name='price'
          label='Base Price'
          rules={[{ required: true, message: 'Please enter product price' }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            precision={2}
            className='w-full'
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder='Enter base price'
          />
        </Form.Item>

        {/* Field select sizes */}
        <Form.Item
          name='sizeTypeId'
          label='Available Sizes'
          rules={[{ required: true, message: 'Please select at least one size' }]}
        >
          <Select placeholder='Select sizes' className='w-full'>
            {sizes &&
              sizes.map((size) => (
                <Option key={size.id} value={size.id}>
                  {size.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='hexColors'
          label='Select Colors'
          rules={[{ required: true, message: 'Please select at least one color' }]}
        >
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <Select
                mode='multiple'
                placeholder='Available colors'
                className='flex-1 w-full'
                onChange={(value) => {
                  setSelectedColors(value);
                }}
              >
                {colors.map((color) => (
                  <Option key={color.hexCode} value={color.hexCode}>
                    <div className='flex justify-between'>
                      <span>{color.name}</span>
                      <Color color={color.hexCode}></Color>
                    </div>
                  </Option>
                ))}
              </Select>

              <span>Or</span>

              <div className='flex items-center gap-2'>
                <ColorPicker
                  value={colorPicking}
                  onChange={setColorPicking}
                  format='hex'
                ></ColorPicker>
                <Button
                  onClick={() => {
                    setColorPicked((prev) => [...prev, hexString]);
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
            <div className='flex'>
              <span>Selected:</span>
              <div className='flex flex-wrap gap-2 ml-2'>
                {form.getFieldValue('hexColors') && form.getFieldValue('hexColors').map((color: string) => (
                  <Color key={`selected_${color}`} color={color} />
                ))}
              </div>
            </div>
          </div>
        </Form.Item>

        <Form.Item label={null} className='flex justify-end w-full'>
          <Button type='primary' htmlType='submit' disabled={submited} loading={isLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default GeneralInfoForm;
