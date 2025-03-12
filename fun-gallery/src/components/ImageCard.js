import { motion } from "framer-motion";

const ImageCard = ({ img }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-lg shadow-lg overflow-hidden"
    >
      <img src={img.urls.small} alt={img.alt_description} className="w-full" />
    </motion.div>
  );
};

export default ImageCard;
