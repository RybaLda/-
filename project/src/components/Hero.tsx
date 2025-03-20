import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white pt-16">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src="https://ibb.co/Mkbtzbd6"
          alt="ПСИХЕЯ"
          className="w-64 md:w-96 mb-8"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8 leading-relaxed"
        >
          ✨ Добро пожаловать в мир свечей «Психея»!
          Погрузитесь в атмосферу уюта, тепла и изысканного аромата натуральных кокосовых свечей, 
          созданных вручную. Каждая свеча — это история, каждый огонёк — магия, которая преображает ваш дом.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/shop"
            className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 
                     transition-colors duration-300 inline-block text-lg"
          >
            Перейти в магазин
          </Link>
        </motion.div>
      </div>
    </section>
  );
};