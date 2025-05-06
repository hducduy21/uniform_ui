import { useState } from 'react';
import { Steps, Button, Card, Typography, Space, Form } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import GeneralInfoForm from '@/components/modules/product/creation/GeneralInfoForm';
import ImageUploadForm from '@/components/modules/product/creation/ImageUploadForm';
import VariantsForm from '@/components/modules/product/creation/VariantForm';
import { ProductRequest } from '@/types/dto';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ProductCreation = () => {
  const [id, setId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubmit, setCurrentSubmit] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);

  const [form] = Form.useForm<ProductRequest>();

  const steps = [
    {
      title: 'General Information',
      content: (
        <GeneralInfoForm
          form={form}
          submited={currentSubmit > currentStep}
          setSubmiting={setSubmitting}
          setId={setId}
          setSubmited={() => {
            setCurrentSubmit(1);
          }}
        />
      ),
    },
    {
      title: 'Upload Product Image',
      content: (
        <ImageUploadForm
          id={id}
          uploaded={currentSubmit > currentStep}
          setUploading={setSubmitting}
          setUploaded={() => {
            setCurrentSubmit(2);
          }}
        />
      ),
    },
    {
      title: 'Variants',
      content: <VariantsForm id={id || ''} />,
    },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    window.location.reload();
  };

  return (
    <div>
      <Title level={2}>Create New Product</Title>

      <Card className='mb-4'>
        <Steps current={currentSubmit} items={steps.map((item) => ({ title: item.title }))} />

        <div className='mt-5 mb-6 steps-content'>{steps[currentStep].content}</div>

        <div className='flex justify-between steps-action'>
          <div>
            {currentStep > 0 && (
              <Button icon={<ArrowLeftOutlined />} onClick={handlePrev} disabled={isSubmitting}>
                Previous
              </Button>
            )}
          </div>
          <div>
            {currentStep < steps.length - 1 && (
              <Button
                variant='solid'
                color='default'
                onClick={handleNext}
                disabled={isSubmitting || currentSubmit == currentStep}
              >
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Space>
                <Button
                  variant='solid'
                  color='default'
                  icon={<SaveOutlined />}
                  onClick={handleSubmit}
                  loading={isSubmitting}
                >
                  Save And Finish
                </Button>
              </Space>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCreation;
