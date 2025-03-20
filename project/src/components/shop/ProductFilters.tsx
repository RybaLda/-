import React from 'react';
import type { ProductFilters } from '../../types';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  availableAromas: string[];
  availableSizes: string[];
  availableDecorations: string[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  availableAromas,
  availableSizes,
  availableDecorations,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Фильтры</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Аромат
        </label>
        <select
          value={filters.aroma || ''}
          onChange={(e) => onFilterChange({ ...filters, aroma: e.target.value || undefined })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        >
          <option value="">Все ароматы</option>
          {availableAromas.map((aroma) => (
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
          value={filters.size || ''}
          onChange={(e) => onFilterChange({ ...filters, size: e.target.value || undefined })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        >
          <option value="">Все размеры</option>
          {availableSizes.map((size) => (
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
          value={filters.decoration || ''}
          onChange={(e) => onFilterChange({ ...filters, decoration: e.target.value || undefined })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        >
          <option value="">Все варианты декора</option>
          {availableDecorations.map((decoration) => (
            <option key={decoration} value={decoration}>
              {decoration}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Цена
        </label>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="От"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
          <input
            type="number"
            placeholder="До"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Сортировка
        </label>
        <select
          value={filters.sortBy || ''}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as ProductFilters['sortBy'] || undefined })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        >
          <option value="">По умолчанию</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
          <option value="newest">Сначала новые</option>
        </select>
      </div>

      <button
        onClick={() => onFilterChange({})}
        className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  );
};