export interface ProductType {
  id: string
  name: string
  price: string
  category: string
  sizeRange: string
  rating: number
  reviewCount: number
  colors: string[]
  images: string[]
  madeInInfo: string
}

export interface Category {
    id: string
    name: string
    subcategories: string[]
  }
  
export interface SliderImage {
    id: string
    src: string
    category: string
}