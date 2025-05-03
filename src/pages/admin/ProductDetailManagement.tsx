import {
  Tabs,
} from "antd"
import GeneralInfoForm from "@/components/modules/product/creation/GeneralInfoForm"
import VariantsForm from "@/components/modules/product/creation/VariantForm"
import ProductDetail from "../ProductDetail"

const { TabPane } = Tabs

const ProductDetailManagement = () => {

  return (
    <div>
      <Tabs 
				defaultActiveKey="general"
				items={[
					{
						label: "General Information",
						key: "general",
						children: <GeneralInfoForm></GeneralInfoForm>,
					},
					{
						label: "Variants",
						key: "variants",
						children: <VariantsForm />,
					},
					{
						label: "Preview",
						key: "preview",
						children: <ProductDetail></ProductDetail>,
					},
				]}
			>
      </Tabs>
    </div>
  )
}

export default ProductDetailManagement
