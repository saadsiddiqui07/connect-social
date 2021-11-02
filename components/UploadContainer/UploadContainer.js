import { useState } from "react";
import { Avatar } from "@mui/material";

const UploadContainer = () => {
  const [input, setInput] = useState("");

  return (
    <div className="hidden lg:inline-flex bg-yellow-300 w-full">
      <div className="flex justify-between">
        <Avatar
          className="h-10 object-contain rounded-full mr-2"
          src="https://pbs.twimg.com/media/E4LlwA9X0AMFGun.png"
          alt="img"
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=""
          placeholder="Share something to connect.."
        />

        <button>Post It!</button>
      </div>
    </div>
  );
};

export default UploadContainer;
