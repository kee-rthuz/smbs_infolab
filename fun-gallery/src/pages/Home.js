import { useEffect, useState } from "react";
import { fetchUnsplashImages } from "../utils/api";
import { motion } from "framer-motion";
import DarkModeToggle from "../components/DarkModeToggle";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      const data = await fetchUnsplashImages();
      setImages(data);
    };
    loadImages();
  }, []);

  const handleImageClick = (image) => {
    navigate(`/image/${image.id}`, { state: { image } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="flex justify-between p-4">
        <h1 className="text-3xl font-bold">FunGallery</h1>
        <DarkModeToggle />
      </header>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.length > 0 ? (
          images.map((image) => (
            <motion.div
              key={image.id}
              className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleImageClick(image)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={image.urls?.small}
                alt={image.alt_description || "Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 text-center text-sm">{image.user?.name || "Unknown"}</div>
            </motion.div>
          ))
        ) : (
          <p className="text-center w-full col-span-4">No images available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
