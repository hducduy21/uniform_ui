import images from "@/assets";
import { FilterType } from "@/types/type";
import { CategoryType, ProductType } from "@/types/interface";

export const products: ProductType[] = [
    {
        id: "1",
        name: "AIRism UV Protection Full-Zip Hoodie",
        price: "$23.52",
        category: "WOMEN",
        sizes: {
            id: 1,
            sizeTitle: "XS-XXL",
            elements: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        rating: 4.9,
        reviewCount: 999,
        colors: [
            { id: 1, name: "White", hexCode: "#ffffff" },
            { id: 2, name: "Black", hexCode: "#000000" },
            { id: 3, name: "Beige", hexCode: "#f5f5dc" },
            { id: 4, name: "Olive", hexCode: "#808000" },
            { id: 5, name: "Teal", hexCode: "#008080" },
            { id: 6, name: "Light Blue", hexCode: "#add8e6" }
        ],
        images: [images.product1, images.product2, images.product3],
        madeInInfo: "Made from recycled materials",
    },
    {
        id: "2",
        name: "Pocketable UV Protection Parka | Printed",
        price: "$31.36",
        category: "WOMEN",
        sizes: {
            id: 2,
            sizeTitle: "XS-XXL",
            elements: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        rating: 4.7,
        reviewCount: 18,
        colors: [
            { id: 1, name: "Pink", hexCode: "#ffc0cb" },
            { id: 2, name: "Navy", hexCode: "#000080" }
        ],
        images: [images.product2],
        madeInInfo: "Made from recycled materials",
    },
    {
        id: "3",
        name: "Pocketable UV Protection Jacket",
        price: "$31.36",
        category: "WOMEN",
        sizes: {
            id: 3,
            sizeTitle: "XS-XXL",
            elements: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        rating: 4.9,
        reviewCount: 89,
        colors: [
            { id: 1, name: "White", hexCode: "#ffffff" },
            { id: 2, name: "Gray", hexCode: "#808080" },
            { id: 3, name: "Black", hexCode: "#000000" },
            { id: 4, name: "Yellow", hexCode: "#ffff00" },
            { id: 5, name: "Light Blue", hexCode: "#add8e6" }
        ],
        images: [images.product3],
        madeInInfo: "Made from recycled materials",
    },
    {
        id: "4",
        name: "Reversible Parka",
        price: "$31.36",
        category: "WOMEN",
        sizes: {
            id: 4,
            sizeTitle: "XS-XXL",
            elements: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        rating: 4.9,
        reviewCount: 456,
        colors: [
            { id: 1, name: "Beige", hexCode: "#f5f5dc" },
            { id: 2, name: "Navy", hexCode: "#000080" },
            { id: 3, name: "Brown", hexCode: "#a52a2a" },
            { id: 4, name: "Light Blue", hexCode: "#add8e6" },
            { id: 5, name: "Teal", hexCode: "#008080" },
            { id: 6, name: "Dark Blue", hexCode: "#000033" }
        ],
        images: [images.product4],
        madeInInfo: "Made from recycled materials",
    },
    {
        id: "5",
        name: "AIRism Cotton UV Protection Long Sleeve T-Shirt",
        price: "$15.96",
        category: "WOMEN",
        sizes: {
            id: 5,
            sizeTitle: "XS-XXL",
            elements: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        rating: 4.8,
        reviewCount: 321,
        colors: [
            { id: 1, name: "White", hexCode: "#ffffff" },
            { id: 2, name: "Black", hexCode: "#000000" },
            { id: 3, name: "Pink", hexCode: "#ffc0cb" },
            { id: 4, name: "Light Gray", hexCode: "#d3d3d3" }
        ],
        images: [images.product5],
        madeInInfo: "Made from recycled materials",
    },
    {
        id: "6",
        name: "UV Protection Mesh Hoodie",
        price: "$27.96",
        category: "WOMEN",
        sizes: {
            id: 6,
            sizeTitle: "XS-XXL",
            elements: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        rating: 4.6,
        reviewCount: 210,
        colors: [
            { id: 1, name: "Navy", hexCode: "#000080" },
            { id: 2, name: "Light Green", hexCode: "#90ee90" },
            { id: 3, name: "White", hexCode: "#ffffff" },
            { id: 4, name: "Black", hexCode: "#000000" }
        ],
        images: [images.product6],
        madeInInfo: "Made from recycled materials",
    },
    {
        id: "7",
        name: "Pocketable Parka (BlockTech)",
        price: "$48.00",
        category: "WOMEN",
        sizes: {
            id: 7,
            sizeTitle: "XS-XXL",
            elements: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        rating: 4.7,
        reviewCount: 145,
        colors: [
            { id: 1, name: "Black", hexCode: "#000000" },
            { id: 2, name: "Olive", hexCode: "#808000" },
            { id: 3, name: "Beige", hexCode: "#f5f5dc" }
        ],
        images: [images.product7],
        madeInInfo: "Made from recycled materials",
    },
    {
        id: "8",
        name: "3D Cut UV Protection Jacket",
        price: "$42.00",
        category: "WOMEN",
        sizes: {
            id: 8,
            sizeTitle: "XS-XXL",
            elements: ["XS", "S", "M", "L", "XL", "XXL"]
        },
        rating: 4.9,
        reviewCount: 512,
        colors: [
            { id: 1, name: "White", hexCode: "#ffffff" },
            { id: 2, name: "Gray", hexCode: "#808080" },
            { id: 3, name: "Dark Gray", hexCode: "#a9a9a9" },
            { id: 4, name: "Blue", hexCode: "#0000ff" }
        ],
        images: [images.product2],
        madeInInfo: "Made from recycled materials",
    }
];

export const rootCategories: CategoryType[] = [
    {
        id: 'men',
        name: 'MEN',
        children: [
            {
                id: 'men-clothing',
                name: 'Clothing',
            },
            {
                id: 'men-shoes',
                name: 'Shoes',
            }
        ]
    },
    {
        id: 'women',
        name: 'WOMEN',
        children: [
            {
                id: 'women-clothing',
                name: 'Clothing',
            },
            {
                id: 'women-shoes',
                name: 'Shoes',
            }
        ]
    },
    {
        id: 'kids',
        name: 'KIDS',
        children: [
            {
                id: 'kids-clothing',
                name: 'Clothing',
            },
            {
                id: 'kids-toys',
                name: 'Toys',
            }
        ]
    }
];

export  const filtersMock : FilterType = {
    categories: [
      { id: "tops", label: "Tops & T-Shirts" },
      { id: "outerwear", label: "Outerwear" },
      { id: "bottoms", label: "Bottoms" },
      { id: "dresses", label: "Dresses & Skirts" },
      { id: "accessories", label: "Accessories" },
    ],
    status: [
        { id: "feature", label: "Feature" },
    ],
    priceRanges: [
      { id: "under100", label: "Under $100", range: [0, 100] as [number, number] },
      { id: "100to200", label: "$100 - $200", range: [100, 200] as [number, number] },
      { id: "200to300", label: "$200 - $300", range: [200, 300] as [number, number] },
      { id: "300to500", label: "$300 - $500", range: [300, 500] as [number, number] },
      { id: "500plus", label: "$500+", range: [500, 10000] as [number, number] },
    ],
  }
