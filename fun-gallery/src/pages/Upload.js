import React, { useState, useContext } from "react";
import { ImageContext } from "../context/ImageContext";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const { setUploadedImages } = useContext(ImageContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    alert(`Uploading ${selectedFile.name} with caption: "${caption}"`);
    setUploadedImages((prevImages) => [...prevImages, { url: preview, caption }]); // Add the new image to the list

    // Reset the form fields
    setSelectedFile(null);
    setPreview(null);
    setCaption("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Upload Image</h1>
      <div className="flex flex-col items-center border p-4 rounded-lg shadow-lg">
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
        {preview && (
          <div className="mb-2">
            <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-lg" />
          </div>
        )}
        <input
          type="text"
          placeholder="Enter a creative caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
