import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product, ProductFilters } from '../../types';

interface ProductGridProps {
  products: Product[];
  filters: ProductFilters;
  onProductClick: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filters,
  onProductClick,
}) => {
  const filteredProducts = products.filter((product) => {
    if (filters.aroma && !product.aromas.includes(filters.aroma)) return false;
    if (filters.size && !product.sizes.includes(filters.size)) return false;
    if (filters.decoration && !product.decorations.includes(filters.decoration)) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(b.id).getTime() - new Date(a.id).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};