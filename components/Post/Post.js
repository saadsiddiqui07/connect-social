import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  CardActions,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStateValue } from "../../context-api/StateProvider";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Post = ({
  username,
  email,
  caption,
  id,
  profileImg,
  timestamp,
  image,
}) => {
  const [{ user }] = useStateValue();
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // fetch all the comments from the firestore databse
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
    return unsubscribe;
  }, [id]);

  // add a comment to a new post
  const commentOnPost = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    // add a new document to comments collection inside posts collection
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: user?.displayName,
      profileImg: user?.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  // delete a post
  const deletePost = (e) => {
    e.stopPropagation();
    deleteDoc(doc(db, "posts", id));
  };

  const showDeleteIcon = user?.email === email;
  const showComments = showCommentInput && comments.length > 0;

  return (
    <Card className="m-5 w-4/5 ml-auto mr-auto">
      <CardHeader
        avatar={<Avatar src={profileImg} />}
        action={
          <IconButton onClick={deletePost} aria-label="settings">
            {showDeleteIcon && <DeleteForeverIcon />}
          </IconButton>
        }
        title={username}
        subheader={new Date(timestamp?.toDate()).toLocaleString(undefined, {
          timeZone: "Asia/Kolkata",
        })}
      />
      {image && (
        <CardMedia
          className="object-contain h-60"
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
      )}
      <CardContent>
        <Typography
          className="flex text-black"
          variant="body2"
          color="text.secondary"
        >
          <Typography className="font-bold text-black mr-2">
            {username.split(" ").join("").toLowerCase()}
          </Typography>
          {caption}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => setIsLiked(!isLiked)}>
          {!isLiked ? (
            <FavoriteBorderIcon />
          ) : (
            <FavoriteIcon className="text-blue-600" />
          )}
        </IconButton>
        <IconButton onClick={() => setShowCommentInput(!showCommentInput)}>
          <ChatBubbleOutlineIcon />{" "}
          <p className="text-sm ml-2">{comments.length} comments</p>
        </IconButton>
      </CardActions>
      {/* Comments section */}
      {!showComments && (
        <>
          <div>
            {comments.map((comment, idx) => (
              <div key={idx} className="flex items-center px-2">
                <p className="text-xs font-extrabold">
                  {comment.data().username}
                </p>
                <span className="ml-3 text-xs md:text-sm">
                  {comment.data().comment}
                </span>
              </div>
            ))}
          </div>
          <form className="flex px-1 py-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment"
              className="border-none h-10 pl-3 bg-gray-100 flex-1 focus:ring-0 outline-none"
            />
            <button
              onClick={commentOnPost}
              type="submit"
              disabled={!comment.trim()}
              className="bg-blue-500 font-mono text-white px-2 ml-3 rounded"
            >
              Post
            </button>
          </form>
        </>
      )}
    </Card>
  );
};

export default Post;
