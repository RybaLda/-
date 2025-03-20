import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'card' | 'cash';
}

export const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the order to your backend
    const order = {
      items: state.items,
      total: state.total,
      customer: formData,
      orderDate: new Date().toISOString(),
    };

    // Simulate order processing
    try {
      // In a real application, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store order details in localStorage for the confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(order));
      
      // Clear the cart
      clearCart();
      
      // Redirect to confirmation page
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error processing order:', error);
      // Handle error appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Информация о доставке</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Имя</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Фамилия</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Телефон</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Адрес</label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Город</label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Почтовый индекс</label>
            <input
              type="text"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Способ оплаты</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleInputChange}
              className="h-4 w-4 text-gray-900 focus:ring-gray-500"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              Банковская карта
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={handleInputChange}
              className="h-4 w-4 text-gray-900 focus:ring-gray-500"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              Наличные при получении
            </label>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between text-lg font-semibold mb-6">
          <span>Итого к оплате:</span>
          <span>₽{state.total}</span>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
        >
          Оформить заказ
        </button>
      </div>
    </form>
  );
};