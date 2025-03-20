import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Product } from '../../types';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, options: {
    selectedAroma: string;
    selectedSize: string;
    selectedDecoration: string;
    quantity: number;
  }) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedAroma, setSelectedAroma] = useState(product?.aromas[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedDecoration, setSelectedDecoration] = useState(product?.decorations[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, {
      selectedAroma,
      selectedSize,
      selectedDecoration,
      quantity,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Аромат
                    </label>
                    <select
                      value={selectedAroma}
                      onChange={(e) => setSelectedAroma(e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    >
                      {product.aromas.map((aroma) => (
                        <option key={aroma} value={aroma}>
                          {aroma}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Размер
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    >
                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Декор
                    </label>
                    <select
                      value={selectedDecoration}
                      onChange={(e) => setSelectedDecoration(e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                    >
                      {product.decorations.map((decoration) => (
                        <option key={decoration} value={decoration}>
                          {decoration}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Количество
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="bg-gray-100 text-gray-600 px-3 py-2 rounded-md hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium text-gray-900">Итого:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₽{product.price * quantity}
                    </span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};