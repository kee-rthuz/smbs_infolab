FunGallery
FunGallery is a multi-page, interactive image gallery where users can explore, upload, and engage with fun images. This project showcases frontend skills, including UI/UX, animations, state management, API handling, and performance optimization.

Features & Functionalities
1. Homepage (Landing Page)
Displays trending images dynamically fetched from an API.
Smooth animations & transitions.
Dark mode toggle.
2. Image Explorer Page
Infinite scrolling or pagination for seamless browsing.
Filter images by categories: Trending, New, Classic, Random.
Search functionality with debounced API calls for optimized performance.
Sort images by likes, date, or comments.
3. Image Upload Page
Allows users to upload images from local storage (no cloud storage, only local preview).
Users can add creative captions to their images.
Preview images before submitting them.
4. Image Details Page
Dynamic routing (/image/:id) for individual image details.
Displays image details, likes, and comments.
Comment system (stored in Local Storage for now).
Like button with animation and local storage persistence.
5. User Profile Page
Users can view their uploaded images.
Edit profile options for Name, Bio, and Profile Picture.
View liked images (stored in Local Storage).
6. Leaderboard Page
Displays the top 10 most liked images.
Shows user rankings based on engagement.
7. 404 Page (Fun Easter Egg)
A creative and fun 404 error page for non-existent routes.
Tech Stack
React / Next.js - For pages and routing
Tailwind CSS v3 - For styling
Framer Motion / GSAP - For animations
Redux Toolkit / Context API - For state management
Local Storage - For caching data, storing uploaded images & likes
Free Image APIs - For fetching images
APIs Used
Free Image APIs
Unsplash API - Fetch high-quality images.
Pixabay API - Free stock images.
Installation & Setup
1. Create a React App
To set up the project, create a new React app using Vite:

npx create-vite@latest fungallery --template react
cd fungallery
2. Install Dependencies
Install all required dependencies:

npm install
3. Install Tailwind CSS v3
Tailwind CSS is used for styling. Install it with:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Configure tailwind.config.js:

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
Add Tailwind CSS to index.css:

@tailwind base;
@tailwind components;
@tailwind utilities;
4. Set Up Environment Variables
Create a .env file and add your API keys:

REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
REACT_APP_PIXABAY_API_KEY=your_pixabay_api_key
5. Start the Development Server
Run the development server:

npm run dev# smbs_infolab
