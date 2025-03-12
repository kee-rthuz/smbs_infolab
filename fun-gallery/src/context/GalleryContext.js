import { createContext, useContext, useEffect, useState } from "react";

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  // Load images from Local Storage
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setUploadedImages(storedImages);
  }, []);

  // Save images to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
  }, [uploadedImages]);

  const addImage = (image) => {
    setUploadedImages((prev) => [image, ...prev]);
  };

  return (
    <GalleryContext.Provider value={{ uploadedImages, addImage }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => useContext(GalleryContext);
