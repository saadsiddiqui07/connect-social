import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Fab, Box, Modal, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "white",
  border: "2px solid lightgray",
  boxShadow: 24,
  p: 4,
};

const UploadButton = () => {
  const [open, setOpen] = useState(false);

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
        <Box className="bg-white w-full absolute top-1/2">
          <div className="flex items-center px-2 py-2">
            <Avatar
              className="h-10 object-contain rounded-full mr-2"
              src="https://pbs.twimg.com/media/E4LlwA9X0AMFGun.png"
              alt="img"
            />
            <input
              className="bg-transparent flex-1 ml-2 text-black text-sm border-0 outline-none"
              placeholder="Share something to connect..."
            />
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white border-none text-xs px-2 py-1 font-bold"
            >
              Post It!
            </button>
          </div>
          <div>
            <Button>Image</Button>
            <Button>Video</Button>
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
