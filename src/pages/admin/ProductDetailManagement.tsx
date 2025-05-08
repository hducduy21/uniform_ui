import { Form, Tabs } from 'antd';
import GeneralInfoForm from '@/components/modules/product/creation/GeneralInfoForm';
import VariantsForm from '@/components/modules/product/creation/VariantForm';
import ProductDetail from '../ProductDetail';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useGetProductDetail from '@/hooks/data/useGetProductDetail';
import { ProductRequest } from '@/types/dto';
import ImageUploadForm from '@/components/modules/product/creation/ImageUploadForm';

const ProductDetailManagement = () => {
  const { id } = useParams<{ id: string }>();

  const { product } = useGetProductDetail(id as string);
  const [form] = Form.useForm<ProductRequest>();

  useEffect(() => {
    form.setFieldsValue({
      ...product,
      sizeTypeId: product?.sizeType.id,
      hexColors: [...(new Set(product?.productVariants.map(e=>e.color)))],
    });
  }, [product]);

  return (
    <div>
      <Tabs
        defaultActiveKey='general'
        items={[
          {
            label: 'General Information',
            key: 'general',
            children: <GeneralInfoForm id={id || ''} type='update' form={form}></GeneralInfoForm>,
          },
          {
            label: 'Variants',
            key: 'variants',
            children: <VariantsForm id={product?.id || ''} />,
          },
          {
            label: 'Image',
            key: 'image',
            children: <ImageUploadForm id={id || ""} ></ImageUploadForm>,
          },
          {
            label: 'Preview',
            key: 'preview',
            children: <ProductDetail></ProductDetail>,
          },
        ]}
      ></Tabs>
    </div>
  );
};

export default ProductDetailManagement;
