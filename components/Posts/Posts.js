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
  }, [db]);
  console.log(posts);

  return (
    <div className=" w-full flex-col justify items-center mt-8">
      {posts.map((post) => (
        <Post
          id={post.id}
          key={post.id}
          username={post.data().username}
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
