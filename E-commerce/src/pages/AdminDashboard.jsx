
import React from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_VENDORS } from '../data/mockData';

const AdminDashboard = () => {
  const { products, deleteProduct } = useApp();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Platform Administration</h1>
        <p className="text-gray-500">Global oversight of vendors and product listings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-400 mb-1">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-400 mb-1">Active Vendors</p>
          <p className="text-3xl font-bold text-gray-900">{MOCK_VENDORS.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-400 mb-1">Platform Revenue</p>
          <p className="text-3xl font-bold text-indigo-600">$12,450.00</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <span className="w-2 h-6 bg-indigo-600 rounded mr-3"></span>
            All Products
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase">Name</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-400 uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">{p.name}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => deleteProduct(p.id)} className="text-xs text-red-500 hover:font-bold transition">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <span className="w-2 h-6 bg-indigo-600 rounded mr-3"></span>
            Active Vendors
          </h2>
          <div className="space-y-4">
            {MOCK_VENDORS.map(v => (
              <div key={v.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-900">{v.name}</p>
                  <p className="text-xs text-gray-400">{v.email}</p>
                </div>
                <button className="text-xs text-gray-400 hover:text-red-500">Suspend</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
