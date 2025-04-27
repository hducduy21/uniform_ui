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
    subcategories: string[]
  }
  
export interface SliderImage {
    id: string
    src: string
    category: string
}