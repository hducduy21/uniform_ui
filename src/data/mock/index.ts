import images from "@/assets";
import { FilterType } from "@/types/utils";
import { CartType, CategoryDetailType, CategoryStatus, CategoryType, ColorType, ProductGeneralAdminType, ProductGeneralType, ProductStatus, ProductType, ProductVariantType, SizesType } from "@/types/model";

export const sizeOptions: SizesType[] = [
    {
        id: 1,
        sizeTitle: "XS-XXL",
        elements: ["XS", "S", "M", "L", "XL", "XXL"]
    }
]

export const rootCategories: CategoryType[] = [
    {
        id: 'men',
        name: 'MEN',
        children: [
            {
                id: 'men-clothing',
                name: 'clothing',
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

export const mockCategories: CategoryDetailType[] = [
    {
      id: 'cat-001',
      name: 'Electronics',
      description: 'All kinds of electronic products',
      status: CategoryStatus.ACTIVE,
      parentId: 'root',
      createdAt: '2025-05-01T10:00:00Z',
      updatedAt: '2025-05-02T12:00:00Z',
      createdBy: 'admin',
      lastUpdateBy: 'editor',
    },
    {
      id: 'cat-002',
      name: 'Smartphones',
      description: 'Latest smartphones from various brands',
      status: CategoryStatus.FOCUS,
      parentId: 'cat-001',
      createdAt: '2025-05-01T11:00:00Z',
      updatedAt: '2025-05-02T13:00:00Z',
      createdBy: 'editor',
      lastUpdateBy: 'editor',
    },
    {
      id: 'cat-003',
      name: 'Home Appliances',
      description: 'Appliances for daily home use',
      status: CategoryStatus.MAIN,
      parentId: 'root',
      createdAt: '2025-05-01T12:00:00Z',
      updatedAt: '2025-05-02T14:00:00Z',
      createdBy: 'admin',
      lastUpdateBy: 'admin',
    },
    {
      id: 'cat-004',
      name: 'Gaming',
      description: 'Consoles, games and accessories',
      status: CategoryStatus.UPCOMING,
      parentId: 'cat-001',
      createdAt: '2025-05-01T13:00:00Z',
      updatedAt: '2025-05-02T15:00:00Z',
      createdBy: 'admin',
      lastUpdateBy: 'editor',
    },
    {
      id: 'cat-005',
      name: 'Clearance',
      description: 'Discounted and end-of-line items',
      status: CategoryStatus.INACTIVE,
      parentId: 'root',
      createdAt: '2025-05-01T14:00:00Z',
      updatedAt: '2025-05-02T16:00:00Z',
      createdBy: 'system',
      lastUpdateBy: 'system',
    },
  ];

export const mockSizeGroups: SizesType[] = [
    {
      id: 1,
      sizeTitle: "Adult Standard",
      elements: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 2,
      sizeTitle: "Kids",
      elements: ["3Y", "4Y", "5Y", "6Y", "7Y", "8Y", "9Y", "10Y"],
    },
    {
      id: 3,
      sizeTitle: "Shoes EU",
      elements: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    },
    {
      id: 4,
      sizeTitle: "Shoes US",
      elements: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
    },
    {
      id: 5,
      sizeTitle: "One Size",
      elements: ["OS"],
    },
  ]

export const productDetailsMock: ProductType = {
    id: "prod-001",
    code: "SKU-12345",
    name: "Classic Cotton T-Shirt",
    price: 199000,
    category: {
      id: "cat-01",
      name: "Clothing",
      children: [
        {
          id: "cat-01-01",
          name: "T-Shirts"
        }
      ]
    },
    description: "A classic 100% cotton t-shirt. Soft, comfortable, and durable for daily wear.",
    status: ProductStatus.ACTIVE,
    sizes: {
      id: 1,
      sizeTitle: "Standard Sizes",
      elements: ["S", "M", "L", "XL"]
    },
    rating: 4.5,
    totalRates: 200,
    colors: [
      {
        id: 1,
        name: "Black",
        hexCode: "#000000"
      },
      {
        id: 2,
        name: "White",
        hexCode: "#FFFFFF"
      }
    ],
    views: 1500,
    imageUrl: images.product1,
    ratingCount: 150,
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-02T08:30:00Z",
    createdBy: "admin01",
    lastUpdateBy: "admin02",
    productVariants: [
      {
        id: "variant-001",
        product: {
          id: "prod-001",
          name: "Classic Cotton T-Shirt"
        },
        size: "M",
        color: "Black",
        imageUrl: images.product2,
        costPrice: 120000,
        quantityInStock: 50
      },
      {
        id: "variant-002",
        product: {
          id: "prod-001",
          name: "Classic Cotton T-Shirt"
        },
        size: "L",
        color: "White",
        imageUrl: images.product3,
        costPrice: 120000,
        quantityInStock: 35
      }
    ]
  };

export const productVariantMock : ProductVariantType[] = [
    {
      id: "variant-001",
      product: {
        id: "prod-001",
        name: "Classic Cotton T-Shirt"
      },
      size: "M",
      color: "Black",
      imageUrl: images.product2,
      costPrice: 120000,
      quantityInStock: 50
    },
    {
      id: "variant-002",
      product: {
        id: "prod-001",
        name: "Classic Cotton T-Shirt"
      },
      size: "L",
      color: "White",
      imageUrl: images.product3,
      costPrice: 120000,
      quantityInStock: 35
    }
  ]


export const products: ProductGeneralType [] = [
    {
        id: "1",
        name: "AIRism UV Protection Full-Zip Hoodie",
        price: 23.52, 
        category: rootCategories[0],
        sizes: sizeOptions[0],
        rating: 4.9,
        ratingCount: 999,
        colors: [
            { id: 1, name: "White", hexCode: "#ffffff" },
            { id: 2, name: "Black", hexCode: "#000000" },
            { id: 3, name: "Beige", hexCode: "#f5f5dc" },
            { id: 4, name: "Olive", hexCode: "#808000" },
            { id: 5, name: "Teal", hexCode: "#008080" },
            { id: 6, name: "Light Blue", hexCode: "#add8e6" }
        ],
        imageUrl: images.product1,
        description: "Made from recycled materials",
    },
    {
        id: "2",
        name: "Pocketable UV Protection Parka | Printed",
        price: 31.36, 
        category: rootCategories[1],
        sizes: sizeOptions[0],
        rating: 4.7,
        ratingCount: 18,
        colors: [
            { id: 1, name: "Pink", hexCode: "#ffc0cb" },
            { id: 2, name: "Navy", hexCode: "#000080" }
        ],
        imageUrl: images.product2,
        description: "Made from recycled materials",
    },
    {
        id: "3",
        name: "Pocketable UV Protection Jacket",
        price: 31.36, 
        category: rootCategories[2],
        sizes: sizeOptions[0],
        rating: 4.9,
        ratingCount: 89,
        colors: [
            { id: 1, name: "White", hexCode: "#ffffff" },
            { id: 2, name: "Gray", hexCode: "#808080" },
            { id: 3, name: "Black", hexCode: "#000000" },
            { id: 4, name: "Yellow", hexCode: "#ffff00" },
            { id: 5, name: "Light Blue", hexCode: "#add8e6" }
        ],
        imageUrl: images.product3,
        description: "Made from recycled materials",
    },
    {
        id: "4",
        name: "Reversible Parka",
        price: 31.36, 
        category: rootCategories[0],
        sizes: sizeOptions[0],
        rating: 4.9,
        ratingCount: 456,
        colors: [
            { id: 1, name: "Beige", hexCode: "#f5f5dc" },
            { id: 2, name: "Navy", hexCode: "#000080" },
            { id: 3, name: "Brown", hexCode: "#a52a2a" },
            { id: 4, name: "Light Blue", hexCode: "#add8e6" },
            { id: 5, name: "Teal", hexCode: "#008080" },
            { id: 6, name: "Dark Blue", hexCode: "#000033" }
        ],
        imageUrl: images.product4,
        description: "Made from recycled materials",
    },
    {
        id: "5",
        name: "AIRism Cotton UV Protection Long Sleeve T-Shirt",
        price: 15.96, 
        category: rootCategories[1],
        sizes: sizeOptions[0],
        rating: 4.8,
        ratingCount: 321,
        colors: [
            { id: 1, name: "White", hexCode: "#ffffff" },
            { id: 2, name: "Black", hexCode: "#000000" },
            { id: 3, name: "Pink", hexCode: "#ffc0cb" },
            { id: 4, name: "Light Gray", hexCode: "#d3d3d3" }
        ],
        imageUrl: images.product5,
        description: "Made from recycled materials",
    },
    {
        id: "6",
        name: "UV Protection Mesh Hoodie",
        price: 27.96, 
        category: rootCategories[1],
        sizes: sizeOptions[0],
        rating: 4.6,
        ratingCount: 210,
        colors: [
            { id: 1, name: "Navy", hexCode: "#000080" },
            { id: 2, name: "Light Green", hexCode: "#90ee90" },
            { id: 3, name: "White", hexCode: "#ffffff" },
            { id: 4, name: "Black", hexCode: "#000000" }
        ],
        imageUrl: images.product6,
        description: "Made from recycled materials",
    },
    {
        id: "7",
        name: "Pocketable Parka (BlockTech)",
        price: 48.00, 
        category: rootCategories[1],
        sizes: sizeOptions[0],
        rating: 4.7,
        ratingCount: 145,
        colors: [
            { id: 1, name: "Black", hexCode: "#000000" },
            { id: 2, name: "Olive", hexCode: "#808000" },
            { id: 3, name: "Beige", hexCode: "#f5f5dc" }
        ],
        imageUrl: images.product7,
        description: "Made from recycled materials",
    },
    {
        id: "8",
        name: "3D Cut UV Protection Jacket",
        price: 42.00, 
        category: rootCategories[1],
        sizes: sizeOptions[0],
        rating: 4.9,
        ratingCount: 512,
        colors: [
            { id: 1, name: "White", hexCode: "#ffffff" },
            { id: 2, name: "Gray", hexCode: "#808080" },
            { id: 3, name: "Dark Gray", hexCode: "#a9a9a9" },
            { id: 4, name: "Blue", hexCode: "#0000ff" }
        ],
        imageUrl: images.product2,
        description: "Made from recycled materials",
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
export const colorOptions: ColorType[] = [
    { id: 1, name: "Black", hexCode: "#000000" },
    { id: 2, name: "Olive", hexCode: "#808000" },
    { id: 3, name: "Beige", hexCode: "#f5f5dc" }
]

export const carts : CartType[] = [
    {
        id: "1",
        quantity: 2,
        productVariant: {
            id: "1",
            product: products[0],
            size: "M",
            color: "#ffffff",
            imageUrl: images.product1,
            costPrice: 23.52,
            quantityInStock: 10,
        }
    },
    {
        id: "2",
        quantity: 1,
        productVariant: {
            id: "2",
            product: products[1],
            size: "L",
            color: "#000000",
            imageUrl: images.product2,
            costPrice: 31.36,
            quantityInStock: 5,
        }
    },
    {
        id: "3",
        quantity: 3,
        productVariant: {
            id: "3",
            product: products[2],
            size: "S",
            color: "#f5f5dc",
            imageUrl: images.product3,
            costPrice: 31.36,
            quantityInStock: 8,
        }
    }
]
  
  
  export const mockProducts: ProductGeneralAdminType[] = [
    {
      id: '1',
      code: 'P001',
      name: 'Classic T-Shirt',
      price: 19.99,
      status: ProductStatus.ACTIVE,
      views: 1500,
      rating: 4.5,
      totalRates: 120,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Comfortable cotton t-shirt',
      imageUrl: 'https://example.com/images/tshirt1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '2',
      code: 'P002',
      name: 'Running Shoes',
      price: 89.99,
      status: ProductStatus.ACTIVE,
      views: 2300,
      rating: 4.8,
      totalRates: 200,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Lightweight running shoes with cushioning',
      imageUrl: 'https://example.com/images/shoes1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '3',
      code: 'P003',
      name: 'Wireless Earbuds',
      price: 59.99,
      status: ProductStatus.FEATURED,
      views: 3200,
      rating: 4.3,
      totalRates: 180,
      sizes: sizeOptions[0],
      category: rootCategories[2],
      description: 'True wireless earbuds with noise cancellation',
      imageUrl: 'https://example.com/images/earbuds1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '4',
      code: 'P004',
      name: 'Leather Jacket',
      price: 129.99,
      status: ProductStatus.ACTIVE,
      views: 1800,
      rating: 4.7,
      totalRates: 95,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Premium leather jacket',
      imageUrl: 'https://example.com/images/jacket1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '5',
      code: 'P005',
      name: 'Smart Watch',
      price: 199.99,
      status: ProductStatus.ACTIVE,
      views: 4100,
      rating: 4.6,
      totalRates: 250,
      sizes: sizeOptions[0],
      category: rootCategories[2],
      description: 'Fitness tracking smart watch',
      imageUrl: 'https://example.com/images/watch1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '6',
      code: 'P006',
      name: 'Denim Jeans',
      price: 49.99,
      status: ProductStatus.ACTIVE,
      views: 2000,
      rating: 4.4,
      totalRates: 140,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Slim fit denim jeans',
      imageUrl: 'https://example.com/images/jeans1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '7',
      code: 'P007',
      name: 'Backpack',
      price: 39.99,
      status: ProductStatus.ACTIVE,
      views: 1700,
      rating: 4.2,
      totalRates: 110,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Durable travel backpack',
      imageUrl: 'https://example.com/images/backpack1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '8',
      code: 'P008',
      name: 'Sunglasses',
      price: 29.99,
      status: ProductStatus.ACTIVE,
      views: 1300,
      rating: 4.1,
      totalRates: 80,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Polarized sunglasses',
      imageUrl: 'https://example.com/images/sunglasses1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '9',
      code: 'P009',
      name: 'Gaming Mouse',
      price: 49.99,
      status: ProductStatus.ACTIVE,
      views: 2500,
      rating: 4.5,
      totalRates: 160,
      sizes: sizeOptions[0],
      category: rootCategories[2],
      description: 'High-precision gaming mouse',
      imageUrl: 'https://example.com/images/mouse1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '10',
      code: 'P010',
      name: 'Yoga Mat',
      price: 24.99,
      status: ProductStatus.ACTIVE,
      views: 900,
      rating: 4.0,
      totalRates: 60,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Non-slip yoga mat',
      imageUrl: 'https://example.com/images/yogamat1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '11',
      code: 'P011',
      name: 'Coffee Maker',
      price: 79.99,
      status: ProductStatus.ACTIVE,
      views: 1900,
      rating: 4.6,
      totalRates: 130,
      sizes: sizeOptions[0],
      category: rootCategories[1],
      description: 'Programmable coffee maker',
      imageUrl: 'https://example.com/images/coffeemaker1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '12',
      code: 'P012',
      name: 'Winter Coat',
      price: 99.99,
      status: ProductStatus.ACTIVE,
      views: 1600,
      rating: 4.7,
      totalRates: 100,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Warm insulated winter coat',
      imageUrl: 'https://example.com/images/coat1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '13',
      code: 'P013',
      name: 'Bluetooth Speaker',
      price: 69.99,
      status: ProductStatus.ACTIVE,
      views: 2800,
      rating: 4.4,
      totalRates: 170,
      sizes: sizeOptions[0],
      category: rootCategories[2],
      description: 'Portable Bluetooth speaker',
      imageUrl: 'https://example.com/images/speaker1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '14',
      code: 'P014',
      name: 'Hiking Boots',
      price: 109.99,
      status: ProductStatus.ACTIVE,
      views: 1400,
      rating: 4.8,
      totalRates: 90,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Waterproof hiking boots',
      imageUrl: 'https://example.com/images/boots1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '15',
      code: 'P015',
      name: 'Desk Lamp',
      price: 34.99,
      status: ProductStatus.ACTIVE,
      views: 1100,
      rating: 4.3,
      totalRates: 70,
      sizes: sizeOptions[0],
      category: rootCategories[2],
      description: 'Adjustable LED desk lamp',
      imageUrl: 'https://example.com/images/lamp1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '16',
      code: 'P016',
      name: 'Graphic Tee',
      price: 24.99,
      status: ProductStatus.ACTIVE,
      views: 1300,
      rating: 4.2,
      totalRates: 85,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Printed graphic t-shirt',
      imageUrl: 'https://example.com/images/tee1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '17',
      code: 'P017',
      name: 'Kitchen Knife Set',
      price: 59.99,
      status: ProductStatus.ACTIVE,
      views: 1500,
      rating: 4.5,
      totalRates: 120,
      sizes: sizeOptions[0],
      category: rootCategories[2],
      description: 'Stainless steel knife set',
      imageUrl: 'https://example.com/images/knives1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '18',
      code: 'P018',
      name: 'Fitness Tracker',
      price: 49.99,
      status: ProductStatus.ACTIVE,
      views: 2200,
      rating: 4.4,
      totalRates: 140,
      sizes: sizeOptions[0],
      category: rootCategories[2],
      description: 'Water-resistant fitness tracker',
      imageUrl: 'https://example.com/images/tracker1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '19',
      code: 'P019',
      name: 'Dress Shirt',
      price: 39.99,
      status: ProductStatus.ACTIVE,
      views: 1200,
      rating: 4.3,
      totalRates: 75,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Formal dress shirt',
      imageUrl: 'https://example.com/images/shirt1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '20',
      code: 'P020',
      name: 'Portable Charger',
      price: 29.99,
      status: ProductStatus.ACTIVE,
      views: 2000,
      rating: 4.6,
      totalRates: 150,
      sizes: sizeOptions[0],
      category: rootCategories[2],
      description: '10000mAh portable charger',
      imageUrl: 'https://example.com/images/charger1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '21',
      code: 'P021',
      name: 'Wool Scarf',
      price: 19.99,
      status: ProductStatus.ACTIVE,
      views: 800,
      rating: 4.1,
      totalRates: 50,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Soft wool scarf',
      imageUrl: 'https://example.com/images/scarf1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '22',
      code: 'P022',
      name: 'Electric Kettle',
      price: 44.99,
      status: ProductStatus.ACTIVE,
      views: 1700,
      rating: 4.5,
      totalRates: 110,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: '1.7L electric kettle',
      imageUrl: 'https://example.com/images/kettle1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '23',
      code: 'P023',
      name: 'Swim Trunks',
      price: 29.99,
      status: ProductStatus.ACTIVE,
      views: 900,
      rating: 4.2,
      totalRates: 65,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Quick-dry swim trunks',
      imageUrl: 'https://example.com/images/swim1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '24',
      code: 'P024',
      name: 'Wireless Keyboard',
      price: 59.99,
      status: ProductStatus.ACTIVE,
      views: 2100,
      rating: 4.4,
      totalRates: 130,
      sizes: sizeOptions[0],
      category: rootCategories[2],
      description: 'Ergonomic wireless keyboard',
      imageUrl: 'https://example.com/images/keyboard1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '25',
      code: 'P025',
      name: 'Camping Tent',
      price: 129.99,
      status: ProductStatus.ACTIVE,
      views: 1400,
      rating: 4.7,
      totalRates: 90,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Weather-resistant camping tent',
      imageUrl: 'https://example.com/images/tent1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '26',
      code: 'P026',
      name: 'Baseball Cap',
      price: 19.99,
      status: ProductStatus.ACTIVE,
      views: 1000,
      rating: 4.3,
      totalRates: 70,
      sizes: sizeOptions[0],
      category: rootCategories[1],
      description: 'Adjustable baseball cap',
      imageUrl: 'https://example.com/images/cap1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '27',
      code: 'P027',
      name: 'Blender',
      price: 69.99,
      status: ProductStatus.ACTIVE,
      views: 1800,
      rating: 4.6,
      totalRates: 120,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'High-power blender',
      imageUrl: 'https://example.com/images/blender1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '28',
      code: 'P028',
      name: 'Sneakers',
      price: 79.99,
      status: ProductStatus.ACTIVE,
      views: 2200,
      rating: 4.5,
      totalRates: 140,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Casual sneakers',
      imageUrl: 'https://example.com/images/sneakers1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '29',
      code: 'P029',
      name: 'Laptop Stand',
      price: 29.99,
      status: ProductStatus.ACTIVE,
      views: 1300,
      rating: 4.4,
      totalRates: 80,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Adjustable laptop stand',
      imageUrl: 'https://example.com/images/stand1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    },
    {
      id: '30',
      code: 'P030',
      name: 'Dumbbell Set',
      price: 89.99,
      status: ProductStatus.ACTIVE,
      views: 1600,
      rating: 4.7,
      totalRates: 100,
      sizes: sizeOptions[0],
      category: rootCategories[0],
      description: 'Adjustable dumbbell set',
      imageUrl: 'https://example.com/images/dumbbell1.jpg',
      ratingCount: 100,
      createdAt: '2024-06-20T14:30:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      lastUpdateBy: 'admin@gmail.com'
    }
  ];
