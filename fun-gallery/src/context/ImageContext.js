import React, { createContext, useState, useEffect } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState(() => {
    // Load uploaded images from local storage
    const savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
    return savedImages;
  });

  useEffect(() => {
    // Save uploaded images to local storage whenever they change
    localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
  }, [uploadedImages]);

  return (
    <ImageContext.Provider value={{ uploadedImages, setUploadedImages }}>
      {children}
    </ImageContext.Provider>
  );
};
