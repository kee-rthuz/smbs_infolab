import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <motion.h1 
        className="text-6xl font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        404 😢
      </motion.h1>
      <motion.p 
        className="text-xl mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Fun Easter Egg */}
      <motion.img
        src="https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif"
        alt="Lost?"
        className="w-64 h-64 mt-6 rounded-lg shadow-lg"
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <Link to="/">
        <motion.button
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Go Back Home 🏠
        </motion.button>
      </Link>
    </div>
  );
};

export default NotFound;
