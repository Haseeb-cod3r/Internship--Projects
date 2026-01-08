
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useApp();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
      <Link to={`/product/${product.id}`} className="block relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
        />
      </Link>
      <div className="p-4">
        <p className="text-xs text-indigo-600 font-semibold mb-1 uppercase tracking-wider">{product.category}</p>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 truncate hover:text-indigo-600 transition">
            {product.name}
          </h3>
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-gray-900 text-white p-2 rounded-lg hover:bg-indigo-600 transition text-[10px] cursor-pointer"
          >
           Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
