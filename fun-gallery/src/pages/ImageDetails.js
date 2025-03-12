import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Heart, MessageCircle, Send } from "lucide-react"; // Icons
import { motion } from "framer-motion";

const ImageDetails = () => {
  const location = useLocation();
  const { image } = location.state;

  const [likeCount, setLikeCount] = useState(() => {
    return Number(localStorage.getItem(`likeCount-${image?.id}`)) || 0;
  });
  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(`liked-${image?.id}`) === "true";
  });
  const [commentCount, setCommentCount] = useState(() => {
    return Number(localStorage.getItem(`commentCount-${image?.id}`)) || 0;
  });
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (image?.id) {
      localStorage.setItem(`commentCount-${image.id}`, commentCount);
    }
  }, [commentCount, image]);

  useEffect(() => {
    if (image?.id) {
      localStorage.setItem(`likeCount-${image.id}`, likeCount);
      localStorage.setItem(`liked-${image.id}`, liked);

      // Update liked images in local storage
      const likedImages = JSON.parse(localStorage.getItem("likedImages")) || [];
      if (liked) {
        if (!likedImages.includes(image.webformatURL || image.urls?.full)) {
          likedImages.push(image.webformatURL || image.urls?.full);
        }
      } else {
        const index = likedImages.indexOf(image.webformatURL || image.urls?.full);
        if (index > -1) {
          likedImages.splice(index, 1);
        }
      }
      localStorage.setItem("likedImages", JSON.stringify(likedImages));
    }
  }, [likeCount, liked, image]);

  if (!image) {
    return <div>Image not found</div>;
  }

  const handleLikeClick = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleCommentClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setCommentCount((prev) => prev + 1);
      setComment("");
      setShowCommentInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <img
          src={image.webformatURL || image.urls?.full}
          alt={image.tags || image.alt_description || "Image"}
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">
          {typeof image.user === "object" ? image.user?.name || "Unknown" : image.user}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{image.description || "No description available"}</p>

        <div className="flex items-center mt-4 space-x-6">
          <motion.button
            className={`flex items-center space-x-2 ${
              liked ? "text-red-500" : "text-gray-700 dark:text-gray-300"
            } hover:text-red-500`}
            onClick={handleLikeClick}
            whileTap={{ scale: 0.8 }}
          >
            <motion.div animate={{ scale: liked ? [1, 1.4, 1] : 1 }}>
              <Heart className={`w-6 h-6 ${liked ? "fill-red-500" : "fill-none"}`} />
            </motion.div>
            <span>Like ({likeCount})</span>
          </motion.button>

          <button
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-500"
            onClick={handleCommentClick}
          >
            <MessageCircle className="w-6 h-6" />
            <span>Comment ({commentCount})</span>
          </button>
        </div>

        {showCommentInput && (
          <div className="mt-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <Send className="w-5 h-5" />
              <span>Post</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageDetails;
