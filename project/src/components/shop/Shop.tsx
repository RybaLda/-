import React, { useState } from 'react';
import { ProductGrid } from './ProductGrid';
import { ProductFilters } from './ProductFilters';
import { ProductDetails } from './ProductDetails';
import { useCart } from '../../contexts/CartContext';
import type { Product, ProductFilters as Filters, CartItem } from '../../types';

// Sample data - replace with actual data from your backend
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Свеча "Лавандовые поля"',
    description: 'Успокаивающий аромат лаванды в элегантной кокосовой скорлупе, украшенной сухоцветами.',
    price: 2500,
    images: ['https://images.unsplash.com/photo-1602874801007-aa87920298e0?auto=format&fit=crop&q=80&w=800'],
    aromas: ['Лаванда'],
    sizes: ['Средний'],
    decorations: ['Сухоцветы'],
  },
  {
    id: '2',
    name: 'Свеча "Цитрусовый сад"',
    description: 'Освежающий аромат цитрусовых с декором из сушёных долек апельсина.',
    price: 2800,
    images: ['https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&q=80&w=800'],
    aromas: ['Цитрус'],
    sizes: ['Большой'],
    decorations: ['Апельсин'],
  },
];

const ALL_AROMAS = ['Лаванда', 'Цитрус', 'Ваниль', 'Корица', 'Жасмин'];
const ALL_SIZES = ['Маленький', 'Средний', 'Большой'];
const ALL_DECORATIONS = ['Сухоцветы', 'Апельсин', 'Без декора'];

export const Shop: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (
    product: Product,
    options: {
      selectedAroma: string;
      selectedSize: string;
      selectedDecoration: string;
      quantity: number;
    }
  ) => {
    const cartItem: CartItem = {
      ...product,
      ...options,
    };
    addItem(cartItem);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Магазин свечей</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <ProductFilters
            filters={filters}
            onFilterChange={setFilters}
            availableAromas={ALL_AROMAS}
            availableSizes={ALL_SIZES}
            availableDecorations={ALL_DECORATIONS}
          />
        </div>
        
        <div className="lg:w-3/4">
          <ProductGrid
            products={SAMPLE_PRODUCTS}
            filters={filters}
            onProductClick={handleProductClick}
          />
        </div>
      </div>

      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};