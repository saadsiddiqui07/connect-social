import faker from "faker";
import { useState, useEffect } from "react";
import SidebarOptions from "../sidebarOptions/SidebarOptions";

const Sidebar = () => {
  const [friends, setFriends] = useState([]);

  // generating random data from faker api
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setFriends(suggestions);
  }, []);

  return (
    <div className="hidden flex-1 lg:inline bg-white p-2 rounded shadow-lg ml-5 mr-6">
      <p className="mx-5 font-bold font-mono">Friends</p>
      {friends.map((profile) => (
        <SidebarOptions
          key={profile.id}
          name={profile.username}
          profilePic={profile.avatar}
        />
      ))}
    </div>
  );
};

export default Sidebar;
