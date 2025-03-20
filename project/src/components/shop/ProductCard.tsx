import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
      onClick={() => onClick(product)}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">₽{product.price}</span>
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
          >
            Подробнее
          </button>
        </div>
      </div>
    </motion.div>
  );
};