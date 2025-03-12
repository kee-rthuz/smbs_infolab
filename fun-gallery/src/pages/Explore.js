import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchPixabayImages } from "../utils/api";
import { debounce } from "lodash";

const Explore = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loadImages = useCallback(async (page, category, searchQuery, sortBy) => {
    const data = await fetchPixabayImages(page, category, searchQuery, sortBy);
    if (data.length > 0) {
      setImages((prevImages) => [...prevImages, ...data]);
    } else {
      setHasMore(false);
    }
  }, []);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setHasMore(true);
    loadImages(1, category, searchQuery, sortBy);
  }, [category, searchQuery, sortBy, loadImages]);

  useEffect(() => {
    if (page > 1) {
      loadImages(page, category, searchQuery, sortBy);
    }
  }, [page, category, searchQuery, sortBy, loadImages]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setPage(1);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleImageClick = (image) => {
    navigate(`/image/${image.id}`, { state: { image } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-center p-4">Explore Images</h1>

      <div className="flex justify-center space-x-4 p-4">
        <button
          onClick={() => setCategory("All")}
          className={`px-4 py-2 rounded ${category === "All" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          All
        </button>
        <button
          onClick={() => setCategory("Trending")}
          className={`px-4 py-2 rounded ${category === "Trending" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Trending
        </button>
        <button
          onClick={() => setCategory("New")}
          className={`px-4 py-2 rounded ${category === "New" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          New
        </button>
        <button
          onClick={() => setCategory("Classic")}
          className={`px-4 py-2 rounded ${category === "Classic" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Classic
        </button>
        <button
          onClick={() => setCategory("Random")}
          className={`px-4 py-2 rounded ${category === "Random" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Random
        </button>
      </div>

      <div className="flex justify-center p-4">
        <input
          type="text"
          placeholder="Search images..."
          className="p-2 border rounded w-full max-w-md"
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex justify-center space-x-4 p-4">
        <button
          onClick={() => setSortBy("date")}
          className={`px-4 py-2 rounded ${sortBy === "date" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Date
        </button>
        <button
          onClick={() => setSortBy("likes")}
          className={`px-4 py-2 rounded ${sortBy === "likes" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Likes
        </button>
        <button
          onClick={() => setSortBy("comments")}
          className={`px-4 py-2 rounded ${sortBy === "comments" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          Comments
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(image)}
              className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
            >
              <img
                src={image.webformatURL}
                alt={image.tags}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 text-center text-sm">{image.user || "Unknown"}</div>
            </div>
          ))
        ) : (
          <p className="text-center w-full col-span-4">No images available</p>
        )}
      </div>

      {!hasMore && <p className="text-center w-full col-span-4">No more images to load</p>}
    </div>
  );
};

export default Explore;
