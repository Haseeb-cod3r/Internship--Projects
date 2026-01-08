import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import star from "../assets/images/star.png";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, reviews, addReview, addToCart } = useApp();
  const { user } = useAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const product = products.find((p) => p.id === id);
  const productReviews = reviews.filter((r) => r.productId === id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    addReview(newReview);
    setComment("");
    setRating(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="rounded-xl overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <nav className="mb-4 text-sm text-gray-400">
            <Link to="/" className="hover:text-indigo-600 transition">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">{product.category}</span>
          </nav>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400">
              <div className="flex items-center mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={star}
                      alt="star"
                      className={`w-5 h-5 
                        opacity-100
                      `}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({productReviews.length} reviews)
                </span>
              </div>
            </div>
          </div>

          <p className="text-2xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <div className="prose prose-sm text-gray-500 mb-8">
            {product.description}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews
          </h2>
          {productReviews.length > 0 ? (
            <div className="space-y-6">
              {productReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">
                        {review.userName}
                      </p>
                      <div className="flex text-yellow-400 text-xs">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <img
                              key={i}
                              src={star}
                              alt="star"
                              className={`w-3 h-3 ${
                                i < review.rating ? "opacity-100" : "opacity-20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>

        <div>
          {user ? (
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">
                Write a Review
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-900 mb-1">
                    Rating
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full bg-white border border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {num} Stars
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-900 mb-1">
                    Comment
                  </label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-white border border-indigo-200 rounded-lg p-3 h-24 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    placeholder="Share your thoughts..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Submit Review
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200 text-center">
              <p className="text-gray-500 mb-4">
                You must be logged in to leave a review.
              </p>
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:underline"
              >
                Login Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
