import { useState } from "react"
import { Steps, Button, Card, Typography, Space } from "antd"
import { CheckOutlined } from "@ant-design/icons"
import GeneralInfoForm from "@/components/modules/product/creation/GeneralInfoForm"
import ImageUploadForm from "@/components/modules/product/creation/ImageUploadForm"
import VariantsForm from "@/components/modules/product/creation/VariantForm"

const { Title } = Typography

const steps = [
    {
      title: "General Information",
      content: (
        <GeneralInfoForm/>
      ),
    },
    {
      title: "Upload Product Image",
      content: (
        <ImageUploadForm />
      ),
    },
    {
      title: "Variants",
      content: (
        <VariantsForm />
      ),
    },
  ]

const ProductCreation = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
      setCurrentStep(currentStep + 1)
  }

  const handleSubmit = async () => {
  }

  return (
    <div>
      <Title level={2}>Create New Product</Title>

      <Card className="mb-4">
        <Steps
          current={currentStep}
          items={steps.map((item) => ({ title: item.title }))}
        />

        <div className="mt-5 mb-6 steps-content">
          {steps[currentStep].content}
        </div>

        <div className="flex justify-end steps-action">
          <div>
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext} disabled={isSubmitting}>
                Upload
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Space>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                >
                  Upload and finish
                </Button>
              </Space>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProductCreation