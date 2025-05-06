import { useState } from "react"
import {
  Card,
  Typography,
  Table,
  Button,
  Tag,
  Input,
} from "antd"
import { ProductVariantType } from "@/types/model"
import useVariant from "@/hooks/data/useVariant"

const {  Text } = Typography

const VariantsForm = ({id}: {id: string}) => {
	const {variant, updateVariant, isUpdating} = useVariant(id)
	const [editedVariants, setEditedVariants] = useState<Map<number, number>>(new Map())

	const handleUpdateVariantPrice = async () => {
		await updateVariant(id, editedVariants)
	}


  const columns = [
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size: string) => <Tag>{size}</Tag>,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (color: string) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: color,
              border: "1px solid #d9d9d9",
            }}
          />
          <span style={{ textTransform: "capitalize" }}>{color}</span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "costPrice",
      key: "costPrice",
      render: (price: number, record: ProductVariantType) => <Input type="number" defaultValue={price} onChange={(event) => {
						const newPrice = parseFloat(event.target.value);
						setEditedVariants((prev) => {
							const newMap = new Map(prev); 
							newMap.set(record.id, newPrice); 
							return newMap;
						});
			}} />,
    },
  ]

  return (
    <Card>

      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        Manage your product variants based on size and color combinations. You can edit price, stock, and add specific
        images for each variant.
      </Text>

      <Table dataSource={variant || []} columns={columns} rowKey="id" pagination={false} bordered />
			<div className='flex justify-end mt-4'>
        <Button type='primary' loading={isUpdating} onClick={handleUpdateVariantPrice}>
          Upload
        </Button>
      </div>
    </Card>
  )
}

export default VariantsForm
