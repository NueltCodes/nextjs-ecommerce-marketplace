export interface Billboard {
  id: string;
  label: string;
  imageUrl: [];
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: number;
  units: number;
  quantity: number;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[];
  reviews: Review[];
}
export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  productId: string;
  product: Product;
  createdAt: Date;
}

export interface Image {
  id: string;
  url: string;
}
export interface BillboardImage {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
