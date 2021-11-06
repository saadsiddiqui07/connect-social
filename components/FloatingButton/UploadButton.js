import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Fab, Box, Modal, Button } from "@mui/material";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import CreateIcon from "@mui/icons-material/Create";

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
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Modal className="w-full" open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <div className="flex items-center px-2 py-2">
            <Avatar
              className="h-10 object-contain rounded-full mr-2"
              src="https://pbs.twimg.com/media/E4LlwA9X0AMFGun.png"
              alt="img"
            />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent flex-1 ml-2 text-black text-sm border-0 outline-none"
              placeholder="Share something to connect..."
            />
            <button
              onClick={handleUpload}
              disabled={!input}
              className="flex bg-black text-white items-center border-none text-sm rounded px-2 py-1 font-bold"
            >
              <CreateIcon fontSize="small" className="mr-1" />
              Post It!
            </button>
          </div>
          <div className="flex w-full justify-around mt-5">
            <Button className="flex shadow-md items-center px-3 py-2 bg-green-400 cursor-pointer">
              <ImageSearchIcon className="text-white" />{" "}
              <p className="font-bold text-md text-white ml-2 tracking-wider capitalize hover:border-black">
                Image
              </p>
            </Button>
            <Button className="flex shadow-md items-center px-3 py-2 bg-blue-400 cursor-pointer">
              <VideoCameraBackIcon className="text-white" />
              <p className="font-bold text-md text-white ml-2 tracking-wider capitalize ">
                Video
              </p>
            </Button>
          </div>
        </Box>
      </Modal>
      <Box
        className="absolute right-0 bottom-1 z-50"
        sx={{ "& > :not(style)": { m: 1 } }}
      >
        <Fab color="primary" onClick={handleModalOpen}>
          <AddIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default UploadButton;
