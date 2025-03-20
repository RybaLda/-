import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Корзина</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {state.items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingBag className="h-12 w-12 mb-4" />
                    <p>Корзина пуста</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedAroma}-${item.selectedSize}-${item.selectedDecoration}`}
                        className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.selectedAroma}, {item.selectedSize},{' '}
                            {item.selectedDecoration}
                          </p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₽{item.price * item.quantity}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 mt-2"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {state.items.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Итого:</span>
                    <span>₽{state.total}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="block w-full bg-gray-900 text-white text-center py-3 rounded-full hover:bg-gray-800 transition-colors"
                    onClick={onClose}
                  >
                    Оформить заказ
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};