import React, { useContext, useState, useEffect } from "react";
import { ImageContext } from "../context/ImageContext";

const Profile = () => {
  const { uploadedImages } = useContext(ImageContext);
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile")) || {
      name: "John Doe",
      email: "johndoe@example.com",
      bio: "",
      profilePicture: null,
    };
    return savedUser;
  });
  const [editing, setEditing] = useState(false);
  const [likedImages, setLikedImages] = useState([]);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("likedImages")) || [];
    setLikedImages(liked);
  }, []);

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(user));
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    localStorage.setItem("userProfile", JSON.stringify(user));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (email) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        {user.profilePicture ? (
          <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-4 text-4xl font-bold text-white">
            {getInitials(user.email)}
          </div>
        )}
        {editing ? (
          <div className="flex flex-col items-center space-y-2">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="border p-1 rounded w-3/4"
              placeholder="Name"
            />
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              className="border p-1 rounded w-3/4"
              placeholder="Write a short bio..."
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="w-3/4"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-700 w-[200px]"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xl">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.bio}</p>
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Uploaded Images</h2>
        <div className="flex flex-wrap justify-center">
          {uploadedImages.map((image, index) => (
            <div key={index} className="m-2">
              <img src={image.url} alt={`Uploaded ${index}`} className="w-32 h-32 rounded mx-auto mb-2" />
              <p className="text-center text-gray-500">{image.caption}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Liked Images</h2>
        <div className="flex flex-wrap justify-center">
          {likedImages.map((image, index) => (
            <img key={index} src={image} alt="Liked" className="w-24 h-24 rounded m-1" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
