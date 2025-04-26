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