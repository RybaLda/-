import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="https://ibb.co/ccJwhzzP" 
            alt="Психея" 
            className="h-8 md:h-10"
          />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-gray-700 hover:text-gray-900">О бренде</Link>
          <Link to="/shop" className="text-gray-700 hover:text-gray-900">Магазин</Link>
          <Link to="/collection" className="text-gray-700 hover:text-gray-900">Моя коллекция</Link>
          <Link to="/community" className="text-gray-700 hover:text-gray-900">Сообщество</Link>
          <Link to="/blog" className="text-gray-700 hover:text-gray-900">Блог</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onCartClick} 
            className="text-gray-700 hover:text-gray-900 relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <Link to="/profile" className="text-gray-700 hover:text-gray-900">
            <User className="h-6 w-6" />
          </Link>
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>
  );
};