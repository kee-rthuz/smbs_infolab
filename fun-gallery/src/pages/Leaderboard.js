import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch uploaded images from Local Storage
    const storedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];

    // Group images by user
    const userStats = {};
    storedImages.forEach((img) => {
      if (!userStats[img.username]) {
        userStats[img.username] = { uploads: 0, likes: 0 };
      }
      userStats[img.username].uploads += 1;
      userStats[img.username].likes += img.likes || 0;
    });

    // Convert to array and sort by likes first, then by uploads
    const sortedUsers = Object.entries(userStats)
      .map(([username, stats]) => ({ username, ...stats }))
      .sort((a, b) => b.likes - a.likes || b.uploads - a.uploads);

    setUsers(sortedUsers);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Leaderboard</h2>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Rank</th>
              <th className="p-2">User</th>
              <th className="p-2">Uploads</th>
              <th className="p-2">Likes</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.uploads}</td>
                  <td className="p-2">{user.likes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
