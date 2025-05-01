export interface ProductType {
  id: string
  name: string
  price: string
  category: string
  sizes: SizesType
  rating: number
  reviewCount: number
  colors: ColorType[]
  images: string[]
  madeInInfo: string
}

export interface ProductVariantType {
  id: string
  product: ProductType
  size: String
  color: String
  imageUrl: string
  costPrice: number
  quantityInStock: number
}

export interface CartType {
  id: string
  quantity: number
  productVariant: ProductVariantType
}

export interface ColorType{
  id: number
  name: string
  hexCode: string
}

export interface SizesType{
  id: number
  sizeTitle: string
  elements: string[]
}

export interface CategoryType {
    id: string
    name: string
    children: {
        id: string
        name: string
    }[]
}
  
export interface SliderImage {
    id: string
    src: string
    category: string
}