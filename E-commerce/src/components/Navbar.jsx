import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { UserRole } from "../types";
import {
  Menu,
  X,
  ShoppingCart,
  User as UserIcon,
  LogOut,
  Home,
  ShieldCheck,
  Store,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const NavLinks = () => (
    <>
      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition font-medium"
      >
        <Home className="w-4 h-4 md:hidden" />
        Home
      </Link>

      {user?.role === UserRole.ADMIN && (
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition font-medium"
        >
          <ShieldCheck className="w-4 h-4 md:hidden" />
          Admin Panel
        </Link>
      )}

      {user?.role === UserRole.VENDOR && (
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition font-medium"
        >
          <Store className="w-4 h-4 md:hidden" />
          Vendor Panel
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 tracking-tight flex items-center gap-2"
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Store className="w-5 h-5" />
            </div>
            SwiftShop
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {user ? (
              <>
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-full transition"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="hidden md:flex items-center space-x-3 border-l pl-4 border-gray-200">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-gray-900 leading-none">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      {user.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/"
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-md shadow-indigo-200"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold text-indigo-600">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 flex-grow">
            <NavLinks />
          </div>

          {user && (
            <div className="mt-auto border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <UserIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 uppercase">{user.role}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl text-sm font-bold hover:bg-red-100 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
