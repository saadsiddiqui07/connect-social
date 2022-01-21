import { useState, useEffect } from "react";
import SidebarOptions from "../SidebarOptions/SidebarOptions";
import axios from "axios";

const Sidebar = () => {
  const [randomData, setRandomData] = useState([]);

  // fetch random users data
  const fetchRandomUsers = async () => {
    await axios
      .get("https://random-data-api.com/api/users/random_user?size=10")
      .then((response) => {
        setRandomData(response.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  return (
    <div className="hidden flex-1 lg:inline h-[50vh] bg-white p-2 rounded shadow-lg ml-5 mr-6 mb-auto overflow-y-scroll scrollbar-hide">
      <p className="mx-5 font-bold font-mono">Suggested</p>
      {randomData.map((profile, index) => (
        <SidebarOptions
          key={index}
          firstName={profile.first_name}
          lastName={profile.last_name}
          avatar={profile.avatar}
        />
      ))}
    </div>
  );
};

export default Sidebar;
