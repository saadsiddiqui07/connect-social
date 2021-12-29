import { useState, useRef } from "react";
import { Avatar } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import { useStateValue } from "../../context-api/StateProvider";

const UploadContainer = () => {
  const [{ user }] = useStateValue();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [input, setInput] = useState("");
  const filePickerRef = useRef(null);

  // selecting a file from the file input
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const handleImageUpload = async () => {
    if (loading) return;
    setLoading(true);
    // create and add post to firestore
    const docRef = await addDoc(collection(db, "posts"), {
      username: user?.displayName,
      caption: input,
      profileImg: user?.photoURL,
      timestamp: serverTimestamp(),
    });
    console.log("New post", docRef.id);
    // get the post ID of the created post
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    // upload that image to firestore storage with use of POST ID
    await uploadString(imageRef, selectedFile, "data_url").then(async () => {
      const downloadUrl = await getDownloadURL(imageRef);
      // get a download url from firebase storage and update the post
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadUrl,
      });
    });
    // setting up states after finish uploading
    setInput("");
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <div className="hidden lg:inline-flex  flex-col bg-white w-full rounded shadow-lg">
      <div className="flex w-full p-2 mt-2">
        <Avatar
          className="h-10 object-contain rounded-full mr-2"
          src={user?.photoURL}
          alt="img"
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 h-10 rounded pl-2 border-0 outline-none mr-3 bg-gray-100"
          placeholder="Share something to connect.."
        />
        <input
          type="file"
          hidden
          ref={filePickerRef}
          onChange={addImageToPost}
        />
        <button
          disabled={!selectedFile}
          onClick={handleImageUpload}
          className="bg-black text-white px-1 text-xs rounded font-bold font-mono"
        >
          {loading ? "Uploading..." : "Post It!"}
        </button>
      </div>
      {selectedFile ? (
        <img
          src={selectedFile}
          alt=""
          onClick={() => setSelectedFile(null)}
          className="w-full object-contain cursor-pointer"
        />
      ) : (
        <div className="flex mt-2 justify-between px-3 border-t-2 border-gray-200">
          <div
            onClick={() => filePickerRef.current.click()}
            className="icons_container"
          >
            <InsertPhotoOutlinedIcon
              fontSize="medium"
              className="text-blue-500 font-extrabold"
            />
            <p>Image</p>
          </div>
          <div
            onClick={() => filePickerRef.current.click()}
            className="icons_container"
          >
            <VideoCameraBackOutlinedIcon
              fontSize="medium"
              className="text-red-500 font-extrabold"
            />
            <p>Video</p>
          </div>
          <div className="icons_container">
            <AddReactionOutlinedIcon
              fontSize="medium"
              className="text-yellow-500 font-extrabold"
            />
            <p>Feeling/Activity</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadContainer;
