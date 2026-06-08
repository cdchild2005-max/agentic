export type ProductCategoryDto = {
    id: string;
    name: string;
    description: string;
};

export type SupplierDto = {
    id: string;
    name: string;
    contactName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    streetAddress: string;
};

export type ProductDto = {
    id: string;
    name: string;
    description: string;
    price: number;
    weight: number;
    category: ProductCategoryDto;
    supplier: SupplierDto | null;
    imageUrl: string;
};

export type CreateProductRequest = Omit<ProductDto, 'id' | 'category' | 'supplier'> & { categoryId: string; supplierId?: string };

export type UpdateProductRequest = Partial<ProductDto> & { categoryId?: string; supplierId?: string };
