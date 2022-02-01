import { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, storage, auth } from "../../firebase/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import {
  Avatar,
  Box,
  Modal,
  Button,
  SpeedDial,
  SpeedDialAction,
  CircularProgress,
} from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import CreateIcon from "@mui/icons-material/Create";
import FlakyIcon from "@mui/icons-material/Flaky";
import AddIcon from "@mui/icons-material/Add";
import { useStateValue } from "../../context-api/StateProvider";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid lightgray",
  boxShadow: 24,
  p: 2,
};

const UploadButton = () => {
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const router = useRouter();

  // post upload function
  const handleUpload = async () => {
    if (loading) return;
    setLoading(true);
    // create and add post details to firestore
    const docRef = await addDoc(collection(db, "posts"), {
      username: user?.displayName,
      email: user?.email,
      caption: inputRef.current.value,
      profileImg: user?.photoURL,
      timestamp: serverTimestamp(),
    });
    // console.log("New post", docRef.id);
    // get the post ID of the created post from firebase database
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
    setLoading(false);
    setSelectedFile(null);
    setOpen(false);
  };

  // select a file for the image input
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      // set the first image selected
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  // logout user
  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        router.push("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="lg:hidden">
      <Modal className="w-full" open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <div className="flex items-center px-2 py-2">
            <Avatar
              className="h-10 object-contain rounded-full mr-2"
              src={user?.photoURL}
              alt="img"
            />
            <input
              autoFocus
              ref={inputRef}
              className="bg-transparent flex-1 ml-2 text-black text-xs border-0 outline-none"
              placeholder={`Connect as ${user?.displayName}`}
            />
            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="flex bg-black text-white items-center border-none text-sm rounded px-2 py-1 font-bold"
            >
              {loading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                <>
                  <CreateIcon fontSize="small" className="mr-1" />
                  Post It!
                </>
              )}
            </button>
          </div>
          <div className="flex w-full justify-around mt-5">
            {selectedFile ? (
              <img
                src={selectedFile}
                alt=""
                className="w-full object-contain cursor-pointer"
                onClick={() => setSelectedFile(null)}
              />
            ) : (
              <>
                <Button
                  onClick={() => filePickerRef.current.click()}
                  className="flex shadow-md items-center px-3 py-2 bg-green-400 cursor-pointer"
                >
                  <ImageSearchIcon className="text-white" />{" "}
                  <p className="font-bold text-md text-white ml-2 tracking-wider capitalize hover:border-black">
                    Image
                  </p>
                </Button>
                <Button
                  onClick={() => filePickerRef.current.click()}
                  className="flex shadow-md items-center px-3 py-2 bg-blue-400 cursor-pointer"
                >
                  <VideoCameraBackIcon className="text-white" />
                  <p className="font-bold text-md text-white ml-2 tracking-wider capitalize ">
                    Video
                  </p>
                </Button>
              </>
            )}
          </div>
        </Box>
      </Modal>
      <Box
        className="fixed right-0 bottom-1 z-50"
        sx={{ "& > :not(style)": { m: 1 } }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<FlakyIcon />}
        >
          <SpeedDialAction
            icon={<AddIcon />}
            onClick={() => setOpen(true)}
            tooltipTitle="Create post"
          />
          <SpeedDialAction
            icon={<ExitToAppIcon />}
            onClick={handleLogout}
            tooltipTitle="Logout"
          />
        </SpeedDial>
      </Box>
    </div>
  );
};

export default UploadButton;
