export interface ProductType {
  id: string
  code: string
  name: string
  price: number
  category: CategoryType
  description: string
  status: ProductStatus
  sizes: SizesType
  rating: number
  totalRates: number
  colors: ColorType[]
  views: number
  imageUrl: string
  ratingCount: number
  createdAt: string
  updatedAt: string
  createdBy: string
  lastUpdateBy: string
  productVariants: ProductVariantType[]
}
export type ProductGeneralType = Omit<
ProductType,
| "code"
| "status"
| "views"
| "totalRates"
| "createdAt"
| "updatedAt"
| "createdBy"
| "lastUpdateBy"
| "productVariants"
>;
export type ProductGeneralAdminType = Omit<ProductType, 'productVariants' | 'createdBy' | 'updatedBy' | 'colors'>

export enum ProductStatus {
  ACTIVE= "ACTIVE",
  DELETED= "DELETED",
  UPCOMING= "UPCOMING",
  FEATURED= "FEATURED",
}

export enum CategoryStatus{
  MAIN= "MAIN",
  ACTIVE= "ACTIVE",
  INACTIVE= "INACTIVE",
  UPCOMING= "UPCOMING",
  FOCUS= "FOCUS",
}

export interface ProductVariantType {
  id: string
  product: Partial<ProductType>
  size: string
  color: string
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

export interface CategoryDetailType {
  id: string
  name: string
  description: string
  status: CategoryStatus
  parentId: string
  createdAt: string
  updatedAt: string
  createdBy: string
  lastUpdateBy: string
}
export interface CategoryType {
    id: string
    name: string
    children?: {
        id: string
        name: string
    }[]
}

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: EGender;
  birthday: string;
}

export interface UserDetailType {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: EGender;
  birthday: string; 
  createdAt: string; 
  lastLogin?: string | null;
  locked: boolean;
  enabled: boolean;
}
export enum EGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}
  
export interface SliderImage {
    id: string
    src: string
    category: string
}