import { useState, useEffect } from "react";
import SidebarOptions from "../SidebarOptions/SidebarOptions";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Sidebar = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users")),
      (snapshot) => {
        setFriends(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="hidden flex-1 lg:inline h-[50vh] bg-white p-2 rounded shadow-lg ml-5 mr-6 mb-auto overflow-y-scroll scrollbar-hide">
      <p className="mx-5 font-bold font-mono">Suggested</p>
      {friends.map((profile) => (
        <SidebarOptions
          key={profile.id}
          username={profile.data().username}
          profilePic={profile.data().profilePic}
          email={profile.data().email}
        />
      ))}
    </div>
  );
};

export default Sidebar;
