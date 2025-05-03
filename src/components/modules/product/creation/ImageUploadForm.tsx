import { InboxOutlined } from '@ant-design/icons';
import { Card, Typography, Upload, UploadProps } from 'antd';
import { useState } from 'react';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const ImageUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);

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

      <Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      </Dragger>
    </Card>
  );
};
export default ImageUploadForm;
