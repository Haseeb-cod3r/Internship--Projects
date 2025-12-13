import React from "react";

export default function Card({id,img , description, name, download,handleDownload}) {
  return (
    <div
      key={id}
      className="
    bg-white 
    rounded-xl 
    overflow-hidden 
    shadow-md 
    transition 
    duration-[.44s]
    transform 
    hover:scale-105
    hover:shadow-xl 
    flex 
    flex-col
  "
    >
      <div className="h-[250px] w-full bg-[#f0f0f0]">
        <img
          src={img}
          alt={description || "Unsplash Image"}
          className="w-full h-full object-cover block transition duration-[.55s] hover:scale-107"
        />
      </div>

      <div className="px-4 py-4 flex justify-between items-center border-t border-[#f0f0f0]">
        <span className="text-sm text-[#555] font-medium truncate max-w-[60%]">
          by {name}
        </span>

        <button
          onClick={() => handleDownload(download)}
          className="
        bg-green-600 
        text-white 
        px-4 
        py-2 
        rounded-md 
        text-sm 
        cursor-pointer 
        transition-colors 
        hover:bg-gray-700
      "
        >
          Download
        </button>
      </div>
    </div>
  );
}
