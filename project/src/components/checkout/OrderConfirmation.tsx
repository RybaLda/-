import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface OrderDetails {
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    selectedAroma: string;
    selectedSize: string;
    selectedDecoration: string;
  }>;
  total: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
  orderDate: string;
}

export const OrderConfirmation: React.FC = () => {
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      // Clear the order from localStorage to prevent showing old orders
      localStorage.removeItem('lastOrder');
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Заказ не найден</h1>
          <Link
            to="/shop"
            className="text-gray-900 hover:text-gray-700 underline"
          >
            Вернуться в магазин
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Спасибо за заказ!</h1>
        <p className="text-gray-600">
          Мы отправили подтверждение на почту {order.customer.email}
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Детали заказа</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.selectedAroma}, {item.selectedSize}, {item.selectedDecoration}
                  </p>
                  <p className="text-sm text-gray-600">Количество: {item.quantity}</p>
                </div>
                <p className="font-medium">₽{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Итого:</span>
            <span>₽{order.total}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">Адрес доставки</h2>
          <p>{order.customer.firstName} {order.customer.lastName}</p>
          <p>{order.customer.address}</p>
          <p>{order.customer.city}, {order.customer.postalCode}</p>
        </div>
      </div>

      <div className="text-center space-y-4">
        <Link
          to="/shop"
          className="inline-block bg-gray-900 text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
        >
          Продолжить покупки
        </Link>
      </div>
    </div>
  );
};