import { useManageProduct } from '@/hooks/data/useManageProduct';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Card, Typography, Upload, UploadProps } from 'antd';
import { useEffect, useState } from 'react';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const ImageUploadForm = ({
  id,
  uploaded,
  setUploading,
  setUploaded,
}: {
  id: string | null;
  uploaded?: boolean;
  setUploading?: (uploading: boolean) => void;
  setUploaded?: () => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadProductImage, isUploading } = useManageProduct({});

  const handleUpload = async () => {
    if (!file || !id) return;
    await uploadProductImage(id as string, file);
    setUploaded?.();
  };

  useEffect(() => {
    setUploading?.(isUploading);
  }, [isUploading]);

  const props: UploadProps = {
    multiple: false,
    maxCount: 1,
    accept: 'image/*',
    beforeUpload: (file: File) => {
      setFile(file);
      return false;
    },
    showUploadList: true,
  };

  return (
    <Card>
      <Title level={4}>Product Images</Title>
      <Text type='secondary' style={{ display: 'block', marginBottom: 16 }}>
        Upload high-quality images of your product. This image will be used as the main product
        image.
      </Text>

      <Dragger {...props} disabled={uploaded}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      </Dragger>
      <div className='flex justify-end mt-4'>
        <Button type='primary' disabled={uploaded} loading={isUploading} onClick={handleUpload}>
          Submit
        </Button>
      </div>
    </Card>
  );
};
export default ImageUploadForm;
