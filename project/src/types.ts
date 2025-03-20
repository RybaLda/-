export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  aromas: string[];
  sizes: string[];
  decorations: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedAroma: string;
  selectedSize: string;
  selectedDecoration: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  collections: Collection[];
  achievements: Achievement[];
}

export interface Collection {
  id: string;
  name: string;
  photos: string[];
  description: string;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ProductFilters {
  aroma?: string;
  size?: string;
  decoration?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'newest';
}