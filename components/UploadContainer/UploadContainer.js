import { Avatar } from "@mui/material";

const UploadContainer = () => {
  return (
    <div className="">
      <div className="">
        <img
          className="h-8 rounded-full mr-2"
          src="https://pbs.twimg.com/media/E4LlwA9X0AMFGun.png"
          alt="img"
        />
        <input className="" placeholder="Share something to connect.." />
        <button>Post It!</button>
      </div>
    </div>
  );
};

export default UploadContainer;
