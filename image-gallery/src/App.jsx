import React, { useState, useEffect } from "react";
import Card from "./components/card";
import Header from "./components/Header";

const ACCESS_KEY = "M8ajvgpqzqF8InmHfQ5_BH7h4fnxQ89V0KTj256tcxw";

export default () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImages = async (searchQuery = "") => {
    setLoading(true);
    try {
      let url;
      if (searchQuery) {
        url = `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&per_page=12&client_id=${ACCESS_KEY}`;
      } else {
        url = `https://api.unsplash.com/photos/random?count=12&client_id=${ACCESS_KEY}`;
      }

      const response = await fetch(url);

      const data = await response.json();

      if (searchQuery) {
        setImages(data.results || []);
      } else {
        setImages(data ? data : []);
      }
    } catch (error) {
      console.error("hallo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery("");
    fetchImages(query);
  };

  const handleDownload = (link) => {
    window.open(`${link}&force=true`, "_blank");
  };

  return (
    <div className="max-w-[1500px] p-[40px] mx-auto my-0">
      <Header handleSearch={handleSearch} query={query} setQuery={setQuery} />

      {loading ? (
        <div className="text-center text-[1.2rem] text-[#666] mt-[50px]">
          Loading images...
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {images.map((img) => (
            <Card
              key={img.id}
              id={img.id}
              img={img.urls.small}
              description={img.alt_description}
              name={img.user.name}
              download={img.links.download}
              handleDownload={handleDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
};
