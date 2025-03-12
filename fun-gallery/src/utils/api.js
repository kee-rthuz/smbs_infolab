const UNSPLASH_ACCESS_KEY = "W-IpmXNlq73GgxCUXf_9v_21fW5FET2H5D2Cd_EA0mA";
const PIXABAY_API_KEY = "49287876-589271c85b104ffee52c6e553";

// Fetch trending images from Unsplash
export const fetchUnsplashImages = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=12&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching Unsplash images:", error);
    return [];
  }
};

// Fetch images from Pixabay based on category
export const fetchPixabayImages = async (page = 1, category = "All", searchQuery = "", sortBy = "date") => {
  try {
    let url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&per_page=12&page=${page}&order=${sortBy}`;

    if (category === "Trending") {
      url += "&q=trending";
    } else if (category === "New") {
      url += "&q=new";
    } else if (category === "Classic") {
      url += "&q=classic";
    } else if (category === "Random") {
      url += "&q=random";
    }

    if (searchQuery) {
      url += `&q=${searchQuery}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.hits || [];
  } catch (error) {
    console.error("Error fetching Pixabay images:", error);
    return [];
  }
};

// Fetch a single image by ID from Pixabay
export const fetchPixabayImageById = async (id) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&id=${id}`
    );
    const data = await response.json();
    return data.hits && data.hits.length > 0 ? data.hits[0] : null;
  } catch (error) {
    console.error("Error fetching Pixabay image by ID:", error);
    return null;
  }
};

