import React from "react";

export default function Header({handleSearch,setQuery, query,}) {
  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl font-bold mb-5 text-[#333]">Image Gallery</h1>

      <form
        onSubmit={handleSearch}
        className="flex justify-center gap-3 max-w-[600px] mx-auto"
      >
        <input
          type="text"
          placeholder="Search photos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
        flex-1
        px-5 py-3
        text-base
        border border-gray-300
        rounded-full
        outline-none
        transition-colors
        focus:border-[#333]
      "
        />

        <button
          type="submit"
          className="
        px-6 py-3
        bg-green-600 text-white
        rounded-full
        text-base
        cursor-pointer
        transition-colors
        hover:bg-gray-700
      "
        >
          Search
        </button>
      </form>
    </header>
  );
}
