
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const VendorDashboard = () => {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  
  const vendorProducts = products.filter(p => p.vendorId === user?.id);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: 0,
    category: 'Electronics',
    description: '',
    image: 'https://picsum.photos/seed/new/600/400'
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!user) return;

    if (currentProduct.id) {
      updateProduct(currentProduct);
    } else {
      const newProduct = {
        ...currentProduct,
        id: Math.random().toString(36).substr(2, 9),
        vendorId: user.id
      };
      addProduct(newProduct);
    }
    
    setIsEditing(false);
    setCurrentProduct({
      name: '',
      price: 0,
      category: 'Electronics',
      description: '',
      image: 'https://picsum.photos/seed/new/600/400'
    });
  };

  const startEdit = (p) => {
    setCurrentProduct(p);
    setIsEditing(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-500">Manage your product inventory and listings.</p>
        </div>
        <button
          onClick={() => { setIsEditing(true); setCurrentProduct({ name: '', price: 0, category: 'Electronics', description: '', image: `https://picsum.photos/seed/${Math.random()}/600/400` }); }}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition flex items-center"
        >
          <span className="mr-2">+</span> Add Product
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{currentProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={currentProduct.name}
                  onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={currentProduct.price}
                  onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
                  className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={currentProduct.category}
                  onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}
                  className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  required
                  value={currentProduct.description}
                  onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                  className="w-full border rounded-lg p-2 h-24 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-bold">Save Product</button>
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {vendorProducts.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={p.image} className="w-10 h-10 rounded-lg object-cover mr-3" />
                    <span className="font-medium text-gray-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase">{p.category}</span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => startEdit(p)} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {vendorProducts.length === 0 && (
          <div className="p-20 text-center text-gray-400">You haven't listed any products yet.</div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
