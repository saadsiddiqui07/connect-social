import { useState, useEffect } from "react";
import Post from "../Post/Post";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetching posts from the database
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    // clean up action
    return unsubscribe;
  }, []);

  return (
    <div className=" w-full flex-col justify items-center mt-8">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          email={post.data().email}
          image={post.data().image}
          caption={post.data().caption}
          profileImg={post.data().profileImg}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  );
};

export default Posts;
