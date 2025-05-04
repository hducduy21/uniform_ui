import { Form, Tabs } from 'antd';
import GeneralInfoForm from '@/components/modules/product/creation/GeneralInfoForm';
import VariantsForm from '@/components/modules/product/creation/VariantForm';
import ProductDetail from '../ProductDetail';
import { useParams } from 'react-router-dom';
import { useManageProduct } from '@/hooks/useManageProduct';
import { use, useEffect, useState } from 'react';
import { ProductType } from '@/types/model';
import useGetProductDetail from '@/hooks/useGetProductDetail';
import { ProductRequest } from '@/types/dto';
import { products } from '@/data/mock';

const { TabPane } = Tabs;

const ProductDetailManagement = () => {
  const { id } = useParams<{ id: string }>();

  const { product, isLoading } = useGetProductDetail(id as string);
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
            children: <GeneralInfoForm form={form}></GeneralInfoForm>,
          },
          {
            label: 'Variants',
            key: 'variants',
            children: <VariantsForm id={product?.id || ''} />,
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
